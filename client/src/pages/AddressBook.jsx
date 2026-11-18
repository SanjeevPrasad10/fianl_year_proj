import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactsApi } from '../services/api';
import { isValidAddress, truncateAddress } from '../services/wallet';

export const AddressBook = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactsApi.getAll();
      if (res.data?.success) {
        setContacts(res.data.contacts);
      }
    } catch (err) {
      console.warn('Failed to fetch contacts:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidAddress(address)) {
      setError('Invalid Ethereum address format.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await contactsApi.add({ name: name.trim(), address: address.trim() });
      if (res.data?.success) {
        setName('');
        setAddress('');
        setShowAddModal(false);
        fetchContacts();
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add contact.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact from your address book?')) return;
    try {
      await contactsApi.delete(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete contact.');
    }
  };

  const handleCopy = (id, addr) => {
    navigator.clipboard.writeText(addr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Directory
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Address Book
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage trusted recipient addresses for fast transfer execution
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto py-2 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors"
        >
          Add Contact
        </button>
      </div>

      {/* Contacts Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : contacts.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-4 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {contact.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-xs text-rose-700 dark:text-rose-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-1 font-mono text-xs text-gray-500">
                  <span>{truncateAddress(contact.address, 10, 8)}</span>
                  <button
                    onClick={() => handleCopy(contact._id, contact.address)}
                    className="text-forest-800 dark:text-forest-400 hover:underline"
                  >
                    {copiedId === contact._id ? '[Copied]' : '[Copy]'}
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-darkborder flex items-center justify-between text-xs">
                <a
                  href={`https://sepolia.etherscan.io/address/${contact.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-gray-500 hover:underline"
                >
                  Explorer
                </a>

                <button
                  onClick={() => navigate(`/send?asset=ETH&recipient=${contact.address}`)}
                  className="py-1 px-3 rounded bg-forest-50 dark:bg-forest-950 text-forest-800 dark:text-forest-300 font-semibold border border-forest-200 dark:border-forest-800 hover:bg-forest-100 dark:hover:bg-forest-900"
                >
                  Send Funds
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-12 text-center text-xs text-gray-500">
          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
            No contacts saved
          </p>
          <p className="mb-4">
            Add frequent transfer destinations to streamline future transactions.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="py-1.5 px-3 rounded bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs"
          >
            Add Contact
          </button>
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
              Add New Contact
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Enter a contact label and valid Ethereum address.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 text-xs font-mono">
                Error: {error}
              </div>
            )}

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alice, Faucet, Smart Contract"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Ethereum Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-forest-700 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 px-3 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
