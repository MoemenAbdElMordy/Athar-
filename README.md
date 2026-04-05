# Athar Website Design

Frontend for Athar admin and website experiences, built with **React 18 + TypeScript + Vite**.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create an env file (or update existing):

```env
VITE_API_BASE_URL=http://localhost:8000
```

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS + shadcn/ui
- Recharts (dashboard and analytics charts)

## Admin Areas Updated

The admin dashboard now uses richer backend payloads and includes:

- **Places**: richer location/accessibility details and moderation fields
- **Reports**: real moderation status/data from backend flags API
- **Tutorials**: summary stats, filters, pagination, and complete tutorial fields
- **Settings**: place-submission moderation and accessibility report management
- **Accounts**: volunteer analytics modal (impact, earnings, performance, reviews)
- **Dashboard**: tutorials/reports/submissions/accessibility summaries + recent reports/tutorials

## API Integration Notes

- Central API client: `src/utils/server-api.ts`
- Admin pages consume `/admin/*` endpoints from backend `routes/web.php`
- Volunteer analytics in Accounts page uses:
  - `GET /admin/accounts/{id}/volunteer-analytics`

## Project Structure (key paths)

- `src/pages/admin/*` — admin pages
- `src/components/admin/*` — admin layout/navigation components
- `src/components/ui/*` — shared UI primitives
- `src/utils/server-api.ts` — API layer for mobile/admin endpoints
