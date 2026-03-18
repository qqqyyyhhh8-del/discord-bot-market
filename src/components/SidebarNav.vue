<script setup>
const props = defineProps({
  copy: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
  navItems: {
    type: Array,
    required: true,
  },
  currentView: {
    type: String,
    required: true,
  },
  updatedLabel: {
    type: String,
    required: true,
  },
  siteUrl: {
    type: String,
    default: '',
  },
  submitUrl: {
    type: String,
    default: '',
  },
  rawIndexUrl: {
    type: String,
    required: true,
  },
  showCloseButton: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['set-view', 'set-locale', 'close'])
</script>

<template>
  <aside class="sidebar-shell">
    <div class="sidebar-card">
      <div class="sidebar-head">
        <div class="sidebar-head__copy">
          <p class="eyebrow">{{ props.copy.sidebar.label }}</p>
          <h1 class="sidebar-title">{{ props.copy.siteName }}</h1>
        </div>
        <button
          v-if="props.showCloseButton"
          type="button"
          class="sidebar-close"
          :aria-label="props.copy.sidebar.closeMenu"
          @click="emit('close')"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <section class="sidebar-group">
        <p class="sidebar-group__label">{{ props.copy.sidebar.language }}</p>
        <div class="locale-switch">
          <button
            type="button"
            class="locale-button"
            :class="{ 'locale-button--active': props.locale === 'zh-CN' }"
            @click="emit('set-locale', 'zh-CN')"
          >
            中文
          </button>
          <button
            type="button"
            class="locale-button"
            :class="{ 'locale-button--active': props.locale === 'en' }"
            @click="emit('set-locale', 'en')"
          >
            EN
          </button>
        </div>
      </section>

      <section class="sidebar-group">
        <p class="sidebar-group__label">{{ props.copy.sidebar.pages }}</p>
        <nav class="sidebar-nav">
          <button
            v-for="item in props.navItems"
            :key="item.id"
            type="button"
            class="sidebar-nav__item"
            :class="{ 'sidebar-nav__item--active': props.currentView === item.id }"
            @click="emit('set-view', item.id)"
          >
            <span class="sidebar-nav__title">{{ item.title }}</span>
            <span class="sidebar-nav__note">{{ item.note }}</span>
          </button>
        </nav>
      </section>

      <section class="sidebar-group">
        <p class="sidebar-group__label">{{ props.copy.sidebar.links }}</p>
        <div class="sidebar-links">
          <a class="sidebar-link" :href="props.rawIndexUrl" target="_blank" rel="noreferrer">
            {{ props.copy.sidebar.rawIndex }}
          </a>
          <a
            v-if="props.siteUrl"
            class="sidebar-link"
            :href="props.siteUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ props.copy.sidebar.siteHome }}
          </a>
          <a
            v-if="props.submitUrl"
            class="sidebar-link"
            :href="props.submitUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ props.copy.sidebar.submit }}
          </a>
        </div>
      </section>

      <section class="sidebar-meta">
        <span>{{ props.copy.sidebar.updated }}</span>
        <strong>{{ props.updatedLabel }}</strong>
      </section>
    </div>
  </aside>
</template>
