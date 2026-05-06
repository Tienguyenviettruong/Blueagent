export interface Personality {
  creativity: number
  caution: number
  verbosity: number
  empathy: number
}

export interface AgentRole {
  name: string
  responsibilities: string[]
  expertise: string[]
  collaboration_style: 'proposer' | 'critic' | 'synthesizer' | 'executor'
}

export interface ProviderBinding {
  primary: string
  fallback: string[]
  context_window: number
  strengths: string[]
}

export interface Agent {
  id: string
  name: string
  role: AgentRole
  personality: Personality
  provider: ProviderBinding
  skills: string[]
  memory_config: MemoryConfig
  debate_config: DebateConfig
  rules: Rule[]
}

export interface TeamMember {
  agent_id: string
  role: AgentRole
  permissions: Permission[]
  active_debates: string[]
  contribution_score: number
}

export interface Team {
  id: string
  name: string
  purpose: string
  instance_id: string
  members: TeamMember[]
  debate_config: DebateConfig
  shared_knowledge: SharedKnowledgeScope
  governance: GovernanceRules
}

export interface DebateConfig {
  debate_id: string
  topic: string
  goal: string
  participants: string[]
  roles: DebateRoles
  max_rounds: number
  time_limit?: number
  consensus_threshold: number
  voting_enabled: boolean
  moderator?: string
  knowledge_scope: string[]
}

export interface DebateRoles {
  proposer: string
  critics: string[]
  synthesizer?: string
  witnesses?: string[]
}

export interface Evidence {
  type: 'data' | 'example' | 'reference' | 'calculation'
  content: string
  source?: string
  relevance_score: number
}

export interface ReasoningChain {
  premises: string[]
  inference: string
  conclusion: string
  logical_connectors: string[]
}

export interface Objection {
  argument_id: string
  objector: string
  type: ObjectionType
  content: string
  strength: number
}

export type ObjectionType =
  | 'factual_error'
  | 'logical_flaw'
  | 'unfounded_assumption'
  | 'missing_context'
  | 'alternative_interpretation'

export type ArgumentType =
  | 'proposal'
  | 'critique'
  | 'evidence'
  | 'counter-example'
  | 'analogy'
  | 'refinement'
  | 'consensus'

export interface DebateArgument {
  id: string
  debate_id: string
  author: string
  type: ArgumentType
  claim: string
  evidence: Evidence[]
  reasoning: ReasoningChain
  strength: number
  objections: Objection[]
  timestamp: number
}

export interface Vote {
  voter: string
  position: 'approve' | 'reject' | 'abstain' | 'modify'
  rationale: string
  weight: number
}

export interface Dissent {
  dissenters: string[]
  position: string
  concerns: string[]
  severity: 'minor' | 'major' | 'blocking'
}

export interface ConsensusResult {
  reached: boolean
  decision?: string
  confidence: number
  votes?: Vote[]
  dissenting_opinions?: Dissent[]
  synthesis?: string
}

export interface Brain {
  id: string
  name: string
  description: string
  owner_scope: 'agent' | 'team' | 'organization'
  storage: StorageConfig
  indexing: IndexingConfig
  sync_config?: ObsidianSyncConfig
}

export interface ItemMetadata {
  author: string
  domain: string[]
  language: string
  complexity: 'simple' | 'moderate' | 'complex'
  use_cases: string[]
  related_tasks: string[]
  validity_period?: {
    start: number
    end?: number
  }
}

export interface Link {
  target_id: string
  link_type: 'references' | 'elaborates' | 'contradicts' | 'depends_on'
  context?: string
}

export interface Provenance {
  origin: 'agent_interaction' | 'manual_entry' | 'imported' | 'web_research'
  agent_id?: string
  session_id?: string
  confidence_modifiers?: string[]
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  format: 'markdown' | 'structured' | 'code' | 'data'
  metadata: ItemMetadata
  embeddings: number[]
  links: Link[]
  tags: string[]
  confidence: number
  source: Provenance
  version: number
  created_at: number
  updated_at: number
}

