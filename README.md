<<<<<<< HEAD
# Room Allocation Desk

A small full-stack room availability dashboard for checking which rooms are free at a selected date and time, and which active classes are full. It uses sample in-memory data only, so restarting the server resets the schedule.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. The React app runs on port 5173 and the Node API runs on port 4000.

## API

- `GET /api/health`
- `GET /api/dashboard?date=2026-09-22&time=10:30&query=A-204`

## Generation prompt

> Build a simple full-stack Room Allocation Desk for a college campus. Use React with Vite for the frontend and a small Node.js HTTP backend. Do not add a database yet; keep a clearly separated in-memory array of rooms and class bookings on the server. The app must let a user choose a date and time, see which rooms are available or occupied at that exact time, and see which classes currently have enrollment at or above capacity. Add a search input that filters by room number, building, room type, equipment, or class name. Include summary counts for total rooms, available rooms, active classes, and full classes. Use sample schedule data and make the UI responsive, accessible, and practical rather than complex. Add a backend endpoint such as `/api/dashboard` that accepts `date`, `time`, and `query`, and configure the Vite dev proxy to reach it. Include setup and run instructions.
=======
<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Fsd-lab
>>>>>>> second/main
>>>>>>> third/main
