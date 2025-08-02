const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
   
     if (!req.file) {
      return res.status(400).json({ msg: 'Image file is required' });
    }

     const image = req.file.filename;
     
     console.log(req.file)
      const product = new Product( {...req.body,      // spread all form fields (name, description, price, etc.)
      image: image }  );
 //   const product = await Product.create(req.body); // we can use this method also instead using new product instance
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted successfully' });
};
