// /pages/api/cod.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, street, city, state, zipcode, country, phone, productName, productDescription } = req.body;

    // Set up Nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "admin@example.com",
      subject: "New Cash on Delivery Order",
      text: `
        New order from ${firstName} ${lastName}:
        
        Product: ${productName}
        Description: ${productDescription}
        
        Address: ${street}, ${city}, ${state}, ${zipcode}, ${country}
        Phone: ${phone}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Order placed successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error placing order." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
