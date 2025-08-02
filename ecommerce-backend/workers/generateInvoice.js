const { parentPort, workerData } = require('worker_threads');

// Simulate a heavy task
const generateInvoice = (orderData) => {
  let total = 0;
  for (let item of orderData.items) {
    total += item.price * item.quantity;
  }

  // Simulate delay
  const invoice = {
    orderId: orderData.orderId,
    user: orderData.user,
    total,
    createdAt: new Date(),
  };

  return invoice;
};

// Run task and return result to parent
const result = generateInvoice(workerData);
parentPort.postMessage(result);
