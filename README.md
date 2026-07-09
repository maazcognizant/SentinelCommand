# Sentinel Command Center

## Enterprise AI Crisis Intelligence Platform

A Neuro SAN-powered multi-agent platform that helps organizations manage incidents, approvals, and critical business decisions through parallel AI reasoning, intelligent orchestration, and executive decision support.

---

## Project Highlights

- Built using Cognizant Neuro SAN
- 10-Agent Cognitive Architecture
- Parallel Enterprise Decision Intelligence
- Executive Command Dashboard
- Persistent Incident Memory
- Intelligent Incident Routing
- Duplicate Incident Detection
- Real-Time WebSocket Communication
- Vendor Approval Workflows
- Severity Classification
- ServiceNow & SAP Ready
- Designed for Enterprise Scale

---

## Overview

Sentinel Command Center is an enterprise AI decision intelligence platform built on the Neuro SAN framework.

The platform enables organizations to assess, coordinate, and respond to business incidents and operational requests through a network of specialized AI agents.

Users can submit:

- Security incidents
- Vendor approval requests
- Procurement reviews
- Compliance escalations
- Operational disruptions
- Risk assessments
- Executive decision requests

Instead of manually involving multiple departments, Sentinel automatically routes requests to specialized agents that analyze impacts in parallel and generate a unified recommendation.

---

## Why Sentinel?

Traditional enterprise workflows are often:

- Manual
- Department-centric
- Sequential
- Slow to escalate
- Difficult to coordinate

Sentinel provides:

- Multi-agent orchestration
- Parallel reasoning
- Enterprise-wide visibility
- Faster decision-making
- Executive-ready recommendations

---

## Neuro SAN Implementation

Sentinel leverages Neuro SAN capabilities including:

- Agent Orchestration
- Agent Delegation
- Parallel Execution
- Shared Context Management
- Modular Registries
- Scalable Multi-Agent Architecture

### Agent Network

| Agent | Responsibility |
|---------|---------------|
| Chief of Staff | Workflow orchestration |
| Search Agent | Duplicate detection |
| Cyber Agent | Security analysis |
| Finance Agent | Financial impact |
| Legal Agent | Compliance review |
| HR Agent | Workforce impact |
| Operations Agent | Business continuity |
| Supply Chain Agent | Vendor impact |
| PR Agent | Reputation analysis |
| Executive Synthesizer | Final recommendation |

---

## Architecture

```text
Executive User
       │
       ▼
React Command Center
       │
WebSocket Layer
       │
       ▼
Neuro SAN Backend
       │
Chief of Staff Agent
       │
 ┌─────┼─────┐
 │     │     │
 ▼     ▼     ▼
Specialized Domain Agents
(Cyber, Finance, Legal,
HR, Operations, Supply Chain,
PR, Search)
       │
       ▼
Executive Synthesizer
       │
       ▼
Executive Action Plan
```

---

## How It Works

1. User submits an incident or business request.
2. Historical memory is retrieved.
3. Chief of Staff Agent receives the request.
4. Search Agent checks for duplicates.
5. Relevant agents execute in parallel.
6. Findings are aggregated.
7. Executive Synthesizer generates recommendations.
8. Dashboard displays severity, impact, and suggested actions.
9. User approves, rejects, or escalates the request.

---

## Frontend Experience

The Command Center allows users to:

- Submit incidents and requests
- Request vendor approvals
- Initiate procurement reviews
- View AI-generated recommendations
- Monitor severity levels
- Review department assessments
- Track historical incidents
- Approve or escalate actions

Real-time updates are delivered through WebSocket communication between the frontend and Neuro SAN backend.

---

## Enterprise Use Cases

- Security Incident Management
- Vendor Approval Workflows
- Procurement Reviews
- Compliance Assessments
- Operational Risk Analysis
- Business Continuity Planning
- Executive Escalations
- Cross-Department Decision Support

---

## Key Features

- Multi-Agent Orchestration
- Executive Decision Support
- Persistent Incident Memory
- Duplicate Incident Detection
- Severity Classification
- Intelligent Routing
- Real-Time Updates
- Department Impact Analysis
- Modular Agent Framework
- Enterprise Integration Readiness

---

## Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React, TypeScript, TailwindCSS |
| Backend | Python |
| AI Framework | Neuro SAN |
| Communication | WebSocket |
| LLM Providers | Gemini, Mistral AI |
| Future Integrations | ServiceNow, SAP, Microsoft Graph |

---

## Current Prototype

### Implemented

- Multi-agent orchestration
- Executive dashboard
- Incident memory
- Duplicate detection
- Severity classification
- Executive recommendations
- Real-time communication

### Planned

- ServiceNow integration
- SAP integration
- Microsoft Graph integration
- Microsoft Teams support
- Slack support
- Voice interface
- Autonomous remediation

---

## Environment Configuration

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

---

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd Sentinel-Command-Center
```

### Install Dependencies

```bash
pip install -r requirements.txt
npm install
```

### Run Neuro SAN Backend

```bash
nss run --registry generated/sentinel_crisis_command
```

### Run Frontend

```bash
npm run dev
```

### Open Application

```text
http://localhost:5173
```

---

## Repository Structure

```text
frontend/
backend/
docs/
├── architecture.md
├── summary.md
├── screenshots/
└── diagrams/
```

---

## Why This Project Stands Out

Sentinel is not a chatbot.

It functions as an AI-powered enterprise command center that combines organizational memory, parallel reasoning, executive decision support, and Neuro SAN multi-agent orchestration into a single workflow.

The platform demonstrates how enterprise AI can move beyond conversation and become active decision-support infrastructure.

---

## Documentation

- `docs/summary.md` — Executive project overview
- `docs/architecture.md` — Technical architecture
- `docs/screenshots/` — Product screenshots
- `docs/diagrams/` — System diagrams
