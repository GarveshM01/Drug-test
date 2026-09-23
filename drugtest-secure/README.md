# DrugTest Secure — Drug Field-Test Digital Verification System

> **Smart India Hackathon (SIH) Frontend Prototype**  
> A mobile-first, professional web application designed for authorized law enforcement and field officers conducting colorimetric chemical field tests.

---

## 🌟 Overview

**DrugTest Secure** digitizes and cryptographically verifies presumptive drug field testing. It demonstrates the complete operational lifecycle:
1. **Officer Authentication**: Field credentials (`OFF-1023`, `BPL-CENTRAL-01`, PIN: `1234`).
2. **Dashboard**: Seizure statistics, status breakdown, and recent test registry.
3. **7-Step Test Creation**:
   - Step 1: Select Verified Field Kit (Kit A / Kit B / Kit C)
   - Step 2: Substance Category (Dynamically filtered by kit chemistry)
   - Step 3: Evidentiary Case & Sample Details (Case ID, Sample ID, Physical Matrix)
   - Step 4: Kit Details & Expiration Verification
   - Step 5: Dual-Target Alignment Instructions (Reference Card + Ampoule)
   - Step 6: Optical Camera Capture (Live webcam / Presets / File upload)
   - Step 7: Colorimetric AI Analysis Telemetry Simulation
4. **Presumptive Result**: Confidence score, statutory forensic disclaimer.
5. **Digital Verification Certificate**: Cryptographic **SHA-256 hash** integrity stamp (`Integrity Verified ✓`), GPS lock, and `@media print` certificate generator.
6. **Master Registry**: Search by ID/Case/Officer and filter by result/date.
7. **Supervisor Console (`/admin`)**: Statewide audit trails and cryptographic ledger validation.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18, v20, v22, or higher)
- npm (v9 or higher)

### 1. Installation
Clone the repository or extract the ZIP file, then install dependencies:
```bash
npm install
```

### 2. Run Local Development Server
Start the local Vite dev server:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 3. Production Build
Generate an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🔑 Demo Credentials

When opening the app, you will be directed to `/login`. Use the following credentials (or click **"Auto-fill Demo"**):

| Field | Value |
| :--- | :--- |
| **Officer ID** | `OFF-1023` |
| **Batch / Unit ID** | `BPL-CENTRAL-01` |
| **Password / PIN** | `1234` |

*Supervisor shortcut:* You can also access the supervisor view anytime at `/admin`.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6/8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Integrity**: Web Crypto API + SHA-256 simulation

---

## 🚢 Deployment Guide

### Deploying to Vercel
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework preset: **Vite**.
4. Click **Deploy**.

> *Note for client-side routing on Vercel:* Add a `vercel.json` with rewrites if needed:
> ```json
> {
>   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
> }
> ```

### Deploying to Netlify
1. Connect repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` containing: `/* /index.html 200`.

---

## ⚖️ Scientific & Forensic Notice
This prototype is a frontend demonstration for the Smart India Hackathon. It does not perform actual chemical or physical drug detection. All results are presumptive and simulate field operations requiring confirmatory laboratory testing (GC-MS).
