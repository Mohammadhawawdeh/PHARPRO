const express = require("express");
const path = require("path");
const helmet = require("helmet");
const https = require("https");

const app = express();
const PORT = 5000;

const ALLOWED_ORIGINS = [
  "https://pharpro.co",
  "https://www.pharpro.co",
  process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null,
].filter(Boolean);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.voiceflow.com",
          "https://general-runtime.voiceflow.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://api.web3forms.com",
          "https://general-runtime.voiceflow.com",
        ],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'", "https://api.web3forms.com"],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// ── NON-WWW → WWW REDIRECT ────────────────────────────────────────────────
// Canonical is https://www.pharpro.co/ — redirect bare domain to preserve
// link equity and avoid duplicate-content splits in Google Search Console.
app.use((req, res, next) => {
  const host = req.headers.host || "";
  if (host === "pharpro.co" || host.startsWith("pharpro.co:")) {
    return res.redirect(301, `https://www.pharpro.co${req.url}`);
  }
  next();
});

// ── LANG QUERY PARAM — PREVENT REDIRECT ───────────────────────────────────
// ?lang=ar is a client-side-only language switch. Ensure the server never
// strips or redirects these URLs — they must return 200 with Vary so Google
// does not classify them as "Page with redirect" in Search Console.
// NOTE: hreflang="ar" tags now point to the base URL (not ?lang=ar), so
// Google no longer crawls ?lang=ar URLs from hreflang signals.
app.use((req, res, next) => {
  res.setHeader("Vary", "Accept-Language");
  next();
});

// ── ALL EXPLICIT PAGE ROUTES — must be declared BEFORE express.static ──────
// express.static sees directories (services/csv/, insights/, etc.) and issues
// a 301 redirect to the trailing-slash URL before our route handlers can fire.
// Declaring these first ensures they always win.

// RSS feed — needs application/rss+xml MIME (static serves .xml as application/xml)
app.get("/feed.xml", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.sendFile(path.join(__dirname, "feed.xml"));
});

// /services/digital is a legacy alias — 301 to the canonical DVS page
app.get(["/services/digital", "/services/digital/"], (req, res) => {
  res.redirect(301, "/services/dvs/");
});

// Service pages (directory/index.html structure for GitHub Pages compatibility)
const SERVICE_PAGES = ["csv", "qa", "cqv", "training", "dvs"];
SERVICE_PAGES.forEach((svc) => {
  app.get([`/services/${svc}`, `/services/${svc}/`], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(__dirname, "services", svc, "index.html"));
  });
});

// Services hub
app.get(["/services", "/services/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "services", "index.html"));
});

// Contact page
app.get(["/contact", "/contact/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "contact", "index.html"));
});

// Geo landing pages
const GEO_PAGES = ["egypt", "jordan", "ksa", "uae"];
app.get(["/geo", "/geo/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "geo", "index.html"));
});
GEO_PAGES.forEach((geo) => {
  app.get([`/geo/${geo}`, `/geo/${geo}/`], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(__dirname, "geo", geo, "index.html"));
  });
});

// Resources
app.get(["/resources/compliance-checklist", "/resources/compliance-checklist/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "resources", "compliance-checklist", "index.html"));
});

// Search
app.get(["/search", "/search/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "search", "index.html"));
});

// Training sub-pages
const TRAINING_SUB_PAGES = ["csv", "cleaning-validation", "compressed-air-testing"];
TRAINING_SUB_PAGES.forEach((sub) => {
  app.get([`/services/training/${sub}`, `/services/training/${sub}/`], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(__dirname, "services", "training", sub, "index.html"));
  });
});

// Insights hub
app.get(["/insights", "/insights/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "insights", "index.html"));
});

