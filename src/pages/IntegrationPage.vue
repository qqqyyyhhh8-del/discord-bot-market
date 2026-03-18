<script setup>
import { computed, inject } from 'vue'

const site = inject('siteContext')
const copy = computed(() => site.copy.value)
</script>

<template>
  <section class="page-stack">
    <section class="section-intro">
      <p class="eyebrow">{{ copy.integration.eyebrow }}</p>
      <h2>{{ copy.integration.title }}</h2>
      <p class="section-intro__text">{{ copy.integration.body }}</p>
    </section>

    <div class="page-grid page-grid--two">
      <section class="side-card side-card--inverse">
        <p class="eyebrow">{{ copy.integration.envTitle }}</p>
        <h2>{{ copy.integration.envTitle }}</h2>
        <p class="side-card__text">{{ copy.integration.envBody }}</p>
        <div class="code-block">
          <code>PLUGIN_MARKET_INDEX_URL={{ site.rawIndexUrl.value }}</code>
        </div>
        <div class="link-row">
          <a class="ghost-link ghost-link--light" :href="site.rawIndexUrl.value" target="_blank" rel="noreferrer">
            {{ copy.integration.links.rawIndex }}
          </a>
          <a
            v-if="site.submitUrl.value"
            class="ghost-link ghost-link--light"
            :href="site.submitUrl.value"
            target="_blank"
            rel="noreferrer"
          >
            {{ copy.integration.links.submit }}
          </a>
        </div>
      </section>

      <section class="side-card">
        <p class="eyebrow">{{ copy.integration.installTitle }}</p>
        <h2>{{ copy.integration.installTitle }}</h2>
        <ol class="steps-list">
          <li v-for="step in copy.integration.installSteps" :key="step">{{ step }}</li>
        </ol>
      </section>

      <section class="side-card">
        <p class="eyebrow">{{ copy.integration.limitsTitle }}</p>
        <h2>{{ copy.integration.limitsTitle }}</h2>
        <ul class="bullet-list">
          <li v-for="item in copy.integration.limitsItems" :key="item">{{ item }}</li>
        </ul>
      </section>
    </div>
  </section>
</template>
