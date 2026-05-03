const express = require("express");
const path = require("path");
const helmet = require("helmet");

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

// Service pages (directory/index.html structure for GitHub Pages compatibility)
const SERVICE_PAGES = ["csv", "qa", "cqv", "training"];
SERVICE_PAGES.forEach((svc) => {
  app.get([`/services/${svc}`, `/services/${svc}/`], (req, res) => {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    res.sendFile(path.join(__dirname, "services", svc, "index.html"));
  });
});

// Insights hub
app.get(["/insights", "/insights/"], (req, res) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "insights", "index.html"));
});

// Insights article pages
const INSIGHT_SLUGS = [
  "gamp5-second-edition-csv-changes",
  "eu-gmp-annex-11-compliance-checklist",
  "fda-21-cfr-part-11-data-integrity",
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
app.post("/api/contact", (req, res) => {
  const origin = req.headers.origin || req.headers.referer || "";
  const isAllowed =
    ALLOWED_ORIGINS.some((o) => origin.startsWith(o)) ||
    process.env.NODE_ENV !== "production";

  if (!isAllowed) {
    return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  const { name, company, email, service, message, hp } = req.body;

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

  console.log("--- New Contact Submission ---");
  console.log(`Name:    ${sanitize(name)}`);
  console.log(`Company: ${sanitize(company) || "N/A"}`);
  console.log(`Email:   ${email.replace(/(?<=.{2}).(?=.*@)/g, "*")}`);
  console.log(`Service: ${sanitize(service) || "N/A"}`);
  console.log(`Message: ${sanitize(message).slice(0, 100)}...`);
  console.log("-----------------------------");

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
