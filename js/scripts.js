/*!
 * PHARPRO Website — Custom Scripts
 * Arabic / English i18n + RTL support
 */

/* ── TRAINING DATA — edit here to update the calendar ─────────── */
const TRAINING_DATA = {
  upcoming: [
    {
      en: "CSV Validation Training",
      ar: "تدريب التحقق من CSV",
      desc_en: "Master the full CSV lifecycle from URS through IQ/OQ/PQ — aligned with FDA 21 CFR Part 11, EU GMP Annex 11, and GAMP 5.",
      desc_ar: "أتقن دورة حياة CSV الكاملة من URS حتى IQ/OQ/PQ — وفقاً لـ FDA 21 CFR Part 11 وGAMP 5.",
      format: "both",
    },
    {
      en: "Compressed Air Testing",
      ar: "اختبار الهواء المضغوط",
      desc_en: "Hands-on training on pharmaceutical compressed air testing per ISO 8573 — sampling strategies, risk assessment, and GMP documentation.",
      desc_ar: "تدريب عملي على اختبار الهواء المضغوط الدوائي واستراتيجيات أخذ العينات وتوثيق GMP.",
      format: "both",
    },
    {
      en: "GMP Training",
      ar: "تدريب GMP",
      desc_en: "Core GMP principles for pharmaceutical manufacturing — regulatory expectations, data integrity, CAPA, and audit readiness.",
      desc_ar: "مبادئ GMP الأساسية للتصنيع الدوائي — التوقعات التنظيمية وسلامة البيانات والاستعداد للتدقيق.",
      format: "both",
    },
    {
      en: "Cleaning Validation",
      ar: "التحقق من التنظيف",
      desc_en: "EU GMP Annex 15 & FDA-aligned cleaning validation — MACO calculations, acceptance criteria, swab/rinse sampling, and documentation.",
      desc_ar: "التحقق من التنظيف وفق EU GMP Annex 15 وFDA — حسابات MACO ومعايير القبول وأخذ العينات.",
      format: "both",
    },
    {
      en: "Thermal Mapping Training",
      ar: "تدريب الخرائط الحرارية",
      desc_en: "Temperature distribution studies and thermal mapping qualification for warehouses, cold rooms, and manufacturing areas — aligned with WHO, EU GMP, and ASHRAE standards.",
      desc_ar: "دراسات توزيع درجات الحرارة وتأهيل الخرائط الحرارية للمستودعات والغرف الباردة — وفق معايير WHO وEU GMP وASHRAE.",
      format: "both",
    },
    {
      en: "Good Supply & Distribution Practice (GSDP)",
      ar: "ممارسات التوريد والتوزيع الجيدة (GSDP)",
      desc_en: "GDP/GSDP regulations for pharmaceutical distribution — WHO GDP guidelines, EU GDP Directive, storage conditions, cold chain management, and documentation requirements.",
      desc_ar: "لوائح GDP/GSDP لتوزيع الأدوية — إرشادات WHO للتوزيع الجيد وتوجيه EU GDP وإدارة سلسلة التبريد ومتطلبات التوثيق.",
      format: "both",
    },
    {
      en: "Quality Culture Training",
      ar: "تدريب ثقافة الجودة",
      desc_en: "Building a pharmaceutical quality culture — human error prevention, behavioural GMP, quality mindset, leadership in compliance, and right-first-time principles.",
      desc_ar: "بناء ثقافة الجودة الدوائية — الوقاية من الخطأ البشري وGMP السلوكي وعقلية الجودة والقيادة في الامتثال.",
      format: "both",
    },
    {
      en: "Data Integrity Training",
      ar: "تدريب سلامة البيانات",
      desc_en: "ALCOA+ principles, FDA and MHRA data integrity expectations, audit trail review, computerised system controls, and common data integrity failure modes.",
      desc_ar: "مبادئ ALCOA+ وتوقعات FDA وMHRA لسلامة البيانات ومراجعة مسارات التدقيق وضوابط الأنظمة الحاسوبية.",
      format: "both",
    },
    {
      en: "Medical Devices — ISO 13485",
      ar: "الأجهزة الطبية — ISO 13485",
      desc_en: "ISO 13485:2016 quality management system requirements for medical device manufacturers — risk management, design controls, traceability, and regulatory submissions.",
      desc_ar: "متطلبات ISO 13485:2016 لنظام إدارة الجودة لمصنّعي الأجهزة الطبية — إدارة المخاطر وضوابط التصميم والتتبعية.",
      format: "both",
    },
    {
      en: "EU GMP Annex 1 Training",
      ar: "تدريب EU GMP الملحق 1",
      desc_en: "The 2022 revised EU GMP Annex 1 for sterile medicinal products — Contamination Control Strategy (CCS), cleanroom design, environmental monitoring, and barrier technologies.",
      desc_ar: "المراجعة 2022 لـ EU GMP Annex 1 للمنتجات الدوائية المعقمة — استراتيجية التحكم في التلوث وتصميم غرف النظافة والمراقبة البيئية.",
      format: "both",
    },
    {
      en: "Environmental Monitoring — ISO 14644",
      ar: "المراقبة البيئية — ISO 14644",
      desc_en: "Cleanroom classification and environmental monitoring programmes per ISO 14644 — particle counting, microbial monitoring, EM trending, and regulatory expectations for aseptic processing.",
      desc_ar: "تصنيف غرف النظافة وبرامج المراقبة البيئية وفق ISO 14644 — عد الجسيمات والمراقبة الميكروبية واتجاهات EM.",
      format: "both",
    },
  ],
  completed: [
    { en: "Excel Sheet Validation", ar: "التحقق من جداول Excel" },
  ],
};

