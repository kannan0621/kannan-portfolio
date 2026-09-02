const nodemailer = require('nodemailer');

/**
 * Direct Nodemailer Transporter
 * Configured to send emails directly to Admin and User
 */
let cachedTransporter = null;

const getTransporter = async () => {
  if (cachedTransporter) return cachedTransporter;

  const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER || 'r.kannan0621@gmail.com';
  const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASS || process.env.GMAIL_PASS;

  if (emailPass) {
    console.log(`[Email Service] Using Direct SMTP Transport with account: ${emailUser}`);
    cachedTransporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    return cachedTransporter;
  }

  // Fallback direct SMTP transport handler
  console.log(`[Email Service] Initializing direct mail transport engine...`);
  try {
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    return cachedTransporter;
  } catch (err) {
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'kannan.portfolio@ethereal.email',
        pass: 'ethereal_pass_123'
      }
    });
    return cachedTransporter;
  }
};

/**
 * Professional HTML Template for Admin Notification Email
 */
const getAdminEmailTemplate = ({ name, email, subject, message, date }) => {
  const formattedDate = date ? new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Portfolio Contact Inquiry</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
            
            <!-- Header Bar -->
            <tr>
              <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 30px; text-align: center; color: #ffffff;">
                <div style="font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">R. KANNAN PORTFOLIO</div>
                <div style="font-size: 13px; opacity: 0.9; margin-top: 4px; font-weight: 500;">NEW CONTACT FORM SUBMISSION</div>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 35px 30px;">
                <div style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 20px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
                  📩 Inquiry Details
                </div>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; color: #374151;">
                  <tr>
                    <td width="140" style="padding: 8px 0; font-weight: 700; color: #4b5563;">Sender Name:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #4b5563;">Sender Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0d9488; font-weight: 600; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #4b5563;">Subject:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #111827;">${subject || 'General Inquiry'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 700; color: #4b5563;">Date & Time:</td>
                    <td style="padding: 8px 0; font-size: 13px; color: #6b7280;">${formattedDate} (IST)</td>
                  </tr>
                </table>

                <div style="margin-top: 25px;">
                  <div style="font-size: 14px; font-weight: 700; color: #4b5563; margin-bottom: 8px;">Message Content:</div>
                  <div style="background-color: #f9fafb; border-left: 4px solid #0d9488; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</div>
                </div>

                <!-- Action Button -->
                <div style="margin-top: 30px; text-align: center;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="background-color: #0d9488; color: #ffffff; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block; font-size: 14px; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);">
                    Reply to ${name}
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
                R. KANNAN • MERN Stack Developer • Coimbatore, Tamil Nadu, India<br/>
                Automated notification from portfolio contact API.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

/**
 * Professional HTML Template for User Confirmation Email
 */
const getUserEmailTemplate = ({ name, email, subject, message }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for reaching out!</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
            
            <!-- Header Bar -->
            <tr>
              <td style="background: linear-gradient(135deg, #0d9488 0%, #4f46e5 100%); padding: 35px; text-align: center; color: #ffffff;">
                <div style="font-size: 32px; font-weight: 800; letter-spacing: -0.5px;">THANK YOU!</div>
                <div style="font-size: 14px; opacity: 0.9; margin-top: 6px; font-weight: 500;">YOUR MESSAGE HAS BEEN RECEIVED</div>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 35px 30px;">
                <p style="font-size: 16px; color: #111827; font-weight: 600; margin-top: 0;">Hi ${name},</p>
                
                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
                  Thank you for visiting my developer portfolio and reaching out regarding <strong>"${subject || 'General Inquiry'}"</strong>.
                </p>

                <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
                  Your message has been delivered directly to my inbox. I appreciate your interest and will review your note promptly. You can expect a reply within 24 hours.
                </p>

                <!-- Your Message Reference -->
                <div style="margin-top: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px;">
                  <div style="font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Your Message (for reference):</div>
                  <div style="font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 4px;">Subject: ${subject || 'General Inquiry'}</div>
                  <div style="font-size: 13px; color: #1f2937; line-height: 1.6; white-space: pre-wrap; background-color: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb;">${message || ''}</div>
                </div>

                <!-- Profile Card -->
                <div style="margin-top: 30px; background-color: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 12px; padding: 20px;">
                  <div style="font-size: 16px; font-weight: 800; color: #0f766e;">R. KANNAN</div>
                  <div style="font-size: 13px; font-weight: 600; color: #115e59; margin-top: 2px;">MERN Stack Developer | Front-End Specialist</div>
                  <div style="font-size: 12px; color: #4b5563; margin-top: 8px; line-height: 1.5;">
                    📍 Location: Coimbatore, Tamil Nadu, India<br/>
                    📞 Phone: +91 6369307080<br/>
                    ✉️ Email: r.kannan0621@gmail.com<br/>
                    🌐 Portfolio: <a href="https://kannan.dev" style="color: #0d9488; text-decoration: none; font-weight: 600;">kannan.dev</a>
                  </div>
                </div>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} R. KANNAN. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

/**
 * Dispatcher Function to Send Mail Directly to Both Admin and User
 */
const sendPortfolioEmails = async ({ name, email, subject, message }) => {
  console.log(`\n📬 [EMAIL SERVICE] Directly sending emails for: ${email}`);

  try {
    const transporter = await getTransporter();
    const fromAddress = process.env.EMAIL_USER || 'r.kannan0621@gmail.com';

    // 1. Direct Admin Email Payload
    const adminMailOptions = {
      from: `"Kannan Portfolio" <${fromAddress}>`,
      to: 'r.kannan0621@gmail.com',
      subject: `⚡ [Portfolio Inquiry] ${subject || 'New Contact Submission'} from ${name}`,
      html: getAdminEmailTemplate({ name, email, subject, message, date: new Date() })
    };

    // 2. Direct User Confirmation Email Payload
    const userMailOptions = {
      from: `"R. KANNAN" <${fromAddress}>`,
      to: email,
      subject: `Thank you for contacting R. KANNAN — ${subject || 'Portfolio Inquiry'}`,
      html: getUserEmailTemplate({ name, email, subject, message })
    };

    // Send Admin Email directly
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log(`✅ Admin Email Sent Directly! ID: ${adminInfo.messageId}`);

    // Send User Confirmation Email directly
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log(`✅ User Confirmation Email Sent Directly! ID: ${userInfo.messageId}`);

    return {
      success: true,
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId
    };
  } catch (error) {
    console.error(`❌ [EMAIL SERVICE ERROR] Email dispatch failed:`, error.message);
    cachedTransporter = null;
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPortfolioEmails,
  getAdminEmailTemplate,
  getUserEmailTemplate
};
