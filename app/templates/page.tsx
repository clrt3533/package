import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Box, Crown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

async function getTemplates() {
  const templates = await prisma.template.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return templates
}

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Box className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">PackagePro</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/templates" className="text-sm font-medium text-primary">
                Templates
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Template Gallery
            </h1>
            <p className="text-gray-600 text-lg">
              Choose from {templates.length} professional packaging templates
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Boxes</Button>
            <Button variant="outline" size="sm">Bottles</Button>
            <Button variant="outline" size="sm">Bags</Button>
            <Button variant="outline" size="sm">Pouches</Button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Template Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                  <Box className="h-16 w-16 text-gray-400" />
                  {template.isPremium && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 capitalize">
                    {template.type}
                  </p>
                  <Button className="w-full" size="sm">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {templates.length === 0 && (
            <div className="text-center py-12">
              <Box className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No templates found
              </h3>
              <p className="text-gray-500">
                Templates will appear here once they're added to the database.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}