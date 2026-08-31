# PHARPRO Verified Evidence Release Brief

Release date: 2026-08-30  
Source: founder-supplied project history, public PHARPRO/partner evidence and the existing production website audit.

## Outcome

This release aligns PHARPRO’s public claims with the founder-supplied project record. It adds a crawlable project portfolio, corrects the company figures to 12 completed engagements, two active projects and seven PHARPRO markets as of August 2026, and preserves the founder-led conversion path for PHARPRO DVS.

Artificial scarcity, unsupported savings claims and unapproved client quotations were not published. These tactics create legal, trust and search-quality risk unless the business can provide evidence and written approval.

## Extracted requirements and decisions

| Report requirement | Implementation decision | Status / files |
|---|---|---|
| Humanise the website | Show the existing approved founder portrait, name, role and direct contact routes on the homepage and DVS page | Complete: `index.html`, `services/dvs/index.html`, `css/seo-enhancements.css` |
| Represent the business accurately | Reused `images/ceo_photo.webp`; positioned PHARPRO as founder-led and removed plural technical-team language from priority pages | Complete |
| Avoid an AI-generated appearance | Rewrote product copy around connected validation work, practitioner responsibility and human review | Complete |
| Replace high-pressure purchase CTA | Added a free 10-minute fit-check request; retained the 30-minute demo as a deeper second step | Complete |
| Focus on tangible time savings | Removed fixed 60/132/136/200/528-hour and 30-day claims; directs buyers to model and validate savings with their own baseline | Complete |
| Prefer “built-in intelligence” over “regulated AI” | Updated homepage, DVS metadata, schema, FAQs and visible copy | Complete |
| Position DVS as a new generation | Added restrained “new generation of digital validation workflow” positioning without superiority claims | Complete |
| Test conversion from 3% toward 10% | Tracking taxonomy and experiment plan below; 10% is a target, not a forecast | Ready for live measurement |
| Validate messaging with current clients before paid ads | Paid acquisition remains gated until qualitative interviews and minimum conversion evidence are available | Operational dependency |
| Create FOMO with 10 annual project spots | Not implemented because the report describes this as artificial. May be used only if delivery capacity is real, dated and documented | Intentionally rejected |
| Add client proof | Removed unverified “Verified Client” blocks. Added an evidence policy and a template for approved proof | Approval dependency |
| Support LinkedIn outreach | Human contact and founder profile are ready as outreach destinations | Messaging/outreach execution remains operational |
| Publish verified delivery history | Added `/projects/` with 12 completed engagements, two active projects, seven markets and public evidence links where available | Complete; logos and outcome metrics withheld pending permission |

The DOCX contained no embedded screenshots, replacement photos, logos or other media. No asset replacement could be extracted beyond reusing the approved founder portrait already present in the repository.

## Platform and release coordinates

| Item | Value |
|---|---|
| CMS | None; static HTML/CSS/JavaScript |
| Local server | Node.js + Express 5 (`server.js`) |
| Production edge | Cloudflare Worker with static assets (`cloudflare-worker.js`, `wrangler.jsonc`) |
| Repository | https://github.com/Mohammadhawawdeh/PHARPRO.git |
| Source branch found | `main` |
| Release branch | `codex/verified-evidence-human-trust` |
| Production URL | https://pharpro.co |
| Staging config | `wrangler.staging.jsonc` |
| Staging URL | Pending first authenticated deployment; Cloudflare will return the exact `pharpro-staging.<account-subdomain>.workers.dev` URL |
| Local staging URL | `http://127.0.0.1:5000` after `npm start` |

No `.openai/hosting.json`, Cloudflare API token or connected deployment account was present. The release therefore includes a staging configuration and exact commands, but does not invent or claim an external staging URL.

## Prioritised implementation plan

Estimates are implementation effort for one experienced engineer/marketer and exclude waiting for approvals or Google recrawling.

