# Solace Take-Home Challenge — Submission

This repository contains my implementation of the Solace Staff Software Engineer take-home assignment.  
The challenge centers on improving a deliberately flawed full-stack Next.js application used to help patients search for Solace advocates. The baseline code was intentionally buggy, unoptimized, and stylistically inconsistent to evaluate real-world engineering judgment.

My goal was to fix high-impact issues, clarify data flow, strengthen the UI, and leave the codebase in a more predictable, maintainable state — all within the suggested ~2-hour timebox.

For deeper architectural thoughts, additional options I considered, and improvements I would pursue with more time,  
**please see [`DISCUSSION.md`](./DISCUSSION.md).**

---

## 📌 What This Submission Covers

The assignment asked for three main areas of focus:

1. **Fix glaring bugs and anti-patterns** in both frontend and backend code.
2. **Improve the design and UX** of the advocate search table. Solace values design, so part of the work involved clarifying layout, visual hierarchy, and user flow.
3. **Consider performance** at the scale of _hundreds of thousands_ of advocates. The goal was not full optimization, but demonstrating awareness of architectural bottlenecks and opportunities.

My work concentrates on improvements that materially affect correctness, usability, readability, and scalability at a foundational level.  
Additional architectural thoughts and a broader roadmap are included in **`DISCUSSION.md`**.

---

## 🧠 Approach & Philosophy

Since the prompt encourages open-ended thinking rather than “feature completeness,” I approached this as I would a new team codebase:

- Identify structural issues causing bugs or unpredictable behavior
- Simplify components and state usage
- Improve cohesion of the UI while staying within Tailwind
- Reduce unnecessary rendering and data churn
- Make small, disciplined improvements that unlock future scalability
- Clearly document what I would do with more time (in `DISCUSSION.md`)

Wherever a deeper optimization or refactor could not be completed within the timebox, I added rationale and next steps to **`DISCUSSION.md`**.

---

## 🚀 How to Run the Application

To run this application locally, follow these steps:

### 1. Start the Database
This application uses a PostgreSQL database, which is managed using Docker. Ensure Docker is installed and running on your system.

Run the following command to start the database:
```bash
docker-compose up -d
```
This will start the PostgreSQL database in the background. The database will be accessible at `localhost:5432` with the following credentials:
- **User**: `postgres`
- **Password**: `password`
- **Database**: `solaceassignment`

To verify the database is running, use:
```bash
docker ps
```
Ensure the `db` service is listed and running.

### 2. Install Dependencies
Install the required Node.js dependencies:
```bash
npm install
```

### 3. Start the Development Server
Run the following command to start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---
