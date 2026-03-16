import { X, Plus } from 'lucide-react'
import { useState } from 'react'

interface AddAgentModalProps {
  onClose: () => void
  onAdd: (agent: any) => void
}

export function AddAgentModal({ onClose, onAdd }: AddAgentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    status: 'planned' as 'active' | 'building' | 'planned' | 'deprecated',
    description: '',
    capabilities: '',
    outputs: '',
    workspaces: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.role) {
      alert('Please fill in required fields (Name and Role)')
      return
    }

    const agentData = {
      ...formData,
      capabilities: formData.capabilities.split(',').map(s => s.trim()).filter(s => s),
      outputs: formData.outputs.split(',').map(s => s.trim()).filter(s => s),
      workspaces: formData.workspaces.split(',').map(s => s.trim()).filter(s => s)
    }

    onAdd(agentData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Agent</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Content Creator"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Content Generation Specialist"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="planned">Planned</option>
              <option value="building">Building</option>
              <option value="active">Active</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of what this agent does..."
            />
          </div>

          {/* Capabilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capabilities
            </label>
            <textarea
              value={formData.capabilities}
              onChange={(e) => setFormData({...formData, capabilities: e.target.value})}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter capabilities separated by commas (e.g., Writing, Editing, SEO)"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple capabilities with commas</p>
          </div>

          {/* Outputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Outputs
            </label>
            <textarea
              value={formData.outputs}
              onChange={(e) => setFormData({...formData, outputs: e.target.value})}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Where does this agent's work go? (e.g., Blog posts, Social media, Reports)"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple outputs with commas</p>
          </div>

          {/* Workspaces */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workspaces
            </label>
            <textarea
              value={formData.workspaces}
              onChange={(e) => setFormData({...formData, workspaces: e.target.value})}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Where does this agent operate? (e.g., Content Management System, Social Platforms)"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple workspaces with commas</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Agent
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}