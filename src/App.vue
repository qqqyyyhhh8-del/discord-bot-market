<script setup>
import { computed, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MarketHeader from './components/MarketHeader.vue'
import SidebarNav from './components/SidebarNav.vue'

const viewIDs = ['overview', 'plugins', 'integration', 'submit']

const translations = {
  'zh-CN': {
    siteName: 'Discord Bot 插件市场',
    pageTitle: '插件市场',
    hero: {
      eyebrow: 'Discord Bot Plugin Market',
      titleFallback: 'Git 驱动的插件市场。',
      descriptionFallback: '同一份插件索引，同时服务网页目录和 bot 的 /plugin 面板。',
      muted: '默认中文，支持中英切换。左侧侧边栏负责语言和页面导航，右侧内容按独立页面分开展示。',
      submit: '提交插件',
      openPages: '打开站点',
      viewIndex: '查看 index.json',
      readable: 'Bot 可读取',
      updatedPrefix: '更新时间',
      hostWiring: 'Bot 配置',
      stats: {
        total: '插件数',
        official: '官方',
        verified: '已验证',
        tags: '标签数',
      },
    },
    sidebar: {
      label: '侧边导航',
      language: '语言',
      pages: '页面',
      links: '外链',
      openMenu: '打开侧边栏',
      closeMenu: '关闭侧边栏',
      rawIndex: '原始索引',
      siteHome: '站点主页',
      submit: '提交入口',
      updated: '最后更新',
      viewLabels: {
        overview: { title: '市场总览', note: '站点与索引结构' },
        plugins: { title: '插件目录', note: '分页浏览和筛选插件' },
        integration: { title: 'Bot 接入', note: '环境变量与安装方式' },
        submit: { title: '上架流程', note: '如何提交到市场' },
      },
    },
    toolbar: {
      eyebrow: '插件目录',
      title: '按宿主可安装的维度筛选插件。',
      note: '可以按名称、作者、标签、能力、最低宿主版本或插件 ID 搜索。',
      search: '搜索',
      filterAria: '插件筛选',
      placeholder: 'persona、worldbook、plugin.storage...',
      shown: '显示',
      indexed: '已收录',
      filters: {
        all: '全部',
        official: '官方',
        verified: '已验证',
      },
    },
    grid: {
      loadingEyebrow: '读取中',
      loadingTitle: '正在加载插件索引...',
      loadingText: '站点正在读取共享的静态 JSON 索引。',
      errorEyebrow: '读取失败',
      errorTitle: '市场索引加载失败。',
      emptyEyebrow: '无结果',
      emptyTitle: '当前筛选没有匹配插件。',
      emptyText: '尝试更宽的关键字，或切回全部列表。',
    },
    card: {
      official: '官方',
      verified: '已验证',
      author: '作者',
      minHost: '最低宿主',
      repo: '仓库',
      ref: 'Ref',
      path: '路径',
      unknown: '未知',
      copy: '复制安装字段',
      open: '打开源码',
    },
    pagination: {
      previous: '上一页',
      next: '下一页',
      page: '第 {page} 页',
      summary: '第 {current} / {total} 页',
    },
    toast: {
      copySuccess: (name) => `已复制 ${name} 的安装字段。`,
      copyFail: (name) => `复制 ${name} 的安装字段失败。`,
    },
    overview: {
      eyebrow: '市场总览',
      title: '一个 JSON 索引，连接两个入口。',
      body: 'GitHub Pages 负责展示和分发静态 index.json，bot 通过同一个地址读取市场摘要，在 /plugin 面板里显示预览和外链。',
      sections: {
        interopEyebrow: 'Bot 联动',
        interopTitle: '网页和 bot 共用同一份索引。',
        interopBody: '市场不负责托管二进制或插件包，只记录 GitHub 地址、Ref、路径与元数据。这样网页展示和 bot 安装入口都能以 Git 为准。',
        structureEyebrow: '结构设计',
        structureTitle: '现在是独立页面，不再是单组件假分页。',
        structureBody: '站点已经拆成四个独立路由页面，左侧导航切换的是实际页面视图；插件目录页内部再做列表分页。',
        previewEyebrow: '当前预览',
        previewTitle: '市场中最先看到的插件。',
        previewBody: '默认优先显示官方与已验证插件，便于管理员快速识别可直接接入的扩展。',
        previewMore: '更多插件请切到“插件目录”。',
        trustEyebrow: '分发原则',
        trustTitle: '站点只负责索引，不接管安装权。',
        trustBody: '真正的安装仍然发生在 bot 的插件管理面板里，由超级管理员决定是否安装、升级或移除。',
      },
    },
    integration: {
      eyebrow: 'Bot 接入',
      title: '把市场接到宿主里，只需要一条环境变量。',
      body: '宿主读取 `PLUGIN_MARKET_INDEX_URL` 后，/plugin 面板会显示市场概览和市场入口按钮。网页上的插件卡片则负责把 repo/ref/path 直接展示给管理员。',
      envTitle: '环境变量',
      envBody: '把下面这一行写进 bot 的 `.env`。',
      installTitle: '管理员的安装动作',
      installSteps: [
        '在网页里找到插件，复制安装字段。',
        '进入 bot 的 `/plugin` 管理面板。',
        '点击“安装”，把 repo / ref / path 粘进去。',
        '安装完成后由宿主刷新 Slash 命令和能力检查。',
      ],
      limitsTitle: '职责边界',
      limitsItems: [
        '市场只存 GitHub 链接和元数据，不保存插件打包文件。',
        '插件是否允许安装、能否启用，最终仍由宿主决定。',
        '能力权限依旧由 bot 宿主做校验，不下放给网页。',
      ],
      links: {
        rawIndex: '查看原始索引',
        submit: '打开提交入口',
      },
    },
    submit: {
      eyebrow: '上架流程',
      title: 'GitHub Pages 没有后端，所以提交流程必须可审计。',
      body: '最稳妥的做法是：任何人都可以提交插件元数据，但写入 `public/index.json` 的动作仍然通过仓库审查完成。',
      flowTitle: '提交流程',
      flow: [
        '先把插件发布到公开的 GitHub 仓库。',
        '打开市场仓库里的 Plugin Submission 表单。',
        '填写 repo、ref、path、能力、标签、最低宿主版本等信息。',
        '维护者审核后，把条目加入 `public/index.json`。',
        'GitHub Pages 自动部署，网页和 bot 同时读取到新条目。',
      ],
      rulesTitle: '建议规则',
      rules: [
        '优先填写稳定分支或发布 tag，不建议直接写临时开发分支。',
        '`path` 应该精确指向插件目录，而不是整个 monorepo 根目录。',
        '能力声明要尽量准确，避免管理员误判插件风险。',
      ],
      actions: {
        submit: '打开提交流程',
        repo: '打开市场仓库',
      },
    },
  },
  en: {
    siteName: 'Discord Bot Plugin Market',
    pageTitle: 'Plugin Market',
    hero: {
      eyebrow: 'Discord Bot Plugin Market',
      titleFallback: 'A Git-powered plugin market.',
      descriptionFallback: 'One shared plugin index for both the website and the bot /plugin panel.',
      muted: 'Chinese is the default language. The sidebar now switches real routed pages instead of a single-component fake split view.',
      submit: 'Submit Plugin',
      openPages: 'Open Pages',
      viewIndex: 'View index.json',
      readable: 'Readable by bot',
      updatedPrefix: 'Updated',
      hostWiring: 'Bot wiring',
      stats: {
        total: 'Plugins',
        official: 'Official',
        verified: 'Verified',
        tags: 'Tags',
      },
    },
    sidebar: {
      label: 'Sidebar',
      language: 'Language',
      pages: 'Pages',
      links: 'Links',
      openMenu: 'Open sidebar',
      closeMenu: 'Close sidebar',
      rawIndex: 'Raw index',
      siteHome: 'Site home',
      submit: 'Submit form',
      updated: 'Updated',
      viewLabels: {
        overview: { title: 'Overview', note: 'Site and index structure' },
        plugins: { title: 'Plugins', note: 'Paged browsing and filters' },
        integration: { title: 'Bot Integration', note: 'Env var and install flow' },
        submit: { title: 'Submission', note: 'How entries reach the market' },
      },
    },
    toolbar: {
      eyebrow: 'Plugin Directory',
      title: 'Filter plugins by what the host can actually install.',
      note: 'Search by name, author, tag, capability, minimum host version, or plugin ID.',
      search: 'Search',
      filterAria: 'Plugin filters',
      placeholder: 'persona, worldbook, plugin.storage...',
      shown: 'shown',
      indexed: 'indexed',
      filters: {
        all: 'All',
        official: 'Official',
        verified: 'Verified',
      },
    },
    grid: {
      loadingEyebrow: 'Loading',
      loadingTitle: 'Fetching plugin index...',
      loadingText: 'The site is reading the shared static JSON index.',
      errorEyebrow: 'Read Failed',
      errorTitle: 'Could not load the market index.',
      emptyEyebrow: 'No Match',
      emptyTitle: 'No plugin matches the current filter.',
      emptyText: 'Try a wider search term or switch back to the full list.',
    },
    card: {
      official: 'Official',
      verified: 'Verified',
      author: 'Author',
      minHost: 'Min host',
      repo: 'Repo',
      ref: 'Ref',
      path: 'Path',
      unknown: 'Unknown',
      copy: 'Copy install fields',
      open: 'Open source',
    },
    pagination: {
      previous: 'Previous',
      next: 'Next',
      page: 'Page {page}',
      summary: 'Page {current} / {total}',
    },
    toast: {
      copySuccess: (name) => `Copied install fields for ${name}.`,
      copyFail: (name) => `Clipboard failed for ${name}.`,
    },
    overview: {
      eyebrow: 'Overview',
      title: 'One JSON index, two entry points.',
      body: 'GitHub Pages renders and serves the static index.json, while the bot reads the same URL to preview the market inside /plugin.',
      sections: {
        interopEyebrow: 'Bot Interop',
        interopTitle: 'The website and the bot read the same index.',
        interopBody: 'The market stores GitHub URLs, refs, paths, and metadata only. That keeps the web catalog and the bot install surface aligned around Git.',
        structureEyebrow: 'Structure',
        structureTitle: 'These are real pages now, not fake pagination.',
        structureBody: 'The site is now split into routed pages, and the Plugins page also adds real card pagination.',
        previewEyebrow: 'Preview',
        previewTitle: 'The first plugins the admin will see.',
        previewBody: 'Official and verified entries stay front-loaded so admins can identify safer extensions quickly.',
        previewMore: 'Switch to "Plugins" for the full catalog.',
        trustEyebrow: 'Distribution Policy',
        trustTitle: 'The site indexes plugins but does not install them.',
        trustBody: 'Actual installation still happens inside the bot plugin panel, controlled by the host and super admins.',
      },
    },
    integration: {
      eyebrow: 'Bot Integration',
      title: 'Wiring the market into the host takes one env var.',
      body: 'Once the host reads `PLUGIN_MARKET_INDEX_URL`, the /plugin panel can show market summary plus external market links. The website cards expose repo/ref/path for admins to paste.',
      envTitle: 'Environment variable',
      envBody: 'Write this into the bot `.env` file.',
      installTitle: 'What the admin does',
      installSteps: [
        'Find a plugin on the site and copy its install fields.',
        'Open the bot `/plugin` management panel.',
        'Click Install and paste repo / ref / path.',
        'Let the host refresh slash commands and capability checks.',
      ],
      limitsTitle: 'Responsibility split',
      limitsItems: [
        'The market stores GitHub links and metadata only, not packaged plugin files.',
        'The host still decides whether a plugin can be installed or enabled.',
        'Capability enforcement remains on the bot side, not the website.',
      ],
      links: {
        rawIndex: 'Open raw index',
        submit: 'Open submission form',
      },
    },
    submit: {
      eyebrow: 'Submission',
      title: 'GitHub Pages has no backend, so the flow must stay reviewable.',
      body: 'The practical model is open submission plus repository review. Anyone can propose metadata, but `public/index.json` changes still land through Git review.',
      flowTitle: 'Submission flow',
      flow: [
        'Publish the plugin in a public GitHub repository.',
        'Open the Plugin Submission form in the market repo.',
        'Fill repo, ref, path, capabilities, tags, and minimum host version.',
        'After review, a maintainer adds the entry to `public/index.json`.',
        'GitHub Pages deploys and both the website and the bot read the new entry.',
      ],
      rulesTitle: 'Recommended rules',
      rules: [
        'Prefer stable branches or tags over temporary development refs.',
        'Point `path` at the actual plugin directory, not the monorepo root.',
        'Declare capabilities accurately so admins can assess plugin risk.',
      ],
      actions: {
        submit: 'Open submission form',
        repo: 'Open market repo',
      },
    },
  },
}

const route = useRoute()
const marketIndex = ref(null)
const loading = ref(true)
const loadError = ref('')
const toast = ref('')
const locale = ref('zh-CN')
const drawerOpen = ref(false)
const isMobile = ref(false)
let toastTimer = null

const copy = computed(() => translations[locale.value] ?? translations['zh-CN'])
const currentView = computed(() => (viewIDs.includes(String(route.name)) ? String(route.name) : 'overview'))
const navItems = computed(() =>
  viewIDs.map((id) => ({
    id,
    to: { name: id },
    title: copy.value.sidebar.viewLabels[id].title,
    note: copy.value.sidebar.viewLabels[id].note,
  })),
)
const activeViewLabel = computed(() => copy.value.sidebar.viewLabels[currentView.value]?.title || copy.value.pageTitle)
const allPlugins = computed(() => marketIndex.value?.plugins ?? [])
const previewPlugins = computed(() => allPlugins.value.slice(0, 3))
const marketRepoURL = computed(() => 'https://github.com/qqqyyyhhh8-del/discord-bot-market')
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
    return locale.value === 'zh-CN' ? '未知' : 'Unknown'
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat(locale.value === 'zh-CN' ? 'zh-CN' : 'en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsed)
})
const heroTitle = computed(() => {
  if (locale.value === 'zh-CN') {
    return localizedIndexValue(marketIndex.value, 'title') || copy.value.hero.titleFallback
  }
  return marketIndex.value?.title?.trim() || copy.value.hero.titleFallback
})
const heroDescription = computed(() => {
  if (locale.value === 'zh-CN') {
    return localizedIndexValue(marketIndex.value, 'description') || copy.value.hero.descriptionFallback
  }
  return marketIndex.value?.description?.trim() || copy.value.hero.descriptionFallback
})

