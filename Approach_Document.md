# Approach Document: Expense Auditor

## 1. Solution Design Overview
The primary objective of the "Expense Auditor" project was to modernize and automate the tedious process of corporate expense compliance. The solution is designed as a centralized, intuitive web platform bridging the gap between two key users: **Employees** submitting receipts and **Finance Officers** auditing them against a rigid 40-page policy manual.

To accommodate this, the architectural design follows a funnel-based validation workflow consisting of three core modules:

**A. Digital Ingestion Portal (The Start)**
An employee-facing portal featuring an intuitive drag-and-drop zone. Users securely attach unstructured receipt data (JPG/PNG/PDFs) and provide the requisite business context. This completely eliminates email chains and paper trails.

**B. Simulated AI Policy Cross-Reference Engine (The Core)**
In production environments, this stage utilizes external Optical Character Recognition (OCR) and Generative AI mapping. For this prototype, I implemented an isolated, state-managed Logic Simulator within the application's runtime. It mimics an AI pipeline by intercepting the receipt data and instantaneously cross-referencing it against digitized, hard-coded policy constraints (e.g., regional spending limits, mismatching date boundaries). 

**C. The Human-in-the-Loop Auditor Dashboard (The Conclusion)**
An interactive dashboard built for Finance teams. It instantly categorizes the AI's output using a priority Traffic-Light visual system (Approved, Flagged, Rejected). The "Audit Detail View" offers a deep-dive, side-by-side verification screen aligning the original receipt, the exact broken policy snippet, and the AI's justification. Crucially, it provides a Human Override control, recognizing that AI output should augment—not entirely replace—financial decision-making without supervision.

---

## 2. Tech Stack and Justification

### Frontend Framework: React 18 & Vite
* **Why this choice:** Traditional multi-page applications suffer from slower visual load times. By utilizing React.js, the system operates as a Single-Page Application (SPA). This enables instantaneous state transitions between the ingestion portal and the auditor dashboard without clunky browser reloads. Vite was selected as the build tool over standard Webpack due to its immensely faster HMR (Hot Module Replacement) and optimized bundling capabilities, crucial for rapid hackathon iteration.

### Styling & Aesthetics: Custom Vanilla CSS & Framer Motion
* **Why this choice:** Instead of relying on rigid, bloated UI component libraries (like Bootstrap), I utilized custom "Glassmorphism" Vanilla CSS. This ensures total design control, resulting in a significantly more premium, modern, and lightweight application tailored perfectly to the specific brand feel. Framer Motion was added to inject subtle, fluid micro-animations into the form submissions, significantly elevating the perceived software quality and user experience. 

### Data Handling: Localized State Architecture 
* **Why this choice:** For this hackathon evaluation, ensuring a 100% reliable, zero-latency demonstration was paramount. Rather than orchestrating external Node/Express APIs or risking database timeouts (e.g., cold starts on free-tier cloud clusters), the data state (the "Fake DB") is housed completely client-side. This bulletproof approach prevents any "demo day" networking disasters while perfectly validating the conceptual UX layout.

---

## 3. Future Improvements (With More Development Time)

If granted more time or moving toward a production-scale deployment, I would implement the following critical enhancements:

1. **Live OCR & LLM Integration:**
   I would replace the simulated logic engine with a live connection to an OCR service (such as AWS Textract or Google Cloud Vision) to actually pull string layouts from raw images. Subsequently, passing that validated text directly to an LLM endpoint (like OpenAI's GPT-4o-mini) prompted strictly against a vectorized database housing the 40-page corporate policy manual. 

2. **Persistent Cloud Database Generation:**
   I would separate the frontend application from the data pipeline by constructing an explicit backend (Node.js/Express) connected to a PostgreSQL database hosted on **Supabase**. This would introduce authentic JWT connection protocols, Role-Based Access Control (RBAC), and persistent data storage ensuring Employees could historically track their approvals.

3. **Automated Notification Integration:**
   To finalize the loop, I would integrate automated email generation (via SendGrid or AWS SES) triggered via webhooks the moment a Finance Officer utilized the "Human Override" dashboard features or an expense achieved immediate AI clearance.
