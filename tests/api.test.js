const request = require('supertest');
const express = require('express');
const sweetRoutes = require('../src/routes/sweetRoutes');
const SweetService = require('../src/services/sweetService');

const app = express();
app.use(express.json());
app.use('/sweets', sweetRoutes);

beforeEach(() => {
  SweetService.sweets = [];
});

describe('Sweet API Endpoints', () => {
  describe('POST /sweets', () => {
    test('should add a new sweet', async () => {
      const sweetData = {
        id: 1001,
        name: 'Kaju Katli',
        category: 'Nut-Based',
        price: 50,
        quantity: 20
      };

      const response = await request(app)
        .post('/sweets')
        .send(sweetData)
        .expect(201);

      expect(response.body.message).toBe('Sweet added successfully');
      expect(response.body.data.id).toBe(1001);
      expect(response.body.data.name).toBe('Kaju Katli');
    });

    test('should return error for missing fields', async () => {
      const sweetData = {
        name: 'Kaju Katli',
        category: 'Nut-Based'
        // missing price and quantity
      };

      const response = await request(app)
        .post('/sweets')
        .send(sweetData)
        .expect(400);

      expect(response.body.error).toContain('Missing required fields');
    });

    test('should return error for duplicate ID', async () => {
      const sweetData = {
        id: 1001,
        name: 'Kaju Katli',
        category: 'Nut-Based',
        price: 50,
        quantity: 20
      };

      await request(app).post('/sweets').send(sweetData);
      
      const response = await request(app)
        .post('/sweets')
        .send(sweetData)
        .expect(400);

      expect(response.body.error).toBe('Sweet with this ID already exists');
    });
  });

  describe('GET /sweets', () => {
    test('should get all sweets', async () => {
      // Add test data
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50
      });

      const response = await request(app)
        .get('/sweets')
        .expect(200);

      expect(response.body.message).toBe('Sweets retrieved successfully');
      expect(response.body.data).toHaveLength(2);
      expect(response.body.count).toBe(2);
    });

    test('should return empty array when no sweets exist', async () => {
      const response = await request(app)
        .get('/sweets')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
      expect(response.body.count).toBe(0);
    });
  });

  describe('GET /sweets/:id', () => {
    test('should get sweet by ID', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .get('/sweets/1001')
        .expect(200);

      expect(response.body.message).toBe('Sweet retrieved successfully');
      expect(response.body.data.id).toBe(1001);
      expect(response.body.data.name).toBe('Kaju Katli');
    });

    test('should return 404 for non-existent sweet', async () => {
      const response = await request(app)
        .get('/sweets/9999')
        .expect(404);

      expect(response.body.error).toBe('Sweet not found');
    });
  });

  describe('PUT /sweets/:id', () => {
    test('should update sweet', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .put('/sweets/1001')
        .send({ name: 'Premium Kaju Katli', price: 60 })
        .expect(200);

      expect(response.body.message).toBe('Sweet updated successfully');
      expect(response.body.data.name).toBe('Premium Kaju Katli');
      expect(response.body.data.price).toBe(60);
    });
  });

  describe('DELETE /sweets/:id', () => {
    test('should delete sweet', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .delete('/sweets/1001')
        .expect(200);

      expect(response.body.message).toBe('Sweet deleted successfully');
    });
  });

  describe('GET /sweets/search', () => {
    beforeEach(async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, quantity: 15
      });
      await request(app).post('/sweets').send({
        id: 1003, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50
      });
    });

    test('should search by name', async () => {
      const response = await request(app)
        .get('/sweets/search?name=Kaju')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Kaju Katli');
    });

    test('should search by category', async () => {
      const response = await request(app)
        .get('/sweets/search?category=Milk-Based')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Milk-Based');
    });

    test('should search by price range', async () => {
      const response = await request(app)
        .get('/sweets/search?minPrice=20&maxPrice=40')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Gajar Halwa');
    });
  });

  describe('GET /sweets/sort', () => {
    beforeEach(async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 30, quantity: 15
      });
    });

    test('should sort by name', async () => {
      const response = await request(app)
        .get('/sweets/sort?by=name')
        .expect(200);

      expect(response.body.data[0].name).toBe('Gajar Halwa');
      expect(response.body.data[1].name).toBe('Kaju Katli');
    });

    test('should sort by price', async () => {
      const response = await request(app)
        .get('/sweets/sort?by=price')
        .expect(200);

      expect(response.body.data[0].price).toBe(30);
      expect(response.body.data[1].price).toBe(50);
    });

    test('should return error for invalid sort field', async () => {
      const response = await request(app)
        .get('/sweets/sort?by=invalid')
        .expect(400);

      expect(response.body.error).toContain('Invalid sort field');
    });
  });

  describe('POST /sweets/:id/purchase', () => {
    test('should purchase sweets', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .post('/sweets/1001/purchase')
        .send({ quantity: 5 })
        .expect(200);

      expect(response.body.message).toBe('Purchase completed successfully');
      expect(response.body.data.purchaseDetails.quantityPurchased).toBe(5);
      expect(response.body.data.purchaseDetails.totalCost).toBe(250);
      expect(response.body.data.purchaseDetails.remainingQuantity).toBe(15);
    });

    test('should return error for insufficient stock', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 5
      });

      const response = await request(app)
        .post('/sweets/1001/purchase')
        .send({ quantity: 10 })
        .expect(400);

      expect(response.body.error).toBe('Insufficient stock');
    });

    test('should return error for invalid quantity', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .post('/sweets/1001/purchase')
        .send({ quantity: 0 })
        .expect(400);

      expect(response.body.error).toBe('Quantity must be a positive number');
    });
  });

  describe('POST /sweets/:id/restock', () => {
    test('should restock sweets', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });

      const response = await request(app)
        .post('/sweets/1001/restock')
        .send({ quantity: 10 })
        .expect(200);

      expect(response.body.message).toBe('Restock completed successfully');
      expect(response.body.data.restockDetails.quantityAdded).toBe(10);
      expect(response.body.data.restockDetails.newQuantity).toBe(30);
    });
  });

  describe('GET /sweets/low-stock', () => {
    test('should get low stock sweets', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 3
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50
      });

      const response = await request(app)
        .get('/sweets/low-stock')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Kaju Katli');
    });
  });

  describe('GET /sweets/category/:category', () => {
    test('should get sweets by category', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50
      });

      const response = await request(app)
        .get('/sweets/category/Nut-Based')
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Nut-Based');
    });
  });

  describe('GET /sweets/stats', () => {
    test('should get inventory statistics', async () => {
      await request(app).post('/sweets').send({
        id: 1001, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20
      });
      await request(app).post('/sweets').send({
        id: 1002, name: 'Gulab Jamun', category: 'Milk-Based', price: 10, quantity: 50
      });

      const response = await request(app)
        .get('/sweets/stats')
        .expect(200);

      expect(response.body.message).toBe('Inventory statistics retrieved successfully');
      expect(response.body.data.totalSweets).toBe(2);
      expect(response.body.data.totalInventoryValue).toBe(1500); // (50*20) + (10*50)
      expect(response.body.data.categories).toHaveLength(2);
    });
  });
});
