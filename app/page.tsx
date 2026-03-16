'use client'

import { useState } from 'react'
import { AgentCard } from './components/AgentCard'
import { AgentDetail } from './components/AgentDetail'
import { AddAgentModal } from './components/AddAgentModal'
import { Plus, Search, Filter } from 'lucide-react'

// Sample data structure for agents
const initialAgents = [
  {
    id: 'hal',
    name: 'Hal',
    role: 'Executive Assistant',
    status: 'active',
    capabilities: ['Transcription', 'Decision Capture', 'Memory Management', 'Coordination'],
    outputs: ['MEMORY.md', 'Daily transcripts', 'Meeting summaries'],
    lastUpdate: '2026-03-16',
    description: 'Institutional memory and central nervous system. Joins calls, captures decisions, surfaces insights.',
    workspaces: ['Main Session', 'Memory Files', 'Heartbeat Monitoring']
  },
  {
    id: 'cartographer',
    name: 'The Cartographer',
    role: 'Visualization & Mapping',
    status: 'active',
    capabilities: ['Agent Visualization', 'Workflow Mapping', 'Stakeholder Reports'],
    outputs: ['Interactive Dashboard', 'Agent Registry', 'Weekly Reviews'],
    lastUpdate: '2026-03-16',
    description: 'Maps all AI agents and workflows for organizational visibility.',
    workspaces: ['Web Dashboard', 'Agent Registry', 'Notion Integration']
  },
  {
    id: 'the-scout',
    name: 'The Scout',
    role: 'Competitive Intelligence Specialist',
    status: 'active',
    capabilities: ['Web Research', 'Competitive Analysis', 'Trend Identification', 'Newsletter Creation', 'Strategic Insights'],
    outputs: ['Weekly Competitive Reports', 'Tax Tech Weekly Newsletter', 'Notion Intelligence Archives', 'Slack Notifications'],
    lastUpdate: '2026-03-16',
    description: 'Monitors 21 competitors and industry trends. Delivers weekly competitive intelligence and Tax Tech Weekly newsletter to team.',
    workspaces: ['Notion Databases', 'Slack Channel', 'Web Research', 'Industry Monitoring']
  },
  {
    id: 'the-voice',
    name: 'The Voice',
    role: 'Customer Intelligence Specialist',
    status: 'planned',
    capabilities: ['Feedback Aggregation', 'Sentiment Analysis', 'Usage Correlation', 'Pattern Recognition', 'Roadmap Alignment', 'Sprint Optimization'],
    outputs: ['Sprint Planning Reports', 'Customer Insight Dashboards', 'Product Team Intelligence', 'TBD: Output formats to be defined'],
    lastUpdate: '2026-03-16',
    description: 'Amplifies customer voices into actionable product intelligence. Aggregates feedback from support, CRM, and feedback platforms to optimize development sprints.',
    workspaces: ['Intercom Integration', 'HubSpot Connection', 'Canny Platform (Maybe)', 'TBD: Dependencies to be defined']
  },
  {
    id: 'the-connector',
    name: 'The Connector',
    role: 'Sales Intelligence Specialist',
    status: 'planned',
    capabilities: ['Pre-Call Research', 'Company Intelligence', 'Personal Background Analysis', 'Tax Pain Point Identification', 'Conversion Optimization', 'CRM Enrichment'],
    outputs: ['CRM Brief Updates', 'Quick Reference Cards', 'On-Demand Deep Dives', 'Personalized Conversation Starters'],
    lastUpdate: '2026-03-16',
    description: 'Connects sales reps with prospects through comprehensive pre-call intelligence. Researches company and personal backgrounds using public sources to optimize conversion.',
    workspaces: ['HubSpot/Intercom CRM', 'Public Web Research', 'Real-time Call Triggers', 'TBD: Specific integrations']
  },
  {
    id: 'the-librarian',
    name: 'The Librarian',
    role: 'Sales Knowledge & Objection Specialist',
    status: 'planned',
    capabilities: ['Call Analysis', 'Objection Identification', 'Knowledge Gap Detection', 'Living Document Management', 'Pattern Recognition', 'Proactive Objection Prediction'],
    outputs: ['Notion Knowledge Base Updates', 'CRM Objection Predictions', 'Sales Enablement Alerts', 'Weekly Reports (Future)', 'On-Demand Consultation'],
    lastUpdate: '2026-03-16',
    description: 'Curates institutional sales knowledge through real-time call analysis. Identifies objections, updates living documents, and predicts challenges based on prospect patterns.',
    workspaces: ['Fireflies Integration', 'Notion Knowledge Base', 'CRM Auto-Updates', 'Post-Connector Workflow']
  }
]

export default function Dashboard() {
  const [agents, setAgents] = useState(initialAgents)
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const addAgent = (agentData: any) => {
    const newAgent = {
      id: agentData.name.toLowerCase().replace(/\s+/g, '-'),
      ...agentData,
      lastUpdate: new Date().toISOString().split('T')[0]
    }
    setAgents([...agents, newAgent])
  }

  const updateAgent = (updatedAgent: any) => {
    setAgents(agents.map(agent => 
      agent.id === updatedAgent.id ? updatedAgent : agent
    ))
  }

  const statusCounts = {
    active: agents.filter(a => a.status === 'active').length,
    building: agents.filter(a => a.status === 'building').length,
    planned: agents.filter(a => a.status === 'planned').length,
    deprecated: agents.filter(a => a.status === 'deprecated').length
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Agent Observatory
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          High-level view of AI agents, capabilities, and organizational value
        </p>
        
        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
            <div className="text-sm text-green-800">Active Agents</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.building}</div>
            <div className="text-sm text-blue-800">Building</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.planned}</div>
            <div className="text-sm text-yellow-800">Planned</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.deprecated}</div>
            <div className="text-sm text-gray-800">Deprecated</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents, capabilities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Agent
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="dashboard-grid">
        {filteredAgents.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent}
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetail
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onUpdate={updateAgent}
        />
      )}

      {/* Add Agent Modal */}
      {showAddModal && (
        <AddAgentModal
          onClose={() => setShowAddModal(false)}
          onAdd={addAgent}
        />
      )}
    </div>
  )
}