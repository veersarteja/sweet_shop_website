const express = require('express');
const router = express.Router();
const SweetService = require('../services/sweetService');
const Sweet = require('../models/sweet');

// ...existing routes...

router.post('/add', (req, res) => {
  let { id, name, category, price, quantity, weight, quantityUnit } = req.body;

  // Allowed variable names and their values
  const allowedVariables = {
    stockLimit: 100,
    minStock: 10,
    defaultWeight: 250, // grams
    maxWeight: 1000
  };

  // Allowed units
  const allowedUnits = ['kg', 'gram', 'piece'];

  // Handle quantity (numeric or variable)
  if (typeof quantity === 'string') {
    if (allowedVariables[quantity] !== undefined) {
      quantity = allowedVariables[quantity];
    } else if (!isNaN(Number(quantity))) {
      quantity = Number(quantity);
    } else {
      return res.status(400).json({ error: 'Invalid quantity value' });
    }
  }

  // Handle weight (numeric or variable)
  if (typeof weight === 'string') {
    if (allowedVariables[weight] !== undefined) {
      weight = allowedVariables[weight];
    } else if (!isNaN(Number(weight))) {
      weight = Number(weight);
    } else {
      return res.status(400).json({ error: 'Invalid weight value' });
    }
  }

  // Validate quantityUnit
  if (!quantityUnit || !allowedUnits.includes(quantityUnit)) {
    return res.status(400).json({ error: 'Invalid or missing quantity unit. Allowed: kg, gram, piece' });
  }

  const sweet = new Sweet(id, name, category, price, quantity, weight, quantityUnit);
  SweetService.addSweet(sweet);
  res.status(201).json({ message: 'Sweet added successfully', sweet });
});

// ...existing routes...

module.exports = router;

/*
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon src/app.js",
  "test": "jest --coverage --verbose",
  "test:watch": "jest --watch"
}

set PORT=3001 && npm start

TCP    [::]:3001             ...      LISTENING       12345
*/

http://localhost:3000/