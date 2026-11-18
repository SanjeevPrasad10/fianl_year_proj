import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { isLocked, lockWallet, theme, toggleTheme, hasWallet } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLock = () => {
    lockWallet();
    navigate('/unlock');
  };

  if (!isAuthenticated) return null;

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Send', path: '/send' },
    { name: 'Receive', path: '/receive' },
    { name: 'History', path: '/history' },
    { name: 'Address Book', path: '/contacts' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-darkcard border-b border-gray-200 dark:border-darkborder transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Network */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-forest-900 dark:text-forest-400 uppercase">
                Crypto Wallet
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300 border border-forest-200 dark:border-forest-800">
                Non-Custodial
              </span>
            </Link>

            <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              Sepolia
            </span>
          </div>

          {/* Desktop Nav Links */}
          {hasWallet && (
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                      active
                        ? 'bg-forest-800 text-white dark:bg-forest-700'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-2.5 py-1 text-xs font-medium border border-gray-200 dark:border-darkborder rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            {/* Lock / Unlock */}
            {hasWallet && (
              <>
                {!isLocked ? (
                  <button
                    onClick={handleLock}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Lock Wallet
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/unlock')}
                    className="px-2.5 py-1 text-xs font-semibold rounded-md bg-forest-800 hover:bg-forest-900 text-white"
                  >
                    Unlock
                  </button>
                )}
              </>
            )}

            {/* Profile */}
            <Link
              to="/profile"
              className="px-2.5 py-1 text-xs font-medium border border-gray-200 dark:border-darkborder rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 max-w-[120px] truncate"
            >
              {user?.name || 'Profile'}
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 text-xs font-medium text-rose-700 dark:text-rose-400 hover:underline"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="px-2 py-1 text-xs border border-gray-200 dark:border-darkborder rounded text-gray-700 dark:text-gray-300"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-2.5 py-1 text-xs font-semibold border border-gray-300 dark:border-gray-700 rounded text-gray-800 dark:text-gray-200"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-darkborder bg-white dark:bg-darkcard px-4 py-3 space-y-2">
          {hasWallet && (
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-gray-200 dark:border-darkborder space-y-2">
            {hasWallet && !isLocked && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLock();
                }}
                className="w-full text-left px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                Lock Wallet
              </button>
            )}

            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              Profile ({user?.name})
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-400"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
