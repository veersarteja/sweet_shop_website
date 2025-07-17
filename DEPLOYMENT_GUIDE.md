# Sweet Shop Management System - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git (optional, for version control)

### Installation & Setup

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd sweet-shop
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Tests** (Verify everything works)
   ```bash
   npm test
   ```

4. **Start the Application**
   ```bash
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/sweets

## 🎯 Features Demonstration

### 1. Add New Sweets
- Use the "Add New Sweet" form
- Fill in ID, name, category, price, and quantity
- Click "Add Sweet" to save

### 2. Search & Filter
- Search by name (partial matching)
- Filter by category
- Set price range filters
- Sort by name, price, quantity, or category

### 3. Purchase Sweets
- Click "Purchase" button on any sweet card
- Enter quantity to purchase
- System validates stock availability
- Displays total cost and remaining stock

### 4. Restock Inventory
- Click "Restock" button on any sweet card
- Enter quantity to add
- Updates inventory immediately

### 5. View Statistics
- Real-time inventory statistics
- Total sweets count
- Total inventory value
- Low stock alerts
- Average price calculation

## 📋 API Endpoints Reference

### Sweet Management
```http
POST   /sweets              # Add new sweet
GET    /sweets              # Get all sweets
GET    /sweets/:id          # Get sweet by ID
PUT    /sweets/:id          # Update sweet
DELETE /sweets/:id          # Delete sweet
```

### Search & Filter
```http
GET    /sweets/search       # Search sweets
GET    /sweets/sort         # Sort sweets
GET    /sweets/category/:category  # Filter by category
```

### Inventory Operations
```http
POST   /sweets/:id/purchase # Purchase sweets
POST   /sweets/:id/restock  # Restock sweets
GET    /sweets/low-stock    # Get low stock items
```

### Statistics
```http
GET    /sweets/stats        # Get inventory statistics
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Watch Mode (Development)
```bash
npm run test:watch
```

## 🔧 Development

### Development Server
```bash
npm run dev  # Using nodemon for auto-restart
```

### Project Structure
```
sweet-shop/
├── src/
│   ├── app.js              # Main application
│   ├── models/
│   │   └── sweet.js        # Sweet model
│   ├── services/
│   │   └── sweetService.js # Business logic
│   ├── controllers/
│   │   └── sweetController.js # Request handlers
│   └── routes/
│       └── sweetRoutes.js  # API routes
├── tests/
│   ├── sweet.test.js       # Model tests
│   ├── sweetService.test.js # Service tests
│   └── api.test.js         # API tests
├── public/
│   └── index.html          # Frontend
└── package.json            # Dependencies
```

## 📝 Sample Data

The application comes with pre-loaded sample data:

| ID   | Name           | Category         | Price | Quantity |
|------|----------------|------------------|-------|----------|
| 1001 | Kaju Katli     | Nut-Based       | ₹50   | 20       |
| 1002 | Gajar Halwa    | Vegetable-Based | ₹30   | 15       |
| 1003 | Gulab Jamun    | Milk-Based      | ₹10   | 50       |
| 1004 | Chocolate Barfi| Chocolate       | ₹45   | 25       |
| 1005 | Rasgulla       | Milk-Based      | ₹12   | 40       |
| 1006 | Jalebi         | Fried           | ₹15   | 30       |
| 1007 | Soan Papdi     | Nut-Based       | ₹35   | 3        |
| 1008 | Mysore Pak     | Nut-Based       | ₹60   | 18       |
| 1009 | Laddu          | Milk-Based      | ₹25   | 35       |
| 1010 | Barfi          | Milk-Based      | ₹40   | 2        |

## 🎨 Frontend Features

### Modern UI Design
- Beautiful gradient backgrounds
- Card-based layout for sweets
- Responsive design (mobile-friendly)
- Hover effects and animations
- Visual stock indicators

### Interactive Elements
- Real-time search as you type
- Dynamic filtering and sorting
- Purchase/restock dialogs
- Success/error notifications
- Loading states

### Visual Indicators
- 🟡 Yellow background for low stock items
- 🔴 Red background for out-of-stock items
- ⚠️ Warning icons for low stock
- 📊 Statistics cards with gradients

## 🔐 Security Considerations

### Input Validation
- Server-side validation for all inputs
- Type checking and sanitization
- Range validation for prices and quantities
- Duplicate ID prevention

### Error Handling
- Graceful error handling
- Meaningful error messages
- HTTP status codes
- Client-side error display

## 🚀 Production Deployment

### Environment Variables
```bash
PORT=3000  # Server port (default: 3000)
NODE_ENV=production  # Environment mode
```

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### PM2 Process Manager
```bash
npm install -g pm2
pm2 start src/app.js --name "sweet-shop"
pm2 save
pm2 startup
```

## 📊 Performance Considerations

### Optimization Tips
- Use `npm install --production` for production
- Enable gzip compression
- Implement caching for static assets
- Monitor memory usage
- Use clustering for multiple CPU cores

### Monitoring
- Health check endpoint: `/health`
- Application logs
- Performance metrics
- Error tracking

## 🔄 Git Workflow

### Initialize Repository
```bash
# Use the provided script
./init-git.ps1  # Windows PowerShell
# or
./init-git.sh   # Linux/Mac
```

### Manual Git Setup
```bash
git init
git add .
git commit -m "Initial commit: Sweet Shop Management System"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Change port in package.json or use environment variable
   PORT=3001 npm start
   ```

2. **Dependencies Issues**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Tests Failing**
   ```bash
   # Clear Jest cache
   npx jest --clearCache
   npm test
   ```

### Debug Mode
```bash
DEBUG=* npm start  # Enable debug logging
```

## 📞 Support

### Getting Help
- Check the README.md for detailed documentation
- Review test files for usage examples
- Check the TEST_REPORT.md for test coverage
- Open issues on the repository

### Contributing
1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## 📈 Future Enhancements

### Planned Features
- User authentication
- Database integration
- Order management
- Customer profiles
- Payment processing
- Reporting dashboard
- Mobile app

### Technology Upgrades
- GraphQL API
- React frontend
- TypeScript migration
- Microservices architecture
- Cloud deployment

---

**Need help? Contact the development team or check the documentation!**

*Last updated: ${new Date().toLocaleDateString()}*
