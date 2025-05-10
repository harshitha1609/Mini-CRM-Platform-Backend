const express = require('express');
const router = express.Router();
const producer = require('../kafkaProducer');

router.post('/', async (req, res) => {
  try {
    const { customer_id, amount, date } = req.body;
    const orderData = { customer_id, amount, date };

    const payloads = [
      {
        topic: 'orders',
        messages: JSON.stringify(orderData),
      },
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Error publishing to Kafka:', err);
        return res.status(500).json({ error: 'Failed to publish to Kafka' });
      }
      res.status(201).json({ message: 'Order data published to Kafka', data });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;