const cron = require('node-cron');
const User = require('../models/user');
const Cart = require('../models/cart');
const { sendMail } = require('../utils/mailer');


// Daily Reminder Emails at 9AM
cron.schedule('12 20 * * *', async () => {
  console.log('🕘 Sending daily reminder emails...');

  const users = await User.find({});
 
//   for (const user of users) {
    await sendMail(
    
      'luckysoul899@gmail.com',//user.email
      'Daily Reminder',
      `Hi ${"ashish"}, don't forget to check out our latest offers today!`
    );
//   }
});

// Clean up carts not updated for 2 days (runs every 6 hours)
cron.schedule('0 */6 * * *', async () => {
  console.log('🧹 Cleaning up stale carts...');

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  const result = await Cart.deleteMany({ updatedAt: { $lt: twoDaysAgo } });

  console.log(`🗑️ Deleted ${result.deletedCount} old carts`);
});
