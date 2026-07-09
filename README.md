# Sentinel Command Center

Sentinel Command Center is an enterprise-grade, multi-agent cognitive pipeline built on the Neuro SAN framework. Designed specifically for cross-functional corporate environments, it automates the triage, delegation, and resolution of complex corporate crises in real-time.

## The Problem

Modern enterprises face multifaceted crises that span across IT, Legal, HR, Finance, and Public Relations. Traditional incident management requires sequential escalation, manual coordination across siloed departments, and slow executive decision-making. This often results in delayed mitigation, SLA breaches, compliance violations, and financial risk.

## The Solution

Sentinel Command resolves this by deploying a parallel orchestration model. A centralized "Chief of Staff" agent intercepts the crisis and simultaneously delegates it to 9 specialized cognitive agents (Cyber Security, Finance & Risk, Legal Counsel, etc.). The system aggregates their specialized analyses, synthesizes them into an Executive Action Summary, and awaits final executive approval—condensing a 72-hour human escalation process into a 15-second autonomous pipeline.

## Architecture & Data Flow

The system operates on a decoupled client-server architecture, deeply integrating a React frontend with a Neuro SAN AI backend.

1. **Frontend Interception**: The React UI captures the crisis prompt and evaluates the local session history.
2. **Global Memory Bridge**: The frontend compiles all historical sessions and ServiceNow tickets into a structured `[GLOBAL INCIDENT DATABASE]` block.
3. **Cross-Reference Routing**: The payload is transmitted to the Neuro SAN backend via WebSocket. The Chief of Staff delegates first to the `Search_Agent`, which cross-references the global database for deduplication.
4. **Parallel Cognitive Processing**: If no duplicate is found, the Chief of Staff orchestrates parallel execution across the relevant departmental agents.
5. **Executive Conclusion & Actions**: The backend streams a synthesized markdown report to the UI. The UI parses the severity, renders departmental responses, and exposes actionable controls (Approve, Escalate, Reject, Create ServiceNow Ticket).
6. **Integration Loop**: Executing an action pushes the decision back into the Neuro SAN memory stack and updates the localized session state.

## Key Benefits

* **Zero-Latency Escalation**: Parallel processing eliminates traditional communication delays.
* **Deterministic Deduplication**: Cross-tab global memory ensures duplicate incidents are caught immediately before consuming processing resources.
* **Comprehensive Risk Analysis**: Every crisis is simultaneously evaluated through financial, legal, cyber, and operational lenses.
* **Actionable Outputs**: Provides executive decision-makers with quantified risks (e.g., INR exposure, specific legal statutes) and direct action buttons.
* **System Integration**: Natively simulates API payload generation for platforms like ServiceNow.

## Setup Instructions

### Prerequisites
* Node.js (v18 or higher)
* Python (v3.9 or higher)
* Neuro SAN CLI installed locally

### Backend Setup (Neuro SAN)
1. Clone the repository and navigate to the root directory.
2. Ensure the `registries/generated/sentinel_crisis_command.hocon` is properly registered in your Neuro SAN environment.
3. Start the Neuro SAN network:
   ```bash
   nss run --registry generated/sentinel_crisis_command
   ```

### Frontend Setup (Sentinel UI)
1. Navigate to the frontend directory:
   ```bash
   cd sentinel-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the UI at `http://localhost:5173`.

## System Screenshots

To fully visualize the dual-layer architecture, please refer to the screenshots below.

**1. Neuro SAN Visualizer (Backend Orchestration)**
*(Neuro AI Multi-Agent Accelerator Client showing the node graph with the Chief of Staff and the Search Agent)*
![Neuro SAN Node Graph](./docs/images/neuro_san_backend.png)

**2. Sentinel Command Interface (Frontend Execution)**
*(React frontend showing the Executive Action Summary, Severity Meter, and ServiceNow ticket generation)*
![Sentinel UI Frontend](./docs/images/sentinel_frontend.png)
