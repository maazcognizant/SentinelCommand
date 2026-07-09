# Sentinel Command Architecture

Sentinel Command is an enterprise-grade Cognitive Crisis Management Pipeline built on the **Neuro SAN** Multi-Agent Framework. It uses a decoupled client-server architecture to ensure high security, real-time streaming, and parallel cognitive processing.

## 1. Neuro SAN Agentic System (Backend)

The core of the system relies on Neuro SAN's advanced orchestration capabilities:
*   **Chief of Staff (Orchestrator Agent):** The central node that receives the crisis prompt. It uses Neuro SAN's routing capabilities to analyze the prompt and determine which sub-agents to invoke.
*   **Parallel Cognitive Processing:** Neuro SAN allows the Chief of Staff to invoke multiple specialized agents (Cyber, Legal, HR, Finance, SAP) simultaneously rather than sequentially. This reduces processing time from minutes to under 15 seconds.
*   **Global Search Agent (Deduplication):** A specialized agent hooked directly into the Chief of Staff's pre-processing step. It cross-references the incoming prompt against the Global Incident Database to prevent duplicate workflows.
*   **WebSockets (nsflow):** Neuro SAN streams the agent's thought processes and final markdown summaries back to the client in real-time over port 4173.

## 2. React UI Application (Frontend)

The frontend is a custom Vite + React application designed for high-stress executive war rooms.
*   **Global Memory Bridge:** The React app natively intercepts the user's browser `localStorage` (where previous session data and ServiceNow ticket IDs are stored). It compiles this history into a `[GLOBAL INCIDENT DATABASE]` block and injects it into the LLM context *before* the message hits the Neuro SAN backend.
*   **Markdown Parsing Engine:** The frontend parses the raw markdown stream from Neuro SAN to automatically detect severity levels (CRITICAL, MEDIUM, LOW) and render UI components (like the Severity Meter) accordingly.
*   **Actionable Controls:** By parsing the final agent conclusion, the UI dynamically mounts actionable buttons (Approve, Escalate, Create ServiceNow Ticket). 
*   **Natural Language Interception:** The UI listens for specific user intents (e.g., "create a servicenow ticket") and intercepts them to trigger UI macros, bypassing the LLM for faster, deterministic execution.

## 3. Data Integration & Extensibility

*   **ServiceNow Integration:** Natively simulates REST API payloads for ServiceNow ticket creation, generating deterministic `INC` numbers and logging them in the Global Database.
*   **Future MCP Integration:** The Neuro SAN architecture is designed to support Model Context Protocol (MCP) servers, allowing you to easily snap in real Python tools for live SAP OData queries, Microsoft Entra ID lookups, and UiPath RPA triggers.
