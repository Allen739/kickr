# kikr — FIFA World Cup 2026 Tracker

Live scores, group standings, and knockout bracket for the 2026 FIFA World Cup.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (base-nova)
- **API:** [worldcup26.ir](https://worldcup26.ir) (free, no auth, no key)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|---|---|
| `/` | Home — today's matches, live now, recent results, upcoming fixtures |
| `/groups` | Group stage standings with points, GD, form |
| `/fixtures` | All 104 matches filtered by group and matchday |
| `/match/[id]` | Match detail with score, scorers, stadium, type |
| `/teams` | All 48 teams grouped by group |
| `/teams/[id]` | Team detail with flag, group, FIFA code |
| `/bracket` | Knockout bracket tree with SVG connectors |
| `/top-scorers` | Golden Boot race with player flags and goals |

## Project Structure

```
app/              # Pages (home, groups, fixtures, teams, match, bracket, top-scorers)
components/       # UI components (Navbar, MatchCard, GroupTable, BracketView, TodaySection, etc.)
lib/              # API client, flag mapping, utilities
public/           # Static assets, PWA icons, manifest
```
