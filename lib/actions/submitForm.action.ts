// app/actions/submitForm.ts
"use server"
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',  
  port: 587,                   
  secure: false,              
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password or app-specific password
  },
});


export async function submitForm(formData: {
  name: string;
  email: string;
  phone: string;
  country: string;
  preferredLanguage: string;
  propertyAddress: string;
  propertyType: string;
  propertyPurpose: string;
  bedroom: string;
  message: string;
}) {
  const { name, email, phone, preferredLanguage, propertyAddress, propertyType, propertyPurpose, bedroom, message } = formData;

  const htmlBody = `
  <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 28px; font-weight: bold;">
                Welcome to Bay Homes
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 40px; font-size: 16px; line-height: 1.8; color: #333333;">
                <p>Dear Bay Homes Team,</p>
                <p>I am <strong>${name}</strong>, and I am thrilled to explore the opportunity of listing my property with Bay Homes.</p>
                <p><strong>Contact Information:</strong></p>
                <p style="margin-bottom: 20px;">
                  Phone: <strong>${phone}</strong><br>
                  Email: <strong>${email}</strong><br>
                  Preferred Language: <strong>${preferredLanguage}</strong>
                </p>
                <p style="margin-bottom: 20px;"><em>I look forward to your guidance in making this a successful endeavor!</em></p>
              </td>
            </tr>

            <!-- Call to Action Button -->
            <tr>
              <td style="padding: 20px 40px; text-align: center;">
                <table cellspacing="0" cellpadding="0" style="margin: auto;">
                  <tr>
                    <td align="center" style="background-color: #345C72; padding: 12px 25px; border-radius: 5px;">
                      <p style="color: #ffffff; font-size: 16px; text-decoration: none; margin: 0;">${message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Property Details -->
            <tr>
              <td style="padding: 40px; font-size: 16px; line-height: 1.8; color: #333333;">
                <p><strong>Property Details:</strong></p>
                <p style="margin-bottom: 20px;">
                  Address: <strong>${propertyAddress}</strong><br>
                  Purpose: <strong>${propertyPurpose}</strong><br>
                  Type: <strong>${propertyType}</strong><br>
                  Bedrooms: <strong>${bedroom}</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 14px;">
                <p style="margin: 0;">&copy; 2024 Bay Homes. All rights reserved.</p>
                <p style="margin: 5px 0 0 0;">1234 Bay Street, Bay City, BC 12345</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;

  // Send email
  const mailOptions = {
    from: email,
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // Your email address
    subject: 'New Property Listing Form Submission',
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Send WhatsApp message (Replace with actual WhatsApp API call)
    await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      body: JSON.stringify({
        phone: process.env.WHATSAPP_PHONE_NUMBER, // Your WhatsApp number
        text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Country: ${formData.country}
        Preferred Language: ${formData.preferredLanguage}
        Property Address: ${formData.propertyAddress}
        Property Type: ${formData.propertyType}
        Property Purpose: ${formData.propertyPurpose}
        Bedroom: ${formData.bedroom}
        Message: ${formData.message}
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

export async function submitBookingForm(formData: {
  name: string;
  email: string;
  phone: string;
  country: string;
  preferredLanguage: string;
  bookingDate: string;
  bookingTime: string;
  message: string;
  propertyName: string;  // Include property name for booking
}) {
  const { name, email, phone, preferredLanguage, bookingDate, bookingTime, message, propertyName } = formData;

  const htmlBody = `
  <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 28px; font-weight: bold;">
                Property Viewing Request for ${propertyName}
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 40px; font-size: 16px; line-height: 1.8; color: #333333;">
                <p>Dear Bay Homes Team,</p>
                <p>I am <strong>${name}</strong> and I would like to schedule a viewing for <strong>${propertyName}</strong>.</p>
                <p><strong>Contact Information:</strong></p>
                <p style="margin-bottom: 20px;">
                  Phone: <strong>${phone}</strong><br>
                  Email: <strong>${email}</strong><br>
                  Preferred Language: <strong>${preferredLanguage}</strong>
                </p>
              </td>
            </tr>

            <!-- Booking Details -->
            <tr>
              <td style="padding: 40px; font-size: 16px; line-height: 1.8; color: #333333;">
                <p><strong>Booking Details:</strong></p>
                <p style="margin-bottom: 20px;">
                  Date: <strong>${bookingDate}</strong><br>
                  Time: <strong>${bookingTime}</strong><br>
                  Message: <strong>${message}</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 14px;">
                <p style="margin: 0;">&copy; 2024 Bay Homes. All rights reserved.</p>
                <p style="margin: 5px 0 0 0;">1234 Bay Street, Bay City, BC 12345</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;

  // Send email
  const mailOptions = {
    from: email,
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, 
    subject: `New Property Viewing Request for ${propertyName}`,
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // Add WhatsApp API call logic if needed

    return { success: true, message: 'Booking request submitted successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error submitting booking request' };
  }
}


export async function contactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  const { firstName, lastName, email, phoneNumber, message } = data;

  // HTML body for the email
  const htmlBody = `
  <body style="font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 28px; font-weight: bold;">
                New Contact Form Request
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 40px; font-size: 16px; line-height: 1.8; color: #333333;">
                <p>Dear Team,</p>
                <p>I am <strong>${firstName} ${lastName}</strong> and I have submitted the following contact form:</p>
                <p><strong>Contact Information:</strong></p>
                <p style="margin-bottom: 20px;">
                  Phone Number: <strong>${phoneNumber}</strong><br>
                  Email: <strong>${email}</strong>
                </p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #345C72; padding: 40px; text-align: center; color: #ffffff; font-size: 14px;">
                <p style="margin: 0;">&copy; 2024 Your Company. All rights reserved.</p>
                <p style="margin: 5px 0 0 0;">1234 Your Street, Your City, YC 12345</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `;

  // Send email
  const mailOptions = {
    from: email,
    to: process.env.NEXT_PUBLIC_EMAIL_ADDRESS, // Your email address
    subject: 'New Contact Form Request',
    html: htmlBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Send WhatsApp message (Replace with actual WhatsApp API call if needed)
    await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      body: JSON.stringify({
        phone: process.env.WHATSAPP_PHONE_NUMBER, // Your WhatsApp number
        text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Message: ${message}
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