const Product = require('../models/Product');
// let idCounter = 0;

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
  };
  

  exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  };
  

  exports.createProduct = async (req, res) => {
    try {
      const { name, price, image } = req.body;
  
      if (!name || !price || !image) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const product = await Product.create({ name, price, image });
      res.status(201).json(product);
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(400).json({ message: err.message });
    }
  };
  
  
  

  exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  };
  

  exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", product });
  };
  