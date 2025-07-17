const Sweet = require('../src/models/sweet');

describe('Sweet Model', () => {
  test('should create a sweet with valid data', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    
    expect(sweet.id).toBe(1001);
    expect(sweet.name).toBe('Kaju Katli');
    expect(sweet.category).toBe('Nut-Based');
    expect(sweet.price).toBe(50);
    expect(sweet.quantity).toBe(20);
  });

  test('should throw error for invalid ID', () => {
    expect(() => new Sweet(null, 'Test', 'Category', 10, 5)).toThrow('ID must be a valid number');
    expect(() => new Sweet('string', 'Test', 'Category', 10, 5)).toThrow('ID must be a valid number');
  });

  test('should throw error for invalid name', () => {
    expect(() => new Sweet(1001, '', 'Category', 10, 5)).toThrow('Name must be a non-empty string');
    expect(() => new Sweet(1001, null, 'Category', 10, 5)).toThrow('Name must be a non-empty string');
    expect(() => new Sweet(1001, 123, 'Category', 10, 5)).toThrow('Name must be a non-empty string');
  });

  test('should throw error for invalid category', () => {
    expect(() => new Sweet(1001, 'Test', '', 10, 5)).toThrow('Category must be a non-empty string');
    expect(() => new Sweet(1001, 'Test', null, 10, 5)).toThrow('Category must be a non-empty string');
  });

  test('should throw error for invalid price', () => {
    expect(() => new Sweet(1001, 'Test', 'Category', -1, 5)).toThrow('Price must be a non-negative number');
    expect(() => new Sweet(1001, 'Test', 'Category', 'string', 5)).toThrow('Price must be a non-negative number');
  });

  test('should throw error for invalid quantity', () => {
    expect(() => new Sweet(1001, 'Test', 'Category', 10, -1)).toThrow('Quantity must be a non-negative number');
    expect(() => new Sweet(1001, 'Test', 'Category', 10, 'string')).toThrow('Quantity must be a non-negative number');
  });

  test('should get formatted price', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(sweet.getFormattedPrice()).toBe('₹50.00');
  });

  test('should check if sweet is in stock', () => {
    const sweetInStock = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const sweetOutOfStock = new Sweet(1002, 'Gulab Jamun', 'Milk-Based', 10, 0);
    
    expect(sweetInStock.isInStock()).toBe(true);
    expect(sweetOutOfStock.isInStock()).toBe(false);
  });

  test('should check if sweet is low stock', () => {
    const sweetLowStock = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 3);
    const sweetGoodStock = new Sweet(1002, 'Gulab Jamun', 'Milk-Based', 10, 20);
    
    expect(sweetLowStock.isLowStock()).toBe(true);
    expect(sweetGoodStock.isLowStock()).toBe(false);
    expect(sweetLowStock.isLowStock(2)).toBe(false);
  });

  test('should get total value', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(sweet.getTotalValue()).toBe(1000);
  });

  test('should clone sweet', () => {
    const original = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const cloned = original.clone();
    
    expect(cloned).not.toBe(original);
    expect(cloned.id).toBe(original.id);
    expect(cloned.name).toBe(original.name);
    expect(cloned.category).toBe(original.category);
    expect(cloned.price).toBe(original.price);
    expect(cloned.quantity).toBe(original.quantity);
  });

  test('should convert to JSON', () => {
    const sweet = new Sweet(1001, 'Kaju Katli', 'Nut-Based', 50, 20);
    const json = sweet.toJSON();
    
    expect(json).toEqual({
      id: 1001,
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20,
      formattedPrice: '₹50.00',
      inStock: true,
      totalValue: 1000
    });
  });
});
