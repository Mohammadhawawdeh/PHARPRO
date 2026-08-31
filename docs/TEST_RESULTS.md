# PHARPRO Verified Evidence Test Results

Executed: 2026-08-30  
Branch: `codex/verified-evidence-human-trust`

## Passed

| Test | Result |
|---|---|
| `node tools/validate_site.js` | Passed: 63 indexable URLs checked |
| `node tools/validate_evidence_release.js` | Passed: verified figures, project evidence, trust copy, forms, analytics, accessibility and deployment artifacts checked |
| `node --check server.js` | Passed |
| `node --check cloudflare-worker.js` | Passed |
| `node --check js/dvs-growth.js` | Passed |
| `node --check js/analytics.js` | Passed |
| `node --check js/scripts.js` | Passed |
| Local HTTP `/` | 200 |
| Local HTTP `/projects/` | 200 |
| Local HTTP `/services/dvs/` | 200 |
| Local HTTP unknown URL | 404 |
| Local HTTP obsolete `/services/digital/` | 301 to `/services/dvs/` |
| Legacy fixed-savings URL | 301 to `/services/dvs/pricing-roi/` |
| DVS response content | Canonical, fit-check form and 10-minute offer present |
| Web3Forms privacy coverage | Passed on every HTML page containing an access key |
| Web3Forms external submission | Passed: production endpoint accepted the synthetic `[TEST] PHARPRO Web3Forms production delivery check` lead on 2026-08-30 |
| English/Arabic DVS evidence scan | Passed: no fixed savings, fabricated adoption or limited-slot claims |
| Backup archive integrity | Passed `unzip -t` |

The site validator covers title/description limits, one H1, canonical URLs, JSON-LD parsing, unsupported review schema, required Event data, internal links, sitemap parity, redirect-source exclusion, orphan detection and real 404 handling.

The verified-evidence validator additionally covers the founder-led offer, project record, business figures, fit-check form, Web3Forms integration, post-success lead tracking, Calendly origin restriction, direct contact paths, image dimensions, reduced-motion support, artificial scarcity, unsupported fixed savings, absolute compliance wording, unapproved homepage client proof and staging/release documentation.

## Blocked or deferred

| Validation | Status | Reason / next action |
|---|---|---|
| External staging deployment | Blocked | No Cloudflare credential or account connection was available. Run `npm run stage:deploy` with owner access. |
| Cloud-browser visual QA | Blocked | The remote browser cannot access the local-only server; repeat against the deployed staging URL. |
| Safari / Firefox / Edge device matrix | Deferred | Requires the deployed staging hostname and the manual matrix in `docs/QA_CHECKLIST.md`. |
| Staging-host Web3Forms delivery | Deferred | Production endpoint submission passed. Repeat from the external staging hostname after it is deployed and allow-listed. |
| GA4 DebugView | Deferred | Requires staging/live execution after consent. |
| CRM / Calendly server webhook | Blocked | CRM provider, field mapping and signing secret were not supplied. |
| Client logos, original photos and measurable case studies | Blocked | Written permissions, original files, final quotations and measurable evidence were not supplied. The factual project record is included without logos. |

No claim of full cross-browser or external-delivery validation is made before these owner-controlled checks are completed.
