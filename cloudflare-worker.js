/**
 * PHARPRO production edge worker.
 * Keeps the Cloudflare deployment aligned with the site's SEO routing while
 * retaining the optional Resend contact endpoint.
 */

const CANONICAL_HOST = "pharpro.co";
const ALLOWED_ORIGINS = ["https://pharpro.co", "https://www.pharpro.co"];
const PERMANENT_REDIRECTS = new Map([
  ["/services/digital", "/services/dvs/"],
  ["/insights/capa-management-pharmaceutical", "/insights/capa-management-pharma-guide/"],
  ["/insights/inspection-readiness-guide", "/insights/pharmaceutical-inspection-readiness/"],
  ["/insights/gmp-training-july-2026", "/insights/gmp-training-september-2026/"],
  ["/insights/csv-training-august-2026", "/insights/csv-training-rescheduled-september-2026/"],
  ["/insights/csv-training-pharma-june-2026", "/services/training/csv/"],
  ["/register/gmp-training-july-2026", "/services/training/"],
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.protocol = "https:";
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    const routePath = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    const redirectTarget = PERMANENT_REDIRECTS.get(routePath);
    if (redirectTarget) {
      const destination = new URL(redirectTarget, `https://${CANONICAL_HOST}`);
      destination.search = url.search;
      return Response.redirect(destination.toString(), 301);
    }

    if (request.method === "OPTIONS") {
      return corsResponse(null, 204, origin);
    }

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env, origin);
    }

    const response = await env.ASSETS.fetch(request);
    return withSiteHeaders(response, url.pathname);
  }
};

function withSiteHeaders(response, pathname) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  const contentType = headers.get("Content-Type") || "";
  if (/\.(?:css|js|png|jpe?g|webp|svg|gif|ico|woff2?)$/i.test(pathname)) {
    headers.set("Cache-Control", "public, max-age=604800");
  } else if (pathname === "/sitemap.xml" || pathname === "/feed.xml") {
    headers.set("Cache-Control", "public, max-age=3600");
  } else if (contentType.includes("text/html")) {
    headers.set("Cache-Control", "no-cache, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleContact(request, env, origin) {
  let body;
  try {
    body = await request.json();
  } catch {
    return corsResponse(JSON.stringify({ ok: false, error: "Invalid JSON" }), 400, origin);
  }

  const { name, company, email, service, message, hp } = body;

  if (hp) {
    return corsResponse(JSON.stringify({ ok: true }), 200, origin);
  }

  if (!name || !email || !message) {
    return corsResponse(
      JSON.stringify({ ok: false, error: "Missing required fields." }),
      400,
      origin
    );
  }

  const recipientEmail = env.RECIPIENT_EMAIL || "info@pharpro.co";
  const resendApiKey   = env.RESEND_API_KEY;

  if (!resendApiKey) {
    return corsResponse(
      JSON.stringify({ ok: false, error: "Email service not configured." }),
      500,
      origin
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
    JSON.stringify({ ok: true, message: "Message received. We will be in touch within one business day." }),
    200,
    origin
  );
}

function corsResponse(body, status, requestOrigin) {
  const origin = ALLOWED_ORIGINS.includes(requestOrigin) ? requestOrigin : ALLOWED_ORIGINS[0];
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "Vary": "Origin"
  };

  return new Response(body, { status, headers });
}
