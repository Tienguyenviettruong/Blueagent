<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Plus,
  Users,
  MessageSquare,
  Trophy,
  ChevronRight,
  Vote,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'

const store = useAgentStore()

const teams = ref([
  {
    id: 'team-1',
    name: 'Product Development',
    purpose: 'Develop new features and products',
    members: 3,
    status: 'active',
    debates: 5
  },
  {
    id: 'team-2',
    name: 'Research Team',
    purpose: 'Market research and analysis',
    members: 2,
    status: 'active',
    debates: 3
  }
])

const currentDebate = ref({
  id: 'debate-1',
  topic: 'Architecture Decision: Microservices vs Monolith',
  participants: ['Architect', 'Critic', 'Synthesizer'],
  phase: 'rebuttals',
  max_rounds: 5,
  current_round: 2,
  consensus_threshold: 0.7
})

const arguments = ref([
  {
    id: 'arg-1',
    author: 'Architect',
    claim: 'We should use microservices architecture for better scalability',
    evidence: ['Scalability benefits', 'Independent deployment', 'Technology diversity'],
    strength: 0.85,
    type: 'proposal',
    votes: { approve: 2, reject: 1, abstain: 0 }
  },
  {
    id: 'arg-2',
    author: 'Critic',
    claim: 'Monolith is better for this use case due to lower complexity',
    evidence: ['Lower complexity', 'Faster development', 'Easier debugging'],
    strength: 0.75,
    type: 'critique',
    votes: { approve: 1, reject: 2, abstain: 0 }
  }
])

const phaseSteps = [
  { id: 'opening', label: 'Opening Arguments', done: true },
  { id: 'evidence', label: 'Evidence & Reasoning', done: true },
  { id: 'rebuttals', label: 'Rebuttals', done: true, active: true },
  { id: 'cross', label: 'Cross-Examination', done: false },
  { id: 'synthesis', label: 'Synthesis', done: false },
  { id: 'conclusion', label: 'Conclusion', done: false }
]

onMounted(() => {
  store.fetchTeams()
  store.fetchDebateArguments('debate-1')
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Team Workspace</h1>
        <p class="text-slate-400">Manage teams and participate in debates</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-blue9-600 hover:bg-blue9-700 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Team</span>
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-slate-800 rounded-xl border border-slate-700 p-5 cursor-pointer hover:border-blue9-500 transition-colors"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
            <Users class="w-6 h-6 text-white" />
          </div>
          <span :class="[
            'px-2 py-0.5 text-xs rounded-full',
            team.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-600 text-slate-400'
          ]">{{ team.status }}</span>
        </div>
        <h3 class="text-lg font-semibold text-white">{{ team.name }}</h3>
        <p class="text-sm text-slate-400 mt-1">{{ team.purpose }}</p>
        <div class="flex items-center gap-4 mt-4">
          <div class="flex items-center gap-1">
            <Users class="w-4 h-4 text-slate-400" />
            <span class="text-sm text-slate-300">{{ team.members }} members</span>
          </div>
          <div class="flex items-center gap-1">
            <MessageSquare class="w-4 h-4 text-slate-400" />
            <span class="text-sm text-slate-300">{{ team.debates }} debates</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold text-white">{{ currentDebate.topic }}</h2>
          <div class="flex items-center gap-4 mt-2">
            <span class="text-sm text-slate-400">
              <span class="text-blue9-400 font-medium">{{ currentDebate.participants.length }}</span> participants
            </span>
            <span class="text-sm text-slate-400">
              Round <span class="text-blue9-400 font-medium">{{ currentDebate.current_round }}</span> / {{ currentDebate.max_rounds }}
            </span>
            <span class="text-sm text-slate-400">
              Consensus: <span class="text-blue9-400 font-medium">{{ currentDebate.consensus_threshold * 100 }}%</span>
            </span>
          </div>
        </div>
        <button class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <Vote class="w-5 h-5" />
          <span class="font-medium">Vote Now</span>
        </button>
      </div>

      <div class="flex items-center gap-1 mb-6">
        <div
          v-for="step in phaseSteps"
          :key="step.id"
          class="flex items-center"
        >
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
            step.active ? 'bg-blue9-500 text-white' :
            step.done ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'
          ]">
            <CheckCircle2 v-if="step.done" class="w-5 h-5" />
            <AlertCircle v-else class="w-5 h-5" />
          </div>
          <span :class="[
            'ml-2 text-sm',
            step.active ? 'text-blue9-400 font-medium' :
            step.done ? 'text-green-400' : 'text-slate-500'
          ]">{{ step.label }}</span>
          <ChevronRight v-if="phaseSteps.indexOf(step) < phaseSteps.length - 1" class="w-4 h-4 text-slate-600 mx-2" />
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="arg in arguments"
          :key="arg.id"
          :class="[
            'p-5 rounded-xl border',
            arg.type === 'proposal' ? 'bg-blue9-500/10 border-blue9-500/30' :
            arg.type === 'critique' ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-700 border-slate-600'
          ]"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue9-500 to-blue9-700 rounded-full flex items-center justify-center">
                <Users class="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 class="font-semibold text-white">{{ arg.author }}</h4>
                <span :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  arg.type === 'proposal' ? 'bg-blue9-500/20 text-blue9-400' :
                  arg.type === 'critique' ? 'bg-red-500/20 text-red-400' : 'bg-slate-600 text-slate-300'
                ]">{{ arg.type }}</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <Trophy class="w-4 h-4 text-yellow-400" />
              <span class="text-sm text-yellow-400 font-medium">{{ (arg.strength * 100).toFixed(0) }}%</span>
            </div>
          </div>
          <p class="mt-3 text-white">{{ arg.claim }}</p>
          <div class="mt-3">
            <p class="text-xs text-slate-400 mb-2">Evidence:</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in arg.evidence"
                :key="index"
                class="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
              >{{ item }}</span>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-4">
            <button class="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
              <CheckCircle2 class="w-4 h-4" />
              <span class="text-sm">{{ arg.votes.approve }}</span>
            </button>
            <button class="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              <XCircle class="w-4 h-4" />
              <span class="text-sm">{{ arg.votes.reject }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>