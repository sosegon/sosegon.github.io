# Privacy Policy
**Pinterest Automation Application**
*Last updated: 1 June 2026*

---

## 1. Introduction

This Privacy Policy describes how this Pinterest automation application (the "Application") collects, uses, and handles data when you use it. This Application is operated for personal use only and is not a commercial service offered to third parties.

By using this Application, you acknowledge the practices described in this policy. As the Application is used solely by its developer for personal purposes, this policy primarily documents compliance with applicable legal obligations under the General Data Protection Regulation (GDPR) (EU) 2016/679.

---

## 2. Data Controller

As the sole user and operator of this Application, you (the developer) act as the data controller for any personal data processed. For any enquiries, you may contact yourself as the responsible party for all data processing activities described herein.

---

## 3. What Data the Application Processes

### 3.1 Pinterest Account Data

When the Application connects to Pinterest via the Pinterest API, it may access and process the following data:

- Pinterest board names, descriptions, and identifiers
- Pin content including titles, descriptions, images, and destination URLs
- Board structure and organisation information
- Your Pinterest username and account identifier (used for API authentication)

### 3.2 Data the Application Does Not Collect

This Application does not:

- Collect personal data from any third party other than yourself
- Store Pinterest user data in any external database or third-party service
- Track user behaviour, analytics, or usage statistics
- Process any financial, health, or sensitive personal data
- Collect email addresses or contact information

---

## 4. Legal Basis for Processing (GDPR)

Under the GDPR, processing of personal data requires a valid legal basis. For this Application, the applicable legal basis is:

- **Legitimate interests (Article 6(1)(f) GDPR):** The Application processes Pinterest data to fulfil its core function of automating content curation for personal use. As the sole user and operator, your legitimate interest in automating your own Pinterest boards is balanced against the absence of any third-party impact.

Since the Application is used exclusively for personal or household activities, it may also fall within the personal/household exemption under Article 2(2)(c) GDPR, which excludes purely personal or household activities from the Regulation's scope.

---

## 5. How Data Is Used

Data accessed via the Pinterest API is used exclusively to:

- Read existing boards and pins to understand current board content
- Automatically create new pins on specified Pinterest boards
- Determine which content to post based on instructions provided to the AI agent

No data is sold, shared with third parties, used for advertising, or processed for any purpose beyond the automation of your personal Pinterest activity.

---

## 6. Data Storage and Retention

The Application processes data transiently during each automation run. Specifically:

- Data fetched from Pinterest is processed in memory during workflow execution and is not persistently stored by this Application
- n8n, the workflow automation platform, may retain execution logs (including data inputs and outputs) in its execution history for up to 30 days on the free cloud plan
- Pinterest API credentials (API keys and tokens) are stored securely within n8n's encrypted credential vault

You are responsible for reviewing n8n's own privacy policy and data retention settings if you wish to limit the retention of execution logs.

---

## 7. Third-Party Services

This Application relies on the following third-party services, each of which has its own privacy practices:

- **Pinterest API** — governed by Pinterest's Privacy Policy (pinterest.com/privacy). The Application operates under your Pinterest developer credentials and is subject to Pinterest's Developer Terms of Service.
- **n8n** — the workflow automation platform used to run the automation. Governed by n8n's Privacy Policy (n8n.io/privacy).
- **Anthropic Claude API** — the AI model used to generate pin content and decisions. Governed by Anthropic's Privacy Policy (anthropic.com/privacy). Prompts sent to Claude may include board names or content descriptions.

You should review the privacy policies of these services independently, as they may process data on their own infrastructure.

---

## 8. International Data Transfers

The third-party services listed above may process data on servers located outside the European Economic Area (EEA). Where such transfers occur, they are governed by those services' own compliance mechanisms (such as Standard Contractual Clauses). As a personal-use application, you accept these transfers as part of using the respective platforms.

---

## 9. Your Rights Under GDPR

As a data subject under GDPR, you hold the following rights. Since you are both the operator and the sole user of this Application, these rights are primarily relevant in the context of data held by third-party platforms (Pinterest, n8n, Anthropic):

- **Right of access:** You may request a copy of any personal data processed.
- **Right to rectification:** You may correct inaccurate personal data.
- **Right to erasure:** You may request deletion of your personal data where no legal basis for retention applies.
- **Right to restriction of processing:** You may request that processing be limited in certain circumstances.
- **Right to data portability:** You may request your data in a structured, machine-readable format.
- **Right to object:** You may object to processing based on legitimate interests.

To exercise rights in relation to data held by Pinterest, n8n, or Anthropic, please contact those services directly through their respective privacy portals.

---

## 10. Security

API keys and authentication credentials used by the Application are stored within n8n's encrypted credential vault. You are responsible for maintaining the security of your n8n account and Pinterest developer credentials, including using strong passwords and enabling two-factor authentication where available.

You should revoke and rotate API keys immediately if you suspect they have been compromised.

---

## 11. Changes to This Policy

This Privacy Policy may be updated from time to time to reflect changes in how the Application operates or applicable legal requirements. The "Last updated" date at the top of this document indicates when the most recent revision was made.

---

## 12. Contact

As this is a personal-use application, there is no formal data protection officer or legal entity. For any enquiries relating to this policy or data processing, you may refer to your own records as the application operator.

---

*This policy was prepared for a personal-use Pinterest automation application operating under GDPR (EU) 2016/679.*
