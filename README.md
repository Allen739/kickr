# kikr — FIFA World Cup 2026 Tracker

Live scores, group standings, and knockout bracket for the 2026 FIFA World Cup. Built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** SQLite via Prisma 7 (caching layer)
- **API:** [worldcup26.ir](https://worldcup26.ir) (free, no auth)

## Getting Started

```bash
npm install
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

All data is fetched from the WorldCup26 API and cached in a local SQLite database. Pages serve cached data first and refresh in the background (stale-while-revalidate). This makes the app resilient to API downtime.

- **Match data** refreshes every 60 seconds
- **Team data** refreshes every hour
- **Stadium data** refreshes every 24 hours

## Project Structure

```
app/              # Pages (home, groups, fixtures, teams, match, bracket)
components/       # UI components (Navbar, MatchCard, GroupTable, BracketView, etc.)
lib/              # API client, cache layer, flag mapping, utilities
prisma/           # Schema and migrations
public/           # Static assets
```
