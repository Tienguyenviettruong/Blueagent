// Core Agent Models
export interface Agent {
  id: string
  name: string
  role: string
  provider: string
  creativity: number
  caution: number
  verbosity: number
  empathy: number
}

export interface Team {
  id: string
  name: string
  purpose: string
  members: string[]
}

export interface DebateArgument {
  id: string
  debate_id: string
  author: string
  claim: string
  evidence: string[]
  strength: number
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  tags: string[]
  confidence: number
}

export interface WorkflowNode {
  id: string
  node_type: string
  label: string
  position: [number, number]
}

// --- SPECIFICATION TYPES (From SPEC.md) ---

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

export interface Skill {
  id: string
  name: string
  description: string
}

export interface MemoryConfig {
  working_memory_ttl: number
  short_term_capacity: number
  long_term_brain_id: string
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

export interface Rule {
  id: string
  name: string
  condition: string
  action: string
}

export interface TeamMember {
  agent_id: string
  role: AgentRole
  permissions: string[]
  active_debates: string[]
  contribution_score: number
}

export interface SharedKnowledgeScope {
  scope: 'team' | 'organization' | 'private'
}

export interface GovernanceRules {
  decision_process: string
  permissions: string[]
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

export type ArgumentType =
  | 'proposal'
  | 'critique'
  | 'evidence'
  | 'counter-example'
  | 'analogy'
  | 'refinement'
  | 'consensus'

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

export interface StorageConfig {
  type: 'local' | 'cloud'
  encryption: boolean
}

export interface IndexingConfig {
  embedding_model: string
  chunk_size: number
  overlap: number
}

export interface ObsidianSyncConfig {
  enabled: boolean
  vault_path: string
  sync_direction: 'bidirectional' | 'to_obsidian' | 'from_obsidian'
  conflict_resolution: 'newest_wins' | 'manual' | 'merge'
  include_patterns: string[]
  exclude_patterns: string[]
  auto_sync_interval: number
  frontmatter_mapping: FrontmatterMapping
}

export interface FrontmatterMapping {
  title: string
  tags: string
  created: string
  modified: string
  aliases?: string
  custom_fields: Record<string, string>
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

export interface GraphNode {
  id: string
  label: string
  type: 'concept' | 'procedure' | 'decision' | 'agent_insight'
  properties: Record<string, unknown>
  centrality_score?: number
}

export type EdgeType =
  | 'references'
  | 'elaborates'
  | 'depends_on'
  | 'contradicts'
  | 'similar_to'
  | 'part_of'
  | 'evolves_from'

export interface GraphEdge {
  id: string
  source: string
  target: string
  type: EdgeType
  weight: number
  properties?: Record<string, unknown>
}

export interface GraphMetadata {
  node_count: number
  edge_count: number
  last_updated: number
}

export interface KnowledgeGraph {
  brain_id: string
  nodes: GraphNode[]
  edges: GraphEdge[]
  metadata: GraphMetadata
}

export interface GraphQuery {
  center_id?: string
  hop_distance?: number
  edge_types?: EdgeType[]
  node_types?: string[]
  min_weight?: number
}

export interface ConversationContext {
  turns: number
  topic: string
  participants: string[]
}

export interface Goal {
  id: string
  description: string
  priority: number
  deadline?: number
}

export interface Task {
  id: string
  description: string
  priority: number
  estimated_duration: number
  skills_required: string[]
}

export interface Scratchpad {
  notes: string[]
  code: string[]
  data: Record<string, unknown>
}

export interface WorkingMemory {
  agent_id: string
  session_id: string
  current_context: ConversationContext
  active_goals: Goal[]
  immediate_task?: Task
  scratchpad: Scratchpad
  ttl: number
}

export interface ConversationTurn {
  id: string
  agent_id?: string
  user_id?: string
  content: string
  timestamp: number
}

export interface Insight {
  id: string
  content: string
  source: string
  timestamp: number
  confidence: number
}

export interface TaskFragment {
  id: string
  task_id: string
  content: string
  timestamp: number
}

export interface DecayPolicy {
  type: 'time_based' | 'usage_based'
  half_life: number
}

export interface RetrievalStrategy {
  type: 'semantic' | 'keyword' | 'hybrid'
}

export interface RetentionPolicy {
  max_age_days: number
  min_confidence: number
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

export interface MemorySystem {
  working_memory: WorkingMemory
  short_term_memory: ShortTermMemory
  long_term_memory: LongTermMemory
}

export type ProviderType =
  | 'claude'
  | 'gemini'
  | 'codex'
  | 'openai'
  | 'openrouter'
  | 'ollama'
  | 'custom'

export interface CredentialRef {
  type: 'api_key' | 'oauth'
  id: string
}

export interface ProviderCapabilities {
  max_context_window: number
  supports_streaming: boolean
  supports_tools: boolean
  supports_vision: boolean
  supports_function_calling: boolean
  supported_models: string[]
  custom_capabilities?: Record<string, boolean>
}

export interface RetryPolicy {
  max_retries: number
  initial_delay: number
  multiplier: number
}

export interface ProviderLimits {
  requests_per_minute: number
  tokens_per_minute: number
  max_concurrent_requests: number
  retry_policy: RetryPolicy
}

export interface CostConfig {
  input_cost_per_1k: number
  output_cost_per_1k: number
  currency: string
  budget_limit?: number
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

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ProviderResponse {
  content: string
  usage: {
    input_tokens: number
    output_tokens: number
  }
  model: string
}

export interface ResponseChunk {
  content: string
  done: boolean
}

export interface ToolDefinition {
  name: string
  description: string
  parameters: Record<string, unknown>
}

export interface ToolCall {
  id: string
  name: string
  parameters: Record<string, unknown>
}

export interface ToolResult {
  id: string
  success: boolean
  data: unknown
  error?: string
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  message?: string
  last_checked: number
}

export interface UsageStats {
  requests_count: number
  tokens_used: number
  cost: number
}

export interface BaseProviderAdapter {
  initialize(config: ProviderConfig): Promise<void>
  sendMessage(messages: ChatMessage[]): Promise<ProviderResponse>
  streamMessage(
    messages: ChatMessage[],
    onChunk: (chunk: ResponseChunk) => void
  ): Promise<ProviderResponse>
  listTools(): Promise<ToolDefinition[]>
  executeTool(tool_call: ToolCall): Promise<ToolResult>
  getContextWindow(): number
  estimateTokens(messages: ChatMessage[]): number
  truncateToContext(messages: ChatMessage[], maxTokens: number): ChatMessage[]
  healthCheck(): Promise<HealthStatus>
  getUsageStats(): Promise<UsageStats>
}

export interface ClaudeAdapter extends BaseProviderAdapter {
  useWorkingMemory(): Promise<void>
  resumeSession(sessionId: string): Promise<void>
  setAutoAccept(enabled: boolean): void
}

export interface GeminiAdapter extends BaseProviderAdapter {
  setSafetySettings(settings: Record<string, unknown>): void
  getModelVersion(): string
}

export interface CodexAdapter extends BaseProviderAdapter {
  executeCode(code: string, language: string): Promise<{ success: boolean; output: string }>
  startServer(): Promise<void>
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

export type OperatingMode = 'automatic' | 'assisted' | 'manual'

export type PermissionLevel = 'user' | 'agent' | 'team_lead' | 'admin'

export interface ToolPermission {
  role: PermissionLevel
  modes: OperatingMode[]
  rate_limit?: number
  cost_limit?: number
}

export interface CostEstimate {
  input_tokens: number
  output_tokens: number
  execution_ms: number
  monetary_cost?: number
}

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

export interface ErrorHandlingConfig {
  retry_count: number
  retry_delay: number
  error_action: 'skip' | 'fail' | 'fallback'
  fallback_node?: string
}

export interface EdgeCondition {
  type: 'always' | 'if' | 'else' | 'while'
  expression?: string
  var_mapping?: Record<string, string>
}

export interface DAGEdge {
  id: string
  source: string
  target: string
  condition?: EdgeCondition
  label?: string
}

export interface DAGGraph {
  nodes: DAGNode[]
  edges: DAGEdge[]
  entry_point: string
  exit_points: string[]
}

export interface WorkflowConfig {
  timeout?: number
  max_retries?: number
  error_handling: ErrorHandlingConfig
}

export interface VariableScope {
  variables: Record<string, unknown>
}

export interface WorkflowMetadata {
  created_by: string
  created_at: number
  updated_at: number
  tags: string[]
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

export interface ContextRequest {
  agent_id: string
  task: Task
  include_recent_history: boolean
  include_team_context: boolean
  include_knowledge: boolean
  include_debate_state?: string
  max_tokens: number
}

export interface MemorySnapshot {
  working_memory: WorkingMemory
  short_term_memory: ShortTermMemory
}

export interface ContextBundle {
  system_prompt: string
  conversation_history: ConversationTurn[]
  task_context: Task
  knowledge_context: KnowledgeItem[]
  team_context?: Team
  debate_context?: DebateState
  memory_context: MemorySnapshot
  token_count: number
}

export interface DebateState {
  debate_id: string
  phase: 'opening' | 'evidence' | 'rebuttals' | 'cross_exam' | 'synthesis' | 'conclusion'
  current_round: number
  arguments: DebateArgument[]
  consensus_result?: ConsensusResult
}

export interface QueryFilters {
  brain_ids?: string[]
  domains?: string[]
  tags?: string[]
  date_range?: { start: number; end: number }
  confidence_min?: number
  formats?: string[]
  source?: string[]
}

export interface KnowledgeQuery {
  query: string
  filters?: QueryFilters
  ranking_strategy: 'relevance' | 'recency' | 'confidence' | 'combined'
  max_results: number
  include_context: boolean
  expand_related: boolean
}

export interface RelatedItem {
  id: string
  title: string
  relevance_score: number
}

export interface KnowledgeSearchResult {
  item: KnowledgeItem
  relevance_score: number
  match_highlights: string[]
  context_snippet: string
  related_items: RelatedItem[]
}

export interface DAGNode {
  id: string
  type: NodeType
  label: string
  position: { x: number; y: number }
  config: Record<string, unknown>
  error_handling: ErrorHandlingConfig
}
