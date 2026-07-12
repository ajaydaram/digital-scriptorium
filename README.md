# Welcome to Antigravity!

Welcome to your new developer home! Your Firebase Studio project has been successfully migrated to Antigravity.

Antigravity is our next-generation, agent-first IDE designed for high-velocity, autonomous development. Because Antigravity runs locally on your machine, you now have access to powerful local workflows and fully integrated AI editing capabilities that go beyond a cloud-based web IDE.

## Getting Started
- **Run Locally**: Use the **Run and Debug** menu on the left sidebar to start your local development server.
  - Or in a terminal run `npm run dev` and visit `http://localhost:9002`.
- **Deploy**: You can deploy your changes to Firebase App Hosting by using the integrated terminal and standard Firebase CLI commands, just as you did in Firebase Studio.
- **Cleanup**: Cleanup unused artifacts with the @cleanup workflow.

Enjoy the next era of AI-driven development!

File any bugs at https://github.com/firebase/firebase-tools/issues

**Firebase Studio Export Date:** 2026-07-08


---

## Previous README.md contents:

# The Scriptorium | Deep Bible Engagement Platform

**The Scriptorium** is a research-backed, pedagogical Bible study platform designed to bridge the gap between casual reading and scholarly theological study. Built with Next.js 15, Firebase, and Genkit AI, it provides a distraction-free, collaborative environment for systematic scripture engagement.

## 🚀 Accomplishments & Implemented Systems

### 1. Visual Identity & Scholarly Design
- **Branded Design System:** Established a unique "Electric Blue" to "Vibrant Purple" gradient theme (`#3B82F6` to `#A855F7`).
- **Typography Excellence:** Integrated 'Space Grotesk' for headlines and 'Inter' for body text, optimized for long-form reading.
- **Responsive Navigation:** A persistent `Navbar` with intelligent routing, user profile management, and dedicated "Simple" and "Enhanced" reader access.

### 2. Multi-Reader Architecture
- **Simple Reader (`/api-reader`):** A high-performance, distraction-free reader for quick reference and distraction-free engagement.
- **Enhanced Reader (`/reader`):** Our flagship study interface featuring:
  - **Secure Scripture Proxy:** A Next.js Route Handler (`/api/bible`) that securely connects to the **American Bible Society** (API.Bible) and provides a fallback to `bible-api.com`.
  - **Guided Ascent Integration:** A visual stepper tracking the transition from Reading to Understanding to Mastery.
  - **Dynamic Reference Parsing:** A custom `bibleService` that handles complex references with 3-letter book code normalization.

### 3. Pedagogical Framework
- **Three Structured Paths (`/paths`):** 
  - **Chronological:** Tracking the Grand Historical Narrative.
  - **Thematic:** Exploring theological coherence.
  - **Genre:** Mastering literary interpretation.
- **Smart Presets:** Paths act as intelligent entry points, automatically configuring the Reader with specific passages and pedagogical contexts.

### 4. Firebase Backend & Social Layer
- **Firebase Auth:** Integrated Google Sign-In for persistent scholar profiles.
- **Social Annotations:** A global, real-time Firestore system (`/annotations`) allowing users to:
  - Publish highlights and comments on specific verses.
  - View a "Scholarly Study Feed" of community insights directly in the Reader sidebar.
- **Security Rules:** Explicitly designed rules to support public reading of insights while protecting private user data.

### 5. Generative AI (Genkit v1.x)
- **AI Scholarly Guide:** Server-side flows providing contextual analysis and narrative mapping.
- **Linguistic Word Study:** Deep-dive analysis of Greek/Hebrew roots with Strong’s number identification.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS + ShadCN UI + Framer Motion
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication (Google Sign-In)
- **AI Engine:** Genkit 1.x + Google Gemini 2.5 Flash
- **API Support:** American Bible Society (API.Bible) + Bible-API (Fallback)

## 📜 Attribution
Content provided by **API.Bible** • American Bible Society.
Built as a modern digital Scriptorium for the serious student of the Word.
