# Sentinel Command Project Summary

## What We Are Trying to Achieve
In modern enterprise environments (like Cognizant), corporate crises—such as data breaches, vendor payment disputes, or legal compliance failures—require input from multiple siloed departments (Cybersecurity, Finance, Legal, HR, SAP Operations). Traditional escalation involves a linear, human-driven workflow via email or ticketing systems, often taking 48 to 72 hours just to reach a consensus for an executive decision.

Our goal was to condense this 72-hour process into a **15-second autonomous pipeline**. We wanted an intelligent "War Room" where an executive could state the crisis, and instantly receive a comprehensive, 360-degree risk assessment and actionable resolution plan.

## How the Project Achieves This
We built **Sentinel Command**, an Enterprise Crisis Command Center, by integrating a custom React user interface with a powerful AI backend.

The system acts as a digital Chief of Staff. Instead of waiting for human departments to reply to emails, the system uses AI agents trained on corporate policies to instantly simulate departmental analysis. By leveraging a centralized UI, the executive receives a single, perfectly formatted briefing document detailing the exact risks (e.g., financial exposure, specific Indian corporate laws violated) alongside direct action buttons (Approve, Escalate, Reject).

## Highlighting the Agentic System (Neuro SAN)
The true power of this project lies in the **Neuro SAN Multi-Agent Pipeline**. This is not a standard "chatbot." It is a complex agentic system:

1. **Parallel Orchestration:** The system doesn't just ask one LLM to write a report. The "Chief of Staff" agent acts as a master router. It breaks the crisis down and assigns it to up to 9 specialized sub-agents (e.g., the `Legal_Agent` specifically evaluates contract law, while the `SAP_SupplyChain_Agent` evaluates procurement rules). These agents run in parallel, and their specialized outputs are synthesized into the final report.
2. **Deterministic Deduplication (Search Agent):** We built a customized `Search_Agent` that acts as the very first line of defense. The frontend automatically injects the entire history of the user's browser (The Global Incident Database) into the agent's memory. The agent autonomously cross-references incoming requests against this database to prevent processing duplicate crises.
3. **Conversational Action (Agent-to-UI Execution):** The agentic system isn't limited to text generation. If the user commands the system to "Create a ServiceNow Ticket", the system's architecture intercepts this intent and physically executes UI components, marrying natural language understanding with deterministic software execution.
