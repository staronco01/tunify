# TUNIFY — Web-first music player

This repository contains the initial scaffold for TUNIFY, a premium music player web app built with React + TypeScript + Vite.

Features in this scaffold:
- Dark-themed UI and responsive layout
- Basic navigation (Home, Library, Downloads)
- Functional demo audio player (play/pause, seek, volume)
- Simple demo download that saves a demo track into IndexedDB using localforage

What I will build next:
- Full Firebase integration (Auth, Firestore, Storage)
- Search integration with a legal royalty-free provider (Jamendo / Internet Archive) or your provided demo tracks
- Robust download manager with pause/resume/cancel and background downloads (native via Capacitor for Android)
- Playlist management, offline library, and more

Run locally
1. Install:
   npm install
2. Start dev server:
   npm run dev

Firebase & API keys
- This scaffold does not include Firebase configuration or music provider credentials. I will provide a secure Cloud Function proxy and instructions when we wire up a provider. Do NOT commit API secrets to this repo.

Demo content
- The demo audio used is a public example track for testing only and is labelled as demo content in the UI.