| Priority | Task | Estimate | Status | Main risk |
|---|---|---:|---|---|
| P0 | Backup current build and isolate release branch | 0.5 h | Complete | Dirty pre-existing worktree; do not rewrite history |
| P0 | Human-centred homepage and DVS copy | 3–5 h | Complete | Claims must stay evidence-based |
| P0 | Add 10-minute fit-check funnel and success-only analytics | 3–4 h | Complete | Web3Forms inbox/domain restrictions must remain active |
| P0 | Remove artificial scarcity, unapproved proof and fixed savings claims | 1–2 h | Complete | Short-term loss of superficial proof; long-term trust gain |
| P0 | SEO metadata, JSON-LD, canonical and accessibility regression | 2–3 h | Complete | Google processing occurs only after deployment |
| P0 | Automated release and site tests | 2–3 h | Complete | Browser/device coverage still needs external staging |
| P1 | Deploy staging and run stakeholder acceptance | 1–2 h | Blocked by Cloudflare credentials/account access | External mutation requires authenticated owner access |
| P1 | Interview 5–8 existing clients/prospects | 1–2 weeks elapsed | Not a code task | Recruitment and candid feedback |
| P1 | Add approved case studies, logos and quotations | 4–8 h after approvals | Blocked by written approvals/assets | Confidentiality and trademark permission |
| P1 | Connect CRM and server-side Calendly webhook | 4–8 h after provider selection | Blocked by CRM choice and webhook secret | PII, retries, signature verification |
| P1 | Run CTA/value-proposition experiment | 2–4 weeks or ≥300 qualified sessions per variant | Ready after deployment | Low traffic may delay statistical confidence |
| P2 | Launch paid acquisition | After message validation | Intentionally deferred | Scaling weak messaging raises CPL |

## Conversion experiment plan

Primary hypothesis: a named, no-pressure 10-minute fit check will increase qualified conversation starts compared with sending every visitor directly into a detailed demo request.

| Variant | Primary CTA | Form | Success event |
|---|---|---|---|
| A | Request a free 10-minute fit check | Name, work email, company | `generate_lead` with `lead_placement=dvs_fit_check` |
| B | Book a 30-minute workflow demo | Progressive qualification + Calendly | `generate_lead` with `lead_placement=dvs_demo_progressive`, then `appointment_scheduled` |

Guardrails: business-email rate, spam rate, lead-to-meeting rate, sales-accepted lead rate and lead-to-opportunity rate. Do not optimise only for raw form volume. A 10% page conversion rate is the meeting target, not a guaranteed lift.

## Secure credential handling

1. Never commit Cloudflare API tokens, CRM tokens, Calendly webhook signing keys, GA4 service-account files or email credentials.
2. Use Cloudflare dashboard secrets or `wrangler secret put NAME`; use separate staging and production values.
3. Give tokens the smallest scope possible, use separate deploy and runtime credentials, and rotate them after staff or vendor changes.
4. Store the CRM and Calendly webhook secrets server-side. Verify signatures before processing and log only event IDs—not full payloads or sensitive form content.
5. GA4 Measurement ID `G-XRCV7XCWKT` is a public browser identifier, not an authentication secret. Administrative access still belongs in named Google accounts with MFA.
6. The Web3Forms access key is necessarily browser-visible. Restrict it to `pharpro.co` and the exact staging hostname in Web3Forms, enable spam controls, and rotate it if abused.
7. Do not place patient data, batch data, credentials or regulated production records into website forms.

## Commit / PR plan

The existing worktree already contained extensive uncommitted PHARPRO changes. This release does not squash, reset or overwrite that history. A standalone unified patch is supplied as `PHARPRO-Verified-Evidence.patch` beside the release archive.

Recommended commits after owner review:

1. `feat(dvs): add founder-led 10-minute fit-check funnel`
2. `fix(content): replace AI hype and unsupported proof with evidence-led copy`
3. `feat(projects): publish dated founder-led delivery record`
4. `fix(a11y): expose form status and FAQ expanded state`
5. `test(release): add verified-evidence and deployment checks`
6. `docs(release): add staging, QA, credential and rollback runbook`

Recommended PR title: `Humanise PHARPRO DVS and add low-friction fit-check funnel`

## Deployment procedure

### 1. Preflight

```bash
npm ci
npm test
node --check server.js
node --check cloudflare-worker.js
node --check js/dvs-growth.js
```

Confirm the backup archive is stored separately from the working tree. Review `docs/QA_CHECKLIST.md` and obtain content-owner approval for the founder details and 10-minute response workflow.

### 2. Deploy staging

Authenticate through the owner’s Cloudflare account without sharing a token in chat or source control:

```bash
npx wrangler login
npm run stage:deploy
```

Record the exact URL printed by Wrangler as the staging URL. In Web3Forms, add that hostname to the allowed-domain list. Test both DVS forms with clearly labelled synthetic data.

