const Cart = require('../models/cart');

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
  } else {
    const existing = cart.products.find(p => p.productId === productId);
    if (existing) existing.quantity += quantity;
    else cart.products.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};
