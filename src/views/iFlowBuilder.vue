<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Plus,
  Play,
  Save,
  Trash2,
  Copy,
  ChevronRight,
  Circle,
  GitBranch,
  MessageSquare,
  AlertCircle,
  Clock,
  Users,
  Database
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { WorkflowNode } from '@/types'

const store = useAgentStore()

const workflowName = ref('New Workflow')
const workflowDescription = ref('Describe your workflow...')

const nodeTypes = [
  { type: 'agent_task', label: 'Agent Task', icon: Users, color: 'bg-blue9-500' },
  { type: 'debate_session', label: 'Debate Session', icon: MessageSquare, color: 'bg-purple-500' },
  { type: 'decision', label: 'Decision', icon: Circle, color: 'bg-yellow-500' },
  { type: 'parallel_split', label: 'Parallel Split', icon: GitBranch, color: 'bg-green-500' },
  { type: 'human_approval', label: 'Human Approval', icon: AlertCircle, color: 'bg-red-500' },
  { type: 'knowledge_query', label: 'Knowledge Query', icon: Database, color: 'bg-orange-500' },
  { type: 'delay', label: 'Delay', icon: Clock, color: 'bg-slate-500' }
]

const nodes = ref<WorkflowNode[]>([
  { id: 'node-1', node_type: 'agent_task', label: 'Analyze Requirements', position: [100, 150] },
  { id: 'node-2', node_type: 'debate_session', label: 'Design Debate', position: [350, 150] },
  { id: 'node-3', node_type: 'decision', label: 'Approve Design', position: [600, 150] }
])

const edges = ref([
  { source: 'node-1', target: 'node-2' },
  { source: 'node-2', target: 'node-3' }
])

const selectedNode = ref<string | null>(null)

// Helper to get x and y from position tuple
const getNodeX = (node: WorkflowNode) => node.position[0]
const getNodeY = (node: WorkflowNode) => node.position[1]

onMounted(() => {
  store.fetchWorkflowNodes('workflow-1')
})
</script>

<template>
  <div class="h-[calc(100%-2rem)] flex gap-6">
    <div class="w-64 bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col">
      <h3 class="text-sm font-semibold text-white mb-4">Node Types</h3>
      <div class="flex-1 overflow-auto space-y-2">
        <div
          v-for="nodeType in nodeTypes"
          :key="nodeType.type"
          class="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
        >
          <div :class="[nodeType.color, 'w-10 h-10 rounded-lg flex items-center justify-center']">
            <component :is="nodeType.icon" class="w-5 h-5 text-white" />
          </div>
          <span class="text-sm text-slate-300">{{ nodeType.label }}</span>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col gap-4">
      <div class="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <div class="flex items-center justify-between">
          <div>
            <input
              v-model="workflowName"
              type="text"
              class="text-xl font-bold text-white bg-transparent border-none outline-none"
              placeholder="Workflow Name"
            />
            <input
              v-model="workflowDescription"
              type="text"
              class="text-sm text-slate-400 bg-transparent border-none outline-none mt-1 w-full"
              placeholder="Description..."
            />
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Copy class="w-5 h-5 text-slate-400" />
            </button>
            <button class="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Trash2 class="w-5 h-5 text-slate-400" />
            </button>
            <button class="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              <Save class="w-5 h-5" />
              <span class="font-medium">Save</span>
            </button>
            <button class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Play class="w-5 h-5" />
              <span class="font-medium">Run</span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex-1 bg-slate-800 rounded-xl border border-slate-700 p-4 relative overflow-hidden">
        <div class="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
          <div class="border border-slate-600"></div>
        </div>

        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          <line
            v-for="(edge, index) in edges"
            :key="index"
            :x1="getNodeX(nodes.find(n => n.id === edge.source) || { position: [0, 0] }) + 60"
            :y1="getNodeY(nodes.find(n => n.id === edge.source) || { position: [0, 0] }) + 30"
            :x2="getNodeX(nodes.find(n => n.id === edge.target) || { position: [0, 0] })"
            :y2="getNodeY(nodes.find(n => n.id === edge.target) || { position: [0, 0] }) + 30"
            stroke="#64748b"
            stroke-width="2"
            marker-end="url(#arrowhead)"
          />
        </svg>

        <div
          v-for="node in nodes"
          :key="node.id"
          :class="[
            'absolute p-4 rounded-xl border cursor-move transition-all',
            selectedNode === node.id
              ? 'bg-blue9-500/20 border-blue9-500 shadow-lg shadow-blue9-500/20'
              : 'bg-slate-700 border-slate-600 hover:border-blue9-500'
          ]"
          :style="{ left: `${getNodeX(node)}px`, top: `${getNodeY(node)}px` }"
          @click="selectedNode = node.id"
        >
          <div class="flex items-center gap-3">
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center',
              node.node_type === 'agent_task' ? 'bg-blue9-500' :
              node.node_type === 'debate_session' ? 'bg-purple-500' :
              node.node_type === 'decision' ? 'bg-yellow-500' :
              node.node_type === 'parallel_split' ? 'bg-green-500' : 'bg-slate-500'
            ]">
              <component
                :is="nodeTypes.find(t => t.type === node.node_type)?.icon"
                class="w-5 h-5 text-white"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-white">{{ node.label }}</p>
              <p class="text-xs text-slate-400">{{ node.node_type }}</p>
            </div>
          </div>
        </div>

        <div class="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-slate-700 rounded-lg">
          <span class="text-xs text-slate-400">{{ nodes.length }} nodes</span>
          <ChevronRight class="w-4 h-4 text-slate-400" />
          <span class="text-xs text-slate-400">{{ edges.length }} connections</span>
        </div>
      </div>
    </div>

    <div v-if="selectedNode" class="w-72 bg-slate-800 rounded-xl border border-slate-700 p-4">
      <h3 class="text-sm font-semibold text-white mb-4">Node Settings</h3>
      <div class="space-y-4">
        <div>
          <label class="text-xs text-slate-400 mb-1 block">Node Label</label>
          <input
            type="text"
            :value="nodes.find(n => n.id === selectedNode)?.label"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue9-500"
          />
        </div>
        <div>
          <label class="text-xs text-slate-400 mb-1 block">Position</label>
          <div class="flex gap-2">
            <input
              type="number"
              placeholder="X"
              :value="getNodeX(nodes.find(n => n.id === selectedNode) || { position: [0, 0] })"
              class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue9-500"
            />
            <input
              type="number"
              placeholder="Y"
              :value="getNodeY(nodes.find(n => n.id === selectedNode) || { position: [0, 0] })"
              class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue9-500"
            />
          </div>
        </div>
        <div>
          <label class="text-xs text-slate-400 mb-1 block">Configuration</label>
          <textarea
            rows="4"
            placeholder="Enter node configuration..."
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue9-500 resize-none"
          ></textarea>
        </div>
        <button class="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
          Delete Node
        </button>
      </div>
    </div>
  </div>
</template>
