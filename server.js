const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post("/api/contact", async (req, res) => {
  const { name, company, email, service, message, hp } = req.body;

  if (hp) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  console.log("--- New Contact Submission ---");
  console.log(`Name:    ${name}`);
  console.log(`Company: ${company || "N/A"}`);
  console.log(`Email:   ${email}`);
  console.log(`Service: ${service || "N/A"}`);
  console.log(`Message: ${message}`);
  console.log("-----------------------------");

  res.status(200).json({ ok: true, message: "Message received. We will be in touch within 24 hours." });
});

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PHARPRO website running on port ${PORT}`);
});
