import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "arifunnaharjani@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#fcf9f4;border-radius:12px;border:1px solid #d6c3b4;">
          <h2 style="color:#854f12;margin-bottom:4px;">New message from your portfolio</h2>
          <hr style="border:none;border-top:1px solid #d6c3b4;margin:16px 0;" />
          <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#854f12;">${email}</a></p>
          <p style="margin:0 0 16px;"><strong>Subject:</strong> ${subject}</p>
          <div style="background:#f0ede9;border-radius:8px;padding:16px;">
            <p style="margin:0;white-space:pre-wrap;color:#1c1c19;">${message}</p>
          </div>
          <p style="margin-top:24px;font-size:12px;color:#847467;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
