import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/agents',
    name: 'agents',
    component: () => import('@/views/AgentManager.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/TeamWorkspace.vue')
  },
  {
    path: '/workflow',
    name: 'workflow',
    component: () => import('@/views/iFlowBuilder.vue')
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    component: () => import('@/views/KnowledgeGraph.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router