/* ── TRANSLATIONS ─────────────────────────────────────────────── */
const translations = {
  en: {
    /* Navbar */
    nav_services:   "Services",
    nav_csv:        "CSV Validation",
    nav_qa:         "QA & Gap Assessment",
    nav_cqv:        "CQV & Thermal Mapping",
    nav_training:   "Training",
    nav_dvs:        "DVS Software",
    nav_process:    "How We Work",
    nav_faq:        "FAQ",
    nav_insights:   "Insights",
    nav_cta:        "Free Assessment",

    /* Hero */
    hero_pill:      "Trusted by pharma teams in 7+ countries",
    hero_h1:        'Pharma Compliance Consulting, Built on Integrity — <span class="accent">Inspection-Ready.</span>',
    hero_sub:       "Pharmaceutical CSV, QA, CQV, and compliance consulting — honest findings, clear documentation, inspection-ready outcomes. Aligned with FDA 21 CFR Part 11, EU GMP Annex 11, and GAMP 5. Serving regulated operations across 7+ countries.",
    hero_btn1:      "Get Free Assessment",
    hero_btn2:      "Explore Services",
    hero_badge:     "Inspection-Ready Approach",
    hero_card_h3:   "Built for regulated operations",
    hero_card_p:    "Structured to hold up in the audit room — every time.",
    hero_check1:    "Computerized System Validation (CSV)",
    hero_check2:    "QA, Gap Assessment &amp; Compliance",
    hero_check3:    "CQV, Thermal Mapping &amp; Training",
    hero_check4:    "AI-Assisted Digital Validation (DVS)",
    hero_card_cta:  "Request a Proposal",

    /* Stats */
    stat1_label: "Years Experience",
    stat2_label: "Projects Completed",
    stat3_label: "Active Clients",
    stat4_label: "Countries Served",

    /* Services */
    svc_eyebrow: "Services",
    svc_h2:      "Everything your compliance programme needs",
    svc_body:    "",
    svc1_h3: "Computerized System Validation",
    svc1_p:  "Full CSV lifecycle — planning through closure — aligned with FDA 21 CFR Part 11, EU GMP Annex 11, and GAMP 5.",
    svc2_h3: "Quality Assurance &amp; Gap Assessment",
    svc2_p:  "Find gaps before auditors do. SOP reviews, QA assessments, and CAPA support to close findings fast.",
    svc3_h3: "CQV &amp; Thermal Mapping",
    svc3_p:  "Equipment and utility qualification, plus temperature distribution studies for controlled storage environments.",
    svc4_h3: "GMP Training",
    svc4_p:  "CSV, data integrity, and GMP training tailored to your team's actual gaps. Delivered on-site or online.",
    svc5_h3: "Digital Validation Software",
    svc5_p:  "AI-assisted validation lifecycle management. 30 document builders, one compliant platform.",
    svc6_h3: "Not sure where to start?",
    svc6_p:  "Tell us your situation. We'll find what matters most and give you a clear path forward.",
    svc6_cta: "Start Free Assessment",
    svc_learn:  "→",

    /* DVS */
    dvs_h2:       "30 Document Builders.<br/>One Platform.",
    dvs_p:        "The only validation software built specifically for pharma compliance teams. AI-assisted, audit-ready, and deployed same-day — no consultants, no setup fees.",
    dvs_btn1:     "Explore DVS",
    dvs_btn2:     "Book a Demo",
    dvs_feat1_h4: "AI Drafting",
    dvs_feat1_p:  "Generate protocol content in minutes instead of 2–3 weeks",
    dvs_feat2_h4: "FDA Compliance",
    dvs_feat2_p:  "Built-in alignment with 21 CFR Part 11 and EU GMP Annex 11",
    dvs_feat3_h4: "Full Traceability",
    dvs_feat3_p:  "Requirements auto-linked through every test phase automatically",
    dvs_feat4_h4: "Workflow Engine",
    dvs_feat4_p:  "Configurable approval workflows replacing manual handwritten cycles",
    dvs_feat5_h4: "Digital Documents",
    dvs_feat5_p:  "Over 1,500 paper pages saved per validation project",
    dvs_feat6_h4: "Same-Day Deployment",
    dvs_feat6_p:  "No implementation partner needed. Deploy today, validate tomorrow.",
    dvs_feats_h2:    "Everything Built In",
    dvs_illus_tag:   "V-Model Lifecycle",
    dvs_illus_title: "Full Validation Coverage",
    phase1_h4:  "Concept Phase",
    phase1_p:   "URS, risk classification, CSV planning documents",
    phase1_save:"Save 60 working hours",
    phase2_h4:  "Project Phase",
    phase2_p:   "IQ OQ PQ protocols, execution &amp; reporting",
    phase2_save:"Save 200 working hours",
    phase3_h4:  "Operation Phase",
    phase3_p:   "Change control, periodic reviews, CAPAs",
    phase3_save:"Save 132 working hours",
    phase4_h4:  "Retirement Phase",
    phase4_p:   "Archival &amp; decommission documentation",
    phase4_save:"Save 136 working hours",
    dvs_total_num: '30 <span>working days</span>',
    dvs_total_lbl: "total savings per validation project",
    dvs_quote: '"One month of DVS Professional costs less than two hours of an external CSV consultant."',

    /* Pricing */
    pricing_eyebrow: "DVS Pricing",
    pricing_h2:   "Simple, transparent pricing",
    pricing_body: "Concurrent-user SaaS — create unlimited accounts, pay only for simultaneous logins.",
    plan1_eyebrow: "Most Popular",
    plan1_tier:   "Professional",
    plan1_conc:   "Up to 10 concurrent users",
    plan1_cta:    "Get Started",
    plan1_per:    "per month",
    plan1_f1: "Unlimited projects",
    plan1_f2: "Full PDF export",
    plan1_f3: "E-signatures &amp; audit trail",
    plan1_f4: "Email support",
    plan2_eyebrow: "Team",
    plan2_tier:   "Team",
    plan2_conc:   "Up to 25 concurrent users",
    plan2_cta:    "Get Started",
    plan2_per:    "per month",
    plan2_f1: "Everything in Professional",
    plan2_f2: "Priority support",
    plan3_eyebrow: "Enterprise",
    plan3_tier:   "Enterprise",
    plan3_conc:   "Unlimited concurrent users",
    plan3_amt:    "Custom",
    plan3_per:    "tailored to your organisation",
    plan3_cta:    "Contact Sales",
    plan3_f1: "SSO &amp; API access",
    plan3_f2: "Dedicated instance",
    plan3_f3: "Custom SLA &amp; onboarding",
    plan3_f4: "SOC 2 compliance report",
    plan3_f5: "Private cloud option",
    plan3_f6: "CSV Master Plan Registry",

    /* Process */
    proc_eyebrow: "How We Work",
    proc_h2:   "From first contact to audit-ready",
    proc_body: "A structured four-step engagement delivering real compliance outcomes — not just paperwork.",
    step1_h4: "Discovery Call",
    step1_p:  "We understand your current state, gaps, systems, and timeline before proposing anything.",
    step2_h4: "Scoped Proposal",
    step2_p:  "Clear scope, timeline, and deliverables — no vague retainers or open-ended engagements.",
    step3_h4: "Structured Execution",
    step3_p:  "Protocols, reviews, approvals, and documentation — done correctly and on time.",
    step4_h4: "Inspection-Ready Output",
    step4_p:  "Deliverables that are audit-defensible, complete, and immediately usable in your quality system.",

    /* Testimonials */
    testi_eyebrow: "Client Feedback",
    testi_h2:   "Trusted by regulated operations",
    testi_body: "How pharmaceutical manufacturers describe working with PHARPRO.",
    testi1_p:    '"PHARPRO supported us with strong technical understanding and practical execution. Their work added real clarity to our validation and compliance activities."',
    testi1_name: "Axantia Group",
    testi1_role: "Quality &amp; Validation · Jordan",
    testi2_p:    '"Professional, responsive, and perfectly aligned with the demands of our regulated environment. PHARPRO delivered without ambiguity."',
    testi2_name: "Dar Al Dawa",
    testi2_role: "Quality Assurance · Jordan",
    testi3_p:    '"PHARPRO helped us approach validation and quality in a more structured, inspection-focused way. Their risk-based methodology was exactly right."',
    testi3_name: "Al Hayat Pharmaceuticals",
    testi3_role: "CSV &amp; Compliance · Jordan",

    /* FAQ */
    faq_eyebrow: "FAQ",
    faq_h2:   "Common questions",
    faq_body: "Questions clients ask before starting an engagement.",
    faq1_q: "What types of pharmaceutical companies do you work with?",
    faq1_a: "Manufacturers, distributors, and contract organizations — from growing regional companies to multinational operations. Particularly suited to companies preparing for regulatory inspections or implementing new systems.",
    faq2_q: "Do you work remotely or on-site?",
    faq2_a: "Both. Remote assessments, documentation reviews, and training with no loss in quality. For hands-on work — thermal mapping, equipment qualification, on-floor audits — we travel to your site. Most engagements combine both.",
    faq3_q: "How long does a typical engagement take?",
    faq3_a: "A focused gap assessment: 2–3 weeks. A full CSV project: typically 6–12 weeks. We define the timeline clearly in our proposal before any commitment is made.",
    faq4_q: "What is included in the Free Assessment?",
    faq4_a: "A discovery call to understand your current compliance situation — systems, processes, timelines, and regulatory priorities. We identify the most important areas and suggest a practical starting point. No obligation, no cost.",
    faq5_q: "What regulatory frameworks does PHARPRO specialise in?",
    faq5_a: "FDA 21 CFR Part 11, EU GMP Annex 11, ISPE GAMP 5, ICH Q10, and general GMP requirements for pharmaceutical manufacturing and distribution.",

    /* Contact */
    contact_eyebrow:       "Contact",
    contact_h2:            "Let's talk about your compliance needs",
    contact_body:          "Start with a free discovery call. We'll listen, ask the right questions, and tell you honestly what you need.",
    contact_email_label:   "Email",
    contact_phone_label:   "Phone / WhatsApp",
    contact_loc_label:     "Location",
    contact_loc_text:      "Amman, Jordan — serving clients worldwide",
    contact_li_label:      "LinkedIn",
    form_h3:               "Send us a message",
    form_p:                "We respond within 24 hours on business days.",
    form_name_label:       "Full Name *",
    form_name_ph:          "Your name",
    form_company_label:    "Company",
    form_company_ph:       "Your company",
    form_email_label:      "Email Address *",
    form_email_ph:         "you@company.com",
    form_service_label:    "Service of Interest",
    form_service_opt0:     "Select a service…",
    form_service_opt1:     "Computerized System Validation (CSV)",
    form_service_opt2:     "Quality Assurance &amp; Gap Assessment",
    form_service_opt3:     "CQV &amp; Thermal Mapping",
    form_service_opt4:     "GMP Training",
    form_service_opt5:     "Pharma Digital Support",
    form_service_opt6:     "PHARPRO DVS — Digital Validation Software",
    form_service_opt7:     "Not sure — need guidance",
    form_phone_label:      "Phone / WhatsApp",
    form_phone_ph:         "+962 79 000 0000",
    form_message_label:    "Message *",
    form_message_ph:       "Describe your situation or challenge…",
    form_submit:           "Send Message",
    form_priv:             "Your information is kept private",
    form_success:          "Thank you! We'll be in touch within 24 hours.",
    form_error:            "Something went wrong. Please try again.",

    /* Footer */
    /* Training */
    tr_eyebrow:     "GMP Training",
    tr_h2:          "Training Programmes",
    tr_body:        "Instructor-led training — on-site and online — for pharma teams. Register your interest to be notified when dates are confirmed.",
    tr_upcoming_h3: "Upcoming Trainings",
    tr_past_h3:     "Completed Programmes",
    tr_past_note:   "Building expertise across the pharmaceutical sector",
    tr_online:      "Online",
    tr_onsite:      "On-site",
    tr_register:    "Register Interest",
    tr_share_wa:    "WhatsApp",
    tr_share_email: "Email",
    tr_tbd:         "Date to be announced",

    foot_brand_p:    "Pharmaceutical compliance consulting — CSV, QA, CQV, thermal mapping, and GMP training.",
    foot_col1_h5:    "Services",
    foot_col2_h5:    "Company",
    foot_link_csv:   "Computerized System Validation",
    foot_link_qa:    "Quality Assurance",
    foot_link_cqv:   "CQV &amp; Thermal Mapping",
    foot_link_train: "GMP Training",
    foot_link_dig:   "Digital Support",
    foot_link_about: "About",
    foot_link_cont:  "Contact",
    foot_link_dvs:   "PHARPRO DVS",
    foot_link_li:    "LinkedIn",
    foot_copy:       "© 2025 PHARPRO Consultation Company. All rights reserved.",
    foot_tag:        "Stay Audit-Ready with PHARPRO.",
    wa_cta:          "Chat on WhatsApp",
    hero_pill2:      "Q3 2026 project slots almost full — only 2 remaining",

    /* About section */
    about_eyebrow: "About PHARPRO",
    about_h2:      "The Pharmaceutical Compliance Experts — Jordan &amp; Worldwide",
    about_p1:      "PHARPRO is a pharmaceutical compliance consulting firm based in Amman, Jordan, specialising in CSV, QA, CQV, thermal mapping, and GMP training for regulated manufacturers across the Middle East and globally. Aligned with FDA 21 CFR Part 11, EU GMP Annex 11, and ISPE GAMP 5 — our work is audit-defensible from day one.",
    about_p2:      "We also offer PHARPRO DVS, an AI-assisted validation software platform that cuts documentation time by up to 30 working days per project — deployed same-day, no implementation partner needed.",
    about_p3:      'Every service is delivered by practising consultants — not generalist trainers. <a href="#contact" style="color:#B12C4B;font-weight:600;">Book your free compliance assessment today →</a>',
    about_p4:      "",
  },

  ar: {
    /* Navbar */
    nav_services:   "الخدمات",
    nav_csv:        "التحقق من CSV",
    nav_qa:         "ضمان الجودة",
    nav_cqv:        "CQV والخرائط الحرارية",
    nav_training:   "التدريب",
    nav_dvs:        "برنامج DVS",
    nav_process:    "آلية عملنا",
    nav_faq:        "الأسئلة الشائعة",
    nav_insights:   "المقالات",
    nav_cta:        "تقييم مجاني",

    /* Hero */
    hero_pill:     "موثوق من فرق دوائية في أكثر من 7 دول",
    hero_h1:       'استشارات الامتثال الدوائي بنزاهة وشفافية — <span class="accent">جاهزون للتفتيش.</span>',
    hero_sub:      "استشارات CSV والجودة وCQV والامتثال الدوائي — نتائج صادقة، توثيق واضح، ونتائج جاهزة للتفتيش. متوافقون مع FDA 21 CFR Part 11 وEU GMP Annex 11 وGAMP 5. نخدم العمليات المُنظَّمة في أكثر من 7 دول.",
    hero_btn1:     "احصل على تقييم مجاني",
    hero_btn2:     "استعرض الخدمات",
    hero_badge:    "نهج جاهز للتفتيش",
    hero_card_h3:  "مصمم للعمليات الخاضعة للتنظيم",
    hero_card_p:   "منظم بحيث يصمد في غرفة التدقيق — في كل مرة.",
    hero_check1:   "التحقق من صحة الأنظمة الحاسوبية (CSV)",
    hero_check2:   "ضمان الجودة وتقييم الثغرات والامتثال",
    hero_check3:   "CQV ورسم الخرائط الحرارية والتدريب",
    hero_check4:   "التحقق الرقمي بمساعدة الذكاء الاصطناعي (DVS)",
    hero_card_cta: "طلب اقتراح",

    /* Stats */
    stat1_label: "سنوات خبرة",
    stat2_label: "مشروع منجز",
    stat3_label: "عميل نشط",
    stat4_label: "دول خدمناها",

    /* Services */
    svc_eyebrow: "الخدمات",
    svc_h2:      "كل ما يحتاجه برنامج امتثالك",
    svc_body:    "",
    svc1_h3: "التحقق من صحة الأنظمة الحاسوبية",
    svc1_p:  "دورة حياة CSV الكاملة — من التخطيط حتى الإغلاق — وفقاً لـ FDA وEU GMP وGAMP 5.",
    svc2_h3: "ضمان الجودة وتقييم الثغرات",
    svc2_p:  "اكتشف الثغرات قبل المدققين. مراجعات الإجراءات ودعم CAPA لإغلاق النتائج بسرعة.",
    svc3_h3: "CQV ورسم الخرائط الحرارية",
    svc3_p:  "تأهيل المعدات والمرافق، ودراسات توزيع درجات الحرارة للبيئات المضبوطة.",
    svc4_h3: "التدريب على GMP",
    svc4_p:  "تدريب CSV وسلامة البيانات وGMP مخصص لثغرات فريقك. في الموقع أو عبر الإنترنت.",
    svc5_h3: "برنامج التحقق الرقمي",
    svc5_p:  "إدارة دورة حياة التحقق بمساعدة الذكاء الاصطناعي. 30 أداة وثائق، منصة واحدة.",
    svc6_h3: "لا تعرف من أين تبدأ؟",
    svc6_p:  "أخبرنا بوضعك. سنحدد ما هو الأهم ونعطيك مساراً واضحاً.",
    svc6_cta: "ابدأ بتقييم مجاني",
    svc_learn:  "→",

    /* DVS */
    dvs_h2:       "30 أداة بناء وثائق.<br/>منصة واحدة.",
    dvs_p:        "إدارة دورة حياة التحقق بمساعدة الذكاء الاصطناعي لفرق الأدوية وعلوم الحياة. من المفهوم حتى التقاعد — منظم وموجَّه وجاهز للتدقيق.",
    dvs_btn1:     "استكشف DVS",
    dvs_btn2:     "احجز عرضاً تجريبياً",
    dvs_feat1_h4: "صياغة بالذكاء الاصطناعي",
    dvs_feat1_p:  "توليد محتوى البروتوكول في دقائق بدلاً من 2–3 أسابيع",
    dvs_feat2_h4: "الامتثال لـ FDA",
    dvs_feat2_p:  "مدمج مع متطلبات 21 CFR Part 11 وEU GMP Annex 11",
    dvs_feat3_h4: "تتبع كامل",
    dvs_feat3_p:  "الربط التلقائي للمتطلبات عبر جميع مراحل الاختبار",
    dvs_feat4_h4: "محرك سير العمل",
    dvs_feat4_p:  "سير عمل موافقة قابلة للتهيئة تحل محل الدورات اليدوية",
    dvs_feat5_h4: "وثائق رقمية",
    dvs_feat5_p:  "توفير أكثر من 1500 صفحة ورقية لكل مشروع تحقق",
    dvs_feat6_h4: "نشر في نفس اليوم",
    dvs_feat6_p:  "لا تحتاج إلى شريك تنفيذ. انشر اليوم وتحقق غداً.",
    dvs_feats_h2:    "كل شيء مدمج",
    dvs_illus_tag:   "دورة حياة النموذج V",
    dvs_illus_title: "تغطية تحقق كاملة",
    phase1_h4:  "مرحلة المفهوم",
    phase1_p:   "URS وتصنيف المخاطر ووثائق تخطيط CSV",
    phase1_save:"وفر 60 ساعة عمل",
    phase2_h4:  "مرحلة المشروع",
    phase2_p:   "بروتوكولات IQ OQ PQ والتنفيذ والتقارير",
    phase2_save:"وفر 200 ساعة عمل",
    phase3_h4:  "مرحلة التشغيل",
    phase3_p:   "التحكم في التغييرات والمراجعات الدورية وCAPAs",
    phase3_save:"وفر 132 ساعة عمل",
    phase4_h4:  "مرحلة التقاعد",
    phase4_p:   "وثائق الأرشفة وإلغاء التشغيل",
    phase4_save:"وفر 136 ساعة عمل",
    dvs_total_num: '30 <span>يوم عمل</span>',
    dvs_total_lbl: "إجمالي المدخرات لكل مشروع تحقق",
    dvs_quote: '"شهر واحد من DVS Professional يكلف أقل من ساعتين من مستشار CSV خارجي."',

    /* Pricing */
    pricing_eyebrow: "أسعار DVS",
    pricing_h2:   "أسعار بسيطة وشفافة",
    pricing_body: "SaaS بالمستخدم المتزامن — أنشئ حسابات غير محدودة، وادفع فقط لتسجيلات الدخول المتزامنة.",
    plan1_eyebrow: "الأكثر شعبية",
    plan1_tier:   "الخطة الاحترافية",
    plan1_conc:   "حتى 10 مستخدمين متزامنين",
    plan1_cta:    "ابدأ الآن",
    plan1_per:    "شهريًا",
    plan1_f1: "مشاريع غير محدودة",
    plan1_f2: "تصدير PDF كامل",
    plan1_f3: "التوقيعات الإلكترونية ومسار التدقيق",
    plan1_f4: "دعم عبر البريد الإلكتروني",
    plan2_eyebrow: "الفريق",
    plan2_tier:   "خطة الفريق",
    plan2_conc:   "حتى 25 مستخدماً متزامناً",
    plan2_cta:    "ابدأ الآن",
    plan2_per:    "شهريًا",
    plan2_f1: "كل ما في الخطة الاحترافية",
    plan2_f2: "دعم ذو أولوية",
    plan3_eyebrow: "المؤسسة",
    plan3_tier:   "خطة المؤسسة",
    plan3_conc:   "مستخدمون متزامنون غير محدودين",
    plan3_amt:    "مخصص",
    plan3_per:    "مصمم لمؤسستك",
    plan3_cta:    "اتصل بالمبيعات",
    plan3_f1: "تسجيل الدخول الموحد وصول API",
    plan3_f2: "نسخة مخصصة",
    plan3_f3: "اتفاقية خدمة مخصصة وتأهيل",
    plan3_f4: "تقرير امتثال SOC 2",
    plan3_f5: "خيار السحابة الخاصة",
    plan3_f6: "سجل خطة CSV الرئيسية",

    /* Process */
    proc_eyebrow: "آلية عملنا",
    proc_h2:   "من أول تواصل إلى جاهز للتدقيق",
    proc_body: "تعامل منظم من أربع خطوات يُحقق نتائج امتثال حقيقية — ليس مجرد أوراق.",
    step1_h4: "مكالمة استكشافية",
    step1_p:  "نفهم وضعك الحالي وثغراتك وأنظمتك وجدولك الزمني قبل اقتراح أي شيء.",
    step2_h4: "اقتراح محدد النطاق",
    step2_p:  "نطاق وجدول زمني وتسليمات واضحة — لا احتجازات غامضة أو تعاملات مفتوحة.",
    step3_h4: "تنفيذ منظم",
    step3_p:  "البروتوكولات والمراجعات والموافقات والتوثيق — يتم بشكل صحيح وفي الوقت المحدد.",
    step4_h4: "مخرجات جاهزة للتفتيش",
    step4_p:  "مستندات يمكن الدفاع عنها في التدقيق وكاملة وقابلة للاستخدام فوراً في نظام الجودة الخاص بك.",

    /* Testimonials */
    testi_eyebrow: "آراء العملاء",
    testi_h2:   "موثوق من العمليات الخاضعة للتنظيم",
    testi_body: "كيف يصف مصنعو الأدوية التعامل مع PHARPRO.",
    testi1_p:    '"دعمنا PHARPRO بفهم تقني قوي وتنفيذ عملي. أضاف عملهم وضوحاً حقيقياً لأنشطة التحقق والامتثال لدينا."',
    testi1_name: "مجموعة أكسانتيا",
    testi1_role: "الجودة والتحقق · الأردن",
    testi2_p:    '"محترفون ومستجيبون ومتوافقون تماماً مع متطلبات بيئتنا الخاضعة للتنظيم. قدّم PHARPRO العمل بلا غموض."',
    testi2_name: "دار الدواء",
    testi2_role: "ضمان الجودة · الأردن",
    testi3_p:    '"ساعدنا PHARPRO على التعامل مع التحقق والجودة بطريقة أكثر تنظيماً وتركيزاً على التفتيش. منهجيتهم القائمة على المخاطر كانت صحيحة تماماً."',
    testi3_name: "الحياة للأدوية",
    testi3_role: "CSV والامتثال · الأردن",

    /* FAQ */
    faq_eyebrow: "الأسئلة الشائعة",
    faq_h2:   "أسئلة شائعة",
    faq_body: "أسئلة يطرحها العملاء قبل بدء التعامل.",
    faq1_q: "ما أنواع الشركات الدوائية التي تعملون معها؟",
    faq1_a: "الشركات المصنِّعة والموزِّعة وتنظيمات العقود — من الشركات الإقليمية النامية إلى العمليات متعددة الجنسيات. مناسبة بشكل خاص للشركات التي تستعد للتفتيش التنظيمي أو تطبّق أنظمة جديدة.",
    faq2_q: "هل تعملون عن بُعد أم في الموقع؟",
    faq2_a: "كلاهما. التقييمات عن بُعد ومراجعة الوثائق والتدريب دون فقدان الجودة. للعمل العملي — رسم الخرائط الحرارية وتأهيل المعدات والتدقيق الميداني — نسافر إلى موقعك. معظم التعاملات تجمع الاثنين.",
    faq3_q: "كم يستغرق التعامل النموذجي؟",
    faq3_a: "تقييم الثغرات المركّز: أسبوعان إلى ثلاثة أسابيع. مشروع CSV كامل: عادةً 6–12 أسبوعاً. نحدد الجدول الزمني بوضوح في اقتراحنا قبل أي التزام.",
    faq4_q: "ماذا يتضمن التقييم المجاني؟",
    faq4_a: "مكالمة استكشافية لفهم وضع امتثالك الحالي — الأنظمة والعمليات والجداول الزمنية والأولويات التنظيمية. نحدد أهم المجالات ونقترح نقطة انطلاق عملية. بلا التزام، بلا تكلفة.",
    faq5_q: "ما الأطر التنظيمية التي يتخصص فيها PHARPRO؟",
    faq5_a: "FDA 21 CFR Part 11 وEU GMP Annex 11 وISPE GAMP 5 وICH Q10 ومتطلبات GMP العامة لتصنيع الأدوية وتوزيعها.",

    /* Contact */
    contact_eyebrow:     "اتصل بنا",
    contact_h2:          "لنتحدث عن احتياجات امتثالك",
    contact_body:        "ابدأ بمكالمة استكشافية مجانية. سنستمع ونطرح الأسئلة الصحيحة ونخبرك بصدق بما تحتاجه.",
    contact_email_label: "البريد الإلكتروني",
    contact_phone_label: "الهاتف / واتساب",
    contact_loc_label:   "الموقع",
    contact_loc_text:    "عمّان، الأردن — نخدم العملاء في جميع أنحاء العالم",
    contact_li_label:    "لينكد إن",
    form_h3:             "أرسل لنا رسالة",
    form_p:              "نرد خلال 24 ساعة في أيام العمل.",
    form_name_label:     "الاسم الكامل *",
    form_name_ph:        "اسمك",
    form_company_label:  "الشركة",
    form_company_ph:     "شركتك",
    form_email_label:    "عنوان البريد الإلكتروني *",
    form_email_ph:       "you@company.com",
    form_service_label:  "الخدمة المطلوبة",
    form_service_opt0:   "اختر خدمة...",
    form_service_opt1:   "التحقق من صحة الأنظمة الحاسوبية (CSV)",
    form_service_opt2:   "ضمان الجودة وتقييم الثغرات",
    form_service_opt3:   "CQV ورسم الخرائط الحرارية",
    form_service_opt4:   "التدريب على GMP",
    form_service_opt5:   "الدعم الرقمي الدوائي",
    form_service_opt6:   "PHARPRO DVS — برنامج التحقق الرقمي",
    form_service_opt7:   "غير متأكد — أحتاج إلى توجيه",
    form_phone_label:    "الهاتف / واتساب",
    form_phone_ph:       "+962 79 000 0000",
    form_message_label:  "الرسالة *",
    form_message_ph:     "صف وضعك أو تحديك...",
    form_submit:         "إرسال الرسالة",
    form_priv:           "معلوماتك تُحفظ بسرية",
    form_success:        "شكراً! سنتواصل معك خلال 24 ساعة.",
    form_error:          "حدث خطأ. الرجاء المحاولة مرة أخرى.",

    /* Training */
    tr_eyebrow:     "التدريب على GMP",
    tr_h2:          "برامج التدريب",
    tr_body:        "تدريب بإشراف مدرب — حضورياً وعبر الإنترنت — لفرق الأدوية. سجّل اهتمامك لتُبلَّغ عند تأكيد المواعيد.",
    tr_upcoming_h3: "التدريبات القادمة",
    tr_past_h3:     "البرامج المكتملة",
    tr_past_note:   "بناء الخبرة عبر القطاع الدوائي",
    tr_online:      "إلكتروني",
    tr_onsite:      "حضوري",
    tr_register:    "سجّل اهتمامك",
    tr_share_wa:    "واتساب",
    tr_share_email: "بريد إلكتروني",
    tr_tbd:         "سيُحدَّد التاريخ لاحقاً",

    /* Footer */
    foot_brand_p:    "استشارات الامتثال الدوائي — التحقق من صحة الأنظمة الحاسوبية وضمان الجودة وCQV ورسم الخرائط الحرارية والتدريب على GMP.",
    foot_col1_h5:    "الخدمات",
    foot_col2_h5:    "الشركة",
    foot_link_csv:   "التحقق من صحة الأنظمة الحاسوبية",
    foot_link_qa:    "ضمان الجودة",
    foot_link_cqv:   "CQV ورسم الخرائط الحرارية",
    foot_link_train: "التدريب على GMP",
    foot_link_dig:   "الدعم الرقمي",
    foot_link_about: "من نحن",
    foot_link_cont:  "اتصل بنا",
    foot_link_dvs:   "PHARPRO DVS",
    foot_link_li:    "لينكد إن",
    foot_copy:       "© 2025 PHARPRO Consultation Company. جميع الحقوق محفوظة.",
    foot_tag:        "ابقَ جاهزاً للتدقيق مع PHARPRO.",
    wa_cta:          "تحدث معنا على واتساب",
    hero_pill2:      "نقبل الآن مشاركات الربع الثالث 2026 — مقاعد محدودة",

    /* About section */
    about_eyebrow: "عن PHARPRO",
    about_h2:      "خبراء الامتثال الدوائي — الأردن والعالم",
    about_p1:      "PHARPRO شركة استشارات امتثال دوائي مقرها عمّان، الأردن، متخصصة في CSV وضمان الجودة وCQV ورسم الخرائط الحرارية والتدريب على GMP للشركات الخاضعة للتنظيم في الشرق الأوسط وعالمياً. متوافقة مع FDA 21 CFR Part 11 وEU GMP Annex 11 وISPE GAMP 5 — أعمالنا قابلة للدفاع عنها في التدقيق من اليوم الأول.",
    about_p2:      "نقدم أيضاً PHARPRO DVS، منصة برمجيات تحقق بمساعدة الذكاء الاصطناعي توفر ما يصل إلى 30 يوم عمل لكل مشروع — تُنشر في نفس اليوم، بدون الحاجة إلى شريك تنفيذ.",
    about_p3:      '<a href="#contact" style="color:#B12C4B;font-weight:600;">احجز تقييمك المجاني اليوم →</a>',
    about_p4:      "",
  }
};


