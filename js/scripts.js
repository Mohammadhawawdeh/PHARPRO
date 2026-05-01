/*!
 * PHARPRO Website — Custom Scripts
 * Arabic / English i18n + RTL support
 */

/* ── TRANSLATIONS ─────────────────────────────────────────────── */
const translations = {
  en: {
    /* Navbar */
    nav_services:   "Services",
    nav_dvs:        "DVS Software",
    nav_process:    "How We Work",
    nav_faq:        "FAQ",
    nav_cta:        "Free Assessment",

    /* Hero */
    hero_pill:      "Trusted by pharma teams in 7+ countries",
    hero_h1:        'Stay <span class="accent">Audit-Ready</span><br/>with PHARPRO',
    hero_sub:       "Pharmaceutical compliance consulting — CSV, QA, CQV, thermal mapping, and GMP training — delivered by specialists who understand your regulatory environment.",
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
    svc_body:    "Practical, inspection-ready support across the full spectrum of pharmaceutical compliance and validation.",
    svc1_h3: "Computerized System Validation",
    svc1_p:  "End-to-end CSV lifecycle support — from planning through closure — aligned with FDA 21 CFR Part 11, EU GMP Annex 11, and GAMP 5.",
    svc2_h3: "Quality Assurance &amp; Gap Assessment",
    svc2_p:  "Find compliance gaps before auditors do. SOP reviews, documentation assessments, and QA support structured to close findings fast.",
    svc3_h3: "CQV &amp; Thermal Mapping",
    svc3_p:  "Commissioning, qualification, and validation for equipment and utilities — plus temperature distribution studies for controlled environments.",
    svc4_h3: "GMP Training",
    svc4_p:  "Practical training in CSV, data integrity, and GMP systems — tailored to your team's actual gaps. Delivered onsite or online.",
    svc5_h3: "Pharma Digital Support",
    svc5_p:  "Navigate software implementation and digital transformation with a compliance-first approach — from process alignment to validation strategy.",
    svc6_h3: "Not sure where to start?",
    svc6_p:  "Tell us your situation. We'll identify what matters most and give you a clear path forward.",
    svc6_cta: "Start Free Assessment",

    /* DVS */
    dvs_h2:       "30 Document Builders.<br/>One Platform.",
    dvs_p:        "AI-assisted validation lifecycle management for pharmaceutical and life sciences teams. From concept through retirement — structured, guided, and audit-ready.",
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
    form_message_label:    "Message *",
    form_message_ph:       "Describe your situation or challenge…",
    form_submit:           "Send Message",
    form_priv:             "Your information is kept private",
    form_success:          "Thank you! We'll be in touch within 24 hours.",
    form_error:            "Something went wrong. Please try again.",

    /* Footer */
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
  },

  ar: {
    /* Navbar */
    nav_services:   "الخدمات",
    nav_dvs:        "برنامج DVS",
    nav_process:    "آلية عملنا",
    nav_faq:        "الأسئلة الشائعة",
    nav_cta:        "تقييم مجاني",

    /* Hero */
    hero_pill:     "موثوق من فرق دوائية في أكثر من 7 دول",
    hero_h1:       'ابقَ <span class="accent">جاهزاً للتدقيق</span><br/>مع PHARPRO',
    hero_sub:      "استشارات الامتثال الدوائي — التحقق من صحة الأنظمة الحاسوبية وضمان الجودة وCQV ورسم الخرائط الحرارية والتدريب على GMP — بأيدي متخصصين يفهمون بيئتك التنظيمية.",
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
    svc_body:    "دعم عملي جاهز للتدقيق عبر الطيف الكامل للامتثال الدوائي والتحقق.",
    svc1_h3: "التحقق من صحة الأنظمة الحاسوبية",
    svc1_p:  "دعم دورة حياة CSV الكاملة — من التخطيط حتى الإغلاق — وفقاً لـ FDA 21 CFR Part 11 وEU GMP Annex 11 وGAMP 5.",
    svc2_h3: "ضمان الجودة وتقييم الثغرات",
    svc2_p:  "اكتشف ثغرات الامتثال قبل أن يفعل المدققون. مراجعة إجراءات التشغيل القياسية وتقييم الوثائق ودعم الجودة لإغلاق النتائج بسرعة.",
    svc3_h3: "CQV ورسم الخرائط الحرارية",
    svc3_p:  "التأهيل والتحقق للمعدات والمرافق، بالإضافة إلى دراسات توزيع درجات الحرارة للبيئات المضبوطة.",
    svc4_h3: "التدريب على GMP",
    svc4_p:  "تدريب عملي في CSV وسلامة البيانات وأنظمة GMP — مخصص لثغرات فريقك الفعلية. يُقدَّم في الموقع أو عبر الإنترنت.",
    svc5_h3: "الدعم الرقمي الدوائي",
    svc5_p:  "تنقل عبر تطبيق البرامج والتحول الرقمي بنهج يُولي الامتثال الأولوية — من مواءمة العمليات إلى استراتيجية التحقق.",
    svc6_h3: "لا تعرف من أين تبدأ؟",
    svc6_p:  "أخبرنا بوضعك. سنحدد ما هو الأهم ونعطيك مساراً واضحاً للأمام.",
    svc6_cta: "ابدأ بتقييم مجاني",

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
    form_message_label:  "الرسالة *",
    form_message_ph:     "صف وضعك أو تحديك...",
    form_submit:         "إرسال الرسالة",
    form_priv:           "معلوماتك تُحفظ بسرية",
    form_success:        "شكراً! سنتواصل معك خلال 24 ساعة.",
    form_error:          "حدث خطأ. الرجاء المحاولة مرة أخرى.",

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
  }
};

/* ── i18n ENGINE ──────────────────────────────────────────────── */
let currentLang = localStorage.getItem("pharpro_lang") || "en";

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
}

function switchLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("pharpro_lang", currentLang);
  applyTranslations();
}

/* ── HAMBURGER MENU ───────────────────────────────────────────── */
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

/* ── BOOT ─────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
  initFaq();
  initContactForm();
  applyTranslations();

  /* Wire lang toggle buttons */
  document.querySelectorAll(".lang-toggle").forEach(btn => {
    btn.addEventListener("click", switchLanguage);
  });
});
