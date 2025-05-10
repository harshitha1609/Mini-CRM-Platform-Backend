const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const campaignsRouter = require('./routes/campaigns');

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/campaigns', campaignsRouter); // Ensure this line is present

app.get('/', (req, res) => {
  res.send('Xeno CRM Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));