function localizedIndexValue(target, key) {
  if (!target || locale.value !== 'zh-CN') {
    return ''
  }
  const localized = target[`${key}_zh`]
  return typeof localized === 'string' ? localized.trim() : ''
}

function syncDocumentMeta() {
  if (typeof document === 'undefined') {
    return
  }
  document.documentElement.lang = locale.value === 'zh-CN' ? 'zh-CN' : 'en'
  document.title = `${copy.value.siteName} · ${activeViewLabel.value}`
}

function setLocale(nextLocale) {
  if (!translations[nextLocale]) {
    return
  }
  locale.value = nextLocale
}

function syncViewportState() {
  if (typeof window === 'undefined') {
    return
  }
  isMobile.value = window.innerWidth <= 980
  if (!isMobile.value) {
    drawerOpen.value = false
  }
}

function openDrawer() {
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

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
  const name = locale.value === 'zh-CN' ? plugin.name_zh || plugin.name || plugin.id : plugin.name || plugin.id
  try {
    await navigator.clipboard.writeText(lines.join('\n'))
    showToast(copy.value.toast.copySuccess(name))
  } catch (error) {
    showToast(copy.value.toast.copyFail(name))
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

provide('siteContext', {
  copy,
  locale,
  allPlugins,
  previewPlugins,
  loading,
  loadError,
  rawIndexUrl,
  submitUrl,
  siteUrl,
  updatedLabel,
  marketRepoURL,
  copyInstallPayload,
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    const storedLocale = window.localStorage.getItem('market-locale')
    if (translations[storedLocale]) {
      locale.value = storedLocale
    }
    syncViewportState()
    window.addEventListener('resize', syncViewportState)
  }
  syncDocumentMeta()
  loadMarketIndex()
})

watch(locale, (value) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('market-locale', value)
  }
  syncDocumentMeta()
})

