<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  Database,
  Settings,
  MoreHorizontal
} from 'lucide-vue-next'
import { useAgentStore } from '@/stores/agentStore'
import type { WorkflowNode } from '@/types'

const store = useAgentStore()

const workflowName = ref('New Workflow')
const workflowDescription = ref('Describe your workflow...')

const nodeTypes = [
  { type: 'agent_task', label: 'Agent Task', icon: Users, color: 'bg-blue-500' },
  { type: 'debate_session', label: 'Debate', icon: MessageSquare, color: 'bg-purple-500' },
  { type: 'decision', label: 'Decision', icon: Circle, color: 'bg-yellow-500' },
  { type: 'parallel_split', label: 'Parallel', icon: GitBranch, color: 'bg-green-500' },
  { type: 'human_approval', label: 'Approval', icon: AlertCircle, color: 'bg-red-500' },
  { type: 'knowledge_query', label: 'Knowledge', icon: Database, color: 'bg-orange-500' },
  { type: 'delay', label: 'Delay', icon: Clock, color: 'bg-[#666]' }
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

const getNodeX = (node: WorkflowNode) => node.position[0]
const getNodeY = (node: WorkflowNode) => node.position[1]

onMounted(() => {
  store.fetchWorkflowNodes('workflow-1')
})
</script>

<template>
  <div class="h-full flex">
    <!-- Left Sidebar - Node Types -->
    <div class="w-64 bg-[#111] border-r border-[#1a1a1a] flex flex-col">
      <div class="p-4 border-b border-[#1a1a1a]">
        <h3 class="text-sm font-semibold text-white">Node Types</h3>
      </div>
      <div class="flex-1 overflow-auto p-4 space-y-2">
        <div
          v-for="nodeType in nodeTypes"
          :key="nodeType.type"
          class="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-colors"
        >
          <div :class="[nodeType.color, 'w-8 h-8 rounded-lg flex items-center justify-center']">
            <component :is="nodeType.icon" class="w-4 h-4 text-white" />
          </div>
          <span class="text-sm text-[#999]">{{ nodeType.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main Canvas -->
    <div class="flex-1 flex flex-col">
      <!-- Toolbar -->
      <div class="h-14 bg-[#111] border-b border-[#1a1a1a] flex items-center justify-between px-4">
        <div class="flex items-center gap-4">
          <input
            v-model="workflowName"
            type="text"
            class="text-lg font-semibold text-white bg-transparent border-none outline-none"
            placeholder="Workflow Name"
          />
          <input
            v-model="workflowDescription"
            type="text"
            class="text-sm text-[#666] bg-transparent border-none outline-none w-64"
            placeholder="Description..."
          />
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <Copy class="w-4 h-4 text-[#666]" />
          </button>
          <button class="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors">
            <Trash2 class="w-4 h-4 text-[#666]" />
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-lg transition-colors text-sm">
            <Save class="w-4 h-4" />
            <span>Save</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm">
            <Play class="w-4 h-4" />
            <span>Run</span>
          </button>
        </div>
      </div>

      <!-- Canvas -->
      <div class="flex-1 bg-[#0a0a0a] relative overflow-hidden">
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
            </marker>
          </defs>
          <line
            v-for="(edge, index) in edges"
            :key="index"
            :x1="getNodeX(nodes.find(n => n.id === edge.source) || { position: [0, 0] }) + 60"
            :y1="getNodeY(nodes.find(n => n.id === edge.source) || { position: [0, 0] }) + 25"
            :x2="getNodeX(nodes.find(n => n.id === edge.target) || { position: [0, 0] })"
            :y2="getNodeY(nodes.find(n => n.id === edge.target) || { position: [0, 0] }) + 25"
            stroke="#333"
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
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-[#111] border-[#1a1a1a] hover:border-[#2a2a2a]'
          ]"
          :style="{ left: `${getNodeX(node)}px`, top: `${getNodeY(node)}px` }"
          @click="selectedNode = node.id"
        >
          <div class="flex items-center gap-3">
            <div :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center',
              node.node_type === 'agent_task' ? 'bg-blue-500' :
              node.node_type === 'debate_session' ? 'bg-purple-500' :
              node.node_type === 'decision' ? 'bg-yellow-500' :
              node.node_type === 'parallel_split' ? 'bg-green-500' : 'bg-[#666]'
            ]">
              <component
                :is="nodeTypes.find(t => t.type === node.node_type)?.icon"
                class="w-4 h-4 text-white"
              />
            </div>
            <div>
              <p class="text-sm font-medium text-white">{{ node.label }}</p>
              <p class="text-xs text-[#666]">{{ node.node_type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Node Settings -->
    <div v-if="selectedNode" class="w-72 bg-[#111] border-l border-[#1a1a1a] flex flex-col">
      <div class="p-4 border-b border-[#1a1a1a]">
        <h3 class="text-sm font-semibold text-white">Node Settings</h3>
      </div>
      <div class="flex-1 p-4 space-y-4">
        <div>
          <label class="text-xs text-[#666] mb-1 block">Label</label>
          <input
            type="text"
            :value="nodes.find(n => n.id === selectedNode)?.label"
            class="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
          />
        </div>
        <div>
          <label class="text-xs text-[#666] mb-1 block">Position</label>
          <div class="flex gap-2">
            <input
              type="number"
              placeholder="X"
              :value="getNodeX(nodes.find(n => n.id === selectedNode) || { position: [0, 0] })"
              class="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
            />
            <input
              type="number"
              placeholder="Y"
              :value="getNodeY(nodes.find(n => n.id === selectedNode) || { position: [0, 0] })"
              class="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a]"
            />
          </div>
        </div>
        <div>
          <label class="text-xs text-[#666] mb-1 block">Configuration</label>
          <textarea
            rows="4"
            placeholder="Enter node configuration..."
            class="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white text-sm focus:outline-none focus:border-[#2a2a2a] resize-none"
          ></textarea>
        </div>
      </div>
      <div class="p-4 border-t border-[#1a1a1a]">
        <button class="w-full px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm">
          Delete Node
        </button>
      </div>
    </div>
  </div>
</template>
