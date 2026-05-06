<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Settings,
  Trash2,
  Copy,
  User
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { Agent } from '@/types'

const store = useAgentStore()
const searchQuery = ref('')
const selectedRole = ref('all')

const roles = [
  { value: 'all', label: 'All Roles' },
  { value: 'proposer', label: 'Proposer' },
  { value: 'critic', label: 'Critic' },
  { value: 'synthesizer', label: 'Synthesizer' },
  { value: 'executor', label: 'Executor' }
]

onMounted(async () => {
  await store.fetchAgents()
})

const filteredAgents = computed(() => {
  return store.agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = selectedRole.value === 'all' || agent.role === selectedRole.value
    return matchesSearch && matchesRole
  })
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Agent Manager</h1>
        <p class="text-slate-400">Manage your AI agents and their configurations</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-blue9-600 hover:bg-blue9-700 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Agent</span>
      </button>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search agents..."
          class="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue9-500 transition-colors"
        />
      </div>
      <div class="flex items-center gap-2">
        <Filter class="w-5 h-5 text-slate-400" />
        <select
          v-model="selectedRole"
          class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue9-500 transition-colors"
        >
          <option v-for="role in roles" :key="role.value" :value="role.value">
            {{ role.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="store.isLoading" class="flex items-center justify-center h-32">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-blue9-600"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="store.error" class="p-4 bg-red-900/50 border border-red-500 rounded-lg">
      <p class="text-red-400">{{ store.error }}</p>
    </div>

    <!-- Agents grid -->
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        v-for="agent in filteredAgents"
        :key="agent.id"
        class="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-blue9-500 transition-all hover:shadow-lg hover:shadow-blue9-500/10"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue9-500 to-blue9-700 rounded-xl flex items-center justify-center">
            <User class="w-6 h-6 text-white" />
          </div>
          <div class="relative">
            <button class="p-1 hover:bg-slate-700 rounded-lg transition-colors">
              <MoreVertical class="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-lg font-semibold text-white">{{ agent.name }}</h3>
          <div class="flex items-center gap-2 mt-1">
            <span class="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
              Active
            </span>
            <span class="text-xs text-slate-400">{{ agent.provider }}</span>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-400">Creativity</span>
              <span class="text-white">{{ Math.round(agent.creativity * 100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-500 rounded-full" :style="{ width: `${agent.creativity * 100}%` }"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-400">Caution</span>
              <span class="text-white">{{ Math.round(agent.caution * 100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-red-500 rounded-full" :style="{ width: `${agent.caution * 100}%` }"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-xs mb-1">
              <span class="text-slate-400">Verbosity</span>
              <span class="text-white">{{ Math.round(agent.verbosity * 100) }}%</span>
            </div>
            <div class="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-blue9-500 rounded-full" :style="{ width: `${agent.verbosity * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
