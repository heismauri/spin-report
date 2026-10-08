# Spin Report

A [Next.js 15](https://nextjs.org) + TypeScript web app that generates a music listening report for a given username, pulling data from [stats.fm](https://stats.fm) or [Last.fm](https://www.last.fm). Built with Tailwind CSS v4 and deployed to [Cloudflare Workers](https://workers.cloudflare.com).

Live at **[spinreport.heismauri.com](https://spinreport.heismauri.com)**

## What it does

Enter a username and pick a date range to get a snapshot of your listening activity:

- **Top 5 tracks, artists, and albums** with play counts
- **Stream stats**: total streams, unique tracks, unique artists, and minutes listened (stats.fm only)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
pnpm deploy
```

This builds the static site and publishes it to Cloudflare Workers using Wrangler.
