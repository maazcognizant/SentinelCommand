# Cognizant Enterprise Automator
**Powered by Neuro SAN & React**

Cognizant Enterprise Automator is an enterprise-grade, multi-agent AI system built to handle complex corporate crises, operations, and escalations. Built on a "Starburst" architecture, it leverages a central Orchestrator (`Chief_of_Staff`) that dynamically routes intelligence through specialized Department Heads, who further delegate tasks to narrow, expert Sub-Agents.

## System Architecture

The backend AI orchestration is driven by **Neuro SAN** (`nsflow`), processing real-time streaming data over WebSockets directly to the React frontend. 

The agent network consists of **45 specialized agents** divided into three tiers:

### Tier 1: The Orchestrator
- **Chief_of_Staff**: The central decision-maker. Receives the initial prompt, deduces the required departments, and manages parallel delegation.

### Tier 2: Department Heads (Delegators)
- **Projects_Agent** (Enterprise PMO)
- **SAP_SupplyChain_Agent** (Procurement & Logistics)
- **Finance_Risk_Agent** (INR Exposure & Budget)
- **Legal_Agent** (Contract & Indian Law)
- **Vendor_Agent** (Vendor Management)
- **Cyber_Security_Agent** (IT Risk)
- **HR_Safety_Agent** (Workforce)
- **Regulatory_Agent** (SEBI, GST, CERT-In)
- **PR_Comms_Agent** (Brand Strategy)
- **Customer_Support_Agent** (SLA)
- **Social_Media_Agent** (Sentiment)
- **Sales_Marketing_Agent** (Growth)
- **IT_Ops_Agent** (Infrastructure)
- **Auditor_Agent** (Internal Audit)
- **Reviewer_Agent** (Final QA)
- **Search_Agent** (Global Deduplication)

### Tier 3: Sub-Agents (Specialists)
*These agents receive direct tasks from their respective Tier 2 Department Heads.*
- **Finance/Audit:** `Financial_Auditor_Sub_Agent`, `Audit_Compliance_Agent`, `Expense_Agent`, `Corporate_Compliance_Agent`, `Ethics_Compliance_Agent`
- **Operations/Projects:** `Project_Auditor_Sub_Agent`, `Project_QA_Sub_Agent`, `Facilities_Agent`
- **Supply Chain/Vendor:** `Vendor_Risk_Sub_Agent`, `Procurement_Agent`, `Sourcing_Sub_Agent`, `Logistics_Routing_Agent`, `Inventory_Warehouse_Agent`, `Vendor_SaaS_Agent`
- **IT/Security:** `IT_Auditor_Sub_Agent`, `DevOps_Agent`, `Data_Governance_Agent`, `Threat_Intel_Agent`, `Incident_Response_Agent`
- **Legal/PR:** `Contracts_Litigation_Agent`, `IP_Compliance_Agent`, `Internal_Comms_Agent`, `Media_Relations_Agent`, `Sentiment_Analysis_Agent`, `Brand_Safety_Agent`
- **HR/Sales:** `Talent_Acquisition_Agent`, `Onboarding_Agent`, `Sales_Ops_Agent`, `Marketing_Analytics_Agent`, `Partner_Ecosystem_Agent`
- **Support:** `VIP_Escalation_Agent`, `SLA_Monitoring_Agent`

## Key Features

1. **Massive Parallel Orchestration:** 45 unique agents acting sequentially and in parallel based on dynamic rules.
2. **Lightning Fast UI:** React frontend configured for sub-500ms action response times with WebSockets.
3. **Live Active Agent Tracking:** The sidebar dynamically filters to show *only* the agents currently active in the execution trace.
4. **Business Action Integrations:** Mock actions for ServiceNow Ticket Creation, PagerDuty Escalations, Root Cause Analysis (RCA) generation, and PDF Board Emailing.
5. **Glassmorphism UI:** Premium enterprise aesthetics using optimized CSS, dynamic gradients, and modern micro-animations.

## Getting Started

1. **Backend:** Run `ns run --registry generated/sentinel_crisis_command`
2. **Frontend:** Run `npm run dev` in the `sentinel-ui` directory.
3. Navigate to `http://localhost:5173`.
