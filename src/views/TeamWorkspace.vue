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
  AlertCircle,
  Send,
  MoreHorizontal
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { Team, DebateArgument } from '@/types'

const store = useAgentStore()

const teams = ref<Team[]>([
  {
    id: 'team-1',
    name: 'Product Development',
    purpose: 'Develop new features and products',
    members: ['agent-1', 'agent-2', 'agent-3']
  },
  {
    id: 'team-2',
    name: 'Research Team',
    purpose: 'Market research and analysis',
    members: ['agent-3', 'agent-4']
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

const debateArguments = ref<DebateArgument[]>([
  {
    id: 'arg-1',
    debate_id: 'debate-1',
    author: 'Architect',
    claim: 'We should use microservices architecture for better scalability',
    evidence: ['Scalability benefits', 'Independent deployment', 'Technology diversity'],
    strength: 0.85
  },
  {
    id: 'arg-2',
    debate_id: 'debate-1',
    author: 'Critic',
    claim: 'Monolith is better for this use case due to lower complexity',
    evidence: ['Lower complexity', 'Faster development', 'Easier debugging'],
    strength: 0.75
  }
])

const phaseSteps = [
  { id: 'opening', label: 'Opening', done: true },
  { id: 'evidence', label: 'Evidence', done: true },
  { id: 'rebuttals', label: 'Rebuttals', done: true, active: true },
  { id: 'cross', label: 'Cross-Exam', done: false },
  { id: 'synthesis', label: 'Synthesis', done: false },
  { id: 'conclusion', label: 'Conclusion', done: false }
]

const chatMessage = ref('')

onMounted(async () => {
  await store.fetchTeams()
  await store.fetchDebateArguments('debate-1')
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Team Workspace</h1>
        <p class="text-[#666] mt-1">Manage teams and participate in debates</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Team</span>
      </button>
    </div>

    <!-- Teams Grid -->
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="team in teams"
        :key="team.id"
        class="bg-[#111] rounded-xl border border-[#1a1a1a] p-5 card-hover cursor-pointer"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Users class="w-5 h-5 text-white" />
          </div>
          <button class="p-1 hover:bg-[#1a1a1a] rounded transition-colors">
            <MoreHorizontal class="w-4 h-4 text-[#666]" />
          </button>
        </div>
        <h3 class="font-semibold text-white">{{ team.name }}</h3>
        <p class="text-sm text-[#666] mt-1">{{ team.purpose }}</p>
        <div class="flex items-center gap-2 mt-4">
          <div class="flex -space-x-2">
            <div
              v-for="(member, index) in team.members.slice(0, 3)"
              :key="member"
              class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-[#111] flex items-center justify-center"
            >
              <span class="text-white text-xs">{{ member.charAt(0).toUpperCase() }}</span>
            </div>
          </div>
          <span class="text-xs text-[#666]">{{ team.members.length }} members</span>
        </div>
      </div>
    </div>

    <!-- Debate Section -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Main Debate Area -->
      <div class="col-span-2 bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-white">{{ currentDebate.topic }}</h2>
            <div class="flex items-center gap-4 mt-2">
              <span class="text-sm text-[#666]">
                <span class="text-blue-400 font-medium">{{ currentDebate.participants.length }}</span> participants
              </span>
              <span class="text-sm text-[#666]">
                Round <span class="text-blue-400 font-medium">{{ currentDebate.current_round }}</span> / {{ currentDebate.max_rounds }}
              </span>
            </div>
          </div>
          <button class="flex items-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors">
            <Vote class="w-4 h-4" />
            <span class="text-sm font-medium">Vote</span>
          </button>
        </div>

        <!-- Phase Steps -->
        <div class="flex items-center gap-2 mb-6">
          <div
            v-for="(step, index) in phaseSteps"
            :key="step.id"
            class="flex items-center"
          >
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
              step.active ? 'bg-blue-500 text-white' :
              step.done ? 'bg-green-500/20 text-green-400' : 'bg-[#1a1a1a] text-[#666]'
            ]">
              <CheckCircle2 v-if="step.done" class="w-4 h-4" />
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span :class="[
              'ml-2 text-xs',
              step.active ? 'text-blue-400 font-medium' :
              step.done ? 'text-green-400' : 'text-[#666]'
            ]">{{ step.label }}</span>
            <ChevronRight v-if="index < phaseSteps.length - 1" class="w-4 h-4 text-[#1a1a1a] mx-2" />
          </div>
        </div>

        <!-- Arguments -->
        <div class="space-y-4">
          <div
            v-for="arg in debateArguments"
            :key="arg.id"
            class="p-4 bg-[#0a0a0a] rounded-lg border border-[#1a1a1a]"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Users class="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 class="font-medium text-white text-sm">{{ arg.author }}</h4>
                  <p class="text-xs text-[#666]">Agent</p>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <Trophy class="w-4 h-4 text-yellow-400" />
                <span class="text-sm text-yellow-400 font-medium">{{ (arg.strength * 100).toFixed(0) }}%</span>
              </div>
            </div>
            <p class="mt-3 text-[#e5e5e5] text-sm">{{ arg.claim }}</p>
            <div class="mt-3">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(item, index) in arg.evidence"
                  :key="index"
                  class="px-2 py-1 bg-[#1a1a1a] text-[#999] text-xs rounded"
                >{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Panel -->
      <div class="bg-[#111] rounded-xl border border-[#1a1a1a] flex flex-col">
        <div class="p-4 border-b border-[#1a1a1a]">
          <h3 class="font-semibold text-white">Team Chat</h3>
          <p class="text-xs text-[#666]">{{ currentDebate.participants.length }} participants</p>
        </div>
        <div class="flex-1 p-4 space-y-4 overflow-auto">
          <div class="flex gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white text-xs">A</span>
            </div>
            <div>
              <p class="text-sm text-white">Architect</p>
              <p class="text-xs text-[#999] mt-1">I've analyzed the requirements and believe microservices is the way to go.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white text-xs">C</span>
            </div>
            <div>
              <p class="text-sm text-white">Critic</p>
              <p class="text-xs text-[#999] mt-1">I disagree. The complexity overhead is too high for our current team size.</p>
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-[#1a1a1a]">
          <div class="flex items-center gap-2">
            <input
              v-model="chatMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-sm text-[#e5e5e5] placeholder-[#666] focus:outline-none focus:border-[#2a2a2a]"
            />
            <button class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Send class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
