const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error.middleware');
const apiLimiter = require('./middleware/rateLimit.middleware');

// Route imports
const authRoutes = require('./routes/auth.routes');
const recordRoutes = require('./routes/record.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
app.use('/api', apiLimiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/records', recordRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Centralized error handler
app.use(errorHandler);

module.exports = app;
