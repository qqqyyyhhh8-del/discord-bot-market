<script setup>
const props = defineProps({
  copy: {
    type: Object,
    required: true,
  },
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

const filterOptions = ['all', 'official', 'verified']
</script>

<template>
  <section class="toolbar-card">
    <div class="toolbar-copy">
      <p class="eyebrow">{{ props.copy.eyebrow }}</p>
      <h2>{{ props.copy.title }}</h2>
      <p class="toolbar-note">{{ props.copy.note }}</p>
    </div>

    <div class="toolbar-controls">
      <label class="search-field">
        <span>{{ props.copy.search }}</span>
        <input
          :value="props.search"
          type="search"
          :placeholder="props.copy.placeholder"
          @input="emit('update:search', $event.target.value)"
        />
      </label>

      <div class="filter-pills" role="tablist" :aria-label="props.copy.filterAria">
        <button
          v-for="option in filterOptions"
          :key="option"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': props.filter === option }"
          @click="emit('update:filter', option)"
        >
          {{ props.copy.filters[option] }}
        </button>
      </div>
    </div>

    <div class="toolbar-results">
      <span>{{ props.results }} {{ props.copy.shown }}</span>
      <span>{{ props.total }} {{ props.copy.indexed }}</span>
    </div>
  </section>
</template>
