# Enterprise Automator: 5-Minute Demo Script

**Speaker Setup:** Speak at a steady, professional pace. Open with the slides, then transition to the code/terminal, and finish entirely in the React UI.

---

### 1. Problem Statement (0:00 - 0:30)
**[Visual: Title Slide / Problem Slide]**
"Hello everyone. Today I'll be demonstrating the **Enterprise Automator**—formerly Sentinel Command. 
In large enterprises, when a crisis or cross-departmental operational issue occurs, resolving it requires a painful 72-hour email chain. You have to individually ping Legal, HR, Cyber Security, and Procurement, wait for their assessments, aggregate the data manually, and then make an executive decision. This siloed, sequential process is too slow, prone to human error, and costs the business millions in downtime and SLA penalties."

### 2. Proposed Solution (0:30 - 0:50)
**[Visual: Architecture / Solution Slide showing the Starburst]**
"Our proposed solution is an **autonomous, multi-agent war room**. 
Instead of a single chatbot, we built a 45-agent 'Starburst' network. An executive simply types the problem into a dashboard. A central 'Chief of Staff' orchestrates the crisis, triggering Department Heads and Specialist Sub-Agents to reason *in parallel*. What used to take 72 hours of email ping-pong now takes 15 seconds to generate a unified, executive-ready recommendation with actionable business buttons."

### 3. Tools Used (0:50 - 1:10)
**[Visual: Tech Stack Slide]**
"To build this, we leveraged a decoupled, lightning-fast stack:
* **Backend Framework:** Neuro SAN (`nsflow`) for orchestrating the multi-agent graph.
* **LLM Engine:** Google Gemini Flash Lite for ultra-high concurrency and speed.
* **Frontend:** React, TypeScript, and Vite, utilizing WebSockets for real-time streaming and a premium Glassmorphism UI."

---

### 4. Code Walkthrough (1:10 - 1:50)
**[Visual: VS Code showing `sentinel_crisis_command.hocon` and `App.jsx`]**
"Let's look under the hood before we run it. 
* **Modules & Agents Developed:** In our Neuro SAN HOCON registry, you can see we aren't using a simple linear chain. We've developed **45 distinct agents** across three tiers: The Orchestrator (Chief of Staff), 14 Tier-2 Department Heads, and 29 Tier-3 Sub-Agents specializing in things like internal audit, PR sentiment, and CERT-In compliance.
* **APIs Used:** We use the Gemini API for parallel reasoning, and WebSocket APIs to push the live execution trace directly to our React frontend so the executive can watch the agents think in real-time."

---

### 5. Demo: Project Open & Run (1:50 - 5:00)
**[Visual: Split screen or transitioning to terminal]**
"Let's start the project."
*(Type `ns run --registry generated/sentinel_crisis_command` in terminal 1)*
*(Type `npm run dev` in terminal 2 and open the browser to localhost:5173)*

"We are now in the React Command Center. Notice the clean, business-grade UI. The sidebar dynamically tracks which agents are live. I will run **5 distinct scenarios**—3 predefined crisis events, and 2 standard operational/developer requests."

#### Prompt 1: The Mega Crisis (Predefined)
*(Copy/Paste the LockBit Ransomware prompt into the UI)*
"First, a massive crisis: A LockBit ransomware attack in our Bangalore data center affecting 47,000 employees. Watch the sidebar—the Chief of Staff instantly wakes up Cyber Security, Legal, HR, and PR agents to work in parallel. Within seconds, we have a unified report on CERT-In compliance, a PR holding statement, and HR protocols. At the bottom, notice our premium action buttons: we can immediately 'Page On-Call' or 'Generate RCA'."

#### Prompt 2: Supply Chain Failure (Predefined)
*(Copy/Paste the Rashi Peripherals SAP failure prompt)*
"Next, a supply chain breakdown. 150 laptops halted due to an SAP payment failure. Here, the system routes only to the SAP Supply Chain and Vendor agents. It doesn't waste time with Cyber Security. We get an immediate de-escalation plan and an option to 'Create a ServiceNow Ticket'."

#### Prompt 3: The VIP HR Escalation (Predefined)
*(Copy/Paste the CFO Stolen Laptop prompt)*
"Third, a targeted, fast crisis. The CFO's laptop was stolen in Mumbai. Watch how fast it processes. IT Ops triggers a remote wipe, and HR prepares a temporary replacement. Quick, decisive, and handled in seconds."

#### Prompt 4: Operational Developer Request (Dev)
*(Copy/Paste the prompt: "Procure 25 MacBook M3 Max laptops for the new AI Dev pod in Pune. Budget 85 Lakhs.")*
"This system isn't just for emergencies; it's for daily operations. Here, a dev team needs 25 MacBooks. The Vendor and Finance agents simulate a stock check and draft an SAP purchase order authorization. As an executive, I can just click 'Approve'."

#### Prompt 5: Information Deduplication (Dev)
*(Copy/Paste a duplicate of Prompt 4)*
"Finally, what happens if two managers report the exact same issue? I'll paste the laptop request again. Our Tier-1 `Search_Agent` intercepts the request, checks the Global Incident Database, flags it as a duplicate, and halts execution to save compute and prevent redundant work."

**[Visual: Final UI screen showing action buttons]**
"In summary, Enterprise Automator transforms chaotic, multi-department corporate workflows into a centralized, parallel, autonomous pipeline. Thank you."
