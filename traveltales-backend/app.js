const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/database');
const path = require('path');


// Import routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const countryRoutes = require('./routes/countryRoutes');
const userRoutes = require('./routes/userRoutes');

// Import middleware
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`📨 Incoming request: ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
console.log('Before api/blogs route');
app.use('/api/blogs', blogRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);

// Add this RIGHT BEFORE error handling
app.use((req, res) => {
  console.log('⚠️ Unhandled route:', req.method, req.path);
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

// Database initialization
db.serialize(() => {
  // Enable foreign key constraints
  db.run('PRAGMA foreign_keys = ON');
  
  // Run migrations
  const fs = require('fs');
  const migrationSQL = fs.readFileSync(
    path.join(__dirname, 'db/migrations/001_initial_schema.sql'), 
    'utf8'
  );
  db.exec(migrationSQL, (err) => {
    if (err) {
      console.error('Migration error:', err);
    } else {
      console.log('Database migrations applied');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;