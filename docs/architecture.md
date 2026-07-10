# Cognizant Enterprise Automator: Technical Architecture

## 1. Project Vision: What We Are Trying to Do & How We Achieve It

**The Problem:** Large enterprises suffer from siloed, sequential crisis management. When an operational failure or security breach occurs, resolution requires asynchronous emails between IT, Legal, HR, Finance, and Procurement. This human-driven latency costs millions in downtime, fines, and SLA breaches, often taking days to yield a unified executive decision.

**The Solution:** The Cognizant Enterprise Automator eliminates this latency by substituting sequential human departments with massively parallel AI Agents. By feeding a crisis prompt into a centralized React interface, a digital "Chief of Staff" instantly delegates the problem across a highly structured, 45-agent network. The platform aggregates the cognitive output of all 45 specialists simultaneously, returning a singular, highly accurate briefing document and UI action buttons within **~15 seconds**. 

---

## 2. The Core: Neuro SAN Agentic System (Backend)

The true innovation of the platform is the **Multi-Agent Pipeline**, built entirely on the Neuro SAN framework. This is not a standard prompt-response chatbot—it is an autonomous, deterministic cognitive architecture.

*   **The "Starburst" Topology:** The network employs a strict 3-tier hierarchy. 
    1.  **Tier 1 (The Orchestrator):** The `Chief_of_Staff` receives the crisis prompt and dynamically identifies which departments are required.
    2.  **Tier 2 (Department Heads):** 14 specialized agents (e.g., `Legal_Agent`, `Cyber_Security_Agent`, `SAP_SupplyChain_Agent`) are invoked simultaneously by the Orchestrator to govern specific corporate domains.
    3.  **Tier 3 (Specialist Sub-Agents):** 29 granular sub-agents execute specific micro-tasks. For example, the `Legal_Agent` delegates directly to the `Contracts_Litigation_Agent` and `IP_Compliance_Agent` for deeper analysis.
*   **Massive Parallel Cognitive Processing:** Neuro SAN allows the Orchestrator to invoke all required Tier-2 and Tier-3 agents *simultaneously*. Powered by high-concurrency LLMs (Gemini Flash), this concurrent execution reduces processing time from days to under 15 seconds, handling up to 70 distinct LLM calls in a single workflow.
*   **Global Search Agent (Deduplication):** A specialized agent hooked directly into the pre-processing step. It cross-references incoming prompts against the Global Incident Database to automatically block duplicate workflows, saving immense computational overhead.
*   **WebSockets (nsflow):** Neuro SAN streams the agents' internal thought processes and final markdown summaries back to the client in real-time over port 4173.

---

## 3. React UI Command Center (Frontend)

The frontend is a custom Vite + React application specifically designed for high-stress executive war rooms.

*   **Global Memory Bridge:** The React app natively intercepts the user's browser `localStorage` (where previous session data and ServiceNow ticket IDs are stored). It compiles this history into a `[GLOBAL INCIDENT DATABASE]` block and injects it into the LLM context *before* the message hits the Neuro SAN backend.
*   **Live Active-Agent Tracking:** As the backend processes the Starburst network, the React UI dynamically highlights which agents are actively "thinking" in the sidebar, providing full transparency to the executive.
*   **Markdown Parsing Engine:** The frontend parses the raw markdown stream from Neuro SAN to automatically detect severity levels (CRITICAL, MEDIUM, LOW) and render the appropriate UI components (like the Severity Meter and dynamic gradients).
*   **Actionable Business Controls:** The UI dynamically mounts premium, glassmorphism-styled actionable buttons (Approve, Reject, Escalate to Board, Page On-Call, Generate RCA). 
*   **Natural Language Interception:** The UI listens for specific user intents and intercepts them to trigger UI macros, bypassing the LLM for faster, deterministic execution (e.g., clicking "Create ServiceNow Ticket" instantly fires the UI modal).

---

## 4. Data Integration & Extensibility

*   **ServiceNow Integration:** Natively simulates REST API payloads for ServiceNow ticket creation, generating deterministic `INC` numbers and instantly logging them in the Global Database.
*   **PagerDuty & RCA Engines:** Simulated fast-action endpoints to page on-call engineers or draft PDF Root Cause Analysis documents with sub-500ms latency.
*   **Future MCP Integration:** The Neuro SAN architecture is designed to natively support Model Context Protocol (MCP) servers, allowing the enterprise to easily snap in real Python tools for live SAP OData queries, Microsoft Entra ID lookups, and UiPath RPA triggers.
