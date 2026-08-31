#!/usr/bin/env python3
"""One-time PHARPRO SEO/content architecture rebuild.

The script keeps the current static architecture while applying repeatable,
mechanical updates across every HTML page. It is intentionally dependency-free.
"""

from __future__ import annotations

from datetime import date
from html import escape
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-08-24"


META = {
    "index.html": (
        "Pharmaceutical GMP, CSV & CQV Consulting | PHARPRO",
        "Inspection-ready pharmaceutical consulting for CSV, QA, CQV, GMP training and validation software across Jordan, UAE, Saudi Arabia and Egypt.",
    ),
    "contact/index.html": (
        "Contact PHARPRO | Free Pharma Compliance Assessment",
        "Discuss your CSV, QA, CQV, GMP training or pharmaceutical validation challenge with PHARPRO. Request a free, no-obligation scoping assessment.",
    ),
    "services/index.html": (
        "Pharmaceutical Compliance Consulting Services | PHARPRO",
        "Explore PHARPRO services for CSV, QA, CQV, thermal mapping, GMP training, supplier qualification and digital pharmaceutical validation.",
    ),
    "services/csv/index.html": (
        "Pharmaceutical CSV Validation Services | PHARPRO",
        "Full-lifecycle pharmaceutical CSV services: URS, risk assessment, IQ/OQ/PQ, RTM and audit-trail review aligned with GAMP 5, Annex 11 and Part 11.",
    ),
    "services/qa/index.html": (
        "Pharmaceutical QA Consulting & GMP Gap Assessments | PHARPRO",
        "Pharmaceutical QA consulting for GMP gap assessments, CAPA, data integrity, SOP systems and FDA, EU GMP, WHO, JFDA and SFDA inspection readiness.",
    ),
    "services/cqv/index.html": (
        "CQV & Thermal Mapping Services for Pharma | PHARPRO",
        "Pharmaceutical CQV services for equipment, HVAC, utilities, warehouses and cold rooms, including DQ/IQ/OQ/PQ and defensible thermal mapping studies.",
    ),
    "services/training/index.html": (
        "GMP & CSV Pharmaceutical Training | PHARPRO",
        "Instructor-led GMP, CSV, data integrity, cleaning validation and compressed-air training for pharmaceutical teams, delivered online or onsite.",
    ),
    "services/training/csv/index.html": (
        "CSV Validation Training for Pharmaceutical Teams | PHARPRO",
        "Practical pharmaceutical CSV training covering GAMP 5, risk assessment, URS, IQ/OQ/PQ, data integrity, FDA Part 11 and EU GMP Annex 11.",
    ),
    "services/training/cleaning-validation/index.html": (
        "Cleaning Validation Training: MACO & Annex 15 | PHARPRO",
        "Hands-on pharmaceutical cleaning validation training covering HBEL/PDE, MACO, sampling, recovery, analytical methods and EU GMP Annex 15 expectations.",
    ),
    "services/training/compressed-air-testing/index.html": (
        "Pharma Compressed Air Testing Training | PHARPRO",
        "Practical training on pharmaceutical compressed-air qualification and testing for particles, water, oil and microorganisms using ISO 8573 principles.",
    ),
    "services/dvs/index.html": (
        "Pharmaceutical Validation Software | PHARPRO DVS",
        "PHARPRO DVS connects URS, IQ/OQ/PQ, RTM, approvals and audit trails in one pharmaceutical validation workflow with built-in drafting intelligence.",
    ),
    "services/dvs/compare/index.html": (
        "PHARPRO DVS vs Validation & QMS Platforms",
        "Compare PHARPRO DVS with document-based validation, MasterControl, Veeva and Qualio across lifecycle coverage, implementation, audit trail and cost.",
    ),
    "services/supplier-qualification/index.html": (
        "Pharmaceutical Supplier Qualification Consulting | PHARPRO",
        "Risk-based pharmaceutical supplier qualification, vendor audits, quality agreements, procurement support and ongoing supplier performance monitoring.",
    ),
    "geo/index.html": (
        "Pharmaceutical Consulting Across MENA | PHARPRO",
        "PHARPRO supports pharmaceutical companies across Jordan, UAE, Saudi Arabia and Egypt with CSV, QA, CQV, GMP training and inspection readiness.",
    ),
    "geo/jordan/index.html": (
        "Pharmaceutical Consulting in Jordan | PHARPRO",
        "Amman-based pharmaceutical consulting for CSV, QA, CQV, thermal mapping and GMP training, aligned with JFDA, WHO, EU GMP and FDA expectations.",
    ),
    "geo/uae/index.html": (
        "Pharmaceutical Consulting in UAE | PHARPRO",
        "Pharmaceutical compliance consulting in the UAE for CSV, QA, CQV, thermal mapping, GMP training and audit readiness across regulated life sciences.",
    ),
    "geo/ksa/index.html": (
        "Pharmaceutical Consulting in Saudi Arabia | PHARPRO",
        "Pharmaceutical consulting in Saudi Arabia for CSV, QA, CQV, GMP training and SFDA-aligned inspection readiness, delivered onsite and remotely.",
    ),
    "geo/egypt/index.html": (
        "Pharmaceutical Consulting in Egypt | PHARPRO",
        "Pharmaceutical consulting in Egypt for CSV, QA, CQV, thermal mapping, GMP training and EDA-aligned inspection readiness and remediation.",
    ),
    "insights/index.html": (
        "Pharmaceutical GMP, CSV & Validation Insights | PHARPRO",
        "Practical pharmaceutical guides covering CSV, GAMP 5, GMP, CQV, data integrity, validation, inspection readiness and digital validation software.",
    ),
    "insights/21-cfr-part-11-audit-trail-requirements/index.html": (
        "21 CFR Part 11 Audit Trail Requirements | PHARPRO",
        "Learn which audit-trail events GxP systems must capture, how reviews should work and which configuration gaps commonly create FDA data-integrity findings.",
    ),
    "insights/ai-validation-lifecycle-software-pharma/index.html": (
        "AI Validation Lifecycle Software for Pharma | PHARPRO",
        "How AI-assisted pharmaceutical validation software can control requirements, risks, IQ/OQ/PQ, traceability, approvals and audit trails across the lifecycle.",
    ),
    "insights/capa-management-pharma-guide/index.html": (
        "Pharmaceutical CAPA Management: Practical Guide | PHARPRO",
        "A practical pharmaceutical CAPA guide covering problem statements, root-cause analysis, corrective actions, effectiveness checks and management oversight.",
    ),
    "insights/cleaning-validation-maco-acceptance-criteria/index.html": (
        "Cleaning Validation MACO & Acceptance Criteria | PHARPRO",
        "Learn how to establish health-based cleaning limits, calculate MACO, choose swab and rinse methods and justify pharmaceutical acceptance criteria.",
    ),
    "insights/csv-saas-cloud-pharma/index.html": (
        "CSV for SaaS & Cloud Systems in Pharma | PHARPRO",
        "A risk-based guide to validating pharmaceutical SaaS and cloud systems, including supplier controls, shared responsibility, testing and change management.",
    ),
    "insights/data-integrity-pharmaceutical-manufacturing/index.html": (
        "Pharmaceutical Data Integrity & ALCOA+ Guide | PHARPRO",
        "Practical guidance for building a pharmaceutical data-integrity programme using ALCOA+, risk assessment, access controls, audit trails and governance.",
    ),
    "insights/digitalization-digital-validation-software-pharma/index.html": (
        "Digital Validation Software for Pharma | PHARPRO",
        "A practical guide to replacing disconnected Word and Excel validation with controlled digital workflows for URS, IQ/OQ/PQ, RTM and approvals.",
    ),
    "insights/drug-registration-jordan-mena-partnership/index.html": (
        "Drug Registration Services in Jordan & MENA | PHARPRO",
        "PHARPRO partner services support pharmaceutical registration, dossier preparation, submissions, deficiency responses and lifecycle maintenance in MENA.",
    ),
    "insights/eu-gmp-annex-11-compliance-checklist/index.html": (
        "EU GMP Annex 11 Compliance Checklist | PHARPRO",
        "Use this practical Annex 11 checklist to assess risk management, supplier controls, validation, audit trails, security, business continuity and archiving.",
    ),
    "insights/fda-21-cfr-part-11-data-integrity/index.html": (
        "FDA 21 CFR Part 11 & Data Integrity Guide | PHARPRO",
        "Understand electronic-record, audit-trail, access-control and electronic-signature expectations under FDA 21 CFR Part 11 and pharmaceutical CGMP.",
    ),
    "insights/fda-warning-letter-response/index.html": (
        "FDA Warning Letter Response: Practical Guide | PHARPRO",
        "How to investigate observations, define sustainable CAPAs, support commitments with evidence and structure a credible pharmaceutical FDA response.",
    ),
    "insights/gamp5-risk-categories-explained/index.html": (
        "GAMP 5 Software Categories Explained | PHARPRO",
        "Classify infrastructure, configured and custom pharmaceutical systems under GAMP 5 and scale supplier assessment, specification and testing by risk.",
    ),
    "insights/gamp5-second-edition-csv-changes/index.html": (
        "GAMP 5 Second Edition: Key CSV Changes | PHARPRO",
        "Understand how GAMP 5 Second Edition changes pharmaceutical CSV through critical thinking, agile delivery, supplier leverage and risk-based assurance.",
    ),
    "insights/gmp-gap-assessment-guide/index.html": (
        "GMP Gap Assessment Guide for Pharma | PHARPRO",
        "Learn what a pharmaceutical GMP gap assessment covers, how findings are classified and how to turn the report into a risk-based remediation plan.",
    ),
    "insights/gmp-training-records-compliance/index.html": (
        "GMP Training Records & Compliance Guide | PHARPRO",
        "Build inspection-ready GMP training records with role-based curricula, training matrices, effectiveness checks, overdue controls and periodic review.",
    ),
    "insights/how-to-write-urs-computerised-system/index.html": (
        "How to Write a Pharmaceutical System URS | PHARPRO",
        "Write clear, testable and traceable user requirements for GxP computerized systems using risk-based language, acceptance criteria and data controls.",
    ),
    "insights/iq-oq-pq-guide/index.html": (
        "IQ OQ PQ in Pharmaceutical Validation | PHARPRO",
        "A practical guide to installation, operational and performance qualification, including prerequisites, testing, deviations and summary reporting.",
    ),
    "insights/medicine-marketing-jordan-partnership/index.html": (
        "Pharmaceutical Marketing Services in Jordan | PHARPRO",
        "PHARPRO partner services support compliant pharmaceutical market entry, brand positioning, HCP engagement and commercial execution in Jordan.",
    ),
    "insights/pharmaceutical-inspection-readiness/index.html": (
        "Pharmaceutical Inspection Readiness Guide | PHARPRO",
        "Prepare for FDA, EU GMP and national-authority inspections with a practical readiness plan covering documents, data, facilities, people and responses.",
    ),
    "insights/pharmaceutical-validation-software/index.html": (
        "Pharmaceutical Validation Software Buyer’s Guide | PHARPRO",
        "Evaluate pharmaceutical validation software for lifecycle coverage, traceability, approvals, audit trails, electronic signatures and implementation fit.",
    ),
    "insights/pharpro-dvs-demo-booking/index.html": (
        "Book a Pharmaceutical Validation Software Demo | PHARPRO",
        "Book a focused PHARPRO DVS demonstration and see how your team can manage URS, risks, IQ/OQ/PQ, RTM, approvals and audit trails in one workflow.",
    ),
    "insights/risk-assessment-computerised-systems/index.html": (
        "CSV Risk Assessment for Computerized Systems | PHARPRO",
        "Apply GAMP 5 quality-risk principles to GxP computerized systems, from system impact and functional risk to controls, testing and traceability.",
    ),
    "insights/software-csv-gap-assessment/index.html": (
        "Software & CSV Gap Assessment for Pharma | PHARPRO",
        "Find validation and data-integrity gaps across GxP systems and receive a risk-prioritized remediation roadmap aligned with Part 11, Annex 11 and GAMP 5.",
    ),
    "insights/supplier-qualification-gmp/index.html": (
        "GMP Supplier Qualification & Vendor Audit Guide | PHARPRO",
        "A practical risk-based supplier qualification guide covering evaluation, audits, quality agreements, approval and ongoing performance monitoring.",
    ),
    "insights/thermal-mapping-pharmaceutical-warehouses/index.html": (
        "Pharmaceutical Warehouse Thermal Mapping Guide | PHARPRO",
        "Plan defensible warehouse and cold-room thermal mapping studies with risk-based logger placement, seasonal qualification, deviations and reporting.",
    ),
    "insights/validation-master-plan-guide/index.html": (
        "Pharmaceutical Validation Master Plan Guide | PHARPRO",
        "Learn what a pharmaceutical Validation Master Plan should cover: scope, responsibilities, lifecycle approach, risk management, governance and schedule.",
    ),
    "insights/real-world-stories/index.html": (
        "Pharmaceutical GMP & Validation Case Stories | PHARPRO",
        "Written pharmaceutical case stories explaining real GMP, CSV, data-integrity and validation problems, decisions, lessons and practical prevention steps.",
    ),
    "resources/compliance-checklist/index.html": (
        "Free Pharmaceutical Compliance Checklist | PHARPRO",
        "Download PHARPRO’s 50-question pharmaceutical compliance checklist covering CSV, QA, data integrity, training, CAPA and inspection readiness.",
    ),
    "resources/inspection-readiness-quiz/index.html": (
        "Free Pharmaceutical Inspection Readiness Quiz | PHARPRO",
        "Answer 10 practical questions and receive an instant pharmaceutical inspection-readiness risk score across GMP, data, training and quality systems.",
    ),
}


