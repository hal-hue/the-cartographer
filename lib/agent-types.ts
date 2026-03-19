// Agent data structure and types for The Cartographer

export interface Agent {
  id: string
  name: string
  role: string
  status: AgentStatus
  capabilities: string[]
  outputs: string[]
  lastUpdate: string
  description: string
  workspaces: string[]
  schedule?: string
  health?: HealthStatus
  createdBy?: string
  dependencies?: string[]
  metrics?: AgentMetrics
}

export type AgentStatus = 'active' | 'building' | 'planned' | 'deprecated'
export type HealthStatus = 'healthy' | 'warning' | 'error' | 'delivery-issues' | 'unknown'

export interface AgentMetrics {
  tasksCompleted?: number
  uptime?: string
  lastActive?: string
  errorRate?: number
}

export interface AgentDependency {
  from: string
  to: string
  type: 'data' | 'trigger' | 'sequence'
  description?: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  agents: string[]
  steps: WorkflowStep[]
  status: 'active' | 'draft' | 'deprecated'
}

export interface WorkflowStep {
  id: string
  name: string
  agentId: string
  order: number
  inputs: string[]
  outputs: string[]
}

// Future data structure for persistence
export interface CartographerData {
  agents: Agent[]
  workflows: Workflow[]
  dependencies: AgentDependency[]
  lastUpdated: string
  version: string
}

// Status configuration for UI
export const STATUS_CONFIG = {
  active: {
    color: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500',
    label: 'Active'
  },
  building: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    label: 'Building'
  },
  planned: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-500',
    label: 'Planned'
  },
  deprecated: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    dot: 'bg-gray-500',
    label: 'Deprecated'
  }
} as const

// Health status configuration for UI
export const HEALTH_CONFIG = {
  healthy: {
    color: 'text-green-600',
    icon: '✓',
    label: 'Healthy'
  },
  warning: {
    color: 'text-yellow-600',
    icon: '⚠️',
    label: 'Warning'
  },
  error: {
    color: 'text-red-600',
    icon: '❌',
    label: 'Error'
  },
  'delivery-issues': {
    color: 'text-orange-600',
    icon: '📤',
    label: 'Delivery Issues'
  },
  unknown: {
    color: 'text-gray-600',
    icon: '?',
    label: 'Unknown'
  }
} as const

// Utility functions
export function getStatusCounts(agents: Agent[]) {
  return {
    active: agents.filter(a => a.status === 'active').length,
    building: agents.filter(a => a.status === 'building').length,
    planned: agents.filter(a => a.status === 'planned').length,
    deprecated: agents.filter(a => a.status === 'deprecated').length,
    total: agents.length
  }
}

export function searchAgents(agents: Agent[], query: string): Agent[] {
  const lowercaseQuery = query.toLowerCase()
  return agents.filter(agent => 
    agent.name.toLowerCase().includes(lowercaseQuery) ||
    agent.role.toLowerCase().includes(lowercaseQuery) ||
    agent.description.toLowerCase().includes(lowercaseQuery) ||
    agent.capabilities.some(cap => cap.toLowerCase().includes(lowercaseQuery)) ||
    agent.outputs.some(output => output.toLowerCase().includes(lowercaseQuery))
  )
}