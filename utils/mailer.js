// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // USE 'gmail' for testing, use SMTP for production!
  auth: {
    user: process.env.EMAIL_USER, // e.g., yourapp@gmail.com
    pass: process.env.EMAIL_PASS, // use App Password or env variable
  },
});

/**
 * Send an order confirmation email
 */
exports.sendOrderEmail = async ({ to, name, quantity, price }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Order Confirmation",
    html: `
      <h2>Order Confirmed!</h2>
      <ul>
        <li><strong>Product Name:</strong> ${name}</li>
        <li><strong>Quantity:</strong> ${quantity}</li>
        <li><strong>Price:</strong> ₹${price}</li>
        <li><strong>Email:</strong> ${to}</li>
      </ul>
      <p>Thank you for your order!</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};