EXPIRED = {
    "insights/gmp-training-july-2026/index.html": "/insights/gmp-training-september-2026/",
    "insights/csv-training-august-2026/index.html": "/insights/csv-training-rescheduled-september-2026/",
    "insights/csv-training-pharma-june-2026/index.html": "/services/training/csv/",
    "register/gmp-training-july-2026/index.html": "/services/training/",
}


CLUSTERS = {
    "csv": {
        "label": "Computerized System Validation",
        "service": ("CSV validation services", "/services/csv/"),
        "links": [
            ("21 CFR Part 11 audit trails", "/insights/21-cfr-part-11-audit-trail-requirements/"),
            ("EU GMP Annex 11 checklist", "/insights/eu-gmp-annex-11-compliance-checklist/"),
            ("How to write a system URS", "/insights/how-to-write-urs-computerised-system/"),
            ("CSV for SaaS and cloud", "/insights/csv-saas-cloud-pharma/"),
        ],
    },
    "qa": {
        "label": "Quality Assurance & Inspection Readiness",
        "service": ("QA and GMP assessment services", "/services/qa/"),
        "links": [
            ("GMP gap assessment guide", "/insights/gmp-gap-assessment-guide/"),
            ("CAPA management guide", "/insights/capa-management-pharma-guide/"),
            ("Inspection readiness guide", "/insights/pharmaceutical-inspection-readiness/"),
            ("Data integrity requirements", "/insights/data-integrity-gmp-requirements/"),
        ],
    },
    "cqv": {
        "label": "CQV, Qualification & Thermal Mapping",
        "service": ("CQV and thermal mapping services", "/services/cqv/"),
        "links": [
            ("EU GMP Annex 15 qualification", "/insights/eu-gmp-annex-15-qualification-validation/"),
            ("HVAC validation for pharma", "/insights/hvac-validation-pharmaceutical/"),
            ("Cold-room thermal mapping", "/insights/thermal-mapping-cold-room-guide/"),
            ("IQ, OQ and PQ explained", "/insights/iq-oq-pq-guide/"),
        ],
    },
    "dvs": {
        "label": "Digital Validation & PHARPRO DVS",
        "service": ("Explore PHARPRO DVS", "/services/dvs/"),
        "links": [
            ("Validation software buyer’s guide", "/insights/pharmaceutical-validation-software/"),
            ("AI validation lifecycle software", "/insights/ai-validation-lifecycle-software-pharma/"),
            ("DVS pricing and ROI model", "/services/dvs/pricing-roi/"),
            ("Book a focused DVS demo", "/insights/pharpro-dvs-demo-booking/"),
        ],
    },
    "training": {
        "label": "Pharmaceutical GMP & CSV Training",
        "service": ("View pharmaceutical training", "/services/training/"),
        "links": [
            ("GMP training records", "/insights/gmp-training-records-compliance/"),
            ("CSV validation training", "/services/training/csv/"),
            ("Cleaning validation training", "/services/training/cleaning-validation/"),
            ("Compressed-air testing training", "/services/training/compressed-air-testing/"),
        ],
    },
}


