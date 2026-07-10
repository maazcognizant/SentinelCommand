<div align="center">

# Sentinel Command

### The enterprise crisis war room, run by agents.

A **Neuro SAN–powered multi-agent platform** that condenses a 72-hour, email-driven escalation into a **~15-second autonomous pipeline**. An executive states the crisis; a network of specialist AI agents reasons in parallel and returns one briefing with actions attached.

<br>

[![Framework](https://img.shields.io/badge/Framework-Cognizant%20Neuro%20SAN-C77F1A?style=for-the-badge)](https://github.com/maazcognizant/SentinelCommand)
[![Backend](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](#technology-stack)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#technology-stack)
[![Realtime](https://img.shields.io/badge/Realtime-WebSocket-3FD98B?style=for-the-badge)](#architecture)

[![Agents](https://img.shields.io/badge/Agents-10_Cognitive-13223E?style=flat-square)](#agent-network)
[![Latency](https://img.shields.io/badge/Assessment-~15s-13223E?style=flat-square)](#why-sentinel)
[![Reasoning](https://img.shields.io/badge/Reasoning-Parallel-13223E?style=flat-square)](#how-it-works)
[![Status](https://img.shields.io/badge/Status-Prototype-E89A2B?style=flat-square)](#prototype--roadmap)

<br>

<img src="docs/diagrams/agent-network.png" alt="Sentinel Command agent network" width="820">

</div>

---

## Table of contents

- [Overview](#overview)
- [Why Sentinel?](#why-sentinel)
- [Agent network](#agent-network)
- [Architecture](#architecture)
- [How it works](#how-it-works)
- [Key features](#key-features)
- [Technology stack](#technology-stack)
- [Getting started](#getting-started)
- [Prototype & roadmap](#prototype--roadmap)
- [Repository structure](#repository-structure)
- [Why this project stands out](#why-this-project-stands-out)

---

## Overview

**Sentinel Command** is an enterprise AI decision-intelligence platform built on the Neuro SAN framework. It lets organizations assess, coordinate, and respond to business incidents and operational requests through a network of specialized AI agents.

Instead of manually involving multiple departments, Sentinel routes each request to the specialists that matter, analyzes impact **in parallel**, and generates a single unified recommendation.

Users can submit:

| | | |
|---|---|---|
| Security incidents | Vendor approval requests | Procurement reviews |
| Compliance escalations | Operational disruptions | Risk assessments |
| Executive decision requests | Business continuity plans | Cross-department escalations |

---

## Why Sentinel?

In large enterprises, a single crisis pulls in Cybersecurity, Finance, Legal, HR, and SAP Operations. The traditional path is linear and human-driven — and slow.

<table>
<tr>
<th width="50%">Traditional escalation</th>
<th width="50%">Sentinel Command</th>
</tr>
<tr>
<td valign="top">

- Departments reached one by one over email and tickets
- **48–72 hours** just to reach executive consensus
- No shared memory — duplicate incidents re-worked from scratch
- Hard to see cross-department impact in one place

</td>
<td valign="top">

- A digital Chief of Staff routes the crisis to every relevant specialist **at once**
- **360° risk assessment** returned in seconds, not days
- Global Incident Database **deduplicates** repeat crises before work starts
- One briefing with **Approve / Escalate / Reject** built in

</td>
</tr>
</table>

---

## Agent network

Neuro SAN lets the **Chief of Staff** invoke specialists simultaneously instead of in sequence. Each agent is scoped to its own domain policy; their outputs are aggregated into a single recommendation.

| Agent | Responsibility |
|---|---|
| **Chief of Staff** | Master router — orchestrates the crisis, invokes specialists, and aggregates their findings into the final recommendation |
| **Global Search** | Deduplication gate — cross-references the Global Incident Database before work begins |
| **Cyber Security** | Security analysis and breach exposure |
| **SAP / Operations** | Business continuity and SAP operations impact |
| **Finance & Risk** | Financial impact and risk exposure |
| **HR & Safety** | Workforce and employee-safety impact |
| **Legal Counsel** | Compliance review and contract-law evaluation |
| **Regulatory (CERT-In)** | Regulatory and statutory reporting (e.g. CERT-In directions) |
| **Customer Support** | Customer and service-impact assessment |
| **PR & Comms** | Reputation and communications risk |
| **Social Media Monitor** | Public sentiment and social-media monitoring |

> The real power is **parallel orchestration**. Rather than asking one model to write a report, the Chief of Staff breaks the crisis down and assigns it to the specialists in parallel — Legal Counsel evaluates contract law while SAP / Operations evaluates continuity and Regulatory (CERT-In) checks statutory reporting — and the Chief of Staff aggregates their outputs into one unified recommendation.

---

## Architecture

A decoupled client–server design: a Vite + React command center streams over WebSockets into a Python Neuro SAN backend, with a memory bridge that injects prior sessions into every request.

<div align="center">
<img src="docs/diagrams/architecture-diagram.png" alt="Sentinel Command system architecture" width="780">
</div>

**Frontend — React Command Center**
- **Global Memory Bridge** — reads prior sessions and ServiceNow IDs from browser storage, compiles a `[GLOBAL INCIDENT DATABASE]` block, and injects it into context before the request reaches the backend.
- **Severity parsing engine** — parses raw markdown from Neuro SAN to detect `CRITICAL / MEDIUM / LOW` and mount the matching UI (severity meter, impact panels, action buttons).
- **Natural-language intercept** — catches intents like "create a ServiceNow ticket" in the UI and runs them as deterministic macros, bypassing the LLM for speed.

**Backend — Neuro SAN**
- **Parallel cognition** — the Chief of Staff invokes Cyber Security, Legal Counsel, HR & Safety, Finance & Risk, and SAP / Operations at once, cutting assessment from minutes to under 15 seconds.
- **nsflow streaming** — agent thought processes and final markdown summaries stream back to the client in real time over port `4173`.
- **MCP-ready extensibility** — designed to snap in Model Context Protocol servers for live SAP OData, Microsoft Entra lookups, and UiPath RPA triggers.

---

## How it works

Nine
