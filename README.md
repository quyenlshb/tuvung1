# Learn JP — Memrise-style demo

This is a demo React + Tailwind project with Firebase Auth + Firestore placeholders.
It contains:
- Authentication (register/login)
- XP and daily streak tracking (stored in Firestore)
- Pages: Dashboard, Learn, Review, Listening, Typing, Profile, Leaderboard
- Simple gamification with framer-motion

## How to run (locally)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialize Tailwind (if needed) and start:
   ```bash
   npm start
   ```

3. Add your Firebase config in `src/firebaseClient.js`.

## Notes
- Audio files are mocked (you can add `public/audio/*.mp3`).
- Firestore security rules and production config are not provided — this is a demo scaffold.
