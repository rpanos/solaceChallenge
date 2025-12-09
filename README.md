## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 📌 Summary

This assignment centers on improving an intentionally flawed full-stack Next.js application used to help patients search for Solace advocates. The baseline code was designed to contain structural issues, performance pitfalls, and UX problems. The goal was not to complete a polished product, but to demonstrate engineering judgment under realistic time constraints.

The challenge asked for three main areas of focus:

1. **Correctness:** identify and fix obvious bugs and anti-patterns in both frontend and backend code.
2. **UX / Design:** improve the clarity, usability, and visual presentation of the advocate search flow. Solace emphasizes design quality, so part of this work involved clarifying interactions rather than adding features.
3. **Performance Thinking:** evaluate the existing implementation through the lens of scale (hundreds of thousands of advocates), and make improvements that move the codebase toward efficient querying and rendering, even if not all optimizations can be implemented in a two-hour window.

Because the prompt intentionally encourages open-ended interpretation, I focused on changes that would have the highest real-world impact for a patient-facing application: improving data flow, reducing unnecessary work in the rendering pipeline, clarifying components, and making the UI more coherent and predictable.

Given the recommended ~2-hour limit, I constrained my work to high-leverage improvements and documented additional recommendations in [`DISCUSSION.md`](./DISCUSSION.md). That document outlines broader architectural and performance considerations I would pursue in a production environment, including validation, search heuristics, and backend indexing strategies.

To match Solace’s preferred workflow, my updates are submitted as pull requests with explanations of each change and the reasoning behind it.

## Getting Started

Install dependencies

```bash
npm i
```

Run the development server:

```bash
npm run dev
```

## Database set up

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you’d like to configure a database, you’re encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```
