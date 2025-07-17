# Sweet Shop Management System

A comprehensive Sweet Shop Management System built with Test-Driven Development (TDD) principles using Node.js, Express, and Jest.

## 🎯 Objective

Create a simple Sweet Shop Management System that allows users to perform basic operations such as adding sweets, updating sweet details, deleting sweets, searching, sorting, and viewing available sweets with a beautiful frontend interface.

## ✨ Features

### Core Operations
- **Add Sweets**: Add new sweets with unique ID, name, category, price, and quantity
- **Delete Sweets**: Remove sweets from the shop
- **View Sweets**: Display all available sweets with detailed information
- **Update Sweets**: Modify sweet details

### Search & Sort Features
- **Search by Name**: Find sweets by partial name match
- **Search by Category**: Filter sweets by category
- **Search by Price Range**: Find sweets within a price range
- **Sort**: Sort sweets by name, price, quantity, or category

### Inventory Management
- **Purchase Sweets**: Buy sweets with stock validation and cost calculation
- **Restock Sweets**: Increase inventory quantities
- **Low Stock Alerts**: Identify sweets with low inventory
- **Inventory Statistics**: View comprehensive inventory metrics

### Frontend Interface
- **Beautiful UI**: Modern, responsive design with gradient backgrounds
- **Real-time Updates**: Live inventory updates
- **Interactive Cards**: Hover effects and visual feedback
- **Search & Filter**: Easy-to-use search and filtering controls
- **Statistics Dashboard**: Visual representation of inventory data

## 🏗️ Architecture

```
src/
├── app.js              # Main application entry point
├── models/
│   └── sweet.js        # Sweet model with validation
├── services/
│   └── sweetService.js # Business logic layer
├── controllers/
│   └── sweetController.js # HTTP request handling
└── routes/
    └── sweetRoutes.js  # API route definitions

tests/
├── sweet.test.js       # Sweet model tests
├── sweetService.test.js # Service layer tests
└── api.test.js         # API integration tests

public/
└── index.html          # Frontend interface
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sweet-shop
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

4. Start the application:
```bash
npm start
```

5. Access the application:
- Frontend: http://localhost:3000
- API: http://localhost:3000/sweets

## 📋 API Endpoints

### Sweet Management
- `POST /sweets` - Add a new sweet
- `GET /sweets` - Get all sweets
- `GET /sweets/:id` - Get sweet by ID
- `PUT /sweets/:id` - Update sweet
- `DELETE /sweets/:id` - Delete sweet

### Search & Filter
- `GET /sweets/search` - Search sweets with criteria
- `GET /sweets/sort` - Sort sweets by field
- `GET /sweets/category/:category` - Get sweets by category

### Inventory Operations
- `POST /sweets/:id/purchase` - Purchase sweets
- `POST /sweets/:id/restock` - Restock sweets
- `GET /sweets/low-stock` - Get low stock sweets

### Statistics
- `GET /sweets/stats` - Get inventory statistics

## 🧪 Testing

This project follows Test-Driven Development (TDD) principles with comprehensive test coverage:

### Test Structure
- **Unit Tests**: Test individual components (Sweet model, SweetService)
- **Integration Tests**: Test API endpoints and complete workflows
- **Coverage**: Aim for high test coverage with meaningful test cases

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Examples
```javascript
// Example test for adding a sweet
test('should add a sweet', () => {
  const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
  expect(SweetService.addSweet(sweet)).toBe(sweet);
  expect(SweetService.getAllSweets()).toHaveLength(1);
});

// Example test for purchase validation
test('should throw error for insufficient stock', () => {
  const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 5);
  SweetService.addSweet(sweet);
  expect(() => SweetService.purchase(1001, 10)).toThrow('Insufficient stock');
});
```

## 📊 Sample Data

The system comes with example sweet categories and can be populated with sample data:

| ID   | Name         | Category        | Price | Quantity |
|------|--------------|-----------------|-------|----------|
| 1001 | Kaju Katli   | Nut-Based      | 50    | 20       |
| 1002 | Gajar Halwa  | Vegetable-Based| 30    | 15       |
| 1003 | Gulab Jamun  | Milk-Based     | 10    | 50       |

## 🎨 Frontend Features

### Modern Design
- Gradient backgrounds and card-based layout
- Responsive design for all screen sizes
- Hover effects and smooth transitions
- Visual indicators for low stock and out-of-stock items

### Interactive Elements
- Real-time search and filtering
- Sortable columns
- Purchase and restock dialogs
- Success/error message notifications

### Dashboard Features
- Inventory statistics cards
- Low stock alerts
- Category-based organization
- Total value calculations

## 🔧 Development

### Code Quality
- **ESLint**: Code linting for consistency
- **Clean Code**: Following SOLID principles
- **Documentation**: Comprehensive JSDoc comments
- **Error Handling**: Proper error handling throughout

### Git Workflow
Following TDD principles with frequent commits:
```bash
# Initialize repository
git init

# Add tests first
git add tests/
git commit -m "Add tests for sweet management"

# Implement features
git add src/
git commit -m "Implement sweet management features"

# Repeat for each feature
```

## 🏆 Technical Highlights

### Design Patterns
- **MVC Architecture**: Clean separation of concerns
- **Service Layer**: Business logic encapsulation
- **Repository Pattern**: Data access abstraction
- **Factory Pattern**: Sweet creation with validation

### Best Practices
- **TDD**: Tests written before implementation
- **SOLID Principles**: Single responsibility, open/closed, etc.
- **Error Handling**: Comprehensive error handling
- **Input Validation**: Robust input validation
- **Documentation**: Clear, maintainable code

## 📈 Future Enhancements

- User authentication and authorization
- Database integration (MongoDB/PostgreSQL)
- Order management system
- Customer management
- Reports and analytics
- Mobile app integration
- Payment processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Test-Driven Development principles
- Inspired by clean architecture patterns
- Modern UI design principles
- RESTful API best practices

---

**Happy Coding! 🍭**