SLUG_CLUSTER = {
    **{s: "csv" for s in [
        "21-cfr-part-11-audit-trail-requirements", "csv-saas-cloud-pharma",
        "eu-gmp-annex-11-compliance-checklist", "fda-21-cfr-part-11-data-integrity",
        "gamp5-risk-categories-explained", "gamp5-second-edition-csv-changes",
        "how-to-write-urs-computerised-system", "risk-assessment-computerised-systems",
        "software-csv-gap-assessment", "data-integrity-pharmaceutical-manufacturing",
    ]},
    **{s: "qa" for s in [
        "capa-management-pharma-guide", "fda-warning-letter-response",
        "gmp-gap-assessment-guide", "pharmaceutical-inspection-readiness",
        "supplier-qualification-gmp", "gmp-training-records-compliance",
        "data-integrity-gmp-requirements",
    ]},
    **{s: "cqv" for s in [
        "cleaning-validation-maco-acceptance-criteria", "iq-oq-pq-guide",
        "thermal-mapping-pharmaceutical-warehouses", "validation-master-plan-guide",
        "thermal-mapping-cold-room-guide", "eu-gmp-annex-15-qualification-validation",
        "hvac-validation-pharmaceutical",
    ]},
    **{s: "dvs" for s in [
        "ai-validation-lifecycle-software-pharma", "digitalization-digital-validation-software-pharma",
        "pharmaceutical-validation-software", "pharpro-dvs-demo-booking",
    ]},
    **{s: "training" for s in [
        "csv-training-rescheduled-september-2026", "gmp-training-september-2026",
    ]},
}


