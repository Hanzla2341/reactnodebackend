const nodemailer = require('nodemailer');

exports.sendCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit numeric code
    const code = Math.floor(100000 + Math.random() * 900000);

    // Send the email
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or your provider
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail/SMTP
        pass: process.env.EMAIL_PASS, // Your password/app password
      },
    });

    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your verification code',
      text: `Your verification code is: ${code}`,
    });

    // Optionally, store code in DB or cache mapped to email, so you can verify it on signup

    res.json({ message: 'Verification code sent', code }); // Never send code to client in production!
  } catch (err) {
    res.status(500).json({ message: 'Error sending verification code', error: err.message });
  }
};
