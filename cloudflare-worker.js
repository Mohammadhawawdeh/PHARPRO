/**
 * PHARPRO Contact Form — Cloudflare Worker
 *
 * HOW TO DEPLOY:
 * 1. Log in to https://dash.cloudflare.com
 * 2. Go to Workers & Pages → Create → Worker
 * 3. Paste this entire file into the editor
 * 4. Click "Save and Deploy"
 * 5. Set the RECIPIENT_EMAIL environment variable in Settings → Variables
 *    to the email address where you want to receive form submissions.
 *
 * WHAT IT DOES:
 * - Handles POST /api/contact from your website form
 * - Sends you an email via MailChannels (free, no extra setup needed)
 * - Returns JSON { ok: true } on success
 * - Serves your static site for all other requests (when used with Cloudflare Pages)
 *
 * CORS NOTE:
 * Set ALLOWED_ORIGIN below to your production domain, e.g. "https://pharpro.co"
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

  const emailBody = `
New contact form submission from pharpro.co

Name:    ${name}
Company: ${company || "—"}
Email:   ${email}
Service: ${service || "—"}

Message:
${message}

---
Submitted via pharpro.co contact form
  `.trim();

  try {
    const sendResult = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: recipientEmail, name: "PHARPRO" }] }],
        from: { email: "noreply@pharpro.co", name: "PHARPRO Website" },
        reply_to: { email, name },
        subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
        content: [{ type: "text/plain", value: emailBody }]
      })
    });

    if (!sendResult.ok && sendResult.status !== 202) {
      console.error("MailChannels error:", sendResult.status, await sendResult.text());
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
