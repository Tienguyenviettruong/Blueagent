import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Agent, Team, DebateArgument, KnowledgeItem, WorkflowNode } from '@/types'
import { invoke } from '@tauri-apps/api/tauri'

export const useAgentStore = defineStore('agent', () => {
  const agents = ref<Agent[]>([])
  const teams = ref<Team[]>([])
  const debateArguments = ref<DebateArgument[]>([])
  const knowledgeItems = ref<KnowledgeItem[]>([])
  const workflowNodes = ref<WorkflowNode[]>([])
  const isLoading = ref(false)

  const activeAgent = computed(() => agents.value[0])
  const activeTeam = computed(() => teams.value[0])

  async function fetchAgents() {
    isLoading.value = true
    try {
      const result = await invoke<Agent[]>('get_agents')
      agents.value = result
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchTeams() {
    isLoading.value = true
    try {
      const result = await invoke<Team[]>('get_teams')
      teams.value = result
    } catch (error) {
      console.error('Failed to fetch teams:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDebateArguments(debateId: string) {
    isLoading.value = true
    try {
      const result = await invoke<DebateArgument[]>('get_debate_arguments', { debate_id: debateId })
      debateArguments.value = result
    } catch (error) {
      console.error('Failed to fetch debate arguments:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function submitDebateArgument(argument: DebateArgument) {
    isLoading.value = true
    try {
      const result = await invoke<DebateArgument>('submit_debate_argument', { argument })
      debateArguments.value.push(result)
    } catch (error) {
      console.error('Failed to submit debate argument:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function searchKnowledge(query: string) {
    isLoading.value = true
    try {
      const result = await invoke<KnowledgeItem[]>('search_knowledge', { query })
      knowledgeItems.value = result
    } catch (error) {
      console.error('Failed to search knowledge:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchWorkflowNodes(workflowId: string) {
    isLoading.value = true
    try {
      const result = await invoke<WorkflowNode[]>('get_workflow_nodes', { workflow_id: workflowId })
      workflowNodes.value = result
    } catch (error) {
      console.error('Failed to fetch workflow nodes:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    agents,
    teams,
    debateArguments,
    knowledgeItems,
    workflowNodes,
    isLoading,
    activeAgent,
    activeTeam,
    fetchAgents,
    fetchTeams,
    fetchDebateArguments,
    submitDebateArgument,
    searchKnowledge,
    fetchWorkflowNodes
  }
})