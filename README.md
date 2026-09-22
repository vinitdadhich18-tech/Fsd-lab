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
