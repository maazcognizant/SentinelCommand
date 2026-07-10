<div align="center">

# Enterprise Automator (Sentinel Command)

### The enterprise crisis war room, run by a 45-Agent Starburst Network.

A **Neuro SAN–powered** multi-agent platform that turns a 72-hour, email-driven escalation into a **~15-second autonomous pipeline**. An executive states the crisis; 45 specialized agents reason **in parallel** across three tiers (Orchestrator -> Department Heads -> Sub-Agents) and return one briefing with actionable resolutions attached.

[![Framework](https://img.shields.io/badge/Framework-%20Neuro%20SAN-C77F1A?style=for-the-badge)](#powered-by-neuro-san)
[![Backend](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](#tech-stack)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#tech-stack)
[![Realtime](https://img.shields.io/badge/Realtime-WebSocket-3FD98B?style=for-the-badge)](#architecture)

<img src="docs/images/agent-network.png" alt="Enterprise Automator agent network" width="820">

</div>

<hr>

## Overview

**Enterprise Automator** is an enterprise AI decision-intelligence platform built on Neuro SAN. Submit a security incident, vendor approval, compliance escalation, or risk assessment, and instead of pinging departments one by one, the system routes it to the specialists that matter, analyzes impact **in parallel**, and returns a single, executive-ready recommendation with **Approve / Escalate / Reject**, **Generate RCA**, and **ServiceNow Integrations** built in.

## Screenshots

<table>
<tr>
<td width="50%" valign="top">
<img src="docs/images/sentinel_frontend.png" alt="Frontend">
<div align="center"><sub><b>React Command Center</b> — Glassmorphism UI with live active-agent tracking</sub></div>
</td>
<td width="50%" valign="top">
<img src="docs/images/neuro_san_backend.png" alt="Neuro SAN backend">
<div align="center"><sub><b>Neuro SAN Backend</b> — Chief of Staff orchestrating 45 agents via Starburst architecture</sub></div>
</td>
</tr>
</table>

## Powered by Neuro SAN

[Neuro SAN](https://github.com/-ai-lab/neuro-san) is 's framework for **data-driven, multi-agent networks** — agents are declared in a registry and the framework handles routing, delegation, and communication between them. This is not a single-prompt chatbot; it is a real agent network.

**Neuro SAN capabilities we use:**

| Capability | How we use it |
|---|---|
| **Starburst Orchestration** | A `Chief_of_Staff` routes the crisis to 15 Tier-2 Department Heads, who further delegate to 29 Tier-3 Sub-Agents. |
| **Massive Parallel Execution** | 45 specialists run concurrently instead of sequentially — full assessment in ~15s instead of days. |
| **Shared context management** | The crisis prompt and the injected `[GLOBAL INCIDENT DATABASE]` are shared across the network. |
| **Modular registries** | Every agent is defined in `generated/sentinel_crisis_command` — new specialists snap in without code changes. |
| **nsflow streaming** | Agent reasoning and final markdown stream to the UI in real time over port `4173`. |
| **MCP-ready tools** | Model Context Protocol servers can add live tools (SAP OData, Microsoft Entra, UiPath RPA). |

**Run the agent network:**

```bash
ns run --registry generated/sentinel_crisis_command
```

## Agent Network (The 45-Agent Roster)

The **Chief of Staff** invokes specialists simultaneously; each is scoped to its own domain policy, and their outputs are aggregated into one recommendation.

### Tier 1: The Orchestrator
| Agent | Responsibility |
|---|---|
| **Chief_of_Staff** | Orchestrator — routes the crisis, invokes department heads, aggregates final recommendation. |
| **Search_Agent** | Global Search — deduplication gate checks the Global Incident Database before work begins. |

### Tier 2: Department Heads
| Agent | Responsibility |
|---|---|
| **Projects_Agent** | Enterprise PMO — operational continuity and project impact |
| **SAP_SupplyChain_Agent** | Procurement & Logistics — business continuity and SAP operations |
| **Finance_Risk_Agent** | Finance & Risk — financial impact and INR exposure |
| **Legal_Agent** | Legal Counsel — compliance review and contract-law evaluation |
| **Vendor_Agent** | Vendor Head — external vendor relationships |
| **Cyber_Security_Agent** | Cyber Security — IT risk and breach exposure |
| **HR_Safety_Agent** | HR & Safety — workforce and employee-safety impact |
| **Regulatory_Agent** | Regulatory — SEBI, GST, and CERT-In compliance |
| **PR_Comms_Agent** | PR & Comms — reputation and communications risk |
| **Customer_Support_Agent** | Customer Support — SLA and service-impact assessment |
| **Social_Media_Agent** | Social Media Monitor — public sentiment |
| **Sales_Marketing_Agent** | Head of Growth — pipeline impact |
| **IT_Ops_Agent** | IT Ops Head — infrastructure and deployments |
| **Auditor_Agent** | Senior Auditor — internal audits |
| **Reviewer_Agent** | QA Reviewer — final report QA |

### Tier 3: Sub-Agents (Specialists)
Tier 2 agents delegate to these specialized sub-agents for granular task execution:
- **Finance/Audit:** `Financial_Auditor_Sub_Agent`, `Audit_Compliance_Agent`, `Expense_Agent`, `Corporate_Compliance_Agent`, `Ethics_Compliance_Agent`
- **Operations/Projects:** `Project_Auditor_Sub_Agent`, `Project_QA_Sub_Agent`, `Facilities_Agent`
- **Supply Chain/Vendor:** `Vendor_Risk_Sub_Agent`, `Procurement_Agent`, `Sourcing_Sub_Agent`, `Logistics_Routing_Agent`, `Inventory_Warehouse_Agent`, `Vendor_SaaS_Agent`
- **IT/Security:** `IT_Auditor_Sub_Agent`, `DevOps_Agent`, `Data_Governance_Agent`, `Threat_Intel_Agent`, `Incident_Response_Agent`
- **Legal/PR:** `Contracts_Litigation_Agent`, `IP_Compliance_Agent`, `Internal_Comms_Agent`, `Media_Relations_Agent`, `Sentiment_Analysis_Agent`, `Brand_Safety_Agent`
- **HR/Sales:** `Talent_Acquisition_Agent`, `Onboarding_Agent`, `Sales_Ops_Agent`, `Marketing_Analytics_Agent`, `Partner_Ecosystem_Agent`
- **Support:** `VIP_Escalation_Agent`, `SLA_Monitoring_Agent`

## Architecture

A decoupled client–server design: a Vite + React command center streams over WebSockets into a Python Neuro SAN backend, with a memory bridge that injects prior sessions into every request.

<div align="center">
<img src="docs/images/architecture-diagram.png" alt="Architecture" width="780">
</div>

- **Global Memory Bridge** — compiles prior sessions and ServiceNow IDs from browser storage into a `[GLOBAL INCIDENT DATABASE]` block, injected into context before the request hits the backend.
- **Severity parsing engine** — reads the markdown stream to detect `CRITICAL / MEDIUM / LOW` and mount the matching UI.
- **Natural-language intercept** — catches intents like "create a ServiceNow ticket" and runs them as deterministic UI macros, bypassing the LLM for speed.

## How it works

<div align="center">
<img src="docs/images/workflow-pipeline.png" alt="Pipeline" width="820">
</div>

1. **Submit** — an executive states the crisis.
2. **Recall** — incident memory is retrieved from the Global Incident Database.
3. **Route** — the Chief of Staff analyses the prompt.
4. **Dedup** — Global Search checks for duplicate crises.
5. **Reason** — the 45 specialists execute dynamically in parallel.
6. **Aggregate** — findings are collected from every domain.
7. **Synthesize** — the Chief of Staff folds them into one recommendation.
8. **Render** — the dashboard dynamically highlights active agents in the sidebar and displays impact/severity.
9. **Decide** — the user clicks premium business buttons to Approve, Escalate, Generate RCA, Page On-Call, or create a ServiceNow ticket.

## Key features

- **45-Agent Starburst Orchestration** — specialists reason in a highly structured 3-tier hierarchy.
- **Persistent incident memory** — past incidents carry forward as a Global Incident Database.
- **Duplicate detection** — Global Search blocks repeat crises before work starts.
- **Severity classification** — automatic `CRITICAL / MEDIUM / LOW` tagging drives the UI.
- **Lightning Fast UI** — sub-500ms action response times with WebSockets.
- **Live Active Agent Tracking** — the UI sidebar dynamically filters to show *only* the agents currently processing the trace.
- **Enterprise Integrations** — ServiceNow Ticket Creation, PagerDuty Escalations, Root Cause Analysis generation, and PDF Emailing.

## Tech stack

| Layer | Technology |
|---|---|
| **Frontend** | React · TypeScript · TailwindCSS · Vite |
| **Backend** | Python |
| **AI framework** | Neuro SAN |
| **Communication** | WebSocket · nsflow (`:4173`) |
| **LLM providers** | Gemini · Mistral AI |
| **Future integrations** | ServiceNow · SAP · Microsoft Graph · MCP tools |

## Getting started

```bash
# 1 · clone
git clone <repository-url>
cd Sentinel-Command-Center

# 2 · install
pip install -r requirements.txt
npm install

# 3 · run the Neuro SAN backend
ns run --registry generated/sentinel_crisis_command

# 4 · run the frontend
npm run dev
# open http://localhost:5173
```

Create a `.env` in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

> Backend streams on `:4173` · UI serves on `:5173`.

## Documentation

For a deeper walkthrough of the architecture, the agent flow, and the diagrams above, see the full design document:
- `architecture.md` — technical architecture
- `summary.md` — executive project overview

## Roadmap

**Implemented** — 45-agent orchestration · executive dashboard · live active agent tracking · persistent incident memory · duplicate detection · severity classification · real-time communication · ServiceNow/PagerDuty simulation

**Planned** — ServiceNow & SAP integrations · Microsoft Graph · Teams & Slack · voice interface · autonomous remediation · live MCP tools (SAP OData · Entra · UiPath)

<hr>

<div align="center">

**Enterprise Automator is not a chatbot** — it is active decision-support infrastructure, combining organizational memory, massive parallel reasoning, and Neuro SAN orchestration into one workflow.

Built at · [Repository](https://github.com/maaz/SentinelCommand) · [Issues](https://github.com/maaz/SentinelCommand/issues)

</div>
