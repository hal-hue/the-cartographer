import { X, Edit2, Save, Cancel, Users, CheckCircle, MapPin, Calendar } from 'lucide-react'
import { useState } from 'react'

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

interface AgentDetailProps {
  agent: Agent
  onClose: () => void
  onUpdate: (agent: Agent) => void
}

export function AgentDetail({ agent, onClose, onUpdate }: AgentDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(agent)

  const handleSave = () => {
    onUpdate({
      ...editData,
      lastUpdate: new Date().toISOString().split('T')[0]
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(agent)
    setIsEditing(false)
  }

  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    building: 'bg-blue-100 text-blue-800 border-blue-200',
    planned: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    deprecated: 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="border border-gray-300 rounded px-3 py-1 text-xl font-bold"
                />
              ) : (
                agent.name
              )}
            </h2>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${statusColors[agent.status]}`}>
              {isEditing ? (
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value as Agent['status']})}
                  className="bg-transparent border-none outline-none text-sm"
                >
                  <option value="active">Active</option>
                  <option value="building">Building</option>
                  <option value="planned">Planned</option>
                  <option value="deprecated">Deprecated</option>
                </select>
              ) : (
                agent.status
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  <Cancel className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.role}
                onChange={(e) => setEditData({...editData, role: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-900 font-medium">{agent.role}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            {isEditing ? (
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <p className="text-gray-700">{agent.description}</p>
            )}
          </div>

          {/* Capabilities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Capabilities</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editData.capabilities.join(', ')}
                onChange={(e) => setEditData({
                  ...editData, 
                  capabilities: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                placeholder="Enter capabilities separated by commas"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((capability, index) => (
                  <span 
                    key={index}
                    className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Outputs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Key Outputs</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editData.outputs.join(', ')}
                onChange={(e) => setEditData({
                  ...editData, 
                  outputs: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                placeholder="Enter outputs separated by commas"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <ul className="space-y-1">
                {agent.outputs.map((output, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    {output}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Workspaces */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900">Workspaces</h3>
            </div>
            {isEditing ? (
              <textarea
                value={editData.workspaces.join(', ')}
                onChange={(e) => setEditData({
                  ...editData, 
                  workspaces: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                placeholder="Enter workspaces separated by commas"
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {agent.workspaces.map((workspace, index) => (
                  <span 
                    key={index}
                    className="inline-flex px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {workspace}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Last updated: {agent.lastUpdate}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}