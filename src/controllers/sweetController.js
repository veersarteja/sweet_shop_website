const SweetService = require('../services/sweetService');
const Sweet = require('../models/sweet');

class SweetController {
  /**
   * Add a new sweet
   */
  static async addSweet(req, res) {
    try {
      const { id, name, category, price, quantity } = req.body;
      
      // Validate required fields
      if (!id || !name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({ 
          error: 'Missing required fields: id, name, category, price, quantity' 
        });
      }

      const sweet = new Sweet(id, name, category, price, quantity);
      const added = SweetService.addSweet(sweet);
      
      res.status(201).json({
        message: 'Sweet added successfully',
        data: added.toJSON()
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get all sweets
   */
  static async getAllSweets(req, res) {
    try {
      const sweets = SweetService.getAllSweets();
      res.json({
        message: 'Sweets retrieved successfully',
        data: sweets.map(sweet => sweet.toJSON()),
        count: sweets.length
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get sweet by ID
   */
  static async getSweetById(req, res) {
    try {
      const { id } = req.params;
      const sweet = SweetService.getSweetById(parseInt(id));
      
      res.json({
        message: 'Sweet retrieved successfully',
        data: sweet.toJSON()
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Update sweet
   */
  static async updateSweet(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const updated = SweetService.updateSweet(parseInt(id), updates);
      
      res.json({
        message: 'Sweet updated successfully',
        data: updated.toJSON()
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Delete sweet
   */
  static async deleteSweet(req, res) {
    try {
      const { id } = req.params;
      SweetService.deleteSweet(parseInt(id));
      
      res.json({
        message: 'Sweet deleted successfully'
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Search sweets
   */
  static async searchSweets(req, res) {
    try {
      const { name, category, minPrice, maxPrice } = req.query;
      
      const criteria = {};
      if (name) criteria.name = name;
      if (category) criteria.category = category;
      if (minPrice) criteria.minPrice = parseFloat(minPrice);
      if (maxPrice) criteria.maxPrice = parseFloat(maxPrice);
      
      const results = SweetService.search(criteria);
      
      res.json({
        message: 'Search completed successfully',
        data: results.map(sweet => sweet.toJSON()),
        count: results.length,
        criteria
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Sort sweets
   */
  static async sortSweets(req, res) {
    try {
      const { by = 'name' } = req.query;
      
      const validSortFields = ['name', 'category', 'price', 'quantity'];
      if (!validSortFields.includes(by)) {
        return res.status(400).json({ 
          error: `Invalid sort field. Valid fields: ${validSortFields.join(', ')}` 
        });
      }
      
      const sorted = SweetService.sort(by);
      
      res.json({
        message: 'Sweets sorted successfully',
        data: sorted.map(sweet => sweet.toJSON()),
        sortedBy: by
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Purchase sweets
   */
  static async purchaseSweets(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ 
          error: 'Quantity must be a positive number' 
        });
      }
      
      const result = SweetService.purchase(parseInt(id), quantity);
      const sweet = SweetService.getSweetById(parseInt(id));
      
      res.json({
        message: 'Purchase completed successfully',
        data: {
          sweet: sweet.toJSON(),
          purchaseDetails: {
            quantityPurchased: quantity,
            totalCost: result.totalCost,
            remainingQuantity: result.remainingQuantity
          }
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Restock sweets
   */
  static async restockSweets(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ 
          error: 'Quantity must be a positive number' 
        });
      }
      
      SweetService.restock(parseInt(id), quantity);
      const sweet = SweetService.getSweetById(parseInt(id));
      
      res.json({
        message: 'Restock completed successfully',
        data: {
          sweet: sweet.toJSON(),
          restockDetails: {
            quantityAdded: quantity,
            newQuantity: sweet.quantity
          }
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Get low stock sweets
   */
  static async getLowStockSweets(req, res) {
    try {
      const { threshold = 5 } = req.query;
      const lowStockSweets = SweetService.getLowStockSweets(parseInt(threshold));
      
      res.json({
        message: 'Low stock sweets retrieved successfully',
        data: lowStockSweets.map(sweet => sweet.toJSON()),
        count: lowStockSweets.length,
        threshold: parseInt(threshold)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get sweets by category
   */
  static async getSweetsByCategory(req, res) {
    try {
      const { category } = req.params;
      const sweets = SweetService.getSweetsByCategory(category);
      
      res.json({
        message: 'Sweets by category retrieved successfully',
        data: sweets.map(sweet => sweet.toJSON()),
        count: sweets.length,
        category
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get inventory statistics
   */
  static async getInventoryStats(req, res) {
    try {
      const allSweets = SweetService.getAllSweets();
      const totalValue = SweetService.getTotalInventoryValue();
      const lowStockSweets = SweetService.getLowStockSweets();
      
      const categories = [...new Set(allSweets.map(sweet => sweet.category))];
      const categoryStats = categories.map(category => {
        const categorySweets = SweetService.getSweetsByCategory(category);
        return {
          category,
          count: categorySweets.length,
          totalValue: categorySweets.reduce((sum, sweet) => sum + sweet.getTotalValue(), 0)
        };
      });
      
      res.json({
        message: 'Inventory statistics retrieved successfully',
        data: {
          totalSweets: allSweets.length,
          totalInventoryValue: totalValue,
          lowStockCount: lowStockSweets.length,
          categories: categoryStats,
          averagePrice: allSweets.length > 0 ? 
            allSweets.reduce((sum, sweet) => sum + sweet.price, 0) / allSweets.length : 0
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SweetController;
