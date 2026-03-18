<script setup>
const props = defineProps({
  copy: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  { key: 'total', labelKey: 'total' },
  { key: 'official', labelKey: 'official' },
  { key: 'verified', labelKey: 'verified' },
  { key: 'tags', labelKey: 'tags' },
]
</script>

<template>
  <header class="hero-card">
    <div class="hero-copy">
      <p class="eyebrow">{{ props.copy.eyebrow }}</p>
      <h2 class="hero-title">{{ props.title }}</h2>
      <p class="hero-description">{{ props.description }}</p>
      <p class="hero-description hero-description--muted">{{ props.copy.muted }}</p>

      <div class="hero-actions">
        <a
          v-if="props.submitUrl"
          class="hero-button hero-button--solid"
          :href="props.submitUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ props.copy.submit }}
        </a>
        <a
          v-if="props.siteUrl"
          class="hero-button hero-button--ghost"
          :href="props.siteUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ props.copy.openPages }}
        </a>
        <a class="hero-button hero-button--ghost" :href="props.rawIndexUrl" target="_blank" rel="noreferrer">
          {{ props.copy.viewIndex }}
        </a>
      </div>
    </div>

    <div class="hero-panel">
      <div class="hero-panel__topline">
        <span>{{ props.copy.readable }}</span>
        <span>{{ props.copy.updatedPrefix }} {{ props.updatedLabel }}</span>
      </div>
      <div class="stats-grid">
        <article v-for="item in summaryItems" :key="item.key" class="stat-card">
          <p class="stat-card__value">{{ props.stats[item.key] }}</p>
          <p class="stat-card__label">{{ props.copy.stats[item.labelKey] }}</p>
        </article>
      </div>
      <div class="hero-panel__note">
        <p class="hero-panel__label">{{ props.copy.hostWiring }}</p>
        <code>{{ props.rawIndexUrl }}</code>
      </div>
    </div>
  </header>
</template>
