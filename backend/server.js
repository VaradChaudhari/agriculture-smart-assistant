const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const mandiRoutes = require('./routes/mandiRoutes');
const expertRoutes = require('./routes/expertRoutes');
const contactRoutes = require('./routes/contactRoutes');
const careersRoutes = require('./routes/careersRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware - CORS configured for multiple frontend ports
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173', // Vite default
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://agriculture-smart-assistant.vercel.app',
  'https://agriculture-smart-assistant-*.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      origin.match(/^https:\/\/agriculture-smart-assistant.*\.vercel\.app$/) ||
      origin.match(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/)
    ) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all for now during development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ROOT ROUTE - Backend Status */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Backend Running Successfully',
    project: 'Agriculture Smart Assistant',
    backend: 'Connected',
    port: process.env.PORT || 5000,
    timestamp: new Date(),
  });
});

/* HEALTH CHECK ROUTE */
app.get('/api/health', (req, res) => {
  const mongooseState = mongoose.connection.readyState;
  const dbStatus = mongooseState === 1 ? 'Connected' : 'Disconnected';
  
  res.status(200).json({
    success: true,
    message: 'API Health Check Passed',
    mongodb: dbStatus,
    server: 'Running',
    status: 'Healthy',
    timestamp: new Date(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
