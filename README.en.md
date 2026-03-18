# Discord Bot Plugin Market

[简体中文](README.md) | [English](README.en.md)

This repository contains the static plugin market frontend for the `discord-` host. It is built with Vue 3 + Vite and deployed to GitHub Pages.

The goals are intentionally simple:
- Store GitHub plugin links and metadata only.
- Provide a human-facing market homepage plus a machine-readable `index.json`.
- Let the bot host read the same index through `PLUGIN_MARKET_INDEX_URL` so the `/plugin` panel can preview the market and link out to it.

## Repository Layout

- `public/index.json`: shared market index for both web and bot.
- `src/`: Vue frontend source.
- `src/styles/*.css`: separated CSS files.
- `.github/ISSUE_TEMPLATE/plugin-submission.yml`: plugin submission form.
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.

## Local Development

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

## Submission Flow

GitHub Pages does not provide a writable backend, so the practical way to let everyone submit plugins is:

1. Publish the plugin in a public GitHub repository.
2. Open the `Plugin Submission` issue form with repo/ref/path metadata.
3. After review, a maintainer adds the entry to `public/index.json`.

This keeps the market Git-link-only while still giving the bot a stable index to consume.

## Bot Integration

Configure the host with:

```env
PLUGIN_MARKET_INDEX_URL=https://qqqyyyhhh8-del.github.io/discord-bot-market/index.json
```

Once configured, the main bot repository reads this index inside the `/plugin` panel and exposes market summary plus external links.

## License

This repository uses the [MIT License](LICENSE).