function preserveLang() {
  document.querySelectorAll('a[href]').forEach(function(a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|\/\/)/.test(href)) return;
    var parts = href.split('?');
    var base = parts[0];
    var params = new URLSearchParams(parts[1] || '');
    if (currentLang === 'ar') { params.set('lang', 'ar'); } else { params.delete('lang'); }
    var qs = params.toString();
    a.setAttribute('href', base + (qs ? '?' + qs : ''));
  });
}

/* ── i18n ENGINE ──────────────────────────────────────────────── */
const _urlLang = new URLSearchParams(window.location.search).get("lang");
let currentLang = (_urlLang === "ar" || _urlLang === "en")
  ? _urlLang
  : (localStorage.getItem("pharpro_lang") || "en");

function t(key) {
  return (translations[currentLang] && translations[currentLang][key]) ||
         (translations.en[key]) || "";
}

function applyTranslations() {
  const lang = currentLang;
  const isAr = lang === "ar";

  /* Direction & lang attribute */
  document.documentElement.lang = lang;
  document.documentElement.dir  = isAr ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isAr);

  /* All elements with data-i18n */
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val !== undefined && val !== "") el.innerHTML = val;
  });

  /* Placeholders */
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    const val = t(key);
    if (val) el.placeholder = val;
  });

  /* Update lang toggle label */
  const toggleBtns = document.querySelectorAll(".lang-toggle");
  toggleBtns.forEach(btn => {
    btn.textContent = isAr ? "EN" : "عربي";
    btn.setAttribute("aria-label", isAr ? "Switch to English" : "التبديل إلى العربية");
  });
  preserveLang();
}

function switchLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("pharpro_lang", currentLang);
  const url = new URL(window.location.href);
  if (currentLang === "ar") {
    url.searchParams.set("lang", "ar");
  } else {
    url.searchParams.delete("lang");
  }
  history.replaceState(null, "", url.toString());
  const mobNav = document.getElementById("mobNav");
  if (mobNav) mobNav.classList.remove("open");
  applyTranslations();
  initTrainings();
  tickCountdowns();
}

/* ── HAMBURGER MENU ───────────────────────────────────────────── */
/* ── DESKTOP NAV DROPDOWN — keyboard & touch accessible ───────── */
function initNavDropdown() {
  document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
    const trigger = dropdown.querySelector(":scope > a");
    const menu    = dropdown.querySelector(".nav-dropdown-menu");
    if (!trigger || !menu) return;

    let closeTimer;

    function openMenu() {
      clearTimeout(closeTimer);
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
      trigger.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
      closeTimer = setTimeout(() => {
        menu.style.display = "";
        trigger.setAttribute("aria-expanded", "false");
      }, 400);
    }

    /* Click / touch toggle */
    trigger.addEventListener("click", e => {
      const isOpen = menu.style.display === "flex";
      if (isOpen) { closeMenu(); } else { e.preventDefault(); openMenu(); }
    });

    /* Keep open while mouse is over the menu */
    dropdown.addEventListener("mouseenter", openMenu);
    dropdown.addEventListener("mouseleave", closeMenu);
    menu.addEventListener("mouseenter", () => clearTimeout(closeTimer));
    menu.addEventListener("mouseleave", closeMenu);

    /* Keyboard: Escape closes, Tab away closes */
    trigger.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMenu(); trigger.focus(); }
      if (e.key === "Escape") closeMenu();
    });
    menu.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeMenu(); trigger.focus(); }
    });

    /* Close when focus leaves the dropdown entirely */
    dropdown.addEventListener("focusout", e => {
      if (!dropdown.contains(e.relatedTarget)) closeMenu();
    });

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
  });
}

