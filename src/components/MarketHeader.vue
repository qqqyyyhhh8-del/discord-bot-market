<script setup>
const props = defineProps({
  marketIndex: {
    type: Object,
    default: null,
  },
  stats: {
    type: Object,
    required: true,
  },
  updatedLabel: {
    type: String,
    required: true,
  },
  submitUrl: {
    type: String,
    default: '',
  },
  siteUrl: {
    type: String,
    default: '',
  },
  rawIndexUrl: {
    type: String,
    required: true,
  },
})

const summaryItems = [
  { key: 'total', label: 'Plugins' },
  { key: 'official', label: 'Official' },
  { key: 'verified', label: 'Verified' },
  { key: 'tags', label: 'Tags' },
]
</script>

<template>
  <header class="hero-card">
    <div class="hero-copy">
      <p class="eyebrow">Discord Bot Plugin Market</p>
      <h1>{{ props.marketIndex?.title || 'A static market for Git-powered plugins.' }}</h1>
      <p class="hero-description">
        {{
          props.marketIndex?.description ||
          'Store GitHub plugin metadata once, then let both the website and the Discord bot read the same source of truth.'
        }}
      </p>
      <p class="hero-description hero-description--muted">
        White/black visual system. Vue front end. GitHub Pages deploy. Human-readable install data for the host.
      </p>

      <div class="hero-actions">
        <a
          v-if="props.submitUrl"
          class="hero-button hero-button--solid"
          :href="props.submitUrl"
          target="_blank"
          rel="noreferrer"
        >
          Submit Plugin
        </a>
        <a
          v-if="props.siteUrl"
          class="hero-button hero-button--ghost"
          :href="props.siteUrl"
          target="_blank"
          rel="noreferrer"
        >
          Open Pages
        </a>
        <a class="hero-button hero-button--ghost" :href="props.rawIndexUrl" target="_blank" rel="noreferrer">
          View index.json
        </a>
      </div>
    </div>

    <div class="hero-panel">
      <div class="hero-panel__topline">
        <span>Readable by bot</span>
        <span>Updated {{ props.updatedLabel }}</span>
      </div>
      <div class="stats-grid">
        <article v-for="item in summaryItems" :key="item.key" class="stat-card">
          <p class="stat-card__value">{{ props.stats[item.key] }}</p>
          <p class="stat-card__label">{{ item.label }}</p>
        </article>
      </div>
      <div class="hero-panel__note">
        <p class="hero-panel__label">Host wiring</p>
        <code>{{ props.rawIndexUrl }}</code>
      </div>
    </div>
  </header>
</template>

