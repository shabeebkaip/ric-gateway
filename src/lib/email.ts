import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const RECIPIENTS = (process.env.ENQUIRY_RECIPIENTS || '')
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);

const FROM = `"RIC Medical" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`;

export interface ContactEnquiryData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface ProductEnquiryData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  productName: string;
  productSlug: string;
  category: string;
  partnerName?: string;
}

export async function sendContactEnquiryEmail(data: ContactEnquiryData) {
  if (!process.env.SMTP_PASS || RECIPIENTS.length === 0) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1a3c5e,#c9a227);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px">New Contact Enquiry</h1>
        <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:14px">RIC Medical — ricmedical.com.sa</p>
      </div>
      <div style="padding:32px;background:#fff">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:130px;font-size:14px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;font-size:14px">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px"><a href="mailto:${data.email}" style="color:#1a3c5e">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px"><a href="tel:${data.phone}" style="color:#1a3c5e">${data.phone}</a></td></tr>` : ''}
          ${data.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Company</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px">${data.company}</td></tr>` : ''}
        </table>
        <div style="margin-top:24px">
          <p style="color:#64748b;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Message</p>
          <div style="background:#f8fafc;border-left:4px solid #c9a227;padding:16px;border-radius:0 6px 6px 0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap">${data.message}</div>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;color:#94a3b8;font-size:12px">
        Sent from ricmedical.com.sa contact form
      </div>
    </div>`;

  await transporter.sendMail({
    from: FROM,
    to: RECIPIENTS.join(', '),
    replyTo: data.email,
    subject: `New Enquiry from ${data.name}${data.company ? ` — ${data.company}` : ''}`,
    html,
  });
}

export async function sendProductEnquiryEmail(data: ProductEnquiryData) {
  if (!process.env.SMTP_PASS || RECIPIENTS.length === 0) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1a3c5e,#c9a227);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px">New Quotation Request</h1>
        <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:14px">RIC Medical — ricmedical.com.sa</p>
      </div>
      <div style="padding:32px;background:#fff">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:16px;margin-bottom:24px">
          <p style="margin:0 0 4px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Product</p>
          <p style="margin:0;font-size:18px;font-weight:700;color:#1a3c5e">${data.productName}</p>
          ${data.partnerName ? `<p style="margin:4px 0 0;color:#64748b;font-size:13px">by ${data.partnerName} · ${data.category}</p>` : `<p style="margin:4px 0 0;color:#64748b;font-size:13px">${data.category}</p>`}
        </div>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:130px;font-size:14px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-weight:600;color:#0f172a;font-size:14px">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px"><a href="mailto:${data.email}" style="color:#1a3c5e">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px"><a href="tel:${data.phone}" style="color:#1a3c5e">${data.phone}</a></td></tr>` : ''}
          ${data.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px">Company</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;font-size:14px">${data.company}</td></tr>` : ''}
        </table>
        ${data.message ? `
        <div style="margin-top:24px">
          <p style="color:#64748b;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Additional Notes</p>
          <div style="background:#f8fafc;border-left:4px solid #c9a227;padding:16px;border-radius:0 6px 6px 0;color:#334155;font-size:14px;line-height:1.6;white-space:pre-wrap">${data.message}</div>
        </div>` : ''}
      </div>
      <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;color:#94a3b8;font-size:12px">
        Sent from ricmedical.com.sa product page
      </div>
    </div>`;

  await transporter.sendMail({
    from: FROM,
    to: RECIPIENTS.join(', '),
    replyTo: data.email,
    subject: `Quotation Request: ${data.productName} — ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html,
  });
}