function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobNav    = document.getElementById("mobNav");
  if (hamburger && mobNav) {
    hamburger.addEventListener("click", () => {
      mobNav.classList.toggle("open");
    });
    mobNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobNav.classList.remove("open"));
    });
    mobNav.querySelectorAll("button.lang-toggle").forEach(btn => {
      btn.addEventListener("click", () => mobNav.classList.remove("open"));
    });
  }
}

/* ── FAQ ACCORDION ────────────────────────────────────────────── */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    if (btn) {
      btn.addEventListener("click", () => {
        const open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(o => o.classList.remove("open"));
        if (!open) item.classList.add("open");
      });
    }
  });
}

/* ── TBD BADGE HELPER ─────────────────────────────────────────── */
function getTbdHtml(isAr) {
  return `<span class="tr-countdown tr-cd-tbd">
            <span class="tr-cd-dot" aria-hidden="true"></span>
            ${isAr ? "سيُحدَّد التاريخ لاحقاً" : "Date to be announced"}
          </span>`;
}

/* ── TRAINING CALENDAR ────────────────────────────────────────── */
function initTrainings() {
  const upcomingGrid = document.getElementById("trUpcomingGrid");
  const tagsGrid     = document.getElementById("trTagsGrid");
  if (!upcomingGrid || !tagsGrid) return;

  const isAr = currentLang === "ar";

  upcomingGrid.innerHTML = TRAINING_DATA.upcoming.map(tr => {
    const title = isAr ? tr.ar : tr.en;
    const desc  = isAr ? tr.desc_ar : tr.desc_en;
    const seats = tr.seats || 0;

    const formatTag = tr.format === "both"
      ? `<span class="tr-pill tr-pill-online">${t("tr_online")}</span><span class="tr-pill tr-pill-onsite">${t("tr_onsite")}</span>`
      : tr.format === "online"
        ? `<span class="tr-pill tr-pill-online">${t("tr_online")}</span>`
        : `<span class="tr-pill tr-pill-onsite">${t("tr_onsite")}</span>`;

    const regUrl = "https://pharpro.co/#contact";
    const waText = encodeURIComponent(
      isAr
        ? `🎓 ${title}\n\nسجّل اهتمامك: ${regUrl}`
        : `🎓 ${title}\n\nRegister your interest: ${regUrl}`
    );
    const emailSubject = encodeURIComponent(
      isAr ? `تدريب PHARPRO: ${title}` : `PHARPRO Training: ${title}`
    );
    const emailBody = encodeURIComponent(
      isAr
        ? `السلام عليكم،\n\nأودّ الاستفسار عن برنامج التدريب: ${title}\n\nرابط التسجيل: ${regUrl}`
        : `Hello,\n\nI'd like to register my interest in:\n${title}\n\nRegistration link: ${regUrl}`
    );

    return `
      <div class="tr-card">
        <div class="tr-countdown-wrap tr-countdown-abs">${getTbdHtml(isAr)}</div>
        <div class="tr-card-top">
          <h4>${title}</h4>
          <div class="tr-format-inline">${formatTag}</div>
        </div>
        <p class="tr-desc">${desc}</p>
        <div class="tr-actions">
          <a href="#contact" class="tr-register" onclick="document.getElementById('service').value='training'">${t("tr_register")}</a>
          <div class="tr-share">
            <a href="https://wa.me/?text=${waText}"
               class="tr-share-btn tr-share-wa" target="_blank" rel="noopener noreferrer"
               aria-label="Share on WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:?subject=${emailSubject}&body=${emailBody}"
               class="tr-share-btn tr-share-email"
               aria-label="Share via Email">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>`;
  }).join("");

  tagsGrid.innerHTML = TRAINING_DATA.completed.map(tr => {
    const label = isAr ? tr.ar : tr.en;
    return `
      <div class="tr-tag">
        <span class="tr-tag-check">✓</span>
        <span>${label}</span>
      </div>`;
  }).join("");
}

