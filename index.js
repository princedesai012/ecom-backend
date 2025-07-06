const express = require('express');
require('dotenv').config();
const app = express();
const PORT = 5000;
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ppatel3735:PDesai1207@cluster0.5fg89ej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello ')
// })


// app.get('/user/:id', (req, res) => {
//     res.json({ userId: req.params.id });
//   });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);


const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});