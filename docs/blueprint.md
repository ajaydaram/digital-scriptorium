# **App Name**: The Scriptorium

## Core Features:

- User Authentication & Profile: Users can sign in (via Firebase Auth) to save their study progress, annotations, and preferences across sessions.
- Interactive Bible Reader: An 'Enhanced Reader' component to display scripture verses, integrating data from a Bible API for real-time access.
- Dynamic Reading Paths: Curated 'Chronological', 'Thematic', and 'Genre' learning paths, allowing users to navigate the Bible with specific pedagogical frameworks.
- AI-Powered Annotation Assistant: A tool that allows users to highlight text and leverage AI to receive context-specific explanations, cross-references, or theological insights. Annotations are stored in Firestore.
- Study Progress Tracking: An interactive 'Guided Ascent' horizontal stepper showing progress through 'Read', 'Understand', and 'Master' stages, with progress saved to Firestore.
- High-Fidelity Landing Page: A landing page with a compelling hero section featuring the headline 'Bridge the Gap from Casual to Deep Study' and calls-to-action like 'Interactive Demo' and 'Start Your Journey'.
- Core Navigation System: A consistent navigation bar with links to 'Reading Paths', 'Study Hub', 'Community', and a 'Bible Reader' CTA button.

## Style Guidelines:

- Background color: White (#FFFFFF) to provide a clean and scholarly canvas, as specified by the user. Primary UI elements, such as buttons and important sections, will utilize a gradient from Electric Blue to Bright Purple.
- Primary color: A rich, deep violet (#3A14E0), capturing the blend of scholarly depth and vibrant digital engagement, drawing inspiration from the user's requested gradient. This color will be used for key interactive elements.
- Accent color: A bright, clear sky blue (#4ABFEE) to provide contrast and draw attention to call-to-action buttons and interactive highlights.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy, and scholarly feel appropriate for a 'Scholarly-SaaS' platform.
- Body font: 'Inter' (sans-serif) for its neutral, objective readability, making it ideal for displaying longer passages of text like scripture and pedagogical explanations.
- Use clean, minimalistic line icons that convey pedagogical and biblical themes (e.g., an open book, a lightbulb for understanding, arrows for progress). Incorporate custom icons inspired by 'The Scriptorium' branding.
- Implement a clear, spacious layout using a grid system (e.g., Tailwind CSS grid) to maintain structure and readability, especially for content-heavy sections. The hero section will be prominently displayed on the landing page.
- Subtle, deliberate animations for interactive elements, such as hover effects on buttons and cards, and smooth transitions for the 'Guided Ascent' stepper to enhance user feedback and engagement without distraction.