import { createRouter, createWebHashHistory } from 'vue-router'
import IntegrationPage from './pages/IntegrationPage.vue'
import OverviewPage from './pages/OverviewPage.vue'
import PluginsPage from './pages/PluginsPage.vue'
import SubmitPage from './pages/SubmitPage.vue'

const routes = [
  { path: '/', redirect: '/overview' },
  { path: '/overview', name: 'overview', component: OverviewPage },
  { path: '/plugins', name: 'plugins', component: PluginsPage },
  { path: '/integration', name: 'integration', component: IntegrationPage },
  { path: '/submit', name: 'submit', component: SubmitPage },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
