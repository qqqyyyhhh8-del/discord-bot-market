<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MarketHeader from './components/MarketHeader.vue'
import MarketplaceToolbar from './components/MarketplaceToolbar.vue'
import PluginGrid from './components/PluginGrid.vue'

const marketIndex = ref(null)
const loading = ref(true)
const loadError = ref('')
const search = ref('')
const filter = ref('all')
const toast = ref('')
let toastTimer = null

const allPlugins = computed(() => marketIndex.value?.plugins ?? [])
const stats = computed(() => {
  const plugins = allPlugins.value
  const tags = new Set()
  plugins.forEach((plugin) => {
    ;(plugin.tags ?? []).forEach((tag) => tags.add(tag))
  })
  return {
    total: plugins.length,
    official: plugins.filter((plugin) => plugin.official).length,
    verified: plugins.filter((plugin) => plugin.verified).length,
    tags: tags.size,
  }
})

const rawIndexUrl = computed(() => {
  const explicit = marketIndex.value?.index_url?.trim()
  if (explicit) {
    return explicit
  }
  return `${window.location.origin}${import.meta.env.BASE_URL}index.json`
})

const submitUrl = computed(() => marketIndex.value?.submit_url?.trim() ?? '')
const siteUrl = computed(() => marketIndex.value?.site_url?.trim() ?? '')

const updatedLabel = computed(() => {
  const value = marketIndex.value?.updated_at?.trim()
  if (!value) {
    return 'Unknown'
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
})

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
      plugin.description,
      plugin.author,
      plugin.min_host_version,
      ...(plugin.tags ?? []),
      ...(plugin.capabilities ?? []),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(keyword)
  })
})

function showToast(message) {
  if (toastTimer !== null) {
    window.clearTimeout(toastTimer)
  }
  toast.value = message
  toastTimer = window.setTimeout(() => {
    toast.value = ''
    toastTimer = null
  }, 2200)
}

async function copyInstallPayload(plugin) {
  const lines = [
    `repo=${plugin.repo}`,
    `ref=${plugin.ref || 'main'}`,
    `path=${plugin.path || ''}`,
  ]
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    showToast(`Copied install fields for ${plugin.name || plugin.id}.`)
  } catch (error) {
    showToast(`Clipboard failed for ${plugin.name || plugin.id}.`)
  }
}

async function loadMarketIndex() {
  loading.value = true
  loadError.value = ''
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}index.json`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`)
    }
    marketIndex.value = await response.json()
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMarketIndex()
})

onBeforeUnmount(() => {
  if (toastTimer !== null) {
    window.clearTimeout(toastTimer)
  }
})
</script>

<template>
  <div class="page-shell">
    <MarketHeader
      :market-index="marketIndex"
      :stats="stats"
      :updated-label="updatedLabel"
      :submit-url="submitUrl"
      :site-url="siteUrl"
      :raw-index-url="rawIndexUrl"
    />

    <main class="page-main">
      <section class="content-column">
        <MarketplaceToolbar
          v-model:search="search"
          v-model:filter="filter"
          :results="filteredPlugins.length"
          :total="allPlugins.length"
        />
        <PluginGrid
          :plugins="filteredPlugins"
          :loading="loading"
          :load-error="loadError"
          @copy-install="copyInstallPayload"
        />
      </section>

      <aside class="side-column">
        <section class="side-card side-card--inverse">
          <p class="eyebrow">Bot Interop</p>
          <h2>One JSON index, two surfaces.</h2>
          <p class="side-card__text">
            GitHub Pages serves a static <code>index.json</code>. The bot reads the same file through
            <code>PLUGIN_MARKET_INDEX_URL</code>, so the web catalog and the <code>/plugin</code> panel stay aligned.
          </p>
          <div class="code-block">
            <code>PLUGIN_MARKET_INDEX_URL={{ rawIndexUrl }}</code>
          </div>
          <div class="link-row">
            <a class="ghost-link ghost-link--light" :href="rawIndexUrl" target="_blank" rel="noreferrer">
              Raw index
            </a>
            <a
              v-if="siteUrl"
              class="ghost-link ghost-link--light"
              :href="siteUrl"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Pages
            </a>
          </div>
        </section>

        <section class="side-card">
          <p class="eyebrow">Submit Flow</p>
          <h2>No backend. No mystery.</h2>
          <ol class="steps-list">
            <li>Publish your plugin in a GitHub repository.</li>
            <li>Open the market submission form with repo, ref, path, and metadata.</li>
            <li>After review, the entry lands in <code>public/index.json</code> and becomes visible to both web and bot.</li>
          </ol>
          <a
            v-if="submitUrl"
            class="ghost-link"
            :href="submitUrl"
            target="_blank"
            rel="noreferrer"
          >
            Submit a plugin
          </a>
        </section>

        <section class="side-card">
          <p class="eyebrow">Host Install</p>
          <h2>What the admin pastes into the bot.</h2>
          <p class="side-card__text">
            Every card exposes the Git repo, ref, and path values required by the host install modal.
            The market stores links and metadata only. Actual installation still comes from Git.
          </p>
          <ul class="bullet-list">
            <li>Super admins install or upgrade plugins in the bot panel.</li>
            <li>Admins browse the market, preview capabilities, and copy install fields.</li>
            <li>The host keeps command registration and capability checks on its own side.</li>
          </ul>
        </section>
      </aside>
    </main>

    <transition name="toast-fade">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </div>
</template>

