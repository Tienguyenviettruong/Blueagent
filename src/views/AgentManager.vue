<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Brain,
  Shield,
  MessageCircle,
  Eye,
  Zap,
  Settings
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { Agent } from '@/types'

const store = useAgentStore()
const searchQuery = ref('')
const selectedAgent = ref<Agent | null>(null)

const agents = ref<Agent[]>([
  {
    id: 'agent-1',
    name: 'Architect',
    role: 'proposer',
    provider: 'openai',
    model: 'gpt-4',
    system_prompt: 'You are a solution architect who proposes innovative designs.',
    skills: ['design', 'architecture', 'planning'],
    personality: { creativity: 0.8, caution: 0.3, verbosity: 0.6, empathy: 0.5 },
    memory: { short_term: [], long_term: [], context_window: 4096 },
    status: 'active',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    id: 'agent-2',
    name: 'Critic',
    role: 'critic',
    provider: 'claude',
    model: 'claude-3',
    system_prompt: 'You are a critical thinker who identifies flaws and risks.',
    skills: ['analysis', 'review', 'risk-assessment'],
    personality: { creativity: 0.4, caution: 0.9, verbosity: 0.7, empathy: 0.3 },
    memory: { short_term: [], long_term: [], context_window: 4096 },
    status: 'active',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    id: 'agent-3',
    name: 'Synthesizer',
    role: 'synthesizer',
    provider: 'openai',
    model: 'gpt-4',
    system_prompt: 'You synthesize different viewpoints into coherent solutions.',
    skills: ['synthesis', 'writing', 'coordination'],
    personality: { creativity: 0.6, caution: 0.5, verbosity: 0.8, empathy: 0.7 },
    memory: { short_term: [], long_term: [], context_window: 4096 },
    status: 'idle',
    created_at: Date.now(),
    updated_at: Date.now()
  },
  {
    id: 'agent-4',
    name: 'Executor',
    role: 'executor',
    provider: 'claude',
    model: 'claude-3',
    system_prompt: 'You implement solutions with precision and efficiency.',
    skills: ['coding', 'implementation', 'testing'],
    personality: { creativity: 0.3, caution: 0.7, verbosity: 0.4, empathy: 0.5 },
    memory: { short_term: [], long_term: [], context_window: 4096 },
    status: 'active',
    created_at: Date.now(),
    updated_at: Date.now()
  }
])

const filteredAgents = computed(() => {
  if (!searchQuery.value) return agents.value
  const query = searchQuery.value.toLowerCase()
  return agents.value.filter(agent =>
    agent.name.toLowerCase().includes(query) ||
    agent.role.toLowerCase().includes(query) ||
    agent.provider.toLowerCase().includes(query)
  )
})

const roleColors: Record<string, string> = {
  proposer: 'from-blue-500 to-blue-600',
  critic: 'from-red-500 to-red-600',
  synthesizer: 'from-purple-500 to-purple-600',
  executor: 'from-green-500 to-green-600'
}

const roleIcons: Record<string, any> = {
  proposer: Brain,
  critic: Shield,
  synthesizer: MessageCircle,
  executor: Zap
}

onMounted(async () => {
  await store.fetchAgents()
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Agents</h1>
        <p class="text-[#666] mt-1">Manage your AI agents and their configurations</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Agent</span>
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="flex items-center gap-4">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search agents..."
          class="w-full pl-9 pr-4 py-2 bg-[#111] border border-[#1a1a1a] rounded-lg text-sm text-[#e5e5e5] placeholder-[#666] focus:outline-none focus:border-[#2a2a2a] transition-colors"
        />
      </div>
      <button class="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#1a1a1a] rounded-lg text-[#666] hover:text-[#999] transition-colors">
        <Filter class="w-4 h-4" />
        <span class="text-sm">Filter</span>
      </button>
    </div>

    <!-- Agents Grid -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="agent in filteredAgents"
        :key="agent.id"
        class="bg-[#111] rounded-xl border border-[#1a1a1a] p-5 card-hover cursor-pointer"
        :class="{ 'border-blue-500/30': selectedAgent?.id === agent.id }"
        @click="selectedAgent = agent"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div :class="['w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', roleColors[agent.role] || 'from-gray-500 to-gray-600']">
              <component :is="roleIcons[agent.role] || Brain" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-white">{{ agent.name }}</h3>
              <p class="text-sm text-[#666]">{{ agent.role }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span :class="['status-dot', agent.status === 'active' ? 'online' : 'offline']"></span>
            <button class="p-1 hover:bg-[#1a1a1a] rounded transition-colors">
              <MoreHorizontal class="w-4 h-4 text-[#666]" />
            </button>
          </div>
        </div>

        <div class="mt-4 space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-xs text-[#666]">Provider:</span>
            <span class="text-xs text-[#999] bg-[#1a1a1a] px-2 py-1 rounded">{{ agent.provider }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-[#666]">Model:</span>
            <span class="text-xs text-[#999] bg-[#1a1a1a] px-2 py-1 rounded">{{ agent.model }}</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-[#1a1a1a]">
          <div class="flex items-center justify-between text-xs text-[#666]">
            <span>Skills</span>
            <span>{{ agent.skills.length }}</span>
          </div>
          <div class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="skill in agent.skills"
              :key="skill"
              class="px-2 py-1 bg-[#1a1a1a] text-[#999] text-xs rounded"
            >{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Agent Detail Panel -->
    <div v-if="selectedAgent" class="bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div :class="['w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center', roleColors[selectedAgent.role] || 'from-gray-500 to-gray-600']">
            <component :is="roleIcons[selectedAgent.role] || Brain" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-white">{{ selectedAgent.name }}</h2>
            <p class="text-sm text-[#666]">{{ selectedAgent.role }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <Settings class="w-5 h-5 text-[#666]" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <h3 class="text-sm font-medium text-[#666] mb-3">Personality</h3>
          <div class="space-y-3">
            <div v-for="[trait, value] in Object.entries(selectedAgent.personality)" :key="trait">
              <div class="flex items-center justify-between text-sm mb-1">
                <span class="text-[#999] capitalize">{{ trait }}</span>
                <span class="text-white">{{ (value * 100).toFixed(0) }}%</span>
              </div>
              <div class="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  :style="{ width: `${value * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-[#666] mb-3">Configuration</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between py-2 border-b border-[#1a1a1a]">
              <span class="text-sm text-[#999]">Provider</span>
              <span class="text-sm text-white">{{ selectedAgent.provider }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-[#1a1a1a]">
              <span class="text-sm text-[#999]">Model</span>
              <span class="text-sm text-white">{{ selectedAgent.model }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-[#1a1a1a]">
              <span class="text-sm text-[#999]">Context Window</span>
              <span class="text-sm text-white">{{ selectedAgent.memory.context_window }}</span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-sm text-[#999]">Status</span>
              <span :class="['text-sm', selectedAgent.status === 'active' ? 'text-green-400' : 'text-[#666]']">{{ selectedAgent.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
