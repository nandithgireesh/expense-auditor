# Expense Auditor 💼🧠

> **An Intelligent Policy-First Expense Management System**
> Built for the Cymonic Hackathon: "Expense Auditor" Problem Statement.

![License](https://img.shields.io/badge/License-MIT-blue.svg) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)

Corporate financial compliance is a high-stakes environment where precision is mandatory. **Expense Auditor** is a sophisticated, prototype digital solution that automates the cross-referencing process between employee expense receipts and complex company compliance policies.

This project bridges the gap between messy "Travel & Expense" limitations and massive departmental backlogs using a unified visual pipeline.

---

## 🌟 Key Features

### 1. Digital Receipt Ingestion (Employee Portal)
A seamless employee-facing portal where users can easily attach their receipts (JPG/PNG/PDF formats) and submit the required business justification.
- **Drag-and-Drop functionality** 
- **Receipt Validation Pipeline** (Mock AI Extractor processing the Merchant Name, Date, Total Amount, and Currency).

### 2. Automated Policy Cross-Reference Engine (Auditor Logic)
At the core of the system is the intelligent engine representing AI contextual analysis. By comparing inputs against the company's digitized policy manual (e.g., "$150/night for lodging"), it determines compliance bounds.
- Validates constraints (regional limits, specific prohibitions)
- Audits contextual inputs ("Business Purpose" vs "Policy")

### 3. Intelligent Flagging & Dispute Dashboard
The dedicated Finance Auditor dashboard aggregates all submissions into an easy-to-read "Traffic Light" system:
- 🟢 **Approved**: Fully compliant with company policy parameters.
- 🟡 **Flagged**: Minor discrepancy detected (e.g. slight date mismatch).
- 🔴 **Rejected**: Clear violation of explicit policy rules.

A detailed, side-by-side **Audit Review** page allows the human Finance officer to supervise the AI's explanation, view the matched policy snippet, and issue Human-in-the-Loop **Overrides**.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://react.dev/) using [Vite](https://vitejs.dev/) for blazing fast development.
- **Styling**: Handcrafted Premium Vanilla CSS. Emphasizes modern glassmorphism UI, smooth multi-layered gradients, and precise micro-interactions without relying on heavy external styling libraries.
- **Routing**: [React Router v6](https://reactrouter.com/) for single-page application (SPA) seamless navigation.
- **Micro-Animations**: Setup with [Framer Motion](https://www.framer.com/motion/) for fluid transitions.
- **Icons**: [Lucide React](https://lucide.dev/).

---

## 🚀 Getting Started (Run Locally)

If you'd like to test the visual dashboard and routing system locally:

### Prerequisites:
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/nandithgireesh/expense-auditor.git
   ```
2. **Navigate into the directory**:
   ```bash
   cd expense-auditor
   ```
3. **Install exactly structured dependencies**:
   ```bash
   npm install
   ```
4. **Boot up the server**:
   ```bash
   npm run dev
   ```

5. Click the terminal link or visit **`http://localhost:5173`** in your browser.

*(Note: Data extraction and AI-driven rule parsing are locally mocked strictly for UI demonstration purposes due to hackathon API constraints).*

---

## 📸 Core Views Overview

- **`/` (Root View)**: The employee drops a receipt and inputs context. Represents the start of the funnel.
- **`/auditor`**: The central home base for Finance. Contains sortable metrics and risk-level queues.
- **`/auditor/claim/:id`**: Deep-dive comparison layout connecting Extracted Image Data and Automated Policy Reasoning side-by-side.

---
**Developed by Nandith Gireesh** for the Cymonic Hackathon.
