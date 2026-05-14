import { AgentCard } from './components/AgentCard'
import ecosystemData from '../data/ecosystem-status.json'

export default function Dashboard() {
  const agents = ecosystemData.agents
  const { statusCounts, healthCounts, lastUpdate } = ecosystemData

  const activeAgents = agents.filter(a => a.status === 'active')
  const plannedAgents = agents.filter(a => a.status === 'planned')

  const lastUpdateFormatted = new Date(lastUpdate).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Observatory</h1>
        <p className="text-sm text-gray-500 mb-6">Last updated: {lastUpdateFormatted}</p>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            <div className="text-sm text-green-800">Active Agents</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.planned}</div>
            <div className="text-sm text-yellow-800">Planned</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-emerald-600">{healthCounts.healthy}</div>
            <div className="text-sm text-emerald-800">Healthy</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">{(healthCounts.warning || 0) + (healthCounts.error || 0)}</div>
            <div className="text-sm text-orange-800">Need Attention</div>
          </div>
        </div>

        {/* Alerts */}
        {ecosystemData.alerts && ecosystemData.alerts.length > 0 && (
          <div className="mb-8 space-y-2">
            {ecosystemData.alerts.map((alert, i) => (
              <div key={i} className={`rounded-lg px-4 py-3 text-sm flex items-start gap-2 ${
                alert.level === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
                alert.level === 'warning' ? 'bg-orange-50 border border-orange-200 text-orange-800' :
                'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                <span className="font-semibold shrink-0">{alert.agent}:</span>
                <span>{alert.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Agents */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          Active Agents
          <span className="text-sm font-normal text-gray-500">({activeAgents.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent as any} />
          ))}
        </div>
      </div>

      {/* Planned Agents */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span>
          Planned Agents
          <span className="text-sm font-normal text-gray-500">({plannedAgents.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plannedAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent as any} />
          ))}
        </div>
      </div>
    </div>
  )
}
