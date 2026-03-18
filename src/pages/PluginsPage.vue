<script setup>
import { computed, inject, ref, watch } from 'vue'
import MarketplaceToolbar from '../components/MarketplaceToolbar.vue'
import PaginationBar from '../components/PaginationBar.vue'
import PluginGrid from '../components/PluginGrid.vue'

const pageSize = 6
const site = inject('siteContext')
const search = ref('')
const filter = ref('all')
const page = ref(1)

const copy = computed(() => site.copy.value)
const locale = computed(() => site.locale.value)
const allPlugins = computed(() => site.allPlugins.value)

const filteredPlugins = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  return allPlugins.value.filter((plugin) => {
    if (filter.value === 'official' && !plugin.official) {
      return false
    }
    if (filter.value === 'verified' && !plugin.verified) {
      return false
    }
    if (!keyword) {
      return true
    }
    const haystack = [
      plugin.id,
      plugin.name,
      plugin.name_zh,
      plugin.description,
      plugin.description_zh,
      plugin.author,
      plugin.min_host_version,
      ...(plugin.tags ?? []),
      ...(plugin.capabilities ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(keyword)
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPlugins.value.length / pageSize)))
const pagedPlugins = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredPlugins.value.slice(start, start + pageSize)
})

watch([search, filter], () => {
  page.value = 1
})

watch(totalPages, (value) => {
  if (page.value > value) {
    page.value = value
  }
})

function setPage(nextPage) {
  page.value = Math.min(totalPages.value, Math.max(1, nextPage))
}
</script>

<template>
  <section class="page-stack">
    <MarketplaceToolbar
      v-model:search="search"
      v-model:filter="filter"
      :results="filteredPlugins.length"
      :total="allPlugins.length"
      :copy="copy.toolbar"
    />

    <PluginGrid
      :plugins="pagedPlugins"
      :loading="site.loading.value"
      :load-error="site.loadError.value"
      :copy="copy.grid"
      :card-copy="copy.card"
      :locale="locale"
      @copy-install="site.copyInstallPayload"
    />

    <PaginationBar
      :copy="copy.pagination"
      :current-page="page"
      :total-pages="totalPages"
      @change="setPage"
    />
  </section>
</template>