watch(currentView, () => {
  syncDocumentMeta()
})

watch(drawerOpen, (value) => {
  if (typeof document === 'undefined') {
    return
  }
  if (value && isMobile.value) {
    document.body.style.overflow = 'hidden'
    return
  }
  document.body.style.overflow = ''
})

onBeforeUnmount(() => {
  if (toastTimer !== null) {
    window.clearTimeout(toastTimer)
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', syncViewportState)
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="mobile-topbar">
    <button type="button" class="mobile-topbar__menu" :aria-label="copy.sidebar.openMenu" @click="openDrawer">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="mobile-topbar__copy">
      <p class="mobile-topbar__eyebrow">{{ copy.siteName }}</p>
      <strong>{{ activeViewLabel }}</strong>
    </div>
  </div>

  <transition name="drawer-fade">
    <button
      v-if="drawerOpen && isMobile"
      type="button"
      class="sidebar-backdrop"
      :aria-label="copy.sidebar.closeMenu"
      @click="closeDrawer"
    ></button>
  </transition>

  <div class="page-shell page-shell--sidebar">
    <div class="sidebar-rail" :class="{ 'sidebar-rail--open': drawerOpen }">
      <SidebarNav
        :copy="copy"
        :locale="locale"
        :nav-items="navItems"
        :current-view="currentView"
        :updated-label="updatedLabel"
        :site-url="siteUrl"
        :submit-url="submitUrl"
        :raw-index-url="rawIndexUrl"
        :show-close-button="isMobile"
        @set-locale="setLocale"
        @close="closeDrawer"
      />
    </div>

    <div class="surface-shell">
      <MarketHeader
        :copy="copy.hero"
        :title="heroTitle"
        :description="heroDescription"
        :stats="stats"
        :submit-url="submitUrl"
        :site-url="siteUrl"
        :raw-index-url="rawIndexUrl"
        :updated-label="updatedLabel"
      />

      <main class="content-stack">
        <RouterView />
      </main>
    </div>

    <transition name="toast-fade">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </transition>
  </div>
</template>