export interface KnowledgeGraph {
  brain_id: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  metadata: GraphMetadata
}

export interface GraphNode {
  id: string
  label: string
  type: 'concept' | 'procedure' | 'decision' | 'agent_insight'
  properties: Record<string, unknown>
  centrality_score?: number
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  type: EdgeType
  weight: number
  properties?: Record<string, unknown>
}

export type EdgeType =
  | 'references'
  | 'elaborates'
  | 'depends_on'
  | 'contradicts'
  | 'similar_to'
  | 'part_of'
  | 'evolves_from'

export interface WorkingMemory {
  agent_id: string
  session_id: string
  current_context: ConversationContext
  active_goals: Goal[]
  immediate_task?: Task
  scratchpad: Scratchpad
  ttl: number
}

export interface ShortTermMemory {
  agent_id: string
  session_history: ConversationTurn[]
  recent_insights: Insight[]
  task_fragments: TaskFragment[]
  decay_policy: DecayPolicy
  consolidation_threshold: number
}

export interface LongTermMemory {
  brain_id: string
  retrieval_strategy: RetrievalStrategy
  retention_policy: RetentionPolicy
  capacity: number
}

export interface ProviderConfig {
  id: string
  name: string
  type: ProviderType
  endpoint: string
  credentials: CredentialRef
  capabilities: ProviderCapabilities
  limits: ProviderLimits
  cost_config: CostConfig
  status: 'active' | 'inactive' | 'degraded'
}

export type ProviderType =
  | 'claude'
  | 'gemini'
  | 'codex'
  | 'openai'
  | 'openrouter'
  | 'ollama'
  | 'custom'

export interface MCPTool {
  id: string
  name: string
  description: string
  version: string
  category: ToolCategory
  input_schema: Record<string, unknown>
  output_schema: Record<string, unknown>
  permissions: ToolPermission[]
  cost_estimate: CostEstimate
  execution_mode: 'sync' | 'async' | 'streaming'
  stateful: boolean
}

export type ToolCategory =
  | 'team_management'
  | 'knowledge'
  | 'document'
  | 'code'
  | 'research'
  | 'communication'
  | 'automation'
  | 'custom'

export interface DAGNode {
  id: string
  type: NodeType
  label: string
  position: { x: number; y: number }
  config: Record<string, unknown>
  error_handling: ErrorHandlingConfig
}

export type NodeType =
  | 'agent_task'
  | 'debate_session'
  | 'decision'
  | 'parallel_split'
  | 'parallel_join'
  | 'human_approval'
  | 'tool_execution'
  | 'knowledge_query'
  | 'transform'
  | 'merge'
  | 'delay'
  | 'subworkflow'

export interface DAGEdge {
  id: string
  source: string
  target: string
  condition?: EdgeCondition
  label?: string
}

export interface iFlow {
  id: string
  name: string
  description: string
  version: string
  status: 'draft' | 'active' | 'archived'
  graph: DAGGraph
  config: WorkflowConfig
  variables: VariableScope
  metadata: WorkflowMetadata
}

export interface DAGGraph {
  nodes: DAGNode[]
  edges: DAGEdge[]
  entry_point: string
  exit_points: string[]
}

interface MemoryConfig {}
interface Rule {}
interface Permission {}
interface SharedKnowledgeScope {}
interface GovernanceRules {}
interface StorageConfig {}
interface IndexingConfig {}
interface ObsidianSyncConfig {}
interface ConversationContext {}
interface Goal {}
interface Task {}
interface Scratchpad {}
interface ConversationTurn {}
interface Insight {}
interface TaskFragment {}
interface DecayPolicy {}
interface RetrievalStrategy {}
interface RetentionPolicy {}
interface CredentialRef {}
interface ProviderCapabilities {}
interface ProviderLimits {}
interface CostConfig {}
interface ToolPermission {}
interface CostEstimate {}
interface EdgeCondition {}
interface ErrorHandlingConfig {}
interface WorkflowConfig {}
interface VariableScope {}
interface WorkflowMetadata {}
interface GraphMetadata {}
