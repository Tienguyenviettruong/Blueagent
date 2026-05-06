<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GitBranch,
  Database,
  Settings,
  Sparkles
} from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Agents', icon: Users, path: '/agents' },
  { name: 'Teams', icon: Briefcase, path: '/teams' },
  { name: 'Workflow', icon: GitBranch, path: '/workflow' },
  { name: 'Knowledge', icon: Database, path: '/knowledge' },
  { name: 'Settings', icon: Settings, path: '/settings' }
]

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <aside class="w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
    <div class="p-6 border-b border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue9-500 to-blue9-700 rounded-xl flex items-center justify-center">
          <Sparkles class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-white">blue9</h1>
          <p class="text-xs text-slate-400">Multi-Agent Platform</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <button
            @click="navigate(item.path)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
            :class="[
              route.path === item.path
                ? 'bg-blue9-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.name }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-t border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Users class="w-5 h-5 text-white" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">Admin</p>
          <p class="text-xs text-slate-400">Premium</p>
        </div>
      </div>
    </div>
  </aside>
</template>