# The Scriptorium | Deep Bible Engagement Platform

**The Scriptorium** is a research-backed, pedagogical Bible study platform designed to bridge the gap between casual reading and scholarly theological study. Built with Next.js 15, Firebase, and Genkit AI, it provides a distraction-free, collaborative environment for systematic scripture engagement.

## 🚀 Project Overview & Progress

From the initial prototype to the current data-driven application, we have implemented the following core systems:

### 1. Foundation & Design System
- **Next.js 15 (App Router):** Leveraged for high-performance server-side rendering and nested layouts.
- **Scholarly Aesthetic:** Established a unique brand identity using an "Electric Blue" to "Vibrant Purple" gradient (`#3B82F6` to `#A855F7`).
- **Typography First:** Integrated 'Inter' and 'Space Grotesk' fonts, optimized for long-form reading with custom Prose configurations.
- **Responsive Navigation:** A persistent `Navbar` providing access to all major modules (Reader, Paths, Pedagogy, Study Hub).

### 2. The Multi-Reader System
- **API.Bible Reader (`/api-reader`):** A streamlined, high-contrast dark-themed reader for quick reference. Features "Popular Passages" and full-text search.
- **Enhanced Reader (`/reader`):** The flagship study interface featuring:
  - **Live Scripture Engine:** Securely proxied connection to the American Bible Society (API.Bible) with fallback to `bible-api.com`.
  - **Version Switcher:** Support for KJV, ASV, WEB, BBE, and YLT.
  - **Theme Intelligence:** Native Light/Dark mode toggles optimized for different study environments.
  - **Guided Ascent Integration:** A visual stepper tracking the transition from Reading to Understanding to Mastery.

### 3. Pedagogical Framework
- **Three Structured Paths (`/paths`):** 
  - **Chronological:** Tracking the Grand Historical Narrative.
  - **Thematic:** Exploring theological coherence.
  - **Genre:** Mastering literary interpretation.
- **Smart Presets:** Paths act as intelligent entry points, automatically configuring the Reader with specific passages and pedagogical contexts.
- **Educational Methodology (`/pedagogy`):** Detailed research-backed principles (Scaffolded Learning, Canonical Reading, Community Hermeneutics).

### 4. Firebase Backend & Social Layer
- **Firebase Auth:** Integrated Google Sign-In for persistent scholar profiles.
- **Social Annotations:** A global, real-time Firestore system allowing users to:
  - Highlight and comment on specific verses.
  - View a "Scholarly Study Feed" of community insights in the Reader sidebar.
  - Track identity via user avatars and display names.
- **Non-Blocking Architecture:** Implemented optimistic UI updates for a seamless, "alive" feel during annotation.

### 5. Generative AI (Genkit)
- **AI Scholarly Guide:** Developed server-side flows to provide:
  - **Contextual Analysis:** Explaining how passages fit into the Grand Historical Narrative.
  - **Word Study Tutor:** Deep-dive analysis of Greek/Hebrew roots, transliterations, and Strong’s numbers.
- **Handlebars Templating:** Structured AI prompts to ensure scholarly, pedagogical output formats.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS + ShadCN UI
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **AI Engine:** Genkit + Google Gemini 2.5 Flash
- **Icons:** Lucide React
- **Animation:** Framer Motion

## 📖 How to Use
1. **Explore:** Visit the landing page to understand the "User Journey."
2. **Choose a Path:** Go to `/paths` and select a starting point (e.g., Chronological).
3. **Study:** Use the **Enhanced Reader** to engage with real-time scripture.
4. **Collaborate:** Sign in to publish your theological reflections to the global social feed.
5. **Deepen:** Use the **AI Guide** or **Study Hub** to move from reading to mastery.

## 📜 Attribution
Content provided by **API.Bible** • American Bible Society.
Built as a modern digital Scriptorium for the serious student of the Word.
