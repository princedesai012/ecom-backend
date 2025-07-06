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
      const { name, price } = req.body;
      const image = req.file.path; // Cloudinary URL
      const product = await Product.create({ name, price, image });
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
  