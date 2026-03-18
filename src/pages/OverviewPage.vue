<script setup>
import { computed, inject } from 'vue'

const site = inject('siteContext')
const copy = computed(() => site.copy.value)
const previewPlugins = computed(() => site.previewPlugins.value)
const locale = computed(() => site.locale.value)
</script>

<template>
  <section class="page-stack">
    <section class="section-intro">
      <p class="eyebrow">{{ copy.overview.eyebrow }}</p>
      <h2>{{ copy.overview.title }}</h2>
      <p class="section-intro__text">{{ copy.overview.body }}</p>
    </section>

    <div class="page-grid page-grid--two">
      <section class="side-card side-card--inverse">
        <p class="eyebrow">{{ copy.overview.sections.interopEyebrow }}</p>
        <h2>{{ copy.overview.sections.interopTitle }}</h2>
        <p class="side-card__text">{{ copy.overview.sections.interopBody }}</p>
        <div class="code-block">
          <code>PLUGIN_MARKET_INDEX_URL={{ site.rawIndexUrl.value }}</code>
        </div>
      </section>

      <section class="side-card">
        <p class="eyebrow">{{ copy.overview.sections.structureEyebrow }}</p>
        <h2>{{ copy.overview.sections.structureTitle }}</h2>
        <p class="side-card__text">{{ copy.overview.sections.structureBody }}</p>
      </section>

      <section class="side-card">
        <p class="eyebrow">{{ copy.overview.sections.previewEyebrow }}</p>
        <h2>{{ copy.overview.sections.previewTitle }}</h2>
        <p class="side-card__text">{{ copy.overview.sections.previewBody }}</p>
        <ul class="bullet-list bullet-list--tight">
          <li v-for="plugin in previewPlugins" :key="plugin.id">
            {{ locale === 'zh-CN' ? (plugin.name_zh || plugin.name || plugin.id) : (plugin.name || plugin.id) }}
          </li>
        </ul>
        <p class="side-card__text side-card__text--minor">{{ copy.overview.sections.previewMore }}</p>
      </section>

      <section class="side-card">
        <p class="eyebrow">{{ copy.overview.sections.trustEyebrow }}</p>
        <h2>{{ copy.overview.sections.trustTitle }}</h2>
        <p class="side-card__text">{{ copy.overview.sections.trustBody }}</p>
      </section>
    </div>
  </section>
</template>