NEW_ARTICLES = {
    "thermal-mapping-cold-room-guide": {
        "title": "Cold Room Thermal Mapping Guide for Pharma | PHARPRO",
        "description": "Plan pharmaceutical cold-room thermal mapping with risk-based logger placement, loaded and empty studies, door-opening tests, alarms and defensible reports.",
        "h1": "Cold Room Thermal Mapping for Pharmaceuticals: A Practical Guide",
        "eyebrow": "CQV · Thermal Mapping",
        "intro": "A cold room can display a stable control temperature while products experience very different conditions near doors, evaporators, ceilings and densely loaded areas. A defensible mapping study demonstrates where those risks exist and whether the room can maintain its approved range during normal and challenged operation.",
        "sections": [
            ("What a mapping study must establish", [
                "The study should demonstrate the spatial temperature distribution throughout the usable storage volume, identify hot and cold spots, confirm alarm locations and establish suitable positions for routine monitoring sensors.",
                "The protocol should define the approved temperature range, logger accuracy, calibration status, sampling interval, study duration, acceptance criteria, load condition and handling of deviations before execution begins.",
            ]),
            ("Risk-based logger placement", [
                "Place calibrated loggers in a three-dimensional grid and increase density around credible risk points: doors, evaporator discharge and return paths, corners, high and low levels, control probes, shelving restrictions and locations with previous excursions.",
                "Logger placement should follow an approved rationale rather than a fixed universal spacing rule. Room geometry, airflow, heat load, door traffic, product arrangement and monitoring history all influence the design.",
            ]),
            ("Empty, loaded and challenge studies", [
                "An empty-room study helps assess the installation and control response. A representative loaded study demonstrates performance under the condition used for routine storage. Where justified, door-opening and power-failure tests show recovery behaviour and the time available for operational response.",
                "Seasonal studies are normally considered when external conditions can materially influence performance. The rationale should be documented, especially for facilities exposed to significant summer and winter variation.",
            ]),
            ("From raw data to an approved report", [
                "The final report should preserve raw data, calibration certificates, logger positions, time-synchronized plots, minimum and maximum results, mean kinetic temperature where relevant, excursions, investigations and conclusions against every protocol acceptance criterion.",
                "Use the identified hot and cold spots to locate permanent sensors, establish loading restrictions and update alarm, maintenance and contingency procedures. Mapping is not complete until its findings become operating controls.",
            ]),
        ],
        "steps": ["Define room and load risks", "Approve protocol and logger map", "Execute normal and challenge studies", "Investigate results and implement controls"],
        "faqs": [
            ("How long should a pharmaceutical cold-room mapping study run?", "The duration must represent normal operations and relevant cycles. Many studies use at least 24 to 72 hours, but the justified duration depends on the room, equipment cycles, door traffic and governing requirements."),
            ("Should cold rooms be mapped while empty or loaded?", "Both conditions may be needed. Empty testing supports installation understanding, while representative loaded testing demonstrates routine storage performance. The qualification plan should justify the selected approach."),
            ("When should mapping be repeated?", "Repeat mapping after significant changes, major repair, unexplained excursions or changes to load and airflow. Periodic or seasonal requalification should follow a documented risk assessment and applicable local requirements."),
        ],
        "references": [
            ("WHO Technical Supplement: Temperature Mapping of Storage Areas", "https://www.who.int/publications/m/item/Annex-9-g-trs-961"),
            ("WHO Model Guidance for Storage and Transport of TTSPPs", "https://www.who.int/publications/m/item/trs961-annex9-modelguidanceforstoragetransport"),
        ],
        "service": "/services/cqv/",
        "og": "/images/og-cqv.png",
    },
    "eu-gmp-annex-15-qualification-validation": {
        "title": "EU GMP Annex 15 Qualification & Validation | PHARPRO",
        "description": "A practical guide to EU GMP Annex 15 lifecycle qualification, DQ, FAT/SAT, IQ/OQ/PQ, process validation, change control and requalification.",
        "h1": "EU GMP Annex 15: Qualification and Validation Explained",
        "eyebrow": "CQV · EU GMP",
        "intro": "EU GMP Annex 15 sets lifecycle expectations for qualification and validation of facilities, equipment, utilities and processes. The central principle is that critical aspects must be controlled through science-based, risk-managed activities—not a collection of disconnected protocols.",
        "sections": [
            ("Start with the Validation Master Plan", [
                "The VMP or equivalent should define the qualification and validation policy, organizational responsibilities, system boundaries, lifecycle approach, acceptance governance, deviation handling, change control and requalification strategy.",
                "Plans should identify which facilities, utilities, equipment and processes require qualification or validation and explain how quality risk management determines the depth of work.",
            ]),
            ("The qualification lifecycle", [
                "User requirements define intended use and critical needs. Design Qualification demonstrates that the proposed design can meet those needs. FAT and SAT may provide reusable evidence when their scope, controls and documentation are adequate.",
                "Installation Qualification verifies the installed state. Operational Qualification challenges operating ranges, alarms and controls. Performance Qualification demonstrates reproducible performance with representative materials, loads, procedures and trained operators.",
            ]),
            ("Protocols, deviations and release", [
                "Protocols should define critical systems, test methods, acceptance criteria and responsibilities before execution. Deviations must be recorded, assessed for impact and resolved or formally accepted before phase approval.",
                "Conditional progression between stages must be exceptional, documented and supported by an assessment showing that unresolved matters do not create unacceptable risk to the next phase or product quality.",
            ]),
            ("Maintaining the validated state", [
                "Qualification is not finished at the initial summary report. Preventive maintenance, calibration, monitoring, periodic review, change control and deviation trending provide evidence that the validated state remains controlled.",
                "Requalification frequency and scope should be justified by risk, performance history, changes and regulatory commitments rather than applied as an automatic calendar exercise.",
            ]),
        ],
        "steps": ["Define URS and critical risks", "Qualify design and installation", "Challenge operation and performance", "Maintain control through review and change management"],
        "faqs": [
            ("What is the difference between qualification and validation?", "Qualification generally demonstrates that facilities, utilities and equipment are correctly installed and perform as intended. Validation demonstrates that a process or method consistently produces the expected result."),
            ("Are FAT and SAT required by Annex 15?", "They should be considered where appropriate. Suitable, documented supplier tests may be leveraged later when their scope and integrity are assessed and the functions are not adversely affected by transport or installation."),
            ("Does Annex 15 require fixed requalification intervals?", "It requires justified periodic evaluation and requalification where appropriate. The interval and scope should be based on risk, performance, changes and applicable commitments."),
        ],
        "references": [
            ("European Commission: EU GMP Annex 15", "https://health.ec.europa.eu/document/download/7c6c5b3c-4902-46ea-b7ab-7608682fb68d_en?filename=2015-10_annex15.pdf"),
            ("European Commission: EudraLex Volume 4", "https://health.ec.europa.eu/medicinal-products/eudralex/eudralex-volume-4_en"),
        ],
        "service": "/services/cqv/",
        "og": "/images/og-cqv.png",
    },
    "hvac-validation-pharmaceutical": {
        "title": "Pharmaceutical HVAC Validation & Qualification | PHARPRO",
        "description": "A practical pharmaceutical HVAC qualification guide covering DQ/IQ/OQ/PQ, HEPA integrity, airflow, pressure, recovery and cleanroom classification.",
        "h1": "Pharmaceutical HVAC Validation and Cleanroom Qualification",
        "eyebrow": "CQV · Cleanrooms",
        "intro": "A pharmaceutical HVAC system protects products, personnel and adjacent areas by controlling airborne contamination, pressure cascades, airflow, temperature and humidity. Qualification must connect each test to the room’s intended use and contamination-control strategy.",
        "sections": [
            ("Translate process risk into design requirements", [
                "The URS and design review should define room grades, occupancy, air-change and recovery expectations, pressure relationships, filtration, temperature and humidity ranges, alarm strategy, monitoring locations and operating states.",
                "Design Qualification confirms that zoning, airlocks, flows, controls, maintainability and capacity can support the intended process. For sterile facilities, the rationale must align with the contamination control strategy.",
            ]),
            ("Installation and operational qualification", [
                "IQ verifies equipment, ductwork, filters, instruments, materials, drawings, calibration, software and utilities against the approved design. OQ challenges operating ranges, alarms, interlocks, pressure cascades and control sequences.",
                "Cleanroom and clean-air equipment qualification commonly includes installed filter integrity, airflow volume or velocity, pressure differences, airflow visualization, microbial and particle conditions, temperature, humidity, recovery and containment leakage where relevant.",
            ]),
            ("Classification is not routine monitoring", [
                "Cleanroom classification demonstrates air cleanliness against the applicable particle limits under defined states. Environmental monitoring is an ongoing process-control programme. The two activities have different purposes and should not be treated as interchangeable.",
                "Test locations, sample volumes, occupancy state, equipment operation and acceptance criteria must be defined before execution and traceable to the governing standard and room use.",
            ]),
            ("Performance and continued verification", [
                "PQ demonstrates performance during representative operations with normal personnel, equipment and interventions. Results should be evaluated together with environmental monitoring, differential pressure and deviation history.",
                "Filters, controls and sensors require maintenance and calibration. Significant changes, repeated excursions or major repairs should trigger impact assessment and an appropriate level of requalification.",
            ]),
        ],
        "steps": ["Define room use and contamination risks", "Qualify the installed HVAC system", "Challenge alarms, airflow and recovery", "Demonstrate performance in operation"],
        "faqs": [
            ("Is cleanroom classification the same as HVAC qualification?", "No. Classification is one element of cleanroom qualification. HVAC qualification also addresses design, installation, controls, airflow, filters, pressure, recovery and other intended-use requirements."),
            ("Which HEPA test is normally performed?", "Installed filter system leakage and integrity testing is commonly included. The approved method, challenge aerosol, acceptance criteria and test frequency should follow the facility standard and applicable requirements."),
            ("When is airflow visualization required?", "It is especially important where airflow direction protects critical operations or prevents cross-contamination. The study should cover relevant operational conditions and interventions."),
        ],
        "references": [
            ("European Commission: EU GMP Annex 1", "https://health.ec.europa.eu/document/download/e05af55b-38e9-42bf-8495-194bbf0b9262_en?filename=20220825_gmp-an1_en_0.pdf"),
            ("European Commission: EU GMP Annex 15", "https://health.ec.europa.eu/document/download/7c6c5b3c-4902-46ea-b7ab-7608682fb68d_en?filename=2015-10_annex15.pdf"),
        ],
        "service": "/services/cqv/",
        "og": "/images/og-cqv.png",
    },
    "data-integrity-gmp-requirements": {
        "title": "GMP Data Integrity Requirements for Pharma | PHARPRO",
        "description": "Understand GMP data-integrity requirements for governance, ALCOA+, audit trails, access, review, backup, investigations and sustainable remediation.",
        "h1": "GMP Data Integrity Requirements: What Pharmaceutical Sites Must Control",
        "eyebrow": "QA · Data Integrity",
        "intro": "Data integrity is the ability to trust that GxP records are complete, consistent and accurate throughout their lifecycle. It depends on governance, process design, system controls and management behaviour—not on a single SOP or software feature.",
        "sections": [
            ("Build governance around data risk", [
                "Management should define ownership, escalation, resources and expectations for reliable records. A risk assessment should identify where data can be created, changed, deleted, excluded, reprocessed or reviewed without appropriate detection.",
                "The assessment must include paper, hybrid and electronic workflows. Interfaces, temporary files, instrument local storage, spreadsheets, metadata and manual transcription are frequently overlooked.",
            ]),
            ("Apply ALCOA+ through the record lifecycle", [
                "Records should be attributable, legible, contemporaneous, original and accurate, as well as complete, consistent, enduring and available. Controls must cover creation, processing, review, reporting, retention, retrieval and disposition.",
                "Blank forms, worksheets and controlled templates require issuance and reconciliation. Electronic records require suitable access, audit trails, metadata retention, backup, restore testing and time controls.",
            ]),
            ("Audit trails and review", [
                "Audit trails should be enabled where required, protected from ordinary users and capable of showing when, by whom and why critical records changed. Review procedures should define which trails are reviewed, by whom, at what point and how the review is documented.",
                "A functioning audit trail is not enough if no one evaluates it. Review depth and frequency should follow the record’s quality and patient risk.",
            ]),
            ("Investigate causes, not only individual errors", [
                "When unreliable data are found, assess product impact and determine the full scope across systems, methods, batches and time periods. Corrective action should address process design, incentives, training, workload, access and technical controls.",
                "Sustainable remediation requires effectiveness checks and senior oversight. Repeating training without addressing weak workflows or uncontrolled privileges rarely prevents recurrence.",
            ]),
        ],
        "steps": ["Map critical data and failure modes", "Assess procedural and technical controls", "Remediate by patient and product risk", "Verify effectiveness and maintain oversight"],
        "faqs": [
            ("Does ALCOA+ apply only to electronic data?", "No. The principles apply to paper, electronic and hybrid GxP records throughout their lifecycle."),
            ("Must every audit trail be reviewed for every record?", "Review should be defined by the record’s risk and applicable requirements. Critical audit trails associated with data review and release decisions normally require documented review at an appropriate stage."),
            ("Is shared user access acceptable in a GxP system?", "Shared credentials undermine attribution and accountability. Each user should normally have a unique identity with role-appropriate access, subject to documented exceptions and compensating controls where unavoidable."),
        ],
        "references": [
            ("FDA: Data Integrity and Compliance With Drug CGMP", "https://www.fda.gov/media/119267/download"),
            ("FDA: Search for Current Guidance Documents", "https://www.fda.gov/regulatory-information/search-fda-guidance-documents"),
        ],
        "service": "/services/qa/",
        "og": "/images/og-qa.png",
    },
}


