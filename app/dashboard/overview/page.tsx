"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { 
  Plus, 
  FolderOpen, 
  Layout, 
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  Sparkles 
} from 'lucide-react'

// Force dynamic rendering for authentication-protected pages
export const dynamic = 'force-dynamic'

export default function DashboardOverview() {
  const { data: session } = useSession()

  const recentProjects = [
    {
      id: "1",
      name: "Coffee Package Design",
      template: "Coffee Bag Template",
      lastModified: "2 hours ago",
      status: "In Progress"
    },
    {
      id: "2", 
      name: "Skincare Product Line",
      template: "Cosmetics Box Template",
      lastModified: "1 day ago",
      status: "Complete"
    }
  ]

  const quickStats = [
    {
      name: "Total Projects",
      value: "12",
      change: "+3 this week",
      icon: FolderOpen,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      name: "Templates Used",
      value: "8",
      change: "+2 this month",
      icon: Layout,
      color: "text-green-600", 
      bg: "bg-green-100"
    },
    {
      name: "AI Suggestions",
      value: "47",
      change: "+12 this week",
      icon: Sparkles,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      name: "Credits Left",
      value: "8",
      change: "out of 10",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Designer'}! 👋
          </h1>
          <p className="text-slate-600">
            Ready to create amazing packaging designs with AI? Let's continue where you left off.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center">
                <div className={`flex-shrink-0 p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                    <p className="ml-2 text-sm text-slate-500">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Projects</h2>
                  <Link 
                    href="/dashboard/projects"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentProjects.length > 0 ? (
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <div key={project.id} className="flex items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FolderOpen className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-slate-900">{project.name}</h3>
                          <p className="text-sm text-slate-500">{project.template}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-slate-400 mr-1" />
                            <span className="text-xs text-slate-500">{project.lastModified}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            project.status === 'Complete' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-slate-900 mb-2">No projects yet</h3>
                    <p className="text-sm text-slate-500 mb-4">Get started by creating your first packaging design</p>
                    <Link
                      href="/dashboard/projects/new"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Project
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/dashboard/projects/new"
                  className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center">
                    <Plus className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">New Project</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                </Link>
                
                <Link
                  href="/dashboard/templates"
                  className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center">
                    <Layout className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">Browse Templates</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                </Link>

                <Link
                  href="/dashboard/ai"
                  className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-slate-900">AI Assistant</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
              <p className="text-sm text-blue-800 mb-3">
                Use our AI assistant to get design suggestions based on your brand colors and style preferences.
              </p>
              <Link
                href="/dashboard/ai"
                className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
              >
                Try AI Assistant
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}