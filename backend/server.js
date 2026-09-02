const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolioRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression()); // GZIP compression for performance
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 submissions per 15 min window
  message: { success: false, message: 'Too many contact submissions. Please try again after 15 minutes.' }
});

// Database initialization
connectDB();

// API Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);

// Apply rate limiting specifically to the contact route
app.use('/api/portfolio/contact', contactLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'R. KANNAN Portfolio & CMS REST Backend',
    timestamp: new Date().toISOString()
  });
});

// Root API route
app.get('/api', (req, res) => {
  res.send('R. KANNAN MERN Stack Developer Portfolio API Server is running.');
});

// Start server (only when executed directly, e.g. node server.js)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Portfolio REST API Server running on port ${PORT}`);
    console.log(`📡 Endpoints: http://localhost:${PORT}/api/portfolio`);
    console.log(`====================================================`);
  });
}

module.exports = app;
