import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Agent, Team, DebateArgument, KnowledgeItem, WorkflowNode } from '@/types'
import { invoke } from '@tauri-apps/api/tauri'

export const useAgentStore = defineStore('agent', () => {
  // --- State ---
  const agents = ref<Agent[]>([])
  const teams = ref<Team[]>([])
  const debateArguments = ref<DebateArgument[]>([])
  const knowledgeItems = ref<KnowledgeItem[]>([])
  const workflowNodes = ref<WorkflowNode[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- Computed ---
  const activeAgent = computed(() => agents.value[0])
  const activeTeam = computed(() => teams.value[0])

  // --- Actions ---
  async function fetchAgents() {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<Agent[]>('get_agents')
      agents.value = result
    } catch (err) {
      error.value = String(err)
      console.error('Failed to fetch agents:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTeams() {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<Team[]>('get_teams')
      teams.value = result
    } catch (err) {
      error.value = String(err)
      console.error('Failed to fetch teams:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDebateArguments(debateId: string) {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<DebateArgument[]>('get_debate_arguments', { debate_id: debateId })
      debateArguments.value = result
    } catch (err) {
      error.value = String(err)
      console.error('Failed to fetch debate arguments:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function submitDebateArgument(argument: DebateArgument) {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<DebateArgument>('submit_debate_argument', { argument })
      debateArguments.value.push(result)
    } catch (err) {
      error.value = String(err)
      console.error('Failed to submit debate argument:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function searchKnowledge(query: string) {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<KnowledgeItem[]>('search_knowledge', { query })
      knowledgeItems.value = result
    } catch (err) {
      error.value = String(err)
      console.error('Failed to search knowledge:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchWorkflowNodes(workflowId: string) {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<WorkflowNode[]>('get_workflow_nodes', { workflow_id: workflowId })
      workflowNodes.value = result
    } catch (err) {
      error.value = String(err)
      console.error('Failed to fetch workflow nodes:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function createAgent(agent: Agent) {
    isLoading.value = true
    error.value = null
    try {
      const result = await invoke<Agent>('create_agent', { agent })
      agents.value.push(result)
    } catch (err) {
      error.value = String(err)
      console.error('Failed to create agent:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    agents,
    teams,
    debateArguments,
    knowledgeItems,
    workflowNodes,
    isLoading,
    error,
    // Computed
    activeAgent,
    activeTeam,
    // Actions
    fetchAgents,
    fetchTeams,
    fetchDebateArguments,
    submitDebateArgument,
    searchKnowledge,
    fetchWorkflowNodes,
    createAgent,
  }
})
