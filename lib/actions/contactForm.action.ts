// app/actions/submitForm.ts
"use server"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

export async function contactForm(data: {
firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  const { firstName,lastName,email,phoneNumber, message } = data;

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your email address
    subject: 'New Contact Form Request',
    text: `FirstName: ${firstName} \nLastName: ${lastName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Send WhatsApp message (Replace with actual WhatsApp API call)
    await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      body: JSON.stringify({
        phone: process.env.WHATSAPP_PHONE_NUMBER, // Your WhatsApp number
        text: `
        FirstName: ${data.firstName}
        LastName: ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phoneNumber}
        Message: ${data.message}
      `,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    return { success: true, message: 'Form submitted successfully' };
  } catch (error) {
    console.error('Error sending email or WhatsApp message:', error);
    return { success: false, message: 'Error submitting form' };
  }
}