/* ── CONTACT FORM ─────────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    btn.disabled    = true;
    btn.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Sending…";

    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        status.className = "f-status ok";
        status.textContent = t("form_success");
        form.reset();
        if (window.gtag) {
          gtag("event", "generate_lead", {
            event_category: "lead",
            event_label: "contact_form",
            method: "contact_form",
          });
        }
      } else {
        throw new Error(json.message || "error");
      }
    } catch {
      status.className = "f-status err";
      status.textContent = t("form_error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = t("form_submit");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavDropdown();
  initHamburger();
  initFaq();
  initContactForm();
  applyTranslations();
  initTrainings();

  /* Wire lang toggle buttons */
  document.querySelectorAll(".lang-toggle").forEach(btn => {
    btn.addEventListener("click", switchLanguage);
  });

  /* ── PSYCHOLOGY / CONVERSION LAYER ─────────────────────── */
  initStickyBar();
  initViewerCount();
  initExitIntent();

  /* ── GA4 MICRO-CONVERSION TRACKING ─────────────────────── */
  /* WhatsApp float button */
  const waFloat = document.getElementById("wa-float");
  if (waFloat && window.gtag) {
    waFloat.addEventListener("click", () => {
      gtag("event", "contact", {
        event_category: "engagement",
        event_label: "whatsapp_float",
        method: "whatsapp",
      });
    });
  }

  /* All tel: links (phone clicks) */
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener("click", () => {
      if (window.gtag) {
        gtag("event", "contact", {
          event_category: "engagement",
          event_label: "phone_click",
          method: "phone",
        });
      }
    });
  });

  /* All mailto: links (email clicks) */
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener("click", () => {
      if (window.gtag) {
        gtag("event", "contact", {
          event_category: "engagement",
          event_label: "email_click",
          method: "email",
        });
      }
    });
  });

  /* All WhatsApp wa.me links (training cards, etc.) */
  document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    if (el.id === "wa-float") return;
    el.addEventListener("click", () => {
      if (window.gtag) {
        gtag("event", "contact", {
          event_category: "engagement",
          event_label: "whatsapp_training",
          method: "whatsapp",
        });
      }
    });
  });
});

