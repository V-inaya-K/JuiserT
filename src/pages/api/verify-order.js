import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest('hex');

    if (digest === razorpay_signature) {
      // Payment is verified
      res.status(200).json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'failure' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
