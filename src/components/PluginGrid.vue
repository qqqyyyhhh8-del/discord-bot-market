<script setup>
import PluginCard from './PluginCard.vue'

const props = defineProps({
  copy: {
    type: Object,
    required: true,
  },
  cardCopy: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  plugins: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadError: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['copy-install'])
</script>

<template>
  <section class="grid-shell">
    <div v-if="props.loading" class="empty-panel">
      <p class="eyebrow">{{ props.copy.loadingEyebrow }}</p>
      <h2>{{ props.copy.loadingTitle }}</h2>
      <p>{{ props.copy.loadingText }}</p>
    </div>

    <div v-else-if="props.loadError" class="empty-panel empty-panel--error">
      <p class="eyebrow">{{ props.copy.errorEyebrow }}</p>
      <h2>{{ props.copy.errorTitle }}</h2>
      <p>{{ props.loadError }}</p>
    </div>

    <div v-else-if="props.plugins.length === 0" class="empty-panel">
      <p class="eyebrow">{{ props.copy.emptyEyebrow }}</p>
      <h2>{{ props.copy.emptyTitle }}</h2>
      <p>{{ props.copy.emptyText }}</p>
    </div>

    <div v-else class="plugin-grid">
      <PluginCard
        v-for="plugin in props.plugins"
        :key="plugin.id"
        :plugin="plugin"
        :copy="props.cardCopy"
        :locale="props.locale"
        @copy-install="emit('copy-install', plugin)"
      />
    </div>
  </section>
</template>
