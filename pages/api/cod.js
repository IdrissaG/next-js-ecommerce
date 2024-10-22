// /pages/api/cod.js
/* eslint-disable */
import nodemailer from "nodemailer";


export default async function handler(req, res) {
  console.log("API handler invoked with method:", req.method);

  if (req.method === "POST") {
    console.log("Received POST request");
    
    const { firstName, lastName, email, street, city, state, zipcode, country, phone, productName, productPrice, productQuantity } = req.body;

    if (!firstName || !lastName || !email || !street || !city || !country || !phone || !productName || !productPrice ) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
host: 'smtp.gmail.com',
port: 587,
secure: false, // true for 465, false for other ports
auth: {
    user: 'juniorgueye1234@gmail.com', // your email
    pass: 'aaiv vxeg otnp nvlr', // your password or app password
},

    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "juniorgueye1234@gmail.com",
      subject: "New Cash on Delivery Order",
      text: `
        New order from ${firstName} ${lastName}:
        
        Product: ${productName}
        Price: ${productPrice}
        Quantity:${productQuantity}
        
        Address: ${street}, ${city}, ${state}, ${zipcode}, ${country}
        Phone: ${phone}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      // console.log("Email sent successfully");
   
      res.status(200).json({ message: "Order placed successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error placing order." });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