// Insights article pages
const INSIGHT_SLUGS = [
  "csv-training-pharma-june-2026",
  "21-cfr-part-11-audit-trail-requirements",
  "ai-validation-lifecycle-software-pharma",
  "capa-management-pharma-guide",
  "cleaning-validation-maco-acceptance-criteria",
  "csv-saas-cloud-pharma",
  "data-integrity-pharmaceutical-manufacturing",
  "eu-gmp-annex-11-compliance-checklist",
  "fda-21-cfr-part-11-data-integrity",
  "fda-warning-letter-response",
  "gamp5-risk-categories-explained",
  "gamp5-second-edition-csv-changes",
  "gmp-gap-assessment-guide",
  "gmp-training-records-compliance",
  "how-to-write-urs-computerised-system",
  "iq-oq-pq-guide",
  "pharmaceutical-inspection-readiness",
  "pharmaceutical-validation-software",
  "risk-assessment-computerised-systems",
  "supplier-qualification-gmp",
  "thermal-mapping-pharmaceutical-warehouses",
  "validation-master-plan-guide",
];
INSIGHT_SLUGS.forEach((slug) => {
  app.get([`/insights/${slug}`, `/insights/${slug}/`], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(__dirname, "insights", slug, "index.html"));
  });
});

// ── STATIC FILE SERVING ───────────────────────────────────────────────────
// Cache-Control strategy:
//   • Versioned assets (CSS/JS/images/fonts) → 1 year immutable
//   • HTML files                             → no-cache
//   • sitemap.xml / robots.txt               → 1 hour
app.use(
  express.static(path.join(__dirname), {
    setHeaders(res, filePath) {
      const ext = path.extname(filePath).toLowerCase();
      const IMMUTABLE = [".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp", ".woff", ".woff2", ".ttf", ".otf"];
      if (IMMUTABLE.includes(ext)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (ext === ".html") {
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
      } else if (ext === ".xml" || ext === ".txt") {
        res.setHeader("Cache-Control", "public, max-age=3600");
      }
    },
  })
);

// ── CONTACT API ───────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  const origin = req.headers.origin || req.headers.referer || "";
  const isAllowed =
    ALLOWED_ORIGINS.some((o) => origin.startsWith(o)) ||
    process.env.NODE_ENV !== "production";

  if (!isAllowed) {
    return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  const { name, company, email, phone, service, message, hp } = req.body;

  if (hp) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email address." });
  }

  const sanitize = (str) =>
    String(str || "")
      .replace(/[\r\n]/g, " ")
      .trim()
      .slice(0, 500);

  const safeName    = sanitize(name);
  const safeCompany = sanitize(company) || "N/A";
  const safePhone   = sanitize(phone)   || "N/A";
  const safeService = sanitize(service) || "N/A";
  const safeMsg     = sanitize(message);

  console.log("--- New Contact Submission ---");
  console.log(`Name:    ${safeName}`);
  console.log(`Company: ${safeCompany}`);
  console.log(`Email:   ${email.replace(/(?<=.{2}).(?=.*@)/g, "*")}`);
  console.log(`Phone:   ${safePhone}`);
  console.log(`Service: ${safeService}`);
  console.log(`Message: ${safeMsg.slice(0, 100)}...`);
  console.log("-----------------------------");

  const web3Key = process.env.WEB3FORMS_KEY;
  if (web3Key) {
    try {
      await new Promise((resolve, reject) => {
        const payload = JSON.stringify({
          access_key: web3Key,
          subject: `[PHARPRO] New enquiry — ${safeService} (${safeName})`,
          from_name: "PHARPRO Website",
          replyto: email,
          name: safeName,
          email,
          company: safeCompany,
          phone: safePhone,
          service: safeService,
          message: safeMsg,
        });

        const options = {
          hostname: "api.web3forms.com",
          path: "/submit",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Content-Length": Buffer.byteLength(payload),
            "User-Agent": "PHARPRO-Website/1.0",
          },
        };

        const req = https.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => { data += chunk; });
          res.on("end", () => {
            try {
              const json = JSON.parse(data);
              if (!json.success) {
                console.error("Web3Forms error:", json.message);
              } else {
                console.log("Email sent via Web3Forms ✓");
              }
            } catch (e) {
              console.error("Web3Forms parse error:", e.message);
            }
            resolve();
          });
        });

        req.on("error", (err) => {
          console.error("Web3Forms request error:", err.message);
          resolve();
        });

        req.write(payload);
        req.end();
      });
    } catch (err) {
      console.error("Web3Forms unexpected error:", err.message);
    }
  } else {
    console.warn("WEB3FORMS_KEY not set — email not sent.");
  }

  res.status(200).json({
    ok: true,
    message: "Message received. We will be in touch within 24 hours.",
  });
});

// ── HOMEPAGE FALLBACK ─────────────────────────────────────────────────────
app.get("/{*path}", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PHARPRO website running on port ${PORT}`);
});
