# PHARPRO Verified Evidence QA Checklist

Record tester, date, environment URL, browser version and result for every manual item. Use synthetic B2B data only.

## Automated release gate

- [ ] `npm ci` completes without an unexpected lockfile change.
- [ ] `npm test` passes.
- [ ] `node --check server.js` passes.
- [ ] `node --check cloudflare-worker.js` passes.
- [ ] `node --check js/dvs-growth.js` passes.
- [ ] Sitemap, feed, canonicals, JSON-LD, internal links and orphan checks pass.
- [ ] Unknown URL returns 404; known obsolete URL returns 301.

## Content and SEO

- [ ] Homepage and DVS page each have one visible H1.
- [ ] DVS title and description match the rendered offer and fit within the automated limits.
- [ ] Canonical is `https://pharpro.co/services/dvs/`.
- [ ] English/Arabic hreflang is reciprocal.
- [ ] SoftwareApplication and FAQ JSON-LD parse without errors.
- [ ] No artificial scarcity, live-user counters or unsupported fixed savings claims appear.
- [ ] Homepage, About and `/projects/` show 12 completed engagements, 2 active projects and 7 PHARPRO markets as of August 2026.
- [ ] Founder employment experience in Saudi Arabia is not represented as a PHARPRO client engagement.
- [ ] Priority pages describe PHARPRO as founder-led and do not imply an undisclosed technical team.
- [ ] No client logo, quote or measurable outcome appears without written approval.
- [ ] Founder name, role, portrait and contact details are correct.

## Funnel and analytics

- [ ] 10-minute form rejects empty name, invalid email and empty company.
- [ ] Successful fit-check submission reaches the approved Web3Forms inbox.
- [ ] Success message is announced through `aria-live` and the button cannot double-submit.
- [ ] Failed submission preserves entered data and offers an email fallback.
- [ ] Detailed demo step 1 validates email/company before step 2.
- [ ] Detailed demo sends every qualification field and UTM field.
- [ ] Calendly loads only after Web3Forms confirms success.
- [ ] GA4 DebugView receives `form_start` and `generate_lead` for fit checks.
- [ ] GA4 DebugView receives `generate_lead`, `calendar_view` and `appointment_scheduled` for demos.
- [ ] No name, email, phone or company value is sent to GA4.

## Accessibility

- [ ] Keyboard can reach and operate navigation, all CTAs, both forms and FAQ controls.
- [ ] Focus indicator remains visible on every interactive element.
- [ ] FAQ `aria-expanded` switches between `true` and `false`.
- [ ] Founder image has accurate alt text and explicit width/height.
- [ ] Form fields have programmatic labels, autocomplete and required state.
- [ ] Text remains readable at 200% zoom and 320 CSS px viewport width.
- [ ] Reduced-motion mode suppresses non-essential animation.
- [ ] Screen-reader pass completed with VoiceOver or NVDA.

## Responsive and cross-browser matrix

| Browser / device | 320–390 px | 768 px | Desktop | Forms | Sticky CTA | Result |
|---|---:|---:|---:|---:|---:|---|
| Chrome current, Android | [ ] | [ ] | N/A | [ ] | [ ] | |
| Safari current, iPhone | [ ] | [ ] | [ ] | [ ] | [ ] | |
| Firefox current | [ ] | [ ] | [ ] | [ ] | [ ] | |
| Edge current | [ ] | [ ] | [ ] | [ ] | [ ] | |

Verify no horizontal scrolling, clipped text, overlapping consent/WhatsApp/sticky controls, layout shift from the founder image, or hidden validation messages.

## Performance and privacy

- [ ] Founder WebP is served at its intrinsic 240 × 240 dimensions and remains below 20 KB.
- [ ] Below-fold founder images use lazy loading and async decoding.
- [ ] No new render-blocking JavaScript was added.
- [ ] Consent decline prevents GA4 loading; acceptance enables it.
- [ ] Web3Forms allowed domains include only production and approved staging hosts.
- [ ] Forms warn users not to submit patient, confidential or regulated production data.
- [ ] Every Web3Forms page links to `/privacy/` adjacent to its form.
- [ ] Cloudflare/CRM/Calendly secrets are absent from HTML, JavaScript, git diff and logs.

## Release acceptance

- [ ] Content owner approved founder details and offer wording.
- [ ] Sales owner approved the one-business-day follow-up SLA.
- [ ] Privacy owner approved form purpose and retention path.
- [ ] Production backup and previous Cloudflare deployment ID recorded.
- [ ] Rollback owner is available during deployment window.
- [ ] GA4 release annotation and Search Console sitemap submission completed.
