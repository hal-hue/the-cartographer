# 🗺️ The Cartographer

An interactive dashboard for visualizing AI agents, their capabilities, and organizational workflows.

## Overview

The Cartographer provides high-level visibility into your AI agent ecosystem, helping stakeholders understand:

- What agents are active, building, or planned
- Agent capabilities and specializations  
- Where agent outputs are published/used
- Organizational value and workflow coordination

## Features

### 📊 Agent Observatory
- Real-time status overview (Active, Building, Planned, Deprecated)
- Visual agent cards with key information
- Search and filter capabilities
- Executive-friendly dashboards

### 🔍 Detailed Agent Views
- Complete agent profiles with capabilities
- Output destinations and workspace mapping
- Editing capabilities for maintaining accuracy
- Historical tracking of updates

### ➕ Agent Management
- Easy addition of new agents to the registry
- Status tracking and lifecycle management
- Capability and output mapping
- Collaborative maintenance workflow

### 📈 Organizational Insights
- Prevent workflow collisions
- Demonstrate AI team value
- Stakeholder communication tool
- Strategic planning support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd the-cartographer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Usage

### Adding Agents
1. Click "Add Agent" button
2. Fill in agent details:
   - Name and role (required)
   - Current status 
   - Description and capabilities
   - Output destinations
   - Operating workspaces
3. Save to add to registry

### Managing Agents
- Click any agent card to view detailed information
- Use the edit button to update agent details
- Track status changes and capability evolution
- Monitor output destinations

### Dashboard Navigation
- **Status Overview**: High-level metrics at the top
- **Agent Grid**: Visual cards showing all agents
- **Search**: Find agents by name, role, or capabilities
- **Filters**: Focus on specific agent types or statuses

## Weekly Review Workflow

The Cartographer supports organizational maintenance through:

1. **Regular Reviews**: Built-in prompts for weekly updates
2. **Status Tracking**: Easy status changes as agents evolve
3. **Capability Updates**: Track new features and capabilities
4. **Output Mapping**: Ensure visibility into where work products go

## Architecture

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS for clean, professional UI
- **Icons**: Lucide React for consistent iconography
- **Data**: Local state management (expandable to databases)

## Customization

The dashboard is designed to be easily customizable:

- Modify agent data structure in `app/page.tsx`
- Update UI components in `app/components/`
- Extend status types and workflows
- Add new visualization modes

## Roadmap

- [ ] Data persistence (JSON files / database integration)
- [ ] Agent dependency mapping
- [ ] Workflow visualization
- [ ] Export capabilities (PDF reports)
- [ ] Integration with existing project management tools
- [ ] Real-time status updates
- [ ] Analytics and usage metrics

## Contributing

This is an organizational tool designed to grow with your AI agent ecosystem. Contributions and customizations are welcome to match your specific needs.

## The Mission

The Cartographer serves as the organizational nervous system for AI agents - providing visibility, preventing conflicts, and demonstrating value. It's designed to answer the key questions:

- What AI capabilities do we have?
- Where do our agents publish their work?
- How do we prevent duplicate efforts?
- What value are we delivering to the organization?

---

*Built for organizational clarity and stakeholder communication.*