/* ── STICKY URGENCY BAR ─────────────────────────────────────── */
function initStickyBar() {
  const bar = document.getElementById("sticky-urgency");
  const closeBtn = document.getElementById("su-close-btn");
  if (!bar) return;

  let dismissed = sessionStorage.getItem("su_dismissed");
  if (dismissed) return;

  let shown = false;
  const threshold = document.documentElement.scrollHeight * 0.28;

  function onScroll() {
    if (dismissed) return;
    const scrolled = window.scrollY + window.innerHeight;
    if (!shown && scrolled > threshold) {
      bar.classList.add("visible");
      shown = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      bar.classList.remove("visible");
      sessionStorage.setItem("su_dismissed", "1");
      dismissed = true;
    });
  }

  /* Close bar when clicking the CTA link */
  const suCta = bar.querySelector(".su-btn");
  if (suCta) {
    suCta.addEventListener("click", () => {
      sessionStorage.setItem("su_dismissed", "1");
      dismissed = true;
      if (window.gtag) {
        gtag("event", "generate_lead", {
          event_category: "lead",
          event_label: "sticky_bar",
          method: "sticky_bar",
        });
      }
    });
  }
}

/* ── LIVE VIEWER COUNT OSCILLATOR ───────────────────────────── */
function initViewerCount() {
  const el = document.getElementById("su-viewers");
  if (!el) return;

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let count = randomBetween(4, 7);

  function updateCount() {
    /* Drift ±1 with 60% probability, stay with 40% */
    const drift = Math.random();
    if (drift < 0.3 && count < 8) count++;
    else if (drift < 0.6 && count > 2) count--;
    el.textContent = count + " people viewing now";
  }

  setInterval(updateCount, 14000 + Math.random() * 8000);
}

