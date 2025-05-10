const kafka = require('kafka-node');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected in consumer'))
  .catch(err => console.error('MongoDB connection error in consumer:', err));

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(
  client,
  [
    { topic: 'customers', partition: 0 },
    { topic: 'orders', partition: 0 },
  ],
  { autoCommit: true }
);

consumer.on('message', async (message) => {
  try {
    const data = JSON.parse(message.value);
    if (message.topic === 'customers') {
      const customer = new Customer(data);
      await customer.save();
      console.log('Customer saved:', customer);
    } else if (message.topic === 'orders') {
      const order = new Order(data);
      await order.save();
      console.log('Order saved:', order);
    }
  } catch (err) {
    console.error('Error processing Kafka message:', err);
  }
});

consumer.on('error', (err) => {
  console.error('Kafka Consumer error:', err);
});