def replace_meta(text: str, name: str, value: str) -> str:
    pattern = rf'(<meta\s+name=["\']{re.escape(name)}["\']\s+content=["\'])[^"\']*(["\'][^>]*>)'
    return re.sub(pattern, lambda m: m.group(1) + escape(value, quote=True) + m.group(2), text, count=1, flags=re.I)


def set_title_description(path: Path, text: str) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel not in META:
        return text
    title, description = META[rel]
    text = re.sub(r"<title>.*?</title>", f"<title>{escape(title)}</title>", text, count=1, flags=re.I | re.S)
    text = replace_meta(text, "description", description)
    return text


def normalize_language_links(path: Path, text: str) -> str:
    rel = path.relative_to(ROOT).as_posix()
    text = re.sub(r'\s*<link[^>]+hreflang=["\'](?:en|ar|x-default)["\'][^>]*>', "", text, flags=re.I)
    canonical_match = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\'][^>]*>', text, re.I)
    if not canonical_match:
        return text
    canonical = canonical_match.group(1)
    if rel == "services/dvs/index.html":
        links = (
            f'\n  <link rel="alternate" hreflang="en" href="{canonical}" />'
            '\n  <link rel="alternate" hreflang="ar" href="https://pharpro.co/services/dvs/ar/" />'
            f'\n  <link rel="alternate" hreflang="x-default" href="{canonical}" />'
        )
    elif rel == "services/dvs/ar/index.html":
        links = (
            '\n  <link rel="alternate" hreflang="en" href="https://pharpro.co/services/dvs/" />'
            f'\n  <link rel="alternate" hreflang="ar" href="{canonical}" />'
            '\n  <link rel="alternate" hreflang="x-default" href="https://pharpro.co/services/dvs/" />'
        )
    elif rel == "insights/pharpro-latest-news-june-2026/index.html":
        links = (
            f'\n  <link rel="alternate" hreflang="en" href="{canonical}" />'
            '\n  <link rel="alternate" hreflang="ar" href="https://pharpro.co/insights/pharpro-latest-news-june-2026/ar/" />'
            f'\n  <link rel="alternate" hreflang="x-default" href="{canonical}" />'
        )
    elif rel == "insights/pharpro-latest-news-june-2026/ar/index.html":
        links = (
            '\n  <link rel="alternate" hreflang="en" href="https://pharpro.co/insights/pharpro-latest-news-june-2026/" />'
            f'\n  <link rel="alternate" hreflang="ar" href="{canonical}" />'
            '\n  <link rel="alternate" hreflang="x-default" href="https://pharpro.co/insights/pharpro-latest-news-june-2026/" />'
        )
    else:
        links = f'\n  <link rel="alternate" hreflang="en" href="{canonical}" />\n  <link rel="alternate" hreflang="x-default" href="{canonical}" />'
        text = re.sub(r'\s*<meta\s+property=["\']og:locale:alternate["\'][^>]*>', "", text, flags=re.I)
    return text.replace(canonical_match.group(0), canonical_match.group(0) + links, 1)