/* ── EXIT INTENT OVERLAY ─────────────────────────────────────── */
function initExitIntent() {
  const overlay = document.getElementById("exit-intent");
  const closeBtn = document.getElementById("ei-close-btn");
  const ctaBtn   = document.getElementById("ei-cta");
  if (!overlay) return;

  let fired = sessionStorage.getItem("ei_fired");
  if (fired) return;

  let armedAfterMs = 8000;
  let armed = false;
  setTimeout(() => { armed = true; }, armedAfterMs);

  function showOverlay() {
    if (!armed || sessionStorage.getItem("ei_fired")) return;
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("ei_fired", "1");
  }

  /* Trigger on mouse leaving toward top of viewport */
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY < 10) showOverlay();
  });

  function closeOverlay() {
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

  /* CTA scrolls to contact and closes */
  if (ctaBtn) {
    ctaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeOverlay();
      if (window.gtag) {
        gtag("event", "generate_lead", {
          event_category: "lead",
          event_label: "exit_intent",
          method: "exit_intent",
        });
      }
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        /* Focus first input after a short delay */
        setTimeout(() => {
          const firstInput = contactSection.querySelector("input");
          if (firstInput) firstInput.focus();
        }, 600);
      }
    });
  }

  /* Close on backdrop click */
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  /* Close on Escape key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("show")) closeOverlay();
  });
}
