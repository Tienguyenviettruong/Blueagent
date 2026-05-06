<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Users,
  Briefcase,
  MessageSquare,
  Database,
  TrendingUp,
  Activity,
  Clock,
  ChevronRight,
  Zap,
  Brain,
  GitBranch
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { Workflow } from '@/types'

const store = useAgentStore()

const stats = ref([
  { label: 'Active Agents', value: '4', icon: Users, color: 'from-blue-500 to-blue-600', trend: '+12%' },
  { label: 'Teams', value: '2', icon: Briefcase, color: 'from-purple-500 to-purple-600', trend: '+5%' },
  { label: 'Debates', value: '8', icon: MessageSquare, color: 'from-green-500 to-green-600', trend: '+23%' },
  { label: 'Knowledge Items', value: '127', icon: Database, color: 'from-orange-500 to-orange-600', trend: '+8%' }
])

const recentActivities = ref([
  { id: 1, agent: 'Architect', action: 'completed task', target: 'API Design', time: '2 min ago', type: 'success' },
  { id: 2, agent: 'Critic', action: 'started debate', target: 'Architecture Decision', time: '15 min ago', type: 'info' },
  { id: 3, agent: 'Synthesizer', action: 'added knowledge', target: 'Best Practices', time: '1 hour ago', type: 'warning' },
  { id: 4, agent: 'Executor', action: 'joined team', target: 'Product Development', time: '2 hours ago', type: 'success' }
])

const workflows = ref<Workflow[]>([
  {
    id: 'wf-1',
    name: 'Product Development',
    description: 'End-to-end product development workflow',
    version: 1,
    created_at: Date.now(),
    updated_at: Date.now(),
    tags: ['development', 'product'],
    nodes: [],
    execution: {
      instance_id: 'exec-1',
      status: 'running',
      start_time: Date.now(),
      token_usage: 0,
      context: {},
      events: []
    }
  },
  {
    id: 'wf-2',
    name: 'Market Research',
    description: 'Research and analysis workflow',
    version: 1,
    created_at: Date.now(),
    updated_at: Date.now(),
    tags: ['research', 'market'],
    nodes: [],
    execution: {
      instance_id: 'exec-2',
      status: 'paused',
      start_time: Date.now(),
      token_usage: 0,
      context: {},
      events: []
    }
  },
  {
    id: 'wf-3',
    name: 'Quality Assurance',
    description: 'Testing and QA workflow',
    version: 1,
    created_at: Date.now(),
    updated_at: Date.now(),
    tags: ['qa', 'testing'],
    nodes: [],
    execution: {
      instance_id: 'exec-3',
      status: 'completed',
      start_time: Date.now(),
      end_time: Date.now(),
      token_usage: 0,
      context: {},
      events: []
    }
  }
])

const quickActions = ref([
  { name: 'New Agent', icon: Users, color: 'bg-blue-500/10 text-blue-400' },
  { name: 'New Team', icon: Briefcase, color: 'bg-purple-500/10 text-purple-400' },
  { name: 'New Workflow', icon: GitBranch, color: 'bg-green-500/10 text-green-400' },
  { name: 'New Knowledge', icon: Brain, color: 'bg-orange-500/10 text-orange-400' }
])

onMounted(async () => {
  await store.fetchAgents()
  await store.fetchTeams()
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Welcome Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        <p class="text-[#666] mt-1">Welcome back! Here's your overview.</p>
      </div>
      <div class="flex items-center gap-2 text-[#666]">
        <Clock class="w-4 h-4" />
        <span class="text-sm">Last sync: Just now</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-[#111] rounded-xl p-5 border border-[#1a1a1a] card-hover"
      >
        <div class="flex items-center justify-between">
          <div :class="['w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center', stat.color]">
            <component :is="stat.icon" class="w-5 h-5 text-white" />
          </div>
          <div class="flex items-center gap-1 text-green-400 text-sm">
            <TrendingUp class="w-4 h-4" />
            <span>{{ stat.trend }}</span>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
          <p class="text-sm text-[#666] mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex items-center gap-3">
      <button
        v-for="action in quickActions"
        :key="action.name"
        class="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] transition-colors"
      >
        <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', action.color]">
          <component :is="action.icon" class="w-4 h-4" />
        </div>
        <span class="text-sm text-[#e5e5e5]">{{ action.name }}</span>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <!-- Recent Activities -->
      <div class="col-span-2 bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Activity class="w-5 h-5 text-[#666]" />
            <h2 class="text-lg font-semibold text-white">Recent Activities</h2>
          </div>
          <button class="text-sm text-[#666] hover:text-[#999] flex items-center gap-1 transition-colors">
            View all <ChevronRight class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center gap-4 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Users class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[#e5e5e5]">
                <span class="font-medium">{{ activity.agent }}</span>
                <span class="text-[#666]"> {{ activity.action }}</span>
                <span class="text-[#999]"> {{ activity.target }}</span>
              </p>
              <p class="text-xs text-[#666]">{{ activity.time }}</p>
            </div>
            <div :class="[
              'w-2 h-2 rounded-full flex-shrink-0',
              activity.type === 'success' ? 'bg-green-500' :
              activity.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
            ]"></div>
          </div>
        </div>
      </div>

      <!-- Workflows -->
      <div class="bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2">
            <Zap class="w-5 h-5 text-[#666]" />
            <h2 class="text-lg font-semibold text-white">Workflows</h2>
          </div>
          <span class="text-xs text-[#666]">{{ workflows.length }} active</span>
        </div>
        <div class="space-y-3">
          <div
            v-for="workflow in workflows"
            :key="workflow.id"
            class="p-4 bg-[#0a0a0a] rounded-lg"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-[#e5e5e5]">{{ workflow.name }}</span>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                workflow.execution?.status === 'running' ? 'bg-green-500/10 text-green-400' :
                workflow.execution?.status === 'paused' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-[#1a1a1a] text-[#666]'
              ]">{{ workflow.execution?.status }}</span>
            </div>
            <div class="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all',
                  workflow.execution?.status === 'running' ? 'bg-green-500' :
                  workflow.execution?.status === 'paused' ? 'bg-yellow-500' : 'bg-[#333]'
                ]"
                :style="{ width: workflow.execution?.status === 'completed' ? '100%' : workflow.execution?.status === 'running' ? '65%' : '30%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
