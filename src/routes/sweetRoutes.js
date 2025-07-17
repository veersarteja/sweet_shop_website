const express = require('express');
const router = express.Router();
const SweetController = require('../controllers/sweetController');

// Sweet CRUD operations
router.post('/', SweetController.addSweet);
router.get('/', SweetController.getAllSweets);
router.get('/stats', SweetController.getInventoryStats);
router.get('/low-stock', SweetController.getLowStockSweets);
router.get('/search', SweetController.searchSweets);
router.get('/sort', SweetController.sortSweets);
router.get('/category/:category', SweetController.getSweetsByCategory);
router.get('/:id', SweetController.getSweetById);
router.put('/:id', SweetController.updateSweet);
router.delete('/:id', SweetController.deleteSweet);

// Inventory operations
router.post('/:id/purchase', SweetController.purchaseSweets);
router.post('/:id/restock', SweetController.restockSweets);

module.exports = router;
