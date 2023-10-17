// let express = require("express");
// let bodyParser = require("body-parser");
// let nodemailer = require("nodemailer");

// const app = express();

// require('dotenv').config();

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: false }));

// // Configure Nodemailer with your email service provider's settings
// const transporter = nodemailer.createTransport({
//   service: "Gmail", // Change to your email service provider
//   auth: {
//      user: process.env.EMAIL,
//      pass: process.env.PASSWORD
//   },
// });

// // Handle form submission
// app.post("/submit-form", (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const message = req.body.message;

//   const mailOptions = {
//     from: email,
//     to: auth.user, // Your email
//     subject: `New Form Submission from ${name}`,
//     text: message,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send("Failed to send email.");
//     } else {
//       console.log(`Email sent: ${info.response}`);
//       res.status(200).send("Email sent successfully.");
//     }
//   });
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });