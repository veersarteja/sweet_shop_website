class Sweet {
  constructor(id, name, category, price, quantity) {
    this.validateInputs(id, name, category, price, quantity);
    
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  validateInputs(id, name, category, price, quantity) {
    if (!id || typeof id !== 'number') {
      throw new Error('ID must be a valid number');
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      throw new Error('Category must be a non-empty string');
    }
    if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
      throw new Error('Price must be a non-negative number');
    }
    if (quantity === undefined || quantity === null || typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Quantity must be a non-negative number');
    }
  }

  /**
   * Get formatted price string
   * @returns {string} - Price formatted as currency
   */
  getFormattedPrice() {
    return `₹${this.price.toFixed(2)}`;
  }

  /**
   * Check if sweet is in stock
   * @returns {boolean} - True if quantity > 0
   */
  isInStock() {
    return this.quantity > 0;
  }

  /**
   * Check if sweet is low stock
   * @param {number} threshold - Stock threshold (default: 5)
   * @returns {boolean} - True if quantity <= threshold
   */
  isLowStock(threshold = 5) {
    return this.quantity <= threshold;
  }

  /**
   * Get total value of this sweet in inventory
   * @returns {number} - Total value (price * quantity)
   */
  getTotalValue() {
    return this.price * this.quantity;
  }

  /**
   * Create a copy of the sweet
   * @returns {Sweet} - New Sweet instance with same properties
   */
  clone() {
    return new Sweet(this.id, this.name, this.category, this.price, this.quantity);
  }

  /**
   * Convert sweet to plain object
   * @returns {Object} - Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      quantity: this.quantity,
      formattedPrice: this.getFormattedPrice(),
      inStock: this.isInStock(),
      totalValue: this.getTotalValue()
    };
  }
}

module.exports = Sweet;