### 3. Staging acceptance

- Run every automated test.
- Complete the manual matrix in `docs/QA_CHECKLIST.md` on Chrome, Safari, Firefox and Edge.
- Verify the 10-minute request reaches the correct inbox.
- Verify a full demo request opens Calendly only after Web3Forms confirms success.
- Confirm GA4 DebugView receives `form_start`, `generate_lead`, `calendar_view` and `appointment_scheduled` without PII.
- Obtain sign-off from the content owner and sales owner.

### 4. Production deploy

```bash
npm run production:deploy
```

Immediately smoke-test `/`, `/services/dvs/`, `/contact/`, `/sitemap.xml`, one redirect and an unknown URL. The unknown URL must return HTTP 404; obsolete URLs must return 301.

### 5. Post-deploy

1. Resubmit `https://pharpro.co/sitemap.xml` in Google Search Console.
2. Request recrawl of `/`, `/projects/`, `/services/dvs/`, `/about/` and `/about/mohammad-awawdeh/`.
3. Annotate the release date in GA4 and the CRM.
4. Monitor form delivery, 404s, Core Web Vitals and conversion quality daily for 72 hours.
5. Do not start paid ads until message interviews and funnel quality meet the agreed gate.

## Rollback plan

1. Keep the pre-release zip and the previous Cloudflare deployment ID.
2. If form delivery, routing or rendering fails, use Cloudflare deployment rollback to restore the immediately previous version.
3. If dashboard rollback is unavailable, unpack the backup into a clean directory, run `npm test`, then deploy it using the production Wrangler config.
4. Purge only affected Cloudflare cache URLs after restoration; avoid a broad purge unless required.
5. Re-run smoke tests and log the incident, trigger, deployment ID, impact window and corrective action.

Rollback triggers: form submissions fail twice in succession, unknown URLs return 200, the homepage/DVS page has a blocking JavaScript error, canonical host changes, or a high-severity privacy/accessibility defect is confirmed.

## Change log

### Added

- Founder-led 10-minute DVS fit-check section with direct email, WhatsApp and LinkedIn routes.
- Three-field Web3Forms capture with UTM attribution, privacy language and success-only GA4 lead event.
- Privacy notices on every page that contains a Web3Forms access key, including the Arabic DVS funnel and legacy training/resource forms.
- Responsive founder sections on homepage and DVS page.
- Dated project track-record page with documented evidence status.
- Verified-evidence automated release validator.
- Isolated Cloudflare staging deployment config.
- Deployment, credential, QA and rollback documentation.

### Changed

- DVS SEO metadata, Open Graph, Twitter and SoftwareApplication/FAQ copy now emphasise connected validation workflows and built-in drafting intelligence.
- English and Arabic DVS copy now use the same evidence standard: no fabricated adoption, limited-slot or fixed time-saving statements.
- Detailed 30-minute demo is positioned as the second, qualified conversion step.
- Homepage discovery call is now a 10-minute fit check.
- Homepage, About, founder bio, geographic copy and AI-readable company data now reflect founder-led delivery and the verified August 2026 figures.
- Saudi Arabia experience is identified as founder employment experience and is not counted as a PHARPRO client engagement.
- The legacy fixed-savings article redirects to the buyer-specific DVS ROI model.
- FAQ controls now expose accurate `aria-expanded` state.
- Sticky CTA appears only after the hero leaves view and points to the low-friction route.

### Removed / withheld

- Fixed hours/days-saved claims that were not supported by a published method or client evidence.
- Unapproved named client quotations, star ratings and “Verified Client” labels from the homepage.
- Absolute “AI-powered and compliant” phrasing.
- Artificial “10 project spots” scarcity.
- Legacy “same-day deployment” and unmeasured percentage/time-reduction promises.

## Open blockers requiring owner action

- Provide written client permissions, exact approved quotations, original logo files, project photographs and measurable case-study baselines/outcomes.
- Confirm that PHARPRO can operationally honour a 10-minute response workflow and one-business-day contact expectation.
- Provide Cloudflare access to create the external staging deployment.
- Select the CRM and provide a server-side integration credential plus field mapping.
- Create a dedicated 10-minute Calendly event only if the business wants instant self-booking; the current Calendly URL remains reserved for the detailed 30-minute demo.