def normalize_authorship(text: str) -> str:
    replacements = {
        "Ahmad Al-Sharif": "Mohammad Awawdeh",
        "أحمد الشريف": "محمد العواودة",
        "Senior CSV Consultant · 12 years in pharmaceutical validation": "Founder · Pharmaceutical Compliance Consultant",
        "مستشار أول في CSV · 12 عاماً في التحقق الدوائي": "المؤسس · مستشار الامتثال الدوائي",
        "Senior CSV Consultant": "Pharmaceutical Compliance Consultant",
        "Ahmad leads PHARPRO's CSV and digital validation practice. He has delivered validation projects across Jordan, UAE, Saudi Arabia, and Europe  -  covering FDA 21 CFR Part 11, EU GMP Annex 11, and ISPE GAMP 5 frameworks.": "Mohammad Awawdeh founded PHARPRO and leads pharmaceutical CSV, QA, CQV and digital validation projects across MENA, aligned with FDA, EU GMP and GAMP 5 expectations.",
        "يقود أحمد ممارسة CSV والتحقق الرقمي في PHARPRO. نفّذ مشاريع تحقق في الأردن والإمارات والسعودية وأوروبا.": "أسس محمد العواودة شركة PHARPRO ويقود مشاريع CSV وضمان الجودة والتأهيل والتحقق الرقمي في منطقة الشرق الأوسط وشمال أفريقيا.",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = re.sub(r'<meta name="author" content="[^"]*PHARPRO Consultation Company"', '<meta name="author" content="Mohammad Awawdeh, PHARPRO Consultation Company"', text)
    text = text.replace('"article:author" content="PHARPRO Consultation Company"', '"article:author" content="Mohammad Awawdeh"')
    return text


def add_global_enhancements(text: str) -> str:
    if "/css/seo-enhancements.css" not in text and "</head>" in text:
        text = text.replace("</head>", '  <link rel="stylesheet" href="/css/seo-enhancements.css?v=1" />\n</head>', 1)
    # Add lazy decoding without overriding deliberate above-the-fold choices.
    def img_attrs(match: re.Match[str]) -> str:
        tag = match.group(0)
        closing = "/>" if tag.rstrip().endswith("/>") else ">"
        tag = tag.rstrip()[:-len(closing)].rstrip()
        if "loading=" not in tag and "fetchpriority=\"high\"" not in tag:
            tag += ' loading="lazy"'
        if "decoding=" not in tag:
            tag += ' decoding="async"'
        return tag + " " + closing
    return re.sub(r'<img\b[^>]*>', img_attrs, text, flags=re.I)


def expire_page(path: Path, text: str) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel not in EXPIRED:
        return text
    target = "https://pharpro.co" + EXPIRED[rel]
    text = replace_meta(text, "robots", "noindex, follow")
    text = re.sub(r'(<link\s+rel=["\']canonical["\']\s+href=["\'])[^"\']+(["\'])', rf'\g<1>{target}\g<2>', text, count=1, flags=re.I)
    return text


def cluster_block(key: str) -> str:
    c = CLUSTERS[key]
    links = "".join(f'<li><a href="{href}">{escape(label)}</a></li>' for label, href in c["links"])
    service_label, service_href = c["service"]
    return f'''\n<section class="seo-cluster" aria-labelledby="seo-cluster-title">
  <div class="seo-cluster-inner">
    <div><p class="seo-kicker">Explore this topic</p><h2 id="seo-cluster-title">{escape(c["label"])}</h2>
      <p>Continue with the related practical guides or discuss your site-specific requirements with PHARPRO.</p></div>
    <ul>{links}</ul>
    <a class="seo-cluster-cta" href="{service_href}">{escape(service_label)} →</a>
  </div>
</section>\n'''


def add_article_author_and_cluster(path: Path, text: str) -> str:
    parts = path.relative_to(ROOT).parts
    if len(parts) < 3 or parts[0] != "insights" or path.name != "index.html":
        return text
    slug = parts[1]
    if slug in ("index.html", "real-world-stories", "pharpro-latest-news-june-2026") or "noindex" in text:
        return text
    if "seo-reviewed" not in text:
        author = '''
<aside class="seo-author" aria-label="Article ownership and review">
  <div class="seo-author-mark" aria-hidden="true">MA</div>
  <div><p class="seo-kicker">Written and reviewed by</p>
    <h2><a href="https://www.linkedin.com/in/mohammadhawawdeh/" target="_blank" rel="noopener noreferrer">Mohammad Awawdeh</a></h2>
    <p>Founder of PHARPRO and pharmaceutical compliance consultant working across CSV, QA, CQV, GMP training and digital validation projects in MENA.</p>
    <p class="seo-reviewed">Reviewed 24 August 2026 · Verify final application against the current regulation and your site quality system.</p>
  </div>
</aside>
'''
        text = text.replace("</main>", author + "</main>", 1)
    if slug in SLUG_CLUSTER and "class=\"seo-cluster\"" not in text:
        text = text.replace("</main>", cluster_block(SLUG_CLUSTER[slug]) + "</main>", 1)
    return text


def add_service_proof(path: Path, text: str) -> str:
    rel = path.relative_to(ROOT).as_posix()
    service_paths = {
        "services/csv/index.html": "CSV validation",
        "services/qa/index.html": "quality and inspection readiness",
        "services/cqv/index.html": "CQV and thermal mapping",
        "services/training/index.html": "GMP and CSV training",
        "services/dvs/index.html": "digital validation",
        "services/supplier-qualification/index.html": "supplier qualification",
    }
    if rel not in service_paths or "seo-proof" in text:
        return text
    area = service_paths[rel]
    block = f'''
<section class="seo-proof" aria-labelledby="seo-proof-title">
  <div class="seo-proof-inner">
    <p class="seo-kicker">Why PHARPRO</p>
    <h2 id="seo-proof-title">Practical {escape(area)} support with audit-defensible outputs</h2>
    <div class="seo-proof-grid">
      <div><strong>Hands-on delivery</strong><span>Work is scoped around your systems, documents, people and regulatory market.</span></div>
      <div><strong>Clear deliverables</strong><span>Defined responsibilities, review cycles, acceptance criteria and closure evidence.</span></div>
      <div><strong>Risk-based approach</strong><span>Effort is focused on product quality, patient safety and data-integrity risk.</span></div>
      <div><strong>MENA reach</strong><span>Support across <a href="/geo/jordan/">Jordan</a>, <a href="/geo/uae/">UAE</a>, <a href="/geo/ksa/">Saudi Arabia</a> and <a href="/geo/egypt/">Egypt</a>.</span></div>
    </div>
    <p class="seo-proof-note">PHARPRO aligns each engagement with the regulations and guidance applicable to the client’s product, market and quality system. Final responsibility and approval remain with the regulated company.</p>
  </div>
</section>
'''
    return text.replace("</main>", block + "</main>", 1)


def add_geo_intent(path: Path, text: str) -> str:
    rel = path.relative_to(ROOT).as_posix()
    countries = {
        "geo/jordan/index.html": ("Jordan", "JFDA"),
        "geo/uae/index.html": ("the UAE", "UAE health-authority and federal requirements"),
        "geo/ksa/index.html": ("Saudi Arabia", "SFDA"),
        "geo/egypt/index.html": ("Egypt", "EDA"),
    }
    if rel not in countries or "seo-local-intent" in text:
        return text
    country, authority = countries[rel]
    block = f'''
<section class="seo-local-intent" aria-labelledby="local-intent-title">
  <div class="seo-local-intent-inner">
    <p class="seo-kicker">Services in {escape(country)}</p>
    <h2 id="local-intent-title">Choose the compliance support your pharmaceutical site needs</h2>
    <div class="seo-local-grid">
      <a href="/services/csv/"><strong>CSV validation in {escape(country)}</strong><span>GAMP 5, Part 11, Annex 11, URS and IQ/OQ/PQ.</span></a>
      <a href="/services/qa/"><strong>GMP and QA consulting in {escape(country)}</strong><span>Gap assessments, CAPA, data integrity and {escape(authority)} readiness.</span></a>
      <a href="/services/cqv/"><strong>CQV and thermal mapping in {escape(country)}</strong><span>Equipment, utilities, HVAC, warehouses and cold rooms.</span></a>
      <a href="/services/training/"><strong>Pharmaceutical training in {escape(country)}</strong><span>Instructor-led GMP, CSV and validation programmes.</span></a>
    </div>
  </div>
</section>
'''
    return text.replace("</main>", block + "</main>", 1)


def clean_schema(text: str) -> str:
    pattern = re.compile(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', re.I | re.S)
    def update(match: re.Match[str]) -> str:
        raw = match.group(1).strip()
        try:
            data = json.loads(raw)
        except Exception:
            return match.group(0)
        def walk(node):
            if isinstance(node, dict):
                types = node.get("@type", [])
                if isinstance(types, str):
                    types = [types]
                if any(t in types for t in ("Organization", "LocalBusiness", "ProfessionalService", "Service")):
                    node.pop("aggregateRating", None)
                    node.pop("review", None)
                for value in node.values():
                    walk(value)
            elif isinstance(node, list):
                for value in node:
                    walk(value)
        walk(data)
        return '<script type="application/ld+json">\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n</script>'
    return pattern.sub(update, text)


def article_html(slug: str, data: dict) -> str:
    url = f"https://pharpro.co/insights/{slug}/"
    sections = "".join(
        f'<section><h2>{escape(heading)}</h2>' + "".join(f'<p>{escape(p)}</p>' for p in paras) + "</section>"
        for heading, paras in data["sections"]
    )
    steps = "".join(f'<li><span>{i}</span>{escape(step)}</li>' for i, step in enumerate(data["steps"], 1))
    faqs = "".join(f'<details><summary>{escape(q)}</summary><p>{escape(a)}</p></details>' for q, a in data["faqs"])
    refs = "".join(f'<li><a href="{href}" target="_blank" rel="noopener noreferrer">{escape(label)}</a></li>' for label, href in data["references"])
    faq_schema = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in data["faqs"]]
    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "BlogPosting", "@id": url + "#article", "headline": data["h1"], "description": data["description"], "datePublished": TODAY, "dateModified": TODAY, "author": {"@type": "Person", "name": "Mohammad Awawdeh", "url": "https://www.linkedin.com/in/mohammadhawawdeh/", "worksFor": {"@id": "https://pharpro.co/#organization"}}, "publisher": {"@id": "https://pharpro.co/#organization"}, "image": "https://pharpro.co" + data["og"], "mainEntityOfPage": {"@id": url + "#webpage"}, "inLanguage": "en"},
            {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": data["title"], "isPartOf": {"@id": "https://pharpro.co/#website"}, "datePublished": TODAY, "dateModified": TODAY},
            {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pharpro.co/"}, {"@type": "ListItem", "position": 2, "name": "Insights", "item": "https://pharpro.co/insights/"}, {"@type": "ListItem", "position": 3, "name": data["h1"], "item": url}]},
            {"@type": "FAQPage", "mainEntity": faq_schema},
        ],
    }
    cluster = cluster_block(SLUG_CLUSTER[slug])
    return f'''<!doctype html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{escape(data["title"])}</title>
  <meta name="description" content="{escape(data["description"], quote=True)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <meta name="author" content="Mohammad Awawdeh, PHARPRO Consultation Company" />
  <link rel="canonical" href="{url}" />
  <link rel="alternate" hreflang="en" href="{url}" />
  <link rel="alternate" hreflang="x-default" href="{url}" />
  <meta property="og:type" content="article" /><meta property="og:url" content="{url}" />
  <meta property="og:title" content="{escape(data["title"], quote=True)}" /><meta property="og:description" content="{escape(data["description"], quote=True)}" />
  <meta property="og:image" content="https://pharpro.co{data["og"]}" /><meta property="og:site_name" content="PHARPRO" />
  <meta property="article:published_time" content="{TODAY}T09:00:00+03:00" /><meta property="article:modified_time" content="{TODAY}T09:00:00+03:00" /><meta property="article:author" content="Mohammad Awawdeh" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="{escape(data["title"], quote=True)}" /><meta name="twitter:description" content="{escape(data["description"], quote=True)}" /><meta name="twitter:image" content="https://pharpro.co{data["og"]}" />
  <link rel="icon" href="/images/logo.ico" /><link rel="stylesheet" href="/css/seo-enhancements.css?v=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>
  <style>
    :root{{--navy:#233A5E;--red:#B12C4B;--ink:#1C2330;--muted:#657187;--ivory:#F7F2ED;--line:#E3E8EF}}
    *{{box-sizing:border-box}}body{{margin:0;font-family:Inter,system-ui,sans-serif;color:var(--ink);line-height:1.7;background:#fff}}
    .site-nav{{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);border-bottom:1px solid var(--line)}}.nav-in{{max-width:1120px;margin:auto;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px}}.brand{{font-weight:800;color:var(--red);text-decoration:none;font-size:1.25rem}}.site-nav-links{{display:flex;gap:22px;align-items:center}}.site-nav-links a{{color:var(--navy);font-size:.9rem;font-weight:600;text-decoration:none}}.site-nav-links .cta{{background:var(--red);color:#fff;padding:9px 16px;border-radius:999px}}
    .article-hero{{background:linear-gradient(145deg,#F7F2ED,#EEF3F8);padding:72px 24px 58px}}.article-hero-in,.article{{max-width:820px;margin:auto}}.crumbs{{font-size:.82rem;margin-bottom:24px}}.crumbs a{{color:var(--red)}}.eyebrow{{font-size:.75rem;color:var(--red);font-weight:800;text-transform:uppercase;letter-spacing:.1em}}h1{{font-size:clamp(2.15rem,5vw,3.65rem);line-height:1.08;color:var(--navy);letter-spacing:-.035em;margin:.35em 0}}.dek{{font-size:1.1rem;color:var(--muted);max-width:720px}}.meta{{font-size:.82rem;color:var(--muted);margin-top:20px}}
    .article{{padding:54px 24px}}.article h2{{font-size:1.55rem;line-height:1.25;color:var(--navy);margin:2.2em 0 .55em}}.article p{{margin:0 0 1.15em}}.process{{margin:42px 0;padding:28px;background:var(--ivory);border-radius:18px}}.process h2{{margin-top:0}}.process ol{{list-style:none;padding:0;margin:22px 0 0;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}}.process li{{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;font-weight:700;color:var(--navy)}}.process li span{{display:inline-grid;place-items:center;width:26px;height:26px;margin-right:9px;background:var(--red);color:#fff;border-radius:50%;font-size:.75rem}}
    .refs,.faq{{margin-top:48px}}.refs a{{color:var(--navy)}}details{{border-top:1px solid var(--line);padding:17px 0}}summary{{cursor:pointer;font-weight:700;color:var(--navy)}}details p{{color:var(--muted);margin:.75em 0 0}}.article-cta{{margin:48px 0;background:var(--navy);color:#fff;border-radius:18px;padding:32px}}.article-cta h2{{color:#fff;margin:0 0 8px}}.article-cta a{{display:inline-block;margin-top:10px;background:var(--red);color:#fff;padding:11px 20px;border-radius:999px;text-decoration:none;font-weight:700}}
    .site-footer{{background:#17243A;color:rgba(255,255,255,.7);padding:34px 24px}}.foot-in{{max-width:1120px;margin:auto;display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}}.site-footer a{{color:#fff}}
    @media(max-width:720px){{.site-nav-links a:not(.cta){{display:none}}.process ol{{grid-template-columns:1fr}}}}
  </style>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
<nav class="site-nav" aria-label="Primary navigation"><div class="nav-in"><a class="brand" href="/">PHARPRO</a><div class="site-nav-links"><a href="/services/">Services</a><a href="/insights/">Insights</a><a class="cta" href="/contact/">Free assessment</a></div></div></nav>
<main id="main-content">
  <header class="article-hero"><div class="article-hero-in"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/insights/">Insights</a> / {escape(data["eyebrow"])}</nav><p class="eyebrow">{escape(data["eyebrow"])}</p><h1>{escape(data["h1"])}</h1><p class="dek">{escape(data["intro"])}</p><p class="meta">By Mohammad Awawdeh · Published and reviewed 24 August 2026</p></div></header>
  <article class="article">
    {sections}
    <section class="process"><h2>A defensible execution path</h2><ol>{steps}</ol></section>
    <section class="faq"><h2>Frequently asked questions</h2>{faqs}</section>
    <section class="refs"><h2>Primary references</h2><p>Use the current official publication and your applicable national requirements when approving a protocol or quality-system decision.</p><ul>{refs}</ul></section>
    <aside class="seo-author" aria-label="About the author"><div class="seo-author-mark">MA</div><div><p class="seo-kicker">Written and reviewed by</p><h2><a href="https://www.linkedin.com/in/mohammadhawawdeh/" target="_blank" rel="noopener noreferrer">Mohammad Awawdeh</a></h2><p>Founder of PHARPRO and pharmaceutical compliance consultant working across CSV, QA, CQV, GMP training and digital validation projects in MENA.</p><p class="seo-reviewed">Educational guidance only. Final decisions must be approved through the regulated company’s quality system.</p></div></aside>
    <section class="article-cta"><h2>Need support applying this to your facility?</h2><p>PHARPRO can scope the qualification, review your current documents or execute the work with your site team.</p><a href="{data["service"]}">Explore the related service →</a></section>
  </article>
  {cluster}
</main>
<footer class="site-footer"><div class="foot-in"><strong>PHARPRO Consultation Company</strong><span>Amman, Jordan · <a href="mailto:info@pharpro.co">info@pharpro.co</a></span></div></footer>
<script src="/js/analytics.js"></script><script src="/js/lead-boost.js?v=3" defer></script>
</body></html>'''


