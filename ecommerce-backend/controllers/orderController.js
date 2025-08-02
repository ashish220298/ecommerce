const Order = require('../models/order');

const { Worker } = require('worker_threads');
const path = require('path');

exports.placeOrder = async (req, res) => {
  const orderData = {
    orderId: 'ORD12345',
    user: req.user.id,
    items: req.body.items,
  };

  const worker = new Worker(path.resolve('./workers/generateInvoice.js'), {
    workerData: orderData,
  });

  worker.on('message', (invoice) => {
    console.log('Invoice Generated:', invoice);
    res.json({ msg: 'Order placed successfully', invoice });
  });

  worker.on('error', (err) => {
    console.error(err);
    res.status(500).json({ msg: 'Error generating invoice' });
  });

  worker.on('exit', (code) => {
    if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
  });
};


exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};
