const SweetService = require('../src/services/sweetService');
const Sweet = require('../src/models/sweet');

beforeEach(() => {
  SweetService.sweets = [];
});

describe('Sweet Management', () => {
  test('should add a sweet', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(SweetService.addSweet(sweet)).toBe(sweet);
    expect(SweetService.getAllSweets()).toHaveLength(1);
  });

  test('should throw error for duplicate ID', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    expect(() => SweetService.addSweet(sweet)).toThrow('Sweet with this ID already exists');
  });

  test('should delete a sweet', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    SweetService.deleteSweet(1001);
    expect(SweetService.getAllSweets()).toHaveLength(0);
  });

  test('should throw error when deleting non-existent sweet', () => {
    expect(() => SweetService.deleteSweet(9999)).toThrow('Sweet not found');
  });

  test('should view all sweets', () => {
    const sweet1 = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const sweet2 = new Sweet(1002, 'Gajar Halwa', 'Vegetable-Based', 30, 15);
    SweetService.addSweet(sweet1);
    SweetService.addSweet(sweet2);
    
    const sweets = SweetService.getAllSweets();
    expect(sweets).toHaveLength(2);
    expect(sweets).toContain(sweet1);
    expect(sweets).toContain(sweet2);
  });

  test('should get sweet by ID', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    const found = SweetService.getSweetById(1001);
    expect(found).toBe(sweet);
  });

  test('should throw error when getting non-existent sweet by ID', () => {
    expect(() => SweetService.getSweetById(9999)).toThrow('Sweet not found');
  });

  test('should update sweet details', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    const updates = { name: 'Premium Kaju Katli', price: 60 };
    const updated = SweetService.updateSweet(1001, updates);
    
    expect(updated.name).toBe('Premium Kaju Katli');
    expect(updated.price).toBe(60);
    expect(updated.category).toBe('Nut-Based'); // unchanged
  });
});

describe('Search & Sort Features', () => {
  beforeEach(() => {
    const sweet1 = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const sweet2 = new Sweet(1002, 'Gajar Halwa', 'Vegetable-Based', 30, 15);
    const sweet3 = new Sweet(1003, 'Gulab Jamun', 'Milk-Based', 10, 50);
    const sweet4 = new Sweet(1004, 'Chocolate Barfi', 'Chocolate', 45, 25);
    
    SweetService.addSweet(sweet1);
    SweetService.addSweet(sweet2);
    SweetService.addSweet(sweet3);
    SweetService.addSweet(sweet4);
  });

  test('should search by name', () => {
    const results = SweetService.search({ name: 'Kaju' });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Kaju Katli');
  });

  test('should search by category', () => {
    const results = SweetService.search({ category: 'Milk-Based' });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Gulab Jamun');
  });

  test('should search by price range', () => {
    const results = SweetService.search({ minPrice: 30, maxPrice: 50 });
    expect(results).toHaveLength(3);
    expect(results.map(s => s.name)).toContain('Kaju Katli');
    expect(results.map(s => s.name)).toContain('Gajar Halwa');
    expect(results.map(s => s.name)).toContain('Chocolate Barfi');
  });

  test('should search with multiple criteria', () => {
    const results = SweetService.search({ 
      name: 'Halwa', 
      category: 'Vegetable-Based',
      minPrice: 25
    });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Gajar Halwa');
  });

  test('should sort by name', () => {
    const sorted = SweetService.sort('name');
    expect(sorted[0].name).toBe('Chocolate Barfi');
    expect(sorted[1].name).toBe('Gajar Halwa');
    expect(sorted[2].name).toBe('Gulab Jamun');
    expect(sorted[3].name).toBe('Kaju Katli');
  });

  test('should sort by price', () => {
    const sorted = SweetService.sort('price');
    expect(sorted[0].price).toBe(10);
    expect(sorted[1].price).toBe(30);
    expect(sorted[2].price).toBe(45);
    expect(sorted[3].price).toBe(50);
  });

  test('should sort by quantity', () => {
    const sorted = SweetService.sort('quantity');
    expect(sorted[0].quantity).toBe(15);
    expect(sorted[1].quantity).toBe(20);
    expect(sorted[2].quantity).toBe(25);
    expect(sorted[3].quantity).toBe(50);
  });
});

describe('Inventory Management', () => {
  test('should purchase sweets', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    const result = SweetService.purchase(1001, 5);
    expect(sweet.quantity).toBe(15);
    expect(result.remainingQuantity).toBe(15);
    expect(result.totalCost).toBe(250);
  });

  test('should throw if not enough stock', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 5);
    SweetService.addSweet(sweet);
    expect(() => SweetService.purchase(1001, 10)).toThrow('Insufficient stock');
  });

  test('should throw when purchasing non-existent sweet', () => {
    expect(() => SweetService.purchase(9999, 1)).toThrow('Sweet not found');
  });

  test('should restock sweets', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    SweetService.restock(1001, 10);
    expect(sweet.quantity).toBe(30);
  });

  test('should throw when restocking non-existent sweet', () => {
    expect(() => SweetService.restock(9999, 10)).toThrow('Sweet not found');
  });

  test('should handle zero quantity purchase', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    expect(() => SweetService.purchase(1001, 0)).toThrow('Quantity must be greater than 0');
  });

  test('should handle negative quantity purchase', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    SweetService.addSweet(sweet);
    
    expect(() => SweetService.purchase(1001, -1)).toThrow('Quantity must be greater than 0');
  });
});
