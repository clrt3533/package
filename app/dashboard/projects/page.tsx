"use client"

// Force dynamic rendering for authentication-protected pages
export const dynamic = 'force-dynamic'

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { 
  Plus, 
  Search, 
  Filter, 
  FolderOpen, 
  MoreVertical,
  Clock,
  Grid3X3,
  List,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react'

interface Project {
  id: string
  name: string
  template: string
  lastModified: string
  status: 'Draft' | 'In Progress' | 'Complete'
  thumbnail: string
  createdAt: string
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock projects data - in real app this would come from the database
  const projects: Project[] = [
    {
      id: "1",
      name: "Coffee Package Design",
      template: "Coffee Bag Template",
      lastModified: "2 hours ago",
      status: "In Progress",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Skincare Product Line",
      template: "Cosmetics Box Template",
      lastModified: "1 day ago",
      status: "Complete",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2024-01-14"
    },
    {
      id: "3",
      name: "Organic Tea Packaging",
      template: "Tea Box Template",
      lastModified: "3 days ago", 
      status: "Draft",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2024-01-12"
    },
    {
      id: "4",
      name: "Energy Drink Can",
      template: "Can Label Template",
      lastModified: "1 week ago",
      status: "Complete",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2024-01-08"
    },
    {
      id: "5",
      name: "Chocolate Bar Wrapper",
      template: "Candy Bar Template",
      lastModified: "2 weeks ago",
      status: "In Progress",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2024-01-01"
    },
    {
      id: "6",
      name: "Wine Bottle Label",
      template: "Wine Label Template",
      lastModified: "3 weeks ago",
      status: "Draft",
      thumbnail: "/api/placeholder/300/200",
      createdAt: "2023-12-25"
    }
  ]

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.template.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800'
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <FolderOpen className="h-12 w-12 text-slate-400" />
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-white rounded-md shadow-sm">
            <MoreVertical className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-900 truncate pr-2">{project.name}</h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">{project.template}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-500">
            <Clock className="h-3 w-3 mr-1" />
            {project.lastModified}
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Eye className="h-3 w-3" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Edit className="h-3 w-3" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Download className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const ProjectListItem = ({ project }: { project: Project }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-slate-900 truncate">{project.name}</h3>
            <p className="text-sm text-slate-500">{project.template}</p>
            <div className="flex items-center mt-1">
              <Clock className="h-3 w-3 text-slate-400 mr-1" />
              <span className="text-xs text-slate-500">{project.lastModified}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Eye className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Edit className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <DashboardLayout title="Projects">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filter */}
            <button className="flex items-center px-3 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex items-center border border-slate-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            {/* New Project Button */}
            <Link
              href="/dashboard/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Link>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredProjects.map((project) => 
              viewMode === 'grid' ? (
                <ProjectCard key={project.id} project={project} />
              ) : (
                <ProjectListItem key={project.id} project={project} />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-slate-500 mb-6">
              {searchQuery 
                ? `No projects match "${searchQuery}". Try a different search term.`
                : 'Get started by creating your first packaging design project.'
              }
            </p>
            {!searchQuery && (
              <Link
                href="/dashboard/projects/new"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Link>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}