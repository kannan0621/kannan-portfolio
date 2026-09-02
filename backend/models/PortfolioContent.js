const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  key: { type: String, default: 'main_portfolio', unique: true },
  hero: Object,
  about: Object,
  skills: Array,
  experience: Array,
  projects: Array,
  education: Array,
  certifications: Array,
  atsResume: Object,
  visitorCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PortfolioContent', PortfolioSchema);
