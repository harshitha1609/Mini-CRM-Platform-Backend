const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
  try {
    const { name, minSpend, minVisits } = req.body;
    // Find customers matching the criteria
    const audience = await Customer.find({
      spend: { $gte: minSpend },
      visits: { $gte: minVisits },
    });
    res.status(201).json({
      message: 'Campaign created',
      campaign: { name, minSpend, minVisits },
      audience: audience,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 
