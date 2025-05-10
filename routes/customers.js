const express = require('express');
const router = express.Router();
const producer = require('../kafkaProducer');

router.post('/', async (req, res) => {
  try {
    const { name, email, spend, visits, last_active } = req.body;
    const customerData = { name, email, spend, visits, last_active };

    const payloads = [
      {
        topic: 'customers',
        messages: JSON.stringify(customerData),
      },
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Error publishing to Kafka:', err);
        return res.status(500).json({ error: 'Failed to publish to Kafka' });
      }
      res.status(201).json({ message: 'Customer data published to Kafka', data });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;