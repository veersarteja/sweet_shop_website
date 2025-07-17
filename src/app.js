const express = require('express');
const path = require('path');
const app = express();
const sweetRoutes = require('./routes/sweetRoutes');
const Sweet = require('./models/sweet');
const SweetService = require('./services/sweetService');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// CORS middleware for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Initialize with sample data
function initializeSampleData() {
  try {
    // Add sample sweets
    const sampleSweets = [
      new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20),
      new Sweet(1002, 'Gajar Halwa', 'Vegetable-Based', 30, 15),
      new Sweet(1003, 'Gulab Jamun', 'Milk-Based', 10, 50),
      new Sweet(1004, 'Chocolate Barfi', 'Chocolate', 45, 25),
      new Sweet(1005, 'Rasgulla', 'Milk-Based', 12, 40),
      new Sweet(1006, 'Jalebi', 'Fried', 15, 30),
      new Sweet(1007, 'Soan Papdi', 'Nut-Based', 35, 3), // Low stock
      new Sweet(1008, 'Mysore Pak', 'Nut-Based', 60, 18),
      new Sweet(1009, 'Laddu', 'Milk-Based', 25, 35),
      new Sweet(1010, 'Barfi', 'Milk-Based', 40, 2) // Low stock
    ];

    sampleSweets.forEach(sweet => {
      SweetService.addSweet(sweet);
    });

    console.log('✅ Sample data initialized successfully');
  } catch (error) {
    console.log('ℹ️ Sample data already exists or error occurred:', error.message);
  }
}

// Routes
app.use('/sweets', sweetRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Sweet Shop Management System is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🍭 Sweet Shop Management System running on port ${PORT}`);
  console.log(`📱 Frontend available at: http://localhost:${PORT}`);
  console.log(`🔗 API available at: http://localhost:${PORT}/sweets`);
  
  // Initialize sample data after server starts
  initializeSampleData();
});
