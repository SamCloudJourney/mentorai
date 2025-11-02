# UX Wireframes  

For the initial MentorAI MVP, the following low‑fidelity wireframe descriptions outline the core screens and interactions. Use these descriptions as a hand‑off to design or as guidance for implementation.  

## Onboarding / Welcome  
- **Purpose:** Gather essential information from the learner to create a personalized plan.  
- **Form Fields:** Subjects (multi‑select chips), exam board, goals/target grade, weekly study availability.  
- **Flow:** After selecting subjects and entering goals, the user starts a diagnostic quiz.  
- **Visual:** Minimal layout with a progress bar at the top; primary button for “Start Diagnostic”.  

## Dashboard  
- **Header:** Greeting with the user’s name plus XP count and streak indicator.  
- **Primary CTA:** A large “Continue lesson” button that resumes the current session.  
- **Cards:**  
  - **Subjects:** Quick links to active subjects.  
  - **Weak Topics:** Highlights topics with low mastery.  
  - **Upcoming Plan:** Shows the next few scheduled sessions/tasks.  
  - **Recent Activity:** Displays last sessions, XP earned and streak events.  
- **Layout:** Grid of cards below the header, responsive for mobile and desktop.  

## Tutor Chat  
- **Left Column:** Scrollable chat history with messages, lesson cards and quiz questions.  
- **Right Panel:** Context sidebar containing session objectives, formula/reference sheet, hints and a scratchpad area for notes or rough work.  
- **Input Area:** Text box supporting math mode (e.g. LaTeX) with buttons: “Check answer”, “Explain another way”, “I need a hint”.  
- **Micro‑Interactions:** Typing indicator for the AI, subtle animations when XP is awarded.  

## Review & Progress  
- **Weak Topic Chips:** A list of chips representing topics where the learner has low mastery; selecting one triggers a targeted drill.  
- **Charts:**  
  - **XP Over Time:** Line or bar chart showing XP gained per day or week.  
  - **Accuracy by Topic:** Chart displaying correctness percentage per topic.  
  - **Time Spent:** Chart summarizing study time across subjects.  
- **Weekly Recap:** Placeholder for PDF recap download (future version).  

## Settings / Profile  
- **Editable Profile:** Allows updating exam board, year/level and subjects.  
- **Study Schedule:** Configure study days and notification preferences.  
- **Account Management:** Basic account settings for email/password (if supported by Supabase).  

These descriptions define the intended user experience and layout without visual polish. Designers can expand upon them to create high‑fidelity screens consistent with the MentorAI visual system.
