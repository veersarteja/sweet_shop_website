const Sweet = require('../models/sweet');

class SweetService {
  constructor() {
    this.sweets = [];
  }

  /**
   * Add a new sweet to the shop
   * @param {Sweet} sweet - The sweet to add
   * @returns {Sweet} - The added sweet
   * @throws {Error} - If sweet with same ID already exists
   */
  addSweet(sweet) {
    if (this.sweets.find(s => s.id === sweet.id)) {
      throw new Error('Sweet with this ID already exists');
    }
    this.sweets.push(sweet);
    return sweet;
  }

  /**
   * Delete a sweet from the shop
   * @param {number} id - The ID of the sweet to delete
   * @throws {Error} - If sweet is not found
   */
  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sweet not found');
    this.sweets.splice(index, 1);
  }

  /**
   * Get all sweets in the shop
   * @returns {Sweet[]} - Array of all sweets
   */
  getAllSweets() {
    return this.sweets;
  }

  /**
   * Get a sweet by its ID
   * @param {number} id - The ID of the sweet
   * @returns {Sweet} - The sweet with the given ID
   * @throws {Error} - If sweet is not found
   */
  getSweetById(id) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet not found');
    return sweet;
  }

  /**
   * Update sweet details
   * @param {number} id - The ID of the sweet to update
   * @param {Object} updates - Object containing fields to update
   * @returns {Sweet} - The updated sweet
   * @throws {Error} - If sweet is not found
   */
  updateSweet(id, updates) {
    const sweet = this.getSweetById(id);
    Object.assign(sweet, updates);
    return sweet;
  }

  /**
   * Search for sweets based on criteria
   * @param {Object} criteria - Search criteria
   * @param {string} criteria.name - Name to search for (partial match)
   * @param {string} criteria.category - Category to filter by
   * @param {number} criteria.minPrice - Minimum price
   * @param {number} criteria.maxPrice - Maximum price
   * @returns {Sweet[]} - Array of matching sweets
   */
  search(criteria) {
    return this.sweets.filter(sweet => {
      return (!criteria.name || sweet.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
             (!criteria.category || sweet.category === criteria.category) &&
             (!criteria.minPrice || sweet.price >= criteria.minPrice) &&
             (!criteria.maxPrice || sweet.price <= criteria.maxPrice);
    });
  }

  /**
   * Sort sweets by specified field
   * @param {string} by - Field to sort by ('name', 'price', 'quantity', 'category')
   * @returns {Sweet[]} - Sorted array of sweets
   */
  sort(by = 'name') {
    return [...this.sweets].sort((a, b) => {
      if (typeof a[by] === 'string') {
        return a[by].localeCompare(b[by]);
      }
      return a[by] - b[by];
    });
  }

  /**
   * Purchase sweets (decreases stock)
   * @param {number} id - The ID of the sweet to purchase
   * @param {number} qty - Quantity to purchase
   * @returns {Object} - Purchase result with remaining quantity and total cost
   * @throws {Error} - If sweet not found, insufficient stock, or invalid quantity
   */
  purchase(id, qty) {
    if (qty <= 0) throw new Error('Quantity must be greater than 0');
    
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < qty) throw new Error('Insufficient stock');
    
    sweet.quantity -= qty;
    const totalCost = sweet.price * qty;
    
    return {
      remainingQuantity: sweet.quantity,
      totalCost: totalCost
    };
  }

  /**
   * Restock sweets (increases stock)
   * @param {number} id - The ID of the sweet to restock
   * @param {number} qty - Quantity to add to stock
   * @throws {Error} - If sweet not found or invalid quantity
   */
  restock(id, qty) {
    if (qty <= 0) throw new Error('Quantity must be greater than 0');
    
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error('Sweet not found');
    sweet.quantity += qty;
  }

  /**
   * Get low stock sweets (quantity below threshold)
   * @param {number} threshold - Stock threshold (default: 5)
   * @returns {Sweet[]} - Array of low stock sweets
   */
  getLowStockSweets(threshold = 5) {
    return this.sweets.filter(sweet => sweet.quantity <= threshold);
  }

  /**
   * Get sweets by category
   * @param {string} category - Category to filter by
   * @returns {Sweet[]} - Array of sweets in the category
   */
  getSweetsByCategory(category) {
    return this.sweets.filter(sweet => sweet.category === category);
  }

  /**
   * Get total inventory value
   * @returns {number} - Total value of all sweets in inventory
   */
  getTotalInventoryValue() {
    return this.sweets.reduce((total, sweet) => total + (sweet.price * sweet.quantity), 0);
  }
}

module.exports = new SweetService();
