import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const msg = {
      to: process.env.CONTACT_EMAIL!,
      from: process.env.CONTACT_EMAIL!, // verified sender in SendGrid
      subject: `[Contact Form] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("SendGrid error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
