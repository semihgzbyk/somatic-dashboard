# Somatic Dashboard

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

A modern clinical-style somatic analysis dashboard built with **Next.js**, designed for high-performance visualization and exploration of somatic variant data.

> **Note:** The current version operates with mock datasets to demonstrate the frontend architecture and UI/UX flow. Full backend integration and genomic pipeline support are currently in the roadmap.

---

## Overview

Somatic Dashboard serves as a specialized interface for bioinformaticians and clinicians to explore genomic analysis outputs. It simplifies complex data into interactive insights, covering:

- **Somatic Variants:** Comprehensive lists with filtering capabilities.
- **Genomic Statistics:** SNP / InDel distributions and statistics.
- **Quality Control:** Coverage metrics, sequencing stats, and QC summaries.
- **Variant Impact:** Detailed information on variant consequences and clinical significance.

---

## Key Features

- **Clinical-Grade UI:** A professional, healthcare-inspired design focused on clarity, trust, and ease of use.
- **Variant Exploration:**
  - Dynamic variant tables with sorting and filtering.
  - Gene-based data exploration.
  - Detail drawer/panel for deep-diving into specific variant data.
  - Visual impact indicators (Low, Moderate, High, Modifier).
- **Interactive Analytics:**
  - Radar charts for multi-metric QC overviews.
  - Bar and line charts for coverage and distribution analysis via **Recharts**.
- **Robust Data Simulation:** Built-in mock data support to simulate real-world analysis results before production deployment.

---

## Tech Stack

- **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Radix UI / Shadcn UI

---

## Project Structure

```text
src/
 ├── app/                 # Next.js App Router (Pages & Routing)
 │   ├── coverage/        # Coverage metrics view
 │   ├── overview/        # Main dashboard overview
 │   ├── qc/              # Quality control metrics view
 │   ├── reports/         # Report generation view
 │   ├── variants/        # Variant analysis and tables
 │   ├── globals.css      # Global styles and Tailwind directives
 │   └── layout.tsx       # Root layout configuration
 │
 └── components/          # Reusable React Components
     ├── layout/          # Dashboard shell, sidebar, and metric cards
     └── ui/              # Atomic UI elements (Badge, Button, Card, Sheet, etc.)
```

---

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/semihgzbyk/somatic-dashboard.git](https://github.com/semihgzbyk/somatic-dashboard.git)
   ```
2. **Enter the directory:**
   ```bash
   cd somatic-dashboard
   ```
3. **Install dependencies:**
   ```bash
   npm install
   
```
4. **Run the development server:**
   ```bash
   npm run dev
   
```
5. **View the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Roadmap

### Phase 1: UI/UX Foundation (Completed)
- [x] Clinical-style design system
- [x] Responsive Dashboard layout
- [x] Variant table & drawer components
- [x] Mock data integration

### Phase 2: Data Parsing (In Progress)
- [ ] Excel/XLS Parser (`*.significant.snp_indel.xls`, etc.)
- [ ] Local file upload functionality
- [ ] Dynamic data mapping to UI components
- [ ] Advanced filtering for variants

### Phase 3: Backend & Scale (Planned)
- [ ] **FastAPI** backend for heavy data processing
- [ ] **PostgreSQL** for persistent variant storage
- [ ] **VCF** file processing pipeline
- [ ] Automated PDF clinical report generation

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Developed for the bioinformatics community.*
