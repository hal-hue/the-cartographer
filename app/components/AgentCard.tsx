'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, Clock, Wrench, AlertTriangle, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  status: string
  health?: string
  capabilities: string[]
  outputs: string[]
  lastUpdate: string
  description: string
  workspaces: string[]
  schedule?: string
  blocker?: string
}

interface AgentCardProps {
  agent: Agent
}

const statusConfig = {
  active: {
    badge: 'bg-green-100 text-green-800 border-green-200',
    dot: 'bg-green-500',
    icon: CheckCircle,
    border: 'border-gray-200'
  },
  building: {
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    icon: Wrench,
    border: 'border-blue-200'
  },
  planned: {
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dot: 'bg-yellow-400',
    icon: Clock,
    border: 'border-yellow-100'
  },
  deprecated: {
    badge: 'bg-gray-100 text-gray-800 border-gray-200',
    dot: 'bg-gray-400',
    icon: Clock,
    border: 'border-gray-200'
  }
}

const healthConfig = {
  healthy: {
    badge: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle,
    label: 'Healthy'
  },
  warning: {
    badge: 'bg-orange-100 text-orange-700',
    icon: AlertTriangle,
    label: 'Warning'
  },
  error: {
    badge: 'bg-red-100 text-red-700',
    icon: XCircle,
    label: 'Error'
  },
  unknown: {
    badge: 'bg-gray-100 text-gray-600',
    icon: AlertCircle,
    label: 'Unknown'
  }
}

export function AgentCard({ agent }: AgentCardProps) {
  const [expanded, setExpanded] = useState(false)

  const sConfig = statusConfig[agent.status as keyof typeof statusConfig] || statusConfig.planned
  const StatusIcon = sConfig.icon
  const isPlanned = agent.status === 'planned'

  const hConfig = agent.health ? healthConfig[agent.health as keyof typeof healthConfig] : null
  const HealthIcon = hConfig?.icon

  return (
    <div className={`bg-white rounded-lg border ${sConfig.border} p-5 ${isPlanned ? 'opacity-80' : 'hover:shadow-md'} transition-shadow ${isPlanned ? 'bg-gray-50/50' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${sConfig.dot}`}></div>
          <h3 className={`text-base font-semibold ${isPlanned ? 'text-gray-600' : 'text-gray-900'}`}>
            {agent.name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {hConfig && HealthIcon && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${hConfig.badge}`}>
              <HealthIcon className="w-3 h-3" />
              {hConfig.label}
            </span>
          )}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${sConfig.badge}`}>
            <StatusIcon className="w-3 h-3" />
            {agent.status}
          </span>
        </div>
      </div>

      {/* Role */}
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{agent.role}</p>

      {/* Description + expand toggle */}
      <div className="mb-3">
        <p className={`text-sm text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>
          {agent.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 flex items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={expanded ? 'Collapse description' : 'Expand description'}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Show more</span>
            </>
          )}
        </button>
      </div>

      {/* Schedule */}
      {agent.schedule && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>{agent.schedule}</span>
        </div>
      )}

      {/* Blocker */}
      {agent.blocker && (
        <div className="flex items-start gap-1.5 text-xs text-orange-600 bg-orange-50 rounded px-2 py-1.5 mb-3">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span><span className="font-medium">Blocker:</span> {agent.blocker}</span>
        </div>
      )}

      {/* Capabilities */}
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.capabilities.slice(0, 3).map((cap, i) => (
          <span key={i} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
            {cap}
          </span>
        ))}
        {agent.capabilities.length > 3 && (
          <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-400 rounded">
            +{agent.capabilities.length - 3} more
          </span>
        )}
      </div>

      {/* Outputs */}
      <div className="text-xs text-gray-500 mb-3">
        <span className="font-medium text-gray-600">Outputs: </span>
        {agent.outputs.slice(0, 2).join(', ')}
        {agent.outputs.length > 2 && ` +${agent.outputs.length - 2} more`}
      </div>

      {/* Last Update */}
      <div className="flex items-center gap-1 text-xs text-gray-400 pt-2 border-t border-gray-100">
        <Calendar className="w-3 h-3" />
        Updated {agent.lastUpdate}
      </div>
    </div>
  )
}
