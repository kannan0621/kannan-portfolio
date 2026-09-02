const PortfolioContent = require('../models/PortfolioContent');
const Message = require('../models/Message');
const seedData = require('../data/seedData');
const mongoose = require('mongoose');
const { sendPortfolioEmails } = require('../services/emailService');

let memoryStore = { ...seedData, visitorCount: 142 };
let inMemoryMessages = [];

const getPortfolio = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let data = await PortfolioContent.findOne({ key: 'main_portfolio' });
      if (!data) {
        data = await PortfolioContent.create({
          key: 'main_portfolio',
          ...seedData,
          visitorCount: 142
        });
      }
      return res.json({ success: true, data });
    }
  } catch (err) {
    console.error('Error reading MongoDB portfolio:', err.message);
  }

  return res.json({ success: true, data: memoryStore });
};

const updatePortfolio = async (req, res) => {
  try {
    const updatedContent = req.body;
    
    if (mongoose.connection.readyState === 1) {
      let data = await PortfolioContent.findOneAndUpdate(
        { key: 'main_portfolio' },
        { ...updatedContent, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      memoryStore = { ...memoryStore, ...updatedContent };
      return res.json({ success: true, message: 'Portfolio updated successfully via CMS', data });
    }

    memoryStore = { ...memoryStore, ...updatedContent };
    return res.json({ success: true, message: 'Portfolio updated successfully in-memory (CMS)', data: memoryStore });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update portfolio content', error: error.message });
  }
};

const resetPortfolio = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await PortfolioContent.findOneAndUpdate(
        { key: 'main_portfolio' },
        { ...seedData, updatedAt: new Date() },
        { new: true, upsert: true }
      );
    }
    memoryStore = { ...seedData, visitorCount: 142 };
    return res.json({ success: true, message: 'Portfolio content reset to original R. KANNAN profile', data: memoryStore });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Reset failed', error: error.message });
  }
};

const postContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    const newMessage = {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date()
    };

    // Directly send emails to Admin (r.kannan0621@gmail.com) and User confirmation from project
    const emailResult = await sendPortfolioEmails({ name, email, subject, message });

    newMessage.emailSent = emailResult.success;
    newMessage.emailAdminId = emailResult.adminMessageId || null;
    newMessage.emailUserId = emailResult.userMessageId || null;

    let responseMessage = 'Message submitted successfully!';

    if (mongoose.connection.readyState === 1) {
      const savedMsg = await Message.create(newMessage);
      return res.status(201).json({
        success: true,
        message: responseMessage,
        data: savedMsg
      });
    }

    inMemoryMessages.unshift({ id: Date.now().toString(), ...newMessage });
    return res.status(201).json({
      success: true,
      message: responseMessage,
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to process message', error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    return res.json({ success: true, count: inMemoryMessages.length, data: inMemoryMessages });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
};

module.exports = {
  getPortfolio,
  updatePortfolio,
  resetPortfolio,
  postContact,
  getMessages
};
