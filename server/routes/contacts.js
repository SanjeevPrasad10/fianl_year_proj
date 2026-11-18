const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   GET /api/contacts
// @desc    Get all saved address book contacts for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({ name: 1 });
    res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (err) {
    console.error('Fetch contacts error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts.',
      error: err.message,
    });
  }
});

// @route   POST /api/contacts
// @desc    Add a new contact to address book
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name and address are required.',
      });
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Ethereum wallet address format (must start with 0x and be 42 characters).',
      });
    }

    // Check if duplicate address already saved for this user
    const existing = await Contact.findOne({
      userId: req.user.id,
      address: address.toLowerCase().trim(),
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `This address is already saved under "${existing.name}".`,
      });
    }

    const contact = new Contact({
      userId: req.user.id,
      name: name.trim(),
      address: address.toLowerCase().trim(),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact added to address book.',
      contact,
    });
  } catch (err) {
    console.error('Add contact error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to add contact.',
      error: err.message,
    });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete a contact by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found or unauthorized to delete.',
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact deleted successfully.',
    });
  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact.',
      error: err.message,
    });
  }
});

module.exports = router;
