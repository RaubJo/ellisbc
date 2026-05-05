# Ellis Baptist Church's Website

## Environment

Local development expects these values in `.env`:

`CHURCHTRAC_CALENDAR_FEED`
`VITE_APP_TIMEZONE`
`YOUTUBE_API_KEY`

The watch page does not read `google-services.json`. It uses `YOUTUBE_API_KEY` at runtime.

For deployed Cloudflare Workers, configure the YouTube key as an environment-specific secret for each worker environment:

```bash
bunx wrangler secret put YOUTUBE_API_KEY -e preview
bunx wrangler secret put YOUTUBE_API_KEY -e production
```

`wrangler.jsonc` declares `YOUTUBE_API_KEY` as a required secret, so future deploys should fail fast if it is missing.

# Churchtrac

## Calendar Feed

Calendar feed url: `https://www.churchtrac.com/ical?ui=<id>`. This is in iCal format.

Linking to events uses this url with the first 6 characters of the event id found in the feed

`https://ellisbc.churchtrac.com/em?ei=<eventid>`

If the event has registration then this will link to the page. If there is no registration it will show an error.
