/**
 * PHARPRO Contact Form — Cloudflare Worker (Resend edition)
 *
 * HOW TO DEPLOY:
 * 1. Sign up free at https://resend.com — takes 30 seconds
 * 2. Go to API Keys → Create API Key → copy it
 * 3. In Cloudflare Worker Settings → Variables and Secrets, add:
 *    - RESEND_API_KEY  → your Resend API key
 *    - RECIPIENT_EMAIL → info@pharpro.co  (already set)
 * 4. Paste this entire file into the Worker editor → Deploy
 *
 * Free tier: 3,000 emails/month, 100/day — more than enough.
 */

const ALLOWED_ORIGIN = "https://pharpro.co";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return corsResponse(null, 204);
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};

async function handleContact(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return corsResponse(JSON.stringify({ ok: false, error: "Invalid JSON" }), 400);
  }

  const { name, company, email, service, message, hp } = body;

  if (hp) {
    return corsResponse(JSON.stringify({ ok: true }), 200);
  }

  if (!name || !email || !message) {
    return corsResponse(
      JSON.stringify({ ok: false, error: "Missing required fields." }),
      400
    );
  }

  const recipientEmail = env.RECIPIENT_EMAIL || "info@pharpro.co";
  const resendApiKey   = env.RESEND_API_KEY;

  if (!resendApiKey) {
    return corsResponse(
      JSON.stringify({ ok: false, error: "Email service not configured." }),
      500
    );
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1C2330;">
      <div style="background:#233A5E; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h2 style="color:#fff; margin:0; font-size:18px;">New enquiry — pharpro.co</h2>
      </div>
      <div style="background:#F5EEE8; padding: 32px; border-radius: 0 0 8px 8px; border: 1px solid #E4D9D1;">
        <table style="width:100%; border-collapse:collapse;">
          <tr><td style="padding:8px 0; color:#6B7A99; width:120px; font-size:14px;">Name</td><td style="padding:8px 0; font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0; color:#6B7A99; font-size:14px;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
          <tr><td style="padding:8px 0; color:#6B7A99; font-size:14px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#B12C4B;">${email}</a></td></tr>
          <tr><td style="padding:8px 0; color:#6B7A99; font-size:14px;">Service</td><td style="padding:8px 0;">${service || "—"}</td></tr>
        </table>
        <hr style="border:none; border-top:1px solid #E4D9D1; margin:24px 0;" />
        <p style="color:#6B7A99; font-size:14px; margin:0 0 8px;">Message</p>
        <p style="white-space:pre-wrap; margin:0; line-height:1.7;">${message}</p>
        <hr style="border:none; border-top:1px solid #E4D9D1; margin:24px 0;" />
        <p style="color:#6B7A99; font-size:12px; margin:0;">Submitted via the contact form at pharpro.co. Reply directly to this email to respond to ${name}.</p>
      </div>
    </div>
  `;

  try {
    const sendResult = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from:     "PHARPRO Website <onboarding@resend.dev>",
        to:       [recipientEmail],
        reply_to: email,
        subject:  `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
        html:     emailHtml
      })
    });

    if (!sendResult.ok) {
      const errText = await sendResult.text();
      console.error("Resend error:", sendResult.status, errText);
      return corsResponse(
        JSON.stringify({ ok: false, error: "Email delivery failed. Please contact us directly." }),
        500
      );
    }
  } catch (err) {
    console.error("Fetch error:", err);
    return corsResponse(
      JSON.stringify({ ok: false, error: "Unexpected error. Please contact us directly." }),
      500
    );
  }

  return corsResponse(
    JSON.stringify({ ok: true, message: "Message received. We will be in touch within 24 hours." }),
    200
  );
}

function corsResponse(body, status) {
  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  return new Response(body, { status, headers });
}