def write_new_articles() -> None:
    for slug, data in NEW_ARTICLES.items():
        folder = ROOT / "insights" / slug
        folder.mkdir(parents=True, exist_ok=True)
        (folder / "index.html").write_text(article_html(slug, data), encoding="utf-8")


def update_html_files() -> None:
    for path in sorted(ROOT.rglob("*.html")):
        if "node_modules" in path.parts or "tools" in path.parts:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        text = set_title_description(path, text)
        text = normalize_authorship(text)
        text = expire_page(path, text)
        text = normalize_language_links(path, text)
        text = add_global_enhancements(text)
        text = add_article_author_and_cluster(path, text)
        text = add_service_proof(path, text)
        text = add_geo_intent(path, text)
        text = clean_schema(text)
        path.write_text(text, encoding="utf-8")


def update_homepage() -> None:
    path = ROOT / "index.html"
    text = path.read_text(encoding="utf-8")
    text = re.sub(
        r'<div id="ann-bar"[^>]*>.*?</div>',
        '<div id="ann-bar" class="site-announcement">Upcoming GMP and CSV training · September 2026. <a href="/services/training/">View training schedule →</a></div>',
        text,
        count=1,
        flags=re.S,
    )
    text = text.replace('<div class="tr-upcoming-grid" id="trUpcomingGrid"></div>\n      <div class="tr-upcoming-grid" id="trUpcomingGrid"></div>', '<div class="tr-upcoming-grid" id="trUpcomingGrid"></div>')
    text = text.replace("Response within 2 hours", "Response within one business day")
    path.write_text(text, encoding="utf-8")


