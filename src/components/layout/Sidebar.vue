<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GitBranch,
  Database,
  Settings,
  Sparkles,
  MessageSquare,
  Plus
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
  <aside class="w-16 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col h-full">
    <!-- Logo -->
    <div class="h-14 flex items-center justify-center border-b border-[#1a1a1a]">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <Sparkles class="w-5 h-5 text-white" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-4">
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.name">
          <button
            @click="navigate(item.path)"
            class="w-full flex items-center justify-center py-3 px-2 transition-all duration-200 relative group"
            :class="[
              route.path === item.path
                ? 'text-white'
                : 'text-[#666] hover:text-[#999]'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            
            <!-- Active indicator -->
            <div 
              v-if="route.path === item.path"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-500 rounded-r-full"
            />
            
            <!-- Tooltip -->
            <div class="absolute left-14 bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {{ item.name }}
            </div>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Bottom actions -->
    <div class="py-4 border-t border-[#1a1a1a]">
      <button class="w-full flex items-center justify-center py-3 text-[#666] hover:text-[#999] transition-colors">
        <Plus class="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>
