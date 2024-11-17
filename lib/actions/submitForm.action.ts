"use server"
import sgMail from "@sendgrid/mail";


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
 // Ensure EMAIL_USER is defined and is a valid string
 const fromEmail = process.env.EMAIL_USER;
 if (!fromEmail) {
   console.error('EMAIL_USER environment variable is not defined');
   return { success: false, message: 'Error: EMAIL_USER not defined' };
 }

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
               <p style="margin: 5px 0 0 0;">Business Bay, Blue Bay Tower, Office 7095</p>
             </td>
           </tr>
         </table>
       </td>
     </tr>
   </table>
 </body>
 `;
 const userEmail = formData.email;
 // Send email
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);


 const mailOptions = {
 from: fromEmail, // Use the authenticated email address
 to: fromEmail, // Your destination email address
 replyTo: userEmail,
 subject: 'New Property Listing Form Submission',
 html: htmlBody,
 };

 try {
    await sgMail.send(mailOptions);
 
   return { success: true, message: 'Form submitted successfully' };
 } catch (error) {
   console.error('Error sending email :', error);
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
 // Ensure EMAIL_USER is defined and is a valid string
 const fromEmail = process.env.EMAIL_USER // Use an app password or your actual password
 ;
 if (!fromEmail) {
   console.error('EMAIL_USER environment variable is not defined');
   return { success: false, message: 'Error: EMAIL_USER not defined' };
 }

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
               <p style="margin: 5px 0 0 0;">Business Bay, Blue Bay Tower, Office 7095</p>
             </td>
           </tr>
         </table>
       </td>
     </tr>
   </table>
 </body>
 `;

 // Send email

 sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);

 const userEmail = formData.email;


 const mailOptions = {
   from :fromEmail,
   to: fromEmail, 
   replyTo: userEmail,
   subject: `New Property Viewing Request for ${propertyName}`,
   html: htmlBody,
 };

 try {
   await sgMail.send(mailOptions);

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

 // Ensure EMAIL_USER is defined and is a valid string
 const fromEmail = process.env.EMAIL_USER;
 if (!fromEmail) {
   console.error('EMAIL_USER environment variable is not defined');
   return { success: false, message: 'Error: EMAIL_USER not defined' };
 }

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
               <p style="margin: 0;">&copy; 2024 Bay Homes. All rights reserved.</p>
               <p style="margin: 5px 0 0 0;">Business Bay, Blue Bay Tower, Office 7095</p>
             </td>
           </tr>
         </table>
       </td>
     </tr>
   </table>
 </body>
 `;

 // Send email

 sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);


 const userEmail = data.email;

 const mailOptions = {
   from: fromEmail,      // Your verified sender email in SendGrid
   to: fromEmail,         // The recipient is also your verified email
   replyTo: userEmail,    // Allows replies to go to the user's email
   subject: 'New Contact Form Request',
   html: htmlBody,
 };

 try {
   await sgMail.send(mailOptions);
   return { success: true, message: 'Form submitted successfully' };
 } catch (error) {
   console.error('Error sending email:', error);
   return { success: false, message: 'Error submitting form' };
 }
}
