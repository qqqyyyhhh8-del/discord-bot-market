<script setup>
import PluginCard from './PluginCard.vue'

const props = defineProps({
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
      <p class="eyebrow">Loading</p>
      <h2>Fetching plugin index...</h2>
      <p>The site is reading the shared static JSON index.</p>
    </div>

    <div v-else-if="props.loadError" class="empty-panel empty-panel--error">
      <p class="eyebrow">Read Failed</p>
      <h2>Could not load the market index.</h2>
      <p>{{ props.loadError }}</p>
    </div>

    <div v-else-if="props.plugins.length === 0" class="empty-panel">
      <p class="eyebrow">No Match</p>
      <h2>No plugin matches the current filter.</h2>
      <p>Try a wider search term or switch back to the full list.</p>
    </div>

    <div v-else class="plugin-grid">
      <PluginCard
        v-for="plugin in props.plugins"
        :key="plugin.id"
        :plugin="plugin"
        @copy-install="emit('copy-install', plugin)"
      />
    </div>
  </section>
</template>

