<script setup>
const props = defineProps({
  search: {
    type: String,
    default: '',
  },
  filter: {
    type: String,
    default: 'all',
  },
  results: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:search', 'update:filter'])

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'official', label: 'Official' },
  { value: 'verified', label: 'Verified' },
]
</script>

<template>
  <section class="toolbar-card">
    <div class="toolbar-copy">
      <p class="eyebrow">Directory</p>
      <h2>Filter what the host can install from Git.</h2>
      <p class="toolbar-note">
        Search by name, author, tag, capability, host version, or plugin ID.
      </p>
    </div>

    <div class="toolbar-controls">
      <label class="search-field">
        <span>Search</span>
        <input
          :value="props.search"
          type="search"
          placeholder="official, worldbook, plugin.storage..."
          @input="emit('update:search', $event.target.value)"
        />
      </label>

      <div class="filter-pills" role="tablist" aria-label="Plugin filters">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': props.filter === option.value }"
          @click="emit('update:filter', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div class="toolbar-results">
      <span>{{ props.results }} shown</span>
      <span>{{ props.total }} indexed</span>
    </div>
  </section>
</template>

