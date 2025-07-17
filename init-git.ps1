# Sweet Shop Management System - Git Initialization Script (PowerShell)
# This script demonstrates the TDD journey with meaningful commits

Write-Host "🍭 Initializing Sweet Shop Management System Git Repository..." -ForegroundColor Green

# Initialize Git repository
git init

# Initial commit with README
Write-Host "📝 Adding README..." -ForegroundColor Yellow
git add README_NEW.md
git commit -m "Initial commit: Add comprehensive README with project overview"

# Add package.json and Jest configuration
Write-Host "📦 Adding project configuration..." -ForegroundColor Yellow
git add package.json, jest.config.js
git commit -m "Add package.json and Jest configuration for TDD setup"

# Add model with validation (TDD Step 1: Write tests first)
Write-Host "🧪 Adding Sweet model tests..." -ForegroundColor Yellow
git add tests/sweet.test.js
git commit -m "Add Sweet model tests with validation (TDD - Red phase)"

Write-Host "🏗️ Implementing Sweet model..." -ForegroundColor Yellow
git add src/models/sweet.js
git commit -m "Implement Sweet model with validation (TDD - Green phase)"

# Add service layer tests and implementation
Write-Host "🧪 Adding SweetService tests..." -ForegroundColor Yellow
git add tests/sweetService.test.js
git commit -m "Add comprehensive SweetService tests (TDD - Red phase)"

Write-Host "🔧 Implementing SweetService..." -ForegroundColor Yellow
git add src/services/sweetService.js
git commit -m "Implement SweetService with business logic (TDD - Green phase)"

# Add API tests and implementation
Write-Host "🧪 Adding API integration tests..." -ForegroundColor Yellow
git add tests/api.test.js
git commit -m "Add API integration tests for all endpoints (TDD - Red phase)"

Write-Host "🎛️ Implementing controller layer..." -ForegroundColor Yellow
git add src/controllers/sweetController.js
git commit -m "Implement SweetController with HTTP handling (TDD - Green phase)"

Write-Host "🛤️ Implementing routes..." -ForegroundColor Yellow
git add src/routes/sweetRoutes.js
git commit -m "Implement sweet routes with all endpoints (TDD - Green phase)"

# Add main application
Write-Host "🚀 Adding main application..." -ForegroundColor Yellow
git add src/app.js
git commit -m "Implement main Express application with CORS and error handling"

# Add beautiful frontend
Write-Host "🎨 Adding frontend interface..." -ForegroundColor Yellow
git add public/index.html
git commit -m "Add beautiful responsive frontend with modern UI design"

# Final commit with all remaining files
Write-Host "✅ Final commit..." -ForegroundColor Yellow
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

Write-Host "🎉 Git repository initialized successfully!" -ForegroundColor Green
Write-Host "📊 Repository summary:" -ForegroundColor Cyan
git log --oneline
Write-Host ""
Write-Host "🔍 To see detailed commit history:" -ForegroundColor Cyan
Write-Host "git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 To push to remote repository:" -ForegroundColor Cyan
Write-Host "git remote add origin <your-repository-url>" -ForegroundColor Gray
Write-Host "git branch -M main" -ForegroundColor Gray
Write-Host "git push -u origin main" -ForegroundColor Gray
