<script setup>
import { computed, inject } from 'vue'

const site = inject('siteContext')
const copy = computed(() => site.copy.value)
</script>

<template>
  <section class="page-stack">
    <section class="section-intro">
      <p class="eyebrow">{{ copy.submit.eyebrow }}</p>
      <h2>{{ copy.submit.title }}</h2>
      <p class="section-intro__text">{{ copy.submit.body }}</p>
    </section>

    <div class="page-grid page-grid--two">
      <section class="side-card">
        <p class="eyebrow">{{ copy.submit.flowTitle }}</p>
        <h2>{{ copy.submit.flowTitle }}</h2>
        <ol class="steps-list">
          <li v-for="step in copy.submit.flow" :key="step">{{ step }}</li>
        </ol>
      </section>

      <section class="side-card side-card--inverse">
        <p class="eyebrow">{{ copy.submit.rulesTitle }}</p>
        <h2>{{ copy.submit.rulesTitle }}</h2>
        <ul class="bullet-list bullet-list--light">
          <li v-for="item in copy.submit.rules" :key="item">{{ item }}</li>
        </ul>
        <div class="link-row">
          <a
            v-if="site.submitUrl.value"
            class="ghost-link ghost-link--light"
            :href="site.submitUrl.value"
            target="_blank"
            rel="noreferrer"
          >
            {{ copy.submit.actions.submit }}
          </a>
          <a class="ghost-link ghost-link--light" :href="site.marketRepoURL.value" target="_blank" rel="noreferrer">
            {{ copy.submit.actions.repo }}
          </a>
        </div>
      </section>
    </div>
  </section>
</template>
