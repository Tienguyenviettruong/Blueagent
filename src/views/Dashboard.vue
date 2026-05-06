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
  ChevronRight
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'

const store = useAgentStore()
const stats = ref([
  { label: 'Active Agents', value: '4', icon: Users, color: 'bg-blue9-500' },
  { label: 'Teams', value: '2', icon: Briefcase, color: 'bg-purple-500' },
  { label: 'Debates', value: '8', icon: MessageSquare, color: 'bg-green-500' },
  { label: 'Knowledge Items', value: '127', icon: Database, color: 'bg-orange-500' }
])

const recentActivities = ref([
  { id: 1, agent: 'Architect', action: 'completed task', time: '2 min ago', type: 'success' },
  { id: 2, agent: 'Critic', action: 'started debate', time: '15 min ago', type: 'info' },
  { id: 3, agent: 'Synthesizer', action: 'added knowledge', time: '1 hour ago', type: 'warning' },
  { id: 4, agent: 'Executor', action: 'joined team', time: '2 hours ago', type: 'success' }
])

const workflows = ref([
  { id: 'wf-1', name: 'Product Development', progress: 65, status: 'running' },
  { id: 'wf-2', name: 'Market Research', progress: 30, status: 'paused' },
  { id: 'wf-3', name: 'Quality Assurance', progress: 100, status: 'completed' }
])

onMounted(() => {
  store.fetchAgents()
  store.fetchTeams()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
        <p class="text-slate-400">Welcome back! Here's your overview.</p>
      </div>
      <div class="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg">
        <Clock class="w-4 h-4 text-slate-400" />
        <span class="text-sm text-slate-300">Last sync: Just now</span>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue9-500 transition-colors"
      >
        <div class="flex items-center justify-between">
          <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <TrendingUp class="w-5 h-5 text-green-400" />
        </div>
        <div class="mt-4">
          <p class="text-3xl font-bold text-white">{{ stat.value }}</p>
          <p class="text-sm text-slate-400 mt-1">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">Recent Activities</h2>
          <button class="text-sm text-blue9-400 hover:text-blue9-300 flex items-center gap-1">
            View all <ChevronRight class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-blue9-500 to-blue9-700 rounded-full flex items-center justify-center">
              <Users class="w-5 h-5 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-white">
                <span class="font-medium">{{ activity.agent }}</span>
                <span class="text-slate-400"> {{ activity.action }}</span>
              </p>
              <p class="text-xs text-slate-500">{{ activity.time }}</p>
            </div>
            <div :class="[
              'w-2 h-2 rounded-full',
              activity.type === 'success' ? 'bg-green-500' :
              activity.type === 'info' ? 'bg-blue9-500' : 'bg-yellow-500'
            ]"></div>
          </div>
        </div>
      </div>

      <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-white">Workflows</h2>
          <Activity class="w-5 h-5 text-slate-400" />
        </div>
        <div class="space-y-4">
          <div
            v-for="workflow in workflows"
            :key="workflow.id"
            class="p-4 bg-slate-700/50 rounded-lg"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-white">{{ workflow.name }}</span>
              <span :class="[
                'text-xs px-2 py-1 rounded-full',
                workflow.status === 'running' ? 'bg-green-500/20 text-green-400' :
                workflow.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-slate-600 text-slate-300'
              ]">{{ workflow.status }}</span>
            </div>
            <div class="h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all',
                  workflow.status === 'running' ? 'bg-green-500' :
                  workflow.status === 'paused' ? 'bg-yellow-500' : 'bg-slate-500'
                ]"
                :style="{ width: `${workflow.progress}%` }"
              ></div>
            </div>
            <p class="text-xs text-slate-400 mt-2">{{ workflow.progress }}% complete</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>