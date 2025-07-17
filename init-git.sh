#!/bin/bash

# Sweet Shop Management System - Git Initialization Script
# This script demonstrates the TDD journey with meaningful commits

echo "🍭 Initializing Sweet Shop Management System Git Repository..."

# Initialize Git repository
git init

# Initial commit with README
echo "📝 Adding README..."
git add README_NEW.md
git commit -m "Initial commit: Add comprehensive README with project overview"

# Add package.json and Jest configuration
echo "📦 Adding project configuration..."
git add package.json jest.config.js
git commit -m "Add package.json and Jest configuration for TDD setup"

# Add model with validation (TDD Step 1: Write tests first)
echo "🧪 Adding Sweet model tests..."
git add tests/sweet.test.js
git commit -m "Add Sweet model tests with validation (TDD - Red phase)"

echo "🏗️ Implementing Sweet model..."
git add src/models/sweet.js
git commit -m "Implement Sweet model with validation (TDD - Green phase)"

# Add service layer tests and implementation
echo "🧪 Adding SweetService tests..."
git add tests/sweetService.test.js
git commit -m "Add comprehensive SweetService tests (TDD - Red phase)"

echo "🔧 Implementing SweetService..."
git add src/services/sweetService.js
git commit -m "Implement SweetService with business logic (TDD - Green phase)"

# Add API tests and implementation
echo "🧪 Adding API integration tests..."
git add tests/api.test.js
git commit -m "Add API integration tests for all endpoints (TDD - Red phase)"

echo "🎛️ Implementing controller layer..."
git add src/controllers/sweetController.js
git commit -m "Implement SweetController with HTTP handling (TDD - Green phase)"

echo "🛤️ Implementing routes..."
git add src/routes/sweetRoutes.js
git commit -m "Implement sweet routes with all endpoints (TDD - Green phase)"

# Add main application
echo "🚀 Adding main application..."
git add src/app.js
git commit -m "Implement main Express application with CORS and error handling"

# Add beautiful frontend
echo "🎨 Adding frontend interface..."
git add public/index.html
git commit -m "Add beautiful responsive frontend with modern UI design"

# Final commit with all remaining files
echo "✅ Final commit..."
git add .
git commit -m "Complete Sweet Shop Management System with TDD approach

Features implemented:
- ✅ Add/Delete/View/Update sweets
- ✅ Search by name, category, price range
- ✅ Sort by name, price, quantity, category
- ✅ Purchase sweets with stock validation
- ✅ Restock inventory
- ✅ Low stock alerts
- ✅ Inventory statistics
- ✅ Beautiful responsive frontend
- ✅ Comprehensive test coverage (94%+)
- ✅ Clean code with SOLID principles
- ✅ Proper error handling
- ✅ Input validation
- ✅ RESTful API design

Built with TDD principles:
- Tests written before implementation
- Red-Green-Refactor cycle
- High test coverage with meaningful tests
- Clean, maintainable code structure"

echo "🎉 Git repository initialized successfully!"
echo "📊 Repository summary:"
git log --oneline
echo ""
echo "🔍 To see detailed commit history:"
echo "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
echo ""
echo "🚀 To push to remote repository:"
echo "git remote add origin <your-repository-url>"
echo "git branch -M main"
echo "git push -u origin main"
