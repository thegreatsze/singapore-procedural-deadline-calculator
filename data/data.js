/**
 * Singapore Procedural Deadline Calculator — Inline Data
 * Rules of Court 2021 (S 914/2021, in force 1 April 2022)
 * State Courts Civil Procedure Rules 2022 (S 924/2021)
 * Supreme Court Practice Directions 2021
 *
 * To update holidays/vacations: edit SG_HOLIDAYS_DATA below.
 * To update rules: edit SG_RULES_DATA.triggers below.
 * Verify court vacation dates annually at https://www.judiciary.gov.sg/civil/court-vacation
 * Verify public holidays annually at https://www.mom.gov.sg/employment-practices/public-holidays
 */

const SG_HOLIDAYS_DATA = {
  "publicHolidays": {
    "2025": [
      { "date": "2025-01-01", "name": "New Year's Day" },
      { "date": "2025-01-29", "name": "Chinese New Year (Day 1)" },
      { "date": "2025-01-30", "name": "Chinese New Year (Day 2)" },
      { "date": "2025-03-31", "name": "Hari Raya Puasa" },
      { "date": "2025-04-18", "name": "Good Friday" },
      { "date": "2025-05-01", "name": "Labour Day" },
      { "date": "2025-05-12", "name": "Vesak Day" },
      { "date": "2025-06-07", "name": "Hari Raya Haji (Saturday)" },
      { "date": "2025-06-09", "name": "Hari Raya Haji (substitute \u2014 Monday)" },
      { "date": "2025-08-09", "name": "National Day (Saturday)" },
      { "date": "2025-08-11", "name": "National Day (substitute \u2014 Monday)" },
      { "date": "2025-10-20", "name": "Deepavali" },
      { "date": "2025-12-25", "name": "Christmas Day" }
    ],
    "2026": [
      { "date": "2026-01-01", "name": "New Year's Day" },
      { "date": "2026-02-17", "name": "Chinese New Year (Day 1)" },
      { "date": "2026-02-18", "name": "Chinese New Year (Day 2)" },
      { "date": "2026-03-20", "name": "Hari Raya Puasa" },
      { "date": "2026-04-03", "name": "Good Friday" },
      { "date": "2026-05-01", "name": "Labour Day" },
      { "date": "2026-05-27", "name": "Hari Raya Haji" },
      { "date": "2026-05-31", "name": "Vesak Day (Sunday)" },
      { "date": "2026-06-01", "name": "Vesak Day (substitute \u2014 Monday)" },
      { "date": "2026-08-09", "name": "National Day (Sunday)" },
      { "date": "2026-08-10", "name": "National Day (substitute \u2014 Monday)" },
      { "date": "2026-11-08", "name": "Deepavali (Sunday)" },
      { "date": "2026-11-09", "name": "Deepavali (substitute \u2014 Monday)" },
      { "date": "2026-12-25", "name": "Christmas Day" }
    ]
  },
  "courtVacations": {
    "2025": [
      { "name": "Chinese New Year Vacation 2025",  "start": "2025-01-28", "end": "2025-01-31" },
      { "name": "March Vacation 2025",             "start": "2025-03-17", "end": "2025-03-28" },
      { "name": "June/July Vacation 2025",         "start": "2025-05-28", "end": "2025-06-25" },
      { "name": "September Vacation 2025",         "start": "2025-09-01", "end": "2025-09-12" },
      { "name": "Year-End Vacation 2025",          "start": "2025-11-24", "end": "2025-12-05" }
    ],
    "2026": [
      { "name": "Chinese New Year Vacation 2026",  "start": "2026-02-16", "end": "2026-02-19" },
      { "name": "March Vacation 2026",             "start": "2026-03-16", "end": "2026-03-27" },
      { "name": "June/July Vacation 2026",         "start": "2026-05-27", "end": "2026-06-24" },
      { "name": "September Vacation 2026",         "start": "2026-08-31", "end": "2026-09-11" },
      { "name": "Year-End Vacation 2026",          "start": "2026-11-23", "end": "2026-12-04" }
    ]
  }
};