def update_insights_hub() -> None:
    path = ROOT / "insights" / "index.html"
    text = path.read_text(encoding="utf-8")
    # Remove expired event cards from the public hub while retaining redirects.
    for marker in [
        "CSV TRAINING AUGUST 2026", "GMP TRAINING JULY 2026", "CSV TRAINING JUNE 2026",
    ]:
        text = re.sub(rf'\s*<!--\s*{re.escape(marker)}.*?-->\s*<article\b.*?</article>', "", text, count=1, flags=re.S | re.I)
    if "seo-topic-hub" not in text:
        cards = "".join(
            f'<a href="{c["service"][1]}"><strong>{escape(c["label"])}</strong><span>{escape(", ".join(x[0] for x in c["links"][:3]))}</span></a>'
            for c in CLUSTERS.values()
        )
        hub = f'''<section class="seo-topic-hub" aria-labelledby="topic-hub-title"><div class="seo-topic-hub-inner"><p class="seo-kicker">Browse by topic</p><h2 id="topic-hub-title">Pharmaceutical compliance knowledge hubs</h2><p>Start with the service that matches your objective, then use its connected guides to plan the work.</p><div class="seo-topic-grid">{cards}</div></div></section>'''
        text = text.replace('<section class="articles-section"', hub + '\n  <section class="articles-section"', 1)
    path.write_text(text, encoding="utf-8")


def update_robots() -> None:
    (ROOT / "robots.txt").write_text(
        """User-agent: *
Allow: /
Disallow: /api/
Disallow: /.git/
Disallow: /thank-you/

Sitemap: https://pharpro.co/sitemap.xml
""",
        encoding="utf-8",
    )


def local_url_for(path: Path) -> str:
    rel = path.parent.relative_to(ROOT).as_posix()
    return "/" if rel == "." else f"/{rel}/"


def meta_content(text: str, name: str) -> str:
    match = re.search(rf'<meta\s+name=["\']{re.escape(name)}["\']\s+content=["\']([^"\']*)', text, re.I)
    return match.group(1) if match else ""


def regenerate_sitemap() -> None:
    urls = []
    for path in sorted(ROOT.rglob("index.html")):
        if "node_modules" in path.parts:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        if "noindex" in meta_content(text, "robots"):
            continue
        local = local_url_for(path)
        canonical = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\'][^>]*>', text, re.I)
        if not canonical or canonical.group(1) != "https://pharpro.co" + local:
            continue
        if local == "/": priority = "1.0"
        elif local == "/services/dvs/": priority = "0.95"
        elif local.startswith("/services/"): priority = "0.90"
        elif local == "/insights/": priority = "0.85"
        elif local.startswith("/geo/"): priority = "0.80"
        elif local.startswith("/resources/"): priority = "0.80"
        elif local.startswith("/insights/"): priority = "0.75"
        else: priority = "0.70"
        urls.append((local, priority))
    body = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for local, priority in urls:
        body += ["  <url>", f"    <loc>https://pharpro.co{local}</loc>", f"    <lastmod>{TODAY}</lastmod>", f"    <priority>{priority}</priority>", "  </url>"]
    body.append("</urlset>")
    (ROOT / "sitemap.xml").write_text("\n".join(body) + "\n", encoding="utf-8")


def update_feed() -> None:
    path = ROOT / "feed.xml"
    ET.register_namespace("atom", "http://www.w3.org/2005/Atom")
    ET.register_namespace("content", "http://purl.org/rss/1.0/modules/content/")
    ET.register_namespace("dc", "http://purl.org/dc/elements/1.1/")
    tree = ET.parse(path)
    channel = tree.getroot().find("channel")
    channel.find("lastBuildDate").text = "Tue, 25 Aug 2026 12:00:00 +0300"
    expired_source_urls = {
        "https://pharpro.co/insights/gmp-training-july-2026/",
        "https://pharpro.co/insights/csv-training-august-2026/",
        "https://pharpro.co/insights/csv-training-pharma-june-2026/",
    }
    for item in list(channel.findall("item")):
        link = item.findtext("link", "")
        new_article_urls = {
            f"https://pharpro.co/insights/{slug}/" for slug in NEW_ARTICLES
        }
        if link in expired_source_urls or link in new_article_urls:
            channel.remove(item)
    first_item = channel.find("item")
    insert_at = list(channel).index(first_item) if first_item is not None else len(channel)
    for slug, data in reversed(list(NEW_ARTICLES.items())):
        item = ET.Element("item")
        ET.SubElement(item, "title").text = data["h1"]
        link = f"https://pharpro.co/insights/{slug}/"
        ET.SubElement(item, "link").text = link
        ET.SubElement(item, "guid", {"isPermaLink": "true"}).text = link
        ET.SubElement(item, "pubDate").text = "Mon, 24 Aug 2026 09:00:00 +0300"
        ET.SubElement(item, "{http://purl.org/dc/elements/1.1/}creator").text = "Mohammad Awawdeh"
        ET.SubElement(item, "category").text = data["eyebrow"]
        ET.SubElement(item, "description").text = data["description"]
        channel.insert(insert_at, item)
    ET.indent(tree, space="  ")
    xml = ET.tostring(tree.getroot(), encoding="unicode")
    path.write_text('<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>\n' + xml + "\n", encoding="utf-8")


def write_query_map() -> None:
    rows = ["URL,Primary intent,Cluster,Funnel,Geography"]
    core = [
        ("/", "pharmaceutical consulting MENA", "brand", "commercial", "MENA"),
        ("/services/csv/", "pharmaceutical CSV validation services", "csv", "commercial", "MENA"),
        ("/services/qa/", "pharmaceutical QA consulting", "qa", "commercial", "MENA"),
        ("/services/cqv/", "pharmaceutical CQV and thermal mapping", "cqv", "commercial", "MENA"),
        ("/services/training/", "pharmaceutical GMP training", "training", "commercial", "MENA"),
        ("/services/dvs/", "pharmaceutical validation software", "dvs", "commercial", "Global"),
    ]
    for item in core:
        rows.append(",".join(f'"{x}"' for x in item))
    for geo in ("jordan", "uae", "ksa", "egypt"):
        rows.append(",".join(f'"{x}"' for x in (f"/geo/{geo}/", f"pharmaceutical consulting {geo}", "local", "commercial", geo.upper())))
    for slug, cluster in sorted(SLUG_CLUSTER.items()):
        title = NEW_ARTICLES.get(slug, {}).get("h1", slug.replace("-", " "))
        rows.append(",".join(f'"{x}"' for x in (f"/insights/{slug}/", title, cluster, "informational-to-commercial", "Global")))
    (ROOT / "SEO_QUERY_MAP.csv").write_text("\n".join(rows) + "\n", encoding="utf-8")


def main() -> None:
    write_new_articles()
    update_html_files()
    update_homepage()
    update_insights_hub()
    update_robots()
    regenerate_sitemap()
    update_feed()
    write_query_map()
    print("PHARPRO SEO rebuild complete")


if __name__ == "__main__":
    main()
