<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  Search,
  Plus,
  BookOpen,
  Tag,
  Calendar,
  Database,
  Network,
  ChevronRight
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'

const store = useAgentStore()
const searchQuery = ref('')

const brains = ref([
  { id: 'brain-1', name: 'Product Knowledge', items: 45, updated: '2 min ago', type: 'team' },
  { id: 'brain-2', name: 'Research Database', items: 32, updated: '1 hour ago', type: 'organization' },
  { id: 'brain-3', name: 'Personal Notes', items: 50, updated: '5 min ago', type: 'agent' }
])

const knowledgeItems = ref([
  {
    id: 'item-1',
    title: 'Microservices Best Practices',
    content: 'Guidelines for implementing microservices architecture including service boundaries, communication patterns, and deployment strategies...',
    tags: ['architecture', 'microservices', 'best-practices'],
    confidence: 0.95,
    updated: '2024-01-15',
    source: 'agent_interaction'
  },
  {
    id: 'item-2',
    title: 'Team Collaboration Strategies',
    content: 'Effective collaboration patterns for multi-agent teams including communication protocols and role definitions...',
    tags: ['team', 'collaboration', 'communication'],
    confidence: 0.88,
    updated: '2024-01-14',
    source: 'manual_entry'
  },
  {
    id: 'item-3',
    title: 'API Design Principles',
    content: 'RESTful API design principles including resource naming, status codes, and error handling...',
    tags: ['api', 'design', 'rest'],
    confidence: 0.92,
    updated: '2024-01-13',
    source: 'imported'
  },
  {
    id: 'item-4',
    title: 'Debate Protocol Guidelines',
    content: 'Formal debate protocols for structured agent discussions including argument submission and voting procedures...',
    tags: ['debate', 'protocol', 'consensus'],
    confidence: 0.85,
    updated: '2024-01-12',
    source: 'agent_interaction'
  }
])

const graphNodes = ref([
  { id: 'n1', label: 'Microservices', x: 300, y: 100, type: 'concept' },
  { id: 'n2', label: 'API Design', x: 150, y: 250, type: 'procedure' },
  { id: 'n3', label: 'Team Collaboration', x: 450, y: 250, type: 'concept' },
  { id: 'n4', label: 'Debate Protocol', x: 300, y: 400, type: 'decision' }
])

const graphEdges = ref([
  { source: 'n1', target: 'n2', type: 'depends_on' },
  { source: 'n1', target: 'n3', type: 'references' },
  { source: 'n3', target: 'n4', type: 'evolves_from' }
])

onMounted(() => {
  store.searchKnowledge('architecture')
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white">Knowledge Graph</h1>
        <p class="text-slate-400">Explore and manage your knowledge base</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-blue9-600 hover:bg-blue9-700 text-white rounded-lg transition-colors">
        <Plus class="w-5 h-5" />
        <span class="font-medium">New Knowledge</span>
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 space-y-6">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search knowledge base..."
            class="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue9-500 transition-colors"
          />
        </div>

        <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-white">Knowledge Items</h2>
            <button class="text-sm text-blue9-400 hover:text-blue9-300 flex items-center gap-1">
              View all <ChevronRight class="w-4 h-4" />
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="item in knowledgeItems"
              :key="item.id"
              class="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="font-semibold text-white">{{ item.title }}</h3>
                  <p class="text-sm text-slate-400 mt-1 line-clamp-2">{{ item.content }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <span :class="[
                    'px-2 py-0.5 text-xs rounded-full',
                    item.confidence > 0.9 ? 'bg-green-500/20 text-green-400' :
                    item.confidence > 0.8 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  ]">{{ (item.confidence * 100).toFixed(0) }}%</span>
                </div>
              </div>
              <div class="flex items-center gap-4 mt-3">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-2 py-0.5 bg-slate-600 text-slate-300 text-xs rounded-full flex items-center gap-1"
                  >
                    <Tag class="w-3 h-3" />
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-4 mt-3 pt-3 border-t border-slate-600">
                <span class="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar class="w-3 h-3" />
                  {{ item.updated }}
                </span>
                <span class="text-xs text-slate-500">{{ item.source }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-white">Knowledge Brains</h2>
            <Database class="w-5 h-5 text-slate-400" />
          </div>
          <div class="space-y-3">
            <div
              v-for="brain in brains"
              :key="brain.id"
              class="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center">
                    <BookOpen class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 class="font-medium text-white">{{ brain.name }}</h4>
                    <span class="text-xs text-slate-400">{{ brain.items }} items</span>
                  </div>
                </div>
                <span :class="[
                  'px-2 py-0.5 text-xs rounded-full',
                  brain.type === 'team' ? 'bg-blue9-500/20 text-blue9-400' :
                  brain.type === 'organization' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'
                ]">{{ brain.type }}</span>
              </div>
              <p class="text-xs text-slate-500 mt-2">Updated {{ brain.updated }}</p>
            </div>
          </div>
        </div>

        <div class="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-white">Knowledge Graph</h2>
            <Network class="w-5 h-5 text-slate-400" />
          </div>
          <div class="h-64 relative">
            <svg class="absolute inset-0 w-full h-full">
              <defs>
                <marker id="graphArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                </marker>
              </defs>
              <line
                v-for="(edge, index) in graphEdges"
                :key="index"
                :x1="(graphNodes.find(n => n.id === edge.source)?.x || 0)"
                :y1="(graphNodes.find(n => n.id === edge.source)?.y || 0)"
                :x2="(graphNodes.find(n => n.id === edge.target)?.x || 0)"
                :y2="(graphNodes.find(n => n.id === edge.target)?.y || 0)"
                stroke="#64748b"
                stroke-width="2"
                marker-end="url(#graphArrow)"
              />
              <circle
                v-for="node in graphNodes"
                :key="node.id"
                :cx="node.x"
                :cy="node.y"
                r="30"
                :fill="node.type === 'concept' ? '#3b82f6' : node.type === 'procedure' ? '#f59e0b' : '#8b5cf6'"
                class="cursor-pointer hover:opacity-80"
              />
              <text
                v-for="node in graphNodes"
                :key="node.id"
                :x="node.x"
                :y="node.y + 5"
                text-anchor="middle"
                fill="white"
                font-size="11"
                font-weight="500"
              >{{ node.label }}</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>