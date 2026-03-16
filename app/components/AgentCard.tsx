import { Calendar, Users, CheckCircle, Clock, Wrench } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  status: 'active' | 'building' | 'planned' | 'deprecated'
  capabilities: string[]
  outputs: string[]
  lastUpdate: string
  description: string
  workspaces: string[]
}

interface AgentCardProps {
  agent: Agent
  onClick: () => void
}

const statusConfig = {
  active: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: CheckCircle,
    dot: 'bg-green-500'
  },
  building: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    icon: Wrench,
    dot: 'bg-blue-500'
  },
  planned: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    icon: Clock,
    dot: 'bg-yellow-500'
  },
  deprecated: { 
    color: 'bg-gray-100 text-gray-800 border-gray-200', 
    icon: Clock,
    dot: 'bg-gray-500'
  }
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const config = statusConfig[agent.status]
  const StatusIcon = config.icon

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${config.dot}`}></div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {agent.name}
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${config.color}`}>
          <StatusIcon className="w-3 h-3" />
          {agent.status}
        </span>
      </div>

      {/* Role */}
      <p className="text-sm font-medium text-gray-600 mb-2">{agent.role}</p>
      
      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {agent.description}
      </p>

      {/* Capabilities */}
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Capabilities
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {agent.capabilities.slice(0, 3).map((capability, index) => (
            <span 
              key={index}
              className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
            >
              {capability}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
              +{agent.capabilities.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Outputs Preview */}
      <div className="mb-4">
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Key Outputs
          </span>
        </div>
        <div className="text-xs text-gray-600">
          {agent.outputs.slice(0, 2).join(', ')}
          {agent.outputs.length > 2 && ` +${agent.outputs.length - 2} more`}
        </div>
      </div>

      {/* Last Update */}
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        Updated {agent.lastUpdate}
      </div>
    </div>
  )
}