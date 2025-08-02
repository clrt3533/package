"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Box, 
  Home, 
  FolderOpen, 
  Layout, 
  User, 
  Settings, 
  LogOut,
  Plus,
  Sparkles
} from "lucide-react"

interface SidebarProps {
  children?: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Templates", href: "/dashboard/templates", icon: Layout },
  { name: "AI Assistant", href: "/dashboard/ai", icon: Sparkles },
]

const secondaryNavigation = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ children }: SidebarProps) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-slate-200 shadow-sm">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b border-slate-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PackagePro</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 flex flex-col py-6">
            {/* Primary Navigation */}
            <nav className="px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        mr-3 h-5 w-5 flex-shrink-0
                        ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-500'}
                      `}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* Quick Actions */}
            <div className="px-3 mt-6">
              <Link
                href="/dashboard/projects/new"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </div>

            {/* Secondary Navigation */}
            <nav className="px-3 mt-8 space-y-1">
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Account
              </h3>
              <div className="mt-2 space-y-1">
                {secondaryNavigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${isActive 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }
                      `}
                    >
                      <item.icon
                        className={`
                          mr-3 h-5 w-5 flex-shrink-0
                          ${isActive ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500'}
                        `}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex-shrink-0 border-t border-slate-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {session?.user?.image ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-slate-600" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {session?.user?.email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-3 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button (for responsive design) */}
      <div className="md:hidden">
        {/* Mobile sidebar would go here - for now just show content */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b border-slate-200 px-4 py-3">
            <Link href="/" className="flex items-center space-x-2">
              <Box className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-slate-900">PackagePro</span>
            </Link>
          </div>
          <main className="flex-1 overflow-y-auto bg-slate-50">
            {children}
          </main>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  )
}