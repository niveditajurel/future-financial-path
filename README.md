# FinWise

FinWise is an AI-powered personal finance platform designed to feel like a wealth management associate for people who are still building wealth.

The product is aimed at young professionals, middle-income earners, and personal finance beginners who need clear, affordable, ongoing financial guidance instead of fragmented tools or expensive traditional advisory services.

FinWise does not execute trades. The goal is to help users understand their financial picture, make better money decisions, plan goals, manage debt, learn financial concepts, and receive proactive coaching.

## Product vision

FinWise is being built as an AI wealth associate for everyday users.

The core promise is simple:

- help users understand their financial health
- explain what they should do next and why
- turn vague goals into concrete plans
- make financial guidance feel calm, practical, and beginner-friendly

## Problem this project solves

Most finance tools solve only one slice of the problem:

- budgeting apps track spending
- investing apps focus on transactions
- education platforms explain concepts in isolation

But users still do not know what to do next with their money.

FinWise is meant to connect those pieces into a single planning and guidance layer.

## MVP scope

The MVP is focused on:

- landing page and product story
- financial onboarding
- financial health dashboard
- AI financial assistant
- goal-based planning
- debt guidance
- investment insights without trade execution
- education mode for finance beginners
- proactive nudges

## Current repository status

This repo already includes the first working shell of the product:

- landing page
- authentication flow with Supabase Auth
- onboarding flow for financial profile creation
- dashboard with profile-driven summary cards and charts
- Supabase-backed financial profile storage
- Supabase Edge Functions for AI-related workflows

Recent cleanup work in this repo:

- removed generic Lovable template content
- rewrote the landing page around the FinWise product narrative
- updated the visual theme to match the FinWise brand direction
- removed misleading demo-only sections and prototype artifacts
- removed direct OpenAI runtime usage for now
- cleaned up TypeScript and project structure issues
- changed the default local dev port to `8081`

At the moment, the AI layer is intentionally stubbed/disabled while the product structure, data model, and flows are being rebuilt more cleanly.

## Core user journey

1. User lands on FinWise and understands the value proposition quickly
2. User completes onboarding with income, expenses, savings, debt, goals, and risk preferences
3. User sees a dashboard with financial health interpretation, not just raw numbers
4. User asks the assistant questions in plain language
5. User gets personalized recommendations and next-best actions
6. User tracks goals and receives proactive nudges

## Tech stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts
- React Router
- React Hook Form
- Zod
- TanStack Query

### Backend

- Supabase PostgreSQL
- Supabase Auth
- Supabase Edge Functions

### Planned / optional integrations

- OpenAI for assistant, summaries, planning, and nudges
- n8n for event-driven automations
- Plaid for account connectivity in a later phase
- Resend for emails
- PostHog for analytics

## Project structure

```text
src/
  components/        UI components, onboarding parts, AI surfaces
  contexts/          app-level state such as auth
  hooks/             reusable hooks
  integrations/      Supabase client and generated types
  pages/             route-level screens
  schemas/           form validation schemas
  constants/         shared product constants

supabase/
  migrations/        database schema changes
  functions/         edge functions for AI/server workflows
```

## Local development

### Requirements

- Node.js 18+
- npm

### Install

```sh
npm install
```

### Start the app

```sh
npm run dev
```

By default, FinWise runs on:

```txt
http://localhost:8081/
```

### Build

```sh
npm run build
```

### Lint

```sh
npm run lint
```

## Supabase

This project uses Supabase for:

- authentication
- financial profile storage
- AI-related server endpoints

Current configured project ID:

```txt
mwcxiswfwubiljuoctyy
```

Relevant edge functions:

- `financial-summary`
- `financial-advisor`
- `chat-completion`

## Safety and positioning

FinWise should be positioned as an educational and financial guidance product.

It is not:

- a licensed financial advisor
- a brokerage
- a tax filing platform
- a tool for direct trading or portfolio execution

Important product boundaries:

- no guaranteed returns
- no legally binding tax or investment advice
- no direct buy/sell recommendations for specific securities in the MVP
- encourage consultation with licensed professionals for major decisions

## Design direction

FinWise should feel:

- trustworthy
- modern
- premium but accessible
- calm and non-intimidating
- data-rich without becoming overwhelming

Brand palette in the current direction:

- Dark Void: `#16151A`
- Liquid Lova: `#F67011`
- Gloun Lova: `#873800`
- Slate Grey: `#262626`
- Dusty Grey: `#878787`
- Marigold: `#FFE4D0`

## Near-term roadmap

1. Normalize the app foundation and shared types
2. Expand the data model beyond a single financial profile
3. Rework onboarding to collect richer structured financial data
4. Build a real financial health score and next-best-action engine
5. Add goal planner workflows
6. Add debt advisor workflows
7. Reconnect the AI assistant safely through Edge Functions
8. Add education mode and investment insights
9. Add proactive nudges and automation hooks

## Why this repo exists

This project is being developed as both:

- an MVP for an AI-native personal finance product
- a strong demo of LLM-driven guidance beyond basic chat

The long-term aim is to validate whether users want affordable AI-based financial coaching that is personalized, contextual, and continuous.