const SG_RULES_DATA = {
  "categories": [
    { "id": "pleadings",      "label": "Pleadings \u2014 Originating Claim Track" },
    { "id": "third_party",    "label": "Third Party Proceedings" },
    { "id": "case_mgmt",      "label": "Case Management & Single Application Pending Trial" },
    { "id": "interlocutory",  "label": "Interlocutory Applications" },
    { "id": "discovery",      "label": "Discovery & Inspection" },
    { "id": "oa_track",       "label": "Originating Application Track" },
    { "id": "appeals_hc_ca",  "label": "Appeals \u2014 High Court to Court of Appeal / Appellate Division" },
    { "id": "appeals_sc_hc",  "label": "Appeals \u2014 State Courts to High Court" },
    { "id": "appeals_misc",   "label": "Appeals \u2014 Registrar, Permission & Cross-Appeal" },
    { "id": "enforcement",    "label": "Enforcement of Judgments" },
    { "id": "committal",      "label": "Committal Proceedings" },
    { "id": "costs",          "label": "Costs & Assessment" },
    { "id": "arbitration",    "label": "Arbitration (Court Proceedings)" },
    { "id": "tribunals",      "label": "Tribunals (Small Claims Tribunal / Employment Claims Tribunal)" },
    { "id": "other",          "label": "Other / Validity / Pre-Action" }
  ],

  "triggers": [

    /* ── PLEADINGS ── */

    {
      "id": "service_oc_with_soc_in_sg",
      "label": "Service of Originating Claim + Statement of Claim \u2014 Defendant in Singapore",
      "category": "pleadings",
      "reference": "O 6 rr 6\u20137, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "nic_in_sg",
          "label": "File and Serve Notice of Intention to Contest",
          "days": 14, "unit": "days",
          "reference": "O 6 r 6(1), ROC 2021",
          "note": "Defendant served in Singapore must file and serve the Notice of Intention to Contest or Not Contest (Form 10) within 14 days after service of the Originating Claim and Statement of Claim. Under the Rules of Court 2021, this replaces the former 8-day Memorandum of Appearance."
        },
        {
          "id": "defence_in_sg",
          "label": "File and Serve Defence",
          "days": 21, "unit": "days",
          "reference": "O 6 r 7(1), ROC 2021",
          "note": "Defendant must file and serve Defence within 21 days after service of the Statement of Claim (or Originating Claim with Statement of Claim). Under the Rules of Court 2021, this increased from the former 14 days to 21 days."
        }
      ]
    },

    {
      "id": "service_oc_with_soc_outside_sg",
      "label": "Service of Originating Claim + Statement of Claim \u2014 Defendant outside Singapore",
      "category": "pleadings",
      "reference": "O 6 rr 6\u20137, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "nic_outside_sg",
          "label": "File and Serve Notice of Intention to Contest",
          "days": 21, "unit": "days",
          "reference": "O 6 r 6(2), ROC 2021",
          "note": "Defendant served outside Singapore must file and serve the Notice of Intention to Contest within 21 days, or such other time as fixed in the order granting leave to serve out of jurisdiction."
        },
        {
          "id": "defence_outside_sg",
          "label": "File and Serve Defence",
          "days": 5, "unit": "weeks",
          "reference": "O 6 r 7(2), ROC 2021",
          "note": "Defendant served outside Singapore must file and serve Defence within 5 weeks (35 days) after service of the Originating Claim and Statement of Claim, or as ordered."
        }
      ]
    },

    {
      "id": "service_general_endorsed_oc",
      "label": "Service of Generally-Endorsed Originating Claim (without full Statement of Claim)",
      "category": "pleadings",
      "reference": "O 6 rr 5\u20136, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "nic_general_oc",
          "label": "File and Serve Notice of Intention to Contest",
          "days": 14, "unit": "days",
          "reference": "O 6 r 6(1), ROC 2021",
          "note": "Defendant must file the Notice of Intention to Contest within 14 days after service of the generally-endorsed Originating Claim."
        },
        {
          "id": "serve_full_soc",
          "label": "Claimant: Serve Full Statement of Claim on Defendant",
          "days": 14, "unit": "days",
          "reference": "O 6 r 5, ROC 2021",
          "note": "After serving a generally-endorsed Originating Claim, the Claimant must serve the full Statement of Claim within 14 days after service of the generally-endorsed Originating Claim. The defendant\u2019s Defence deadline runs from service of the full Statement of Claim."
        }
      ]
    },

    {
      "id": "service_soc_after_nic",
      "label": "Service of Statement of Claim (served separately after Notice of Intention to Contest filed)",
      "category": "pleadings",
      "reference": "O 6 r 7, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "defence_after_soc",
          "label": "File and Serve Defence",
          "days": 21, "unit": "days",
          "reference": "O 6 r 7(1), ROC 2021",
          "note": "Defendant who has already filed the Notice of Intention to Contest must file and serve Defence within 21 days after service of the Statement of Claim."
        }
      ]
    },

    {
      "id": "service_defence",
      "label": "Service of Defence",
      "category": "pleadings",
      "reference": "O 6 r 8, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "reply",
          "label": "File and Serve Reply (if any)",
          "days": 14, "unit": "days",
          "reference": "O 6 r 8(1), ROC 2021",
          "note": "If the Claimant wishes to file a Reply, it must be filed and served within 14 days after service of the Defence. A Reply is not mandatory."
        }
      ]
    },

    {
      "id": "service_defence_and_counterclaim",
      "label": "Service of Defence and Counterclaim",
      "category": "pleadings",
      "reference": "O 6 rr 8\u20139, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "reply_to_defence",
          "label": "File and Serve Reply to Defence (if any)",
          "days": 14, "unit": "days",
          "reference": "O 6 r 8(1), ROC 2021",
          "note": "Reply to the Defence component (if any) must be filed within 14 days. Not mandatory."
        },
        {
          "id": "defence_to_counterclaim",
          "label": "File and Serve Defence to Counterclaim",
          "days": 14, "unit": "days",
          "reference": "O 6 r 9(1), ROC 2021",
          "note": "The Claimant must file and serve a Defence to Counterclaim within 14 days after service of the Defence and Counterclaim."
        }
      ]
    },

    /* ── THIRD PARTY PROCEEDINGS ── */

    {
      "id": "service_third_party_notice_in_sg",
      "label": "Service of Third Party Notice \u2014 Third Party in Singapore",
      "category": "third_party",
      "reference": "O 10 rr 1, 4, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "tp_nic_in_sg",
          "label": "Third Party: File and Serve Notice of Intention to Contest",
          "days": 14, "unit": "days",
          "reference": "O 10 r 1(1), ROC 2021",
          "note": "Third Party served in Singapore must file the Notice of Intention to Contest within 14 days, mirroring the standard rule under O 6 r 6."
        },
        {
          "id": "tp_defence_in_sg",
          "label": "Third Party: File and Serve Defence",
          "days": 21, "unit": "days",
          "reference": "O 10 r 4(1), ROC 2021",
          "note": "Third Party served in Singapore must file Defence within 21 days after service of the Third Party claim."
        }
      ]
    },

    {
      "id": "service_third_party_notice_outside_sg",
      "label": "Service of Third Party Notice \u2014 Third Party outside Singapore",
      "category": "third_party",
      "reference": "O 10 rr 1, 4, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "tp_nic_outside_sg",
          "label": "Third Party: File and Serve Notice of Intention to Contest",
          "days": 21, "unit": "days",
          "reference": "O 10 r 1(2), ROC 2021",
          "note": "Third Party served outside Singapore must file the Notice of Intention to Contest within 21 days, or as ordered in the leave to serve out order."
        },
        {
          "id": "tp_defence_outside_sg",
          "label": "Third Party: File and Serve Defence",
          "days": 5, "unit": "weeks",
          "reference": "O 10 r 4(2), ROC 2021",
          "note": "Third Party served outside Singapore must file Defence within 5 weeks (35 days) after service of the Third Party claim."
        }
      ]
    },

    /* ── CASE MANAGEMENT & SINGLE APPLICATION PENDING TRIAL ── */

    {
      "id": "issue_of_oc_sg_service",
      "label": "Issue of Originating Claim / Originating Application (to be served in Singapore)",
      "category": "case_mgmt",
      "reference": "O 9 r 1, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "first_cc_sg",
          "label": "First Case Conference (indicative \u2014 fixed by Registry)",
          "days": 8, "unit": "weeks",
          "reference": "O 9 r 1(1), ROC 2021",
          "note": "The Registry fixes the first Case Conference at approximately 8 weeks after the issue of the Originating Claim or Originating Application (where it is to be served in Singapore). The actual date is fixed by the court \u2014 this is indicative only."
        }
      ]
    },

    {
      "id": "issue_of_oc_outside_sg_service",
      "label": "Issue of Originating Claim / Originating Application (to be served outside Singapore)",
      "category": "case_mgmt",
      "reference": "O 9 r 1, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "first_cc_outside_sg",
          "label": "First Case Conference (indicative \u2014 fixed by Registry)",
          "days": 12, "unit": "weeks",
          "reference": "O 9 r 1(2), ROC 2021",
          "note": "Where the Originating Claim or Originating Application is to be served outside Singapore, the Registry fixes the first Case Conference at approximately 12 weeks after issue. The actual date is fixed by the court."
        }
      ]
    },

    {
      "id": "case_conference_direction",
      "label": "Date of Case Conference (document exchange and Single Application Pending Trial directions made)",
      "category": "case_mgmt",
      "reference": "O 9 rr 3, 7, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "document_exchange",
          "label": "Exchange List and Copies of Relevant Documents",
          "days": 14, "unit": "days",
          "reference": "O 9 r 3; O 11 r 2, ROC 2021",
          "note": "Following the Case Conference, parties are typically directed to exchange their lists and copies of all relevant documents within 14 days. The court\u2019s actual direction controls."
        },
        {
          "id": "sapt_application",
          "label": "Single Application Pending Trial Applicant: File Summons and Supporting Affidavit",
          "days": 21, "unit": "days",
          "reference": "O 9 r 7(1), ROC 2021",
          "note": "Where a Single Application Pending Trial direction is made at the Case Conference, the applicant must file and serve the summons and supporting affidavit within 21 days. All interlocutory applications (discovery, summary judgment, security for costs, etc.) must be consolidated into this single application."
        }
      ]
    },

    {
      "id": "service_sapt_affidavit",
      "label": "Service of Single Application Pending Trial Summons and Supporting Affidavit (on Respondent)",
      "category": "case_mgmt",
      "reference": "O 9 r 7, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "sapt_respondent_affidavit",
          "label": "Single Application Pending Trial Respondent: File and Serve Affidavit in Reply",
          "days": 21, "unit": "days",
          "reference": "O 9 r 7(2), ROC 2021",
          "note": "The respondent to the Single Application Pending Trial must file and serve their affidavit in reply within 21 days after service of the applicant\u2019s summons and supporting affidavit."
        }
      ]
    },

    {
      "id": "trial_date_pre_moratorium",
      "label": "Date of Trial (to calculate pre-trial cutoff for applications and amendments)",
      "category": "case_mgmt",
      "reference": "O 9 r 9(7); O 7 r 3, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "application_moratorium",
          "label": "Last Day to File Interlocutory Applications (before 14-day moratorium)",
          "days": 14, "unit": "days", "direction": "before",
          "reference": "O 9 r 9(7), ROC 2021",
          "note": "No interlocutory application may be filed from 14 days before the commencement of trial until the merits are determined, except with the trial judge\u2019s approval. Enter the trial date to find the last permitted filing day. If that day is a non-filing day, the last opportunity is the preceding filing day."
        },
        {
          "id": "amendment_cutoff",
          "label": "Last Day to Amend Pleadings without Leave (before 14-day cutoff)",
          "days": 14, "unit": "days", "direction": "before",
          "reference": "O 7 r 3, ROC 2021",
          "note": "Pleadings may not be amended less than 14 days before commencement of trial without court approval. Enter the trial date to find the last day to amend without leave."
        }
      ]
    },

    /* ── INTERLOCUTORY APPLICATIONS ── */

    {
      "id": "service_summons_ia",
      "label": "Service of Summons / Interlocutory Application (outside Single Application Pending Trial framework)",
      "category": "interlocutory",
      "reference": "O 9, ROC 2021; Supreme Court Practice Directions 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "respondent_affidavit_ia",
          "label": "File and Serve Respondent\u2019s Affidavit",
          "days": 14, "unit": "days",
          "reference": "Supreme Court Practice Directions 2021 (interlocutory hearings)",
          "note": "For interlocutory applications, the responding party typically has 14 days to file and serve their affidavit(s) in reply after service of the summons and supporting affidavit. Confirm with any specific court directions."
        }
      ]
    },

    {
      "id": "service_respondent_affidavit_ia",
      "label": "Service of Respondent\u2019s Affidavit (Interlocutory Application)",
      "category": "interlocutory",
      "reference": "Supreme Court Practice Directions 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "applicant_reply_affidavit_ia",
          "label": "File and Serve Applicant\u2019s Reply Affidavit",
          "days": 7, "unit": "days",
          "reference": "Supreme Court Practice Directions 2021 (interlocutory hearings)",
          "note": "Applicant\u2019s reply affidavit is typically due 7 days after service of the respondent\u2019s affidavit. As a period of 14 days or fewer in the Supreme Court, court vacation days are excluded from the count under O 2 r 4, Rules of Court 2021."
        }
      ]
    },

    /* ── DISCOVERY & INSPECTION ── */

    {
      "id": "service_list_of_documents",
      "label": "Service of List of Documents",
      "category": "discovery",
      "reference": "O 11 r 4, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "inspection",
          "label": "Allow Inspection of Documents",
          "days": 7, "unit": "days",
          "reference": "O 11 r 4(1), ROC 2021",
          "note": "The serving party must allow inspection of the listed documents within 7 days of serving the List of Documents. As a period of 14 days or fewer in the Supreme Court, court vacation days are excluded from the count under O 2 r 4, Rules of Court 2021."
        }
      ]
    },

    /* ── ORIGINATING APPLICATION TRACK ── */

    {
      "id": "service_oa",
      "label": "Service of Originating Application on Respondent",
      "category": "oa_track",
      "reference": "O 6 rr 15\u201316, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "respondent_affidavit_oa",
          "label": "File and Serve Respondent\u2019s Affidavit",
          "days": 21, "unit": "days",
          "reference": "O 6 r 16(1), ROC 2021",
          "note": "Respondent must file and serve their affidavit(s) in reply within 21 days after service of the Originating Application and supporting affidavit."
        }
      ]
    },

    {
      "id": "service_respondent_affidavit_oa",
      "label": "Service of Respondent\u2019s Affidavit (Originating Application)",
      "category": "oa_track",
      "reference": "O 6 r 16, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "applicant_reply_affidavit_oa",
          "label": "File and Serve Applicant\u2019s Reply Affidavit (if any)",
          "days": 14, "unit": "days",
          "reference": "O 6 r 16(2), ROC 2021",
          "note": "Applicant\u2019s reply affidavit (if any) must be filed within 14 days of service of the respondent\u2019s affidavit."
        }
      ]
    },

    /* ── APPEALS: HIGH COURT TO COURT OF APPEAL / APPELLATE DIVISION ── */

    {
      "id": "hc_judgment_for_ca_appeal",
      "label": "Date of High Court Judge\u2019s Decision (General Division) \u2014 Appeal to Court of Appeal / Appellate Division",
      "category": "appeals_hc_ca",
      "reference": "O 17 r 4; O 19 r 8, ROC 2021; Legal Profession Act",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "further_arguments",
          "label": "Request Further Arguments (where required before appealing interlocutory orders)",
          "days": 14, "unit": "days",
          "reference": "O 17 r 4; Legal Profession Act s 34(1)(c)",
          "note": "For certain interlocutory orders from the General Division, a party must request further arguments from the judge within 14 days of the order before becoming entitled to appeal. The appeal period then runs from the date the judge certifies no further arguments are required (or 14 days after the request if no response). Not required for all orders \u2014 check applicability."
        },
        {
          "id": "notice_of_appeal_hc_to_ca",
          "label": "File Notice of Appeal to Court of Appeal / Appellate Division",
          "days": 28, "unit": "days",
          "reference": "O 19 r 8(1), ROC 2021",
          "note": "Notice of Appeal must be filed within 28 days of the High Court Judge\u2019s decision (including any costs determination, or after expiry of the 30-day costs window if costs are not yet determined). Under the Rules of Court 2021 this is 28 days, not 30 days as under the former Rules of Court."
        }
      ]
    },

    {
      "id": "hc_decision_permission_to_appeal",
      "label": "Date of High Court Judge\u2019s Decision \u2014 Permission to Appeal Required (to Court of Appeal / Appellate Division)",
      "category": "appeals_hc_ca",
      "reference": "O 19 r 25\u201326, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "apply_permission_to_appeal",
          "label": "Apply for Permission to Appeal",
          "days": 14, "unit": "days",
          "reference": "O 19 r 25(1), ROC 2021",
          "note": "Where permission to appeal is required (e.g. certain interlocutory matters), the application must be filed within 14 days of the judge\u2019s decision."
        }
      ]
    },

    {
      "id": "permission_to_appeal_granted",
      "label": "Date Permission to Appeal Granted (to Court of Appeal / Appellate Division)",
      "category": "appeals_hc_ca",
      "reference": "O 19 r 26, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "noa_after_permission",
          "label": "File Notice of Appeal",
          "days": 14, "unit": "days",
          "reference": "O 19 r 26(1), ROC 2021",
          "note": "After permission to appeal is granted, the Notice of Appeal must be filed within 14 days of the grant of permission."
        }
      ]
    },

    {
      "id": "filing_noa_ca",
      "label": "Filing of Notice of Appeal (to Court of Appeal / Appellate Division)",
      "category": "appeals_hc_ca",
      "reference": "O 19 rr 30\u201331, ROC 2021; Supreme Court Practice Directions 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "record_of_appeal_ca",
          "label": "File Record of Appeal",
          "days": 2, "unit": "months",
          "reference": "O 19 r 30(1), ROC 2021",
          "note": "The Appellant must file the Record of Appeal within 2 calendar months of filing the Notice of Appeal."
        },
        {
          "id": "appellants_case_ca",
          "label": "File Appellant\u2019s Case",
          "days": 2, "unit": "months",
          "reference": "O 19 r 30(2), ROC 2021; Supreme Court Practice Directions 2021",
          "note": "Appellant\u2019s Case is filed simultaneously with the Record of Appeal, within 2 calendar months of filing the Notice of Appeal."
        }
      ]
    },

    {
      "id": "service_roa_appellants_case_ca",
      "label": "Service of Record of Appeal and Appellant\u2019s Case (Court of Appeal / Appellate Division track)",
      "category": "appeals_hc_ca",
      "reference": "O 19 r 31, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "respondents_case_ca",
          "label": "File Respondent\u2019s Case",
          "days": 42, "unit": "days",
          "reference": "O 19 r 31(1), ROC 2021",
          "note": "Respondent\u2019s Case must be filed within 42 days of service of the Record of Appeal and Appellant\u2019s Case."
        }
      ]
    },

    {
      "id": "service_respondents_case_ca",
      "label": "Service of Respondent\u2019s Case (Court of Appeal / Appellate Division track)",
      "category": "appeals_hc_ca",
      "reference": "O 19 r 32, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "appellants_reply_ca",
          "label": "File Appellant\u2019s Reply (if any)",
          "days": 14, "unit": "days",
          "reference": "O 19 r 32(1), ROC 2021",
          "note": "Appellant\u2019s Reply and second core bundle (if any) must be filed within 14 days of service of the Respondent\u2019s Case."
        }
      ]
    },

    /* ── APPEALS: STATE COURTS TO HIGH COURT ── */

    {
      "id": "state_courts_final_judgment",
      "label": "Date of Final Judgment / Order \u2014 State Courts (District Court or Magistrates\u2019 Court)",
      "category": "appeals_sc_hc",
      "reference": "O 19 r 14, ROC 2021; State Courts Act",
      "courtType": "state",
      "deadlines": [
        {
          "id": "noa_state_final",
          "label": "File Notice of Appeal to High Court General Division",
          "days": 28, "unit": "days",
          "reference": "O 19 r 14(1), ROC 2021",
          "note": "Notice of Appeal from a final judgment of the District Court or Magistrates\u2019 Court to the High Court General Division must be filed within 28 days of the judgment or order."
        }
      ]
    },

    {
      "id": "state_courts_interlocutory_decision",
      "label": "Date of Interlocutory Decision \u2014 State Courts (District Court or Magistrates\u2019 Court)",
      "category": "appeals_sc_hc",
      "reference": "O 18 r 24, ROC 2021; State Courts Act",
      "courtType": "state",
      "deadlines": [
        {
          "id": "noa_state_interlocutory",
          "label": "File Notice of Appeal to High Court General Division",
          "days": 14, "unit": "days",
          "reference": "O 18 r 24(1), ROC 2021",
          "note": "Notice of Appeal from an interlocutory decision of the District Court or Magistrates\u2019 Court to the High Court General Division must be filed within 14 days of the decision."
        }
      ]
    },

    {
      "id": "state_courts_refuses_permission",
      "label": "State Courts Refusal of Permission to Appeal",
      "category": "appeals_sc_hc",
      "reference": "O 18 r 25, ROC 2021",
      "courtType": "state",
      "deadlines": [
        {
          "id": "apply_hc_permission",
          "label": "Apply to High Court General Division for Permission to Appeal",
          "days": 14, "unit": "days",
          "reference": "O 18 r 25(1), ROC 2021",
          "note": "If the District Court or Magistrates\u2019 Court refuses permission to appeal, the applicant may apply to the High Court General Division for permission within 14 days of the refusal."
        }
      ]
    },

    {
      "id": "filing_noa_state_courts",
      "label": "Filing of Notice of Appeal (State Courts to High Court General Division)",
      "category": "appeals_sc_hc",
      "reference": "O 19 rr 15\u201317, ROC 2021",
      "courtType": "state",
      "deadlines": [
        {
          "id": "roa_state",
          "label": "File Record of Appeal",
          "days": 2, "unit": "months",
          "reference": "O 19 r 15(1), ROC 2021",
          "note": "Appellant must file the Record of Appeal within 2 calendar months of filing the Notice of Appeal."
        },
        {
          "id": "appellants_case_state",
          "label": "File Appellant\u2019s Case",
          "days": 2, "unit": "months",
          "reference": "O 19 r 16(1), ROC 2021",
          "note": "Appellant\u2019s Case is filed simultaneously with the Record of Appeal, within 2 calendar months of filing the Notice of Appeal."
        }
      ]
    },

    {
      "id": "service_roa_appellants_case_state",
      "label": "Service of Record of Appeal and Appellant\u2019s Case (State Courts to High Court track)",
      "category": "appeals_sc_hc",
      "reference": "O 19 r 17, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "respondents_case_state",
          "label": "File Respondent\u2019s Case",
          "days": 42, "unit": "days",
          "reference": "O 19 r 17(1), ROC 2021",
          "note": "Respondent\u2019s Case must be filed within 42 days of service of the Record of Appeal and Appellant\u2019s Case."
        }
      ]
    },

    /* ── APPEALS: REGISTRAR, PERMISSION & CROSS-APPEAL ── */

    {
      "id": "registrar_decision",
      "label": "Date of Registrar\u2019s Decision / Order",
      "category": "appeals_misc",
      "reference": "O 18 r 17, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "appeal_registrar_to_judge",
          "label": "File Notice of Appeal from Registrar to Judge in Chambers",
          "days": 14, "unit": "days",
          "reference": "O 18 r 17(1), ROC 2021",
          "note": "An appeal from a Registrar\u2019s decision to a Judge in Chambers must be filed within 14 days of the Registrar\u2019s decision."
        }
      ]
    },

    {
      "id": "service_opponent_noa",
      "label": "Service of Opponent\u2019s Notice of Appeal (for Cross-Appeal)",
      "category": "appeals_misc",
      "reference": "O 19 r 33, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "cross_appeal",
          "label": "File Notice of Cross-Appeal / Respondent\u2019s Notice",
          "days": 14, "unit": "days",
          "reference": "O 19 r 33(1), ROC 2021",
          "note": "A cross-appeal must be filed within the original appeal period, or within 14 days of service of the other party\u2019s Notice of Appeal, whichever is later. Run this from the date of service of the opponent\u2019s Notice of Appeal."
        }
      ]
    },

    {
      "id": "hc_costs_determination_window",
      "label": "Date of Trial Merits Determination (High Court) \u2014 Costs Not Yet Determined",
      "category": "appeals_misc",
      "reference": "O 19 r 4, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "costs_window_expiry",
          "label": "Costs Must Be Determined (or 28-Day Appeal Period Starts Running)",
          "days": 30, "unit": "days",
          "reference": "O 19 r 4, ROC 2021",
          "note": "If the trial judge has determined the merits but not costs, the 28-day appeal period starts to run after costs are determined, or after 30 days have elapsed from the merits determination if costs are still not determined. Enter the date of the merits judgment to find when the 30-day costs window expires and the appeal clock starts running."
        }
      ]
    },

    /* ── ENFORCEMENT ── */

    {
      "id": "service_of_order_on_debtor",
      "label": "Service of Court Order / Judgment on Judgment Debtor",
      "category": "enforcement",
      "reference": "O 22 r 2, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "earliest_enforcement_application",
          "label": "Earliest Date to Apply for Enforcement Order",
          "days": 3, "unit": "days",
          "reference": "O 22 r 2(1), ROC 2021",
          "note": "An enforcement application may be made no earlier than 3 days after service of the court order on the judgment debtor. Enter the date of service to find the earliest date to apply."
        }
      ]
    },

    {
      "id": "service_notice_seizure_movables",
      "label": "Service of Notice of Seizure \u2014 Movable Property",
      "category": "enforcement",
      "reference": "O 22 r 8, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "earliest_sale_movables",
          "label": "Earliest Date Bailiff May Proceed with Sale of Movable Property",
          "days": 14, "unit": "days",
          "reference": "O 22 r 8(1), ROC 2021",
          "note": "The Bailiff may not proceed with the sale of seized movable property before 14 days after service of the Notice of Seizure. Perishable property is an exception. Enter the date of service to find the earliest sale date."
        }
      ]
    },

    {
      "id": "service_notice_seizure_immovables",
      "label": "Service of Notice of Seizure \u2014 Immovable Property",
      "category": "enforcement",
      "reference": "O 22 r 9, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "earliest_sale_immovables",
          "label": "Earliest Date Bailiff May Proceed with Sale of Immovable Property",
          "days": 30, "unit": "days",
          "reference": "O 22 r 9(1), ROC 2021",
          "note": "The Bailiff may not proceed with the sale of seized immovable property before 30 days after service of the Notice of Seizure."
        }
      ]
    },

    {
      "id": "service_notice_seizure_attachment",
      "label": "Service of Notice of Seizure / Attachment on Third Party",
      "category": "enforcement",
      "reference": "O 22 r 10, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "tp_objection",
          "label": "Third Party: File Notice of Objection to Seizure / Attachment",
          "days": 14, "unit": "days",
          "reference": "O 22 r 10(1), ROC 2021",
          "note": "A third party claiming an interest in seized or attached property must file a Notice of Objection within 14 days of service of the Notice of Seizure or Attachment."
        }
      ]
    },

    {
      "id": "receipt_of_tp_objection",
      "label": "Receipt of Third Party Objection by Enforcement Applicant",
      "category": "enforcement",
      "reference": "O 22 r 10, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "respond_to_tp_objection",
          "label": "Notify Sheriff and Objector if Accepting the Objection",
          "days": 14, "unit": "days",
          "reference": "O 22 r 10(2), ROC 2021",
          "note": "If the enforcement applicant accepts the third party\u2019s objection, they must notify the Sheriff and the objector in writing within 14 days of receiving the objection."
        }
      ]
    },

    /* ── COMMITTAL PROCEEDINGS ── */

    {
      "id": "grant_permission_committal",
      "label": "Grant of Permission to Apply for Order of Committal",
      "category": "committal",
      "reference": "O 23 r 4, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "committal_summons",
          "label": "File Summons for Order of Committal",
          "days": 14, "unit": "days",
          "reference": "O 23 r 4(1), ROC 2021",
          "note": "The summons for an Order of Committal must be filed within 14 days of the grant of permission. If not filed within this period, the permission lapses automatically and a fresh application for permission must be made."
        }
      ]
    },

    /* ── COSTS & ASSESSMENT ── */

    {
      "id": "order_for_costs_assessment",
      "label": "Date of Order for Costs to Be Assessed (or Conclusion of Proceedings)",
      "category": "costs",
      "reference": "O 21 r 5, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "bill_of_costs",
          "label": "File Bill of Costs for Assessment",
          "days": 12, "unit": "months",
          "reference": "O 21 r 5(1), ROC 2021",
          "note": "A Bill of Costs for assessment must be filed within 12 calendar months of the date of the order for assessment (or conclusion of proceedings if costs follow the event). Under the Rules of Court 2021, this is 12 months, not 6 months as under the former Rules of Court."
        }
      ]
    },

    {
      "id": "service_bill_of_costs",
      "label": "Assessment Hearing Date (for Bill of Costs objection deadline)",
      "category": "costs",
      "reference": "O 21 r 20, ROC 2021; Supreme Court Practice Directions 2021 Part 15",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "notice_of_dispute",
          "label": "Last Day to File Notice of Dispute / Objections to Bill of Costs",
          "days": 14, "unit": "days", "direction": "before",
          "reference": "O 21 r 20; Supreme Court Practice Directions 2021 para 133",
          "note": "The paying party must file their Notice of Dispute (objections in principle or as to quantum) at least 14 days before the scheduled assessment hearing. Enter the hearing date to find the last day to file the Notice of Dispute."
        }
      ]
    },

    /* ── ARBITRATION ── */

    {
      "id": "receipt_of_arbitral_award",
      "label": "Date of Receipt of Arbitral Award",
      "category": "arbitration",
      "reference": "International Arbitration Act (Cap 143A) s 24; Arbitration Act (Cap 10) s 48",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "set_aside_award",
          "label": "File Application to Set Aside Arbitral Award",
          "days": 3, "unit": "months",
          "reference": "International Arbitration Act s 24(1); Model Law Art 34(3)",
          "note": "Application to the High Court General Division to set aside an arbitral award must be made within 3 calendar months of receipt of the award, or (if a correction, interpretation, or additional award was requested under Article 33 of the Model Law) within 3 months of the disposal of that request. This limit is strictly jurisdictional and cannot be extended by agreement of the parties."
        }
      ]
    },

    /* ── TRIBUNALS ── */

    {
      "id": "sct_order",
      "label": "Date of Small Claims Tribunal Order",
      "category": "tribunals",
      "reference": "Small Claims Tribunals Act (Cap 308) s 38",
      "courtType": "state",
      "deadlines": [
        {
          "id": "sct_permission_to_appeal",
          "label": "Apply for Permission to Appeal Small Claims Tribunal Order (to District Court)",
          "days": 14, "unit": "days",
          "reference": "Small Claims Tribunals Act s 38(1)",
          "note": "A party wishing to appeal a Small Claims Tribunal order must first apply to the District Court for permission to appeal within 14 days of the order. Permission is granted only on questions of law or jurisdiction."
        }
      ]
    },

    {
      "id": "ect_order",
      "label": "Date of Employment Claims Tribunal Order",
      "category": "tribunals",
      "reference": "Employment Claims Act 2016 (Cap 91A) s 24",
      "courtType": "state",
      "deadlines": [
        {
          "id": "ect_permission_to_appeal",
          "label": "Apply for Permission to Appeal Employment Claims Tribunal Order (to District Court)",
          "days": 14, "unit": "days",
          "reference": "Employment Claims Act 2016 s 24(1)",
          "note": "A party wishing to appeal an Employment Claims Tribunal order must apply to the District Court for permission to appeal within 14 days of the order."
        }
      ]
    },

    {
      "id": "ect_permission_granted",
      "label": "Grant of Permission to Appeal Employment Claims Tribunal Order",
      "category": "tribunals",
      "reference": "Employment Claims Act 2016",
      "courtType": "state",
      "deadlines": [
        {
          "id": "ect_appellants_case",
          "label": "File Appellant\u2019s Case",
          "days": 21, "unit": "days",
          "reference": "Employment Claims Act 2016 (appeal provisions)",
          "note": "After permission to appeal the Employment Claims Tribunal order is granted, the Appellant must file their Appellant\u2019s Case within 21 days of the grant of permission. Failure to file in time results in the appeal being treated as withdrawn."
        }
      ]
    },

    /* ── OTHER / VALIDITY / PRE-ACTION ── */

    {
      "id": "issue_of_oc_oa",
      "label": "Date of Issue of Originating Claim or Originating Application",
      "category": "other",
      "reference": "O 6 r 3, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "oc_oa_validity",
          "label": "Validity Period for Service",
          "days": 3, "unit": "months",
          "reference": "O 6 r 3(1), ROC 2021",
          "note": "An Originating Claim or Originating Application is valid for service for 3 calendar months from the date of issue, whether service is in Singapore or outside Singapore. Under the Rules of Court 2021, the former 6-month and 12-month validity periods no longer apply. Apply to court to renew before expiry; each renewal is for up to 3 months, with a maximum of 2 renewals."
        }
      ]
    },

    {
      "id": "consent_extension_of_time",
      "label": "Date Consent to Extend Time for Filing a Pleading / Document Is Given",
      "category": "other",
      "reference": "O 2 r 1, ROC 2021",
      "courtType": "supreme",
      "deadlines": [
        {
          "id": "consent_extension_expiry",
          "label": "Expiry of Consent Extension Period",
          "days": 14, "unit": "days",
          "reference": "O 2 r 1(1), ROC 2021",
          "note": "Parties may consent in writing to extend time for filing or serving a pleading or document. Any single consent extension may not exceed 14 days, and only one consent extension is permitted per deadline. Any further extension requires a court order under O 2 r 2."
        }
      ]
    },

    {
      "id": "state_courts_oc_service",
      "label": "Service of Originating Claim \u2014 State Courts (District Court / Magistrates\u2019 Court)",
      "category": "pleadings",
      "reference": "State Courts Civil Procedure Rules 2022",
      "courtType": "state",
      "deadlines": [
        {
          "id": "state_nic",
          "label": "File and Serve Notice of Intention to Contest",
          "days": 14, "unit": "days",
          "reference": "State Courts Civil Procedure Rules 2022 (mirroring O 6 r 6, Rules of Court 2021)",
          "note": "Defendant served in Singapore must file the Notice of Intention to Contest within 14 days after service of the Originating Claim and Statement of Claim. State Courts apply the same Rules of Court 2021 timelines for the Notice of Intention to Contest and Defence."
        },
        {
          "id": "state_defence",
          "label": "File and Serve Defence",
          "days": 21, "unit": "days",
          "reference": "State Courts Civil Procedure Rules 2022 (mirroring O 6 r 7, Rules of Court 2021)",
          "note": "Defendant must file and serve Defence within 21 days after service. Note: State Courts do not apply the vacation exclusion rule (O 2 r 4), so calendar days apply directly without pausing for court vacations."
        }
      ]
    }

  ]
};
