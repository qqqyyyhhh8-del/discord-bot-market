<script setup>
const props = defineProps({
  plugin: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['copy-install'])
</script>

<template>
  <article class="plugin-card">
    <div class="plugin-card__header">
      <div>
        <p class="plugin-card__id">{{ props.plugin.id }}</p>
        <h3>{{ props.plugin.name }}</h3>
      </div>
      <div class="badge-row">
        <span v-if="props.plugin.official" class="badge badge--dark">Official</span>
        <span v-if="props.plugin.verified" class="badge">Verified</span>
      </div>
    </div>

    <p class="plugin-card__description">{{ props.plugin.description }}</p>

    <dl class="meta-grid">
      <div class="meta-item">
        <dt>Author</dt>
        <dd>{{ props.plugin.author || 'Unknown' }}</dd>
      </div>
      <div class="meta-item">
        <dt>Min host</dt>
        <dd>{{ props.plugin.min_host_version || 'Unknown' }}</dd>
      </div>
      <div class="meta-item meta-item--wide">
        <dt>Repo</dt>
        <dd><code>{{ props.plugin.repo }}</code></dd>
      </div>
      <div class="meta-item">
        <dt>Ref</dt>
        <dd><code>{{ props.plugin.ref || 'main' }}</code></dd>
      </div>
      <div class="meta-item">
        <dt>Path</dt>
        <dd><code>{{ props.plugin.path || '.' }}</code></dd>
      </div>
    </dl>

    <div v-if="props.plugin.tags?.length" class="token-row">
      <span v-for="tag in props.plugin.tags" :key="tag" class="token">#{{ tag }}</span>
    </div>

    <div v-if="props.plugin.capabilities?.length" class="token-row">
      <span
        v-for="capability in props.plugin.capabilities"
        :key="capability"
        class="token token--dark"
      >
        {{ capability }}
      </span>
    </div>

    <div class="card-footer">
      <button type="button" class="hero-button hero-button--solid" @click="emit('copy-install')">
        Copy install fields
      </button>
      <a
        class="hero-button hero-button--ghost"
        :href="props.plugin.homepage || props.plugin.repo"
        target="_blank"
        rel="noreferrer"
      >
        Open source
      </a>
    </div>
  </article>
</template>

