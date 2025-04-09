// import Razorpay from 'razorpay';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { amount, currency } = req.body;

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: amount * 100, // Amount in paise
//       currency,
//       receipt: `receipt_order_${Math.random() * 1000}`,
//     };

//     try {
//       const order = await razorpay.orders.create(options);
//       res.status(200).json(order);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// ------------------------

import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
