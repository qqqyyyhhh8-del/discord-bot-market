<script setup>
import { computed } from 'vue'

const props = defineProps({
  copy: {
    type: Object,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['change'])

const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const radius = 2
  const start = Math.max(1, current - radius)
  const end = Math.min(total, current + radius)
  const pages = []
  for (let page = start; page <= end; page += 1) {
    pages.push(page)
  }
  return pages
})

function pageLabel(page) {
  return props.copy.page.replace('{page}', String(page))
}
</script>

<template>
  <nav v-if="props.totalPages > 1" class="pagination-bar" aria-label="Pagination">
    <button
      type="button"
      class="pagination-bar__button"
      :disabled="props.currentPage <= 1"
      @click="emit('change', props.currentPage - 1)"
    >
      {{ props.copy.previous }}
    </button>

    <div class="pagination-bar__pages">
      <button
        v-for="page in visiblePages"
        :key="page"
        type="button"
        class="pagination-bar__page"
        :class="{ 'pagination-bar__page--active': page === props.currentPage }"
        :aria-label="pageLabel(page)"
        @click="emit('change', page)"
      >
        {{ page }}
      </button>
    </div>

    <span class="pagination-bar__summary">
      {{ props.copy.summary.replace('{current}', String(props.currentPage)).replace('{total}', String(props.totalPages)) }}
    </span>

    <button
      type="button"
      class="pagination-bar__button"
      :disabled="props.currentPage >= props.totalPages"
      @click="emit('change', props.currentPage + 1)"
    >
      {{ props.copy.next }}
    </button>
  </nav>
</template>
