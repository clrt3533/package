"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard/layout"
import { 
  Search, 
  Filter, 
  Layout, 
  Crown,
  Eye,
  Plus,
  Star,
  Grid3X3,
  List
} from 'lucide-react'
import { Canvas3D } from "@/components/3d/Canvas3D"
import { getPackageModel } from "@/components/3d/PackagingModels"

interface Template {
  id: string
  name: string
  category: string
  type: 'Box' | 'Bag' | 'Bottle' | 'Can' | 'Pouch' | 'Label'
  isPremium: boolean
  rating: number
  downloads: number
  thumbnail: string
  description: string
  tags: string[]
}

const categories = [
  { id: 'all', name: 'All Templates', count: 147 },
  { id: 'food-beverage', name: 'Food & Beverage', count: 42 },
  { id: 'cosmetics', name: 'Cosmetics & Beauty', count: 28 },
  { id: 'electronics', name: 'Electronics', count: 18 },
  { id: 'fashion', name: 'Fashion & Apparel', count: 22 },
  { id: 'health', name: 'Health & Wellness', count: 19 },
  { id: 'home-garden', name: 'Home & Garden', count: 18 }
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock templates data
  const templates: Template[] = [
    {
      id: "1",
      name: "Premium Coffee Bag",
      category: "food-beverage",
      type: "Bag",
      isPremium: true,
      rating: 4.8,
      downloads: 1247,
      thumbnail: "/api/placeholder/300/200",
      description: "Elegant coffee bag design with modern typography and premium feel",
      tags: ["coffee", "premium", "modern", "typography"]
    },
    {
      id: "2",
      name: "Skincare Product Box",
      category: "cosmetics",
      type: "Box",
      isPremium: false,
      rating: 4.6,
      downloads: 892,
      thumbnail: "/api/placeholder/300/200",
      description: "Clean and minimal skincare packaging with luxury appeal",
      tags: ["skincare", "minimal", "luxury", "clean"]
    },
    {
      id: "3",
      name: "Energy Drink Can",
      category: "food-beverage",
      type: "Can",
      isPremium: true,
      rating: 4.9,
      downloads: 2156,
      thumbnail: "/api/placeholder/300/200",
      description: "Bold and energetic can design perfect for sports drinks",
      tags: ["energy", "sports", "bold", "vibrant"]
    },
    {
      id: "4",
      name: "Organic Tea Box",
      category: "food-beverage",
      type: "Box",
      isPremium: false,
      rating: 4.5,
      downloads: 567,
      thumbnail: "/api/placeholder/300/200",
      description: "Natural and earthy tea packaging with organic elements",
      tags: ["tea", "organic", "natural", "earthy"]
    },
    {
      id: "5",
      name: "Perfume Bottle Label",
      category: "cosmetics",
      type: "Label",
      isPremium: true,
      rating: 4.7,
      downloads: 1089,
      thumbnail: "/api/placeholder/300/200",
      description: "Elegant perfume label with gold accents and sophisticated design",
      tags: ["perfume", "elegant", "luxury", "gold"]
    },
    {
      id: "6",
      name: "Vitamin Supplement Bottle",
      category: "health",
      type: "Bottle",
      isPremium: false,
      rating: 4.4,
      downloads: 723,
      thumbnail: "/api/placeholder/300/200",
      description: "Clean health supplement packaging with trust-building design",
      tags: ["health", "supplements", "clean", "medical"]
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const TemplateCard = ({ template }: { template: Template }) => {
    const ModelComponent = getPackageModel(template.type)
    
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
        <div className="aspect-video rounded-t-lg relative overflow-hidden">
          <Canvas3D 
            className="w-full h-full"
            enableControls={false}
            autoRotate={false}
            enableZoom={false}
          >
            <ModelComponent 
              color={template.tags.includes('coffee') ? '#8B4513' : 
                     template.tags.includes('energy') ? '#E74C3C' : 
                     template.tags.includes('perfume') ? '#9B59B6' : 
                     template.tags.includes('health') ? '#3498DB' : '#ffffff'}
              autoRotate={true}
              scale={0.8}
            />
          </Canvas3D>
        </div>
        {template.isPremium && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 bg-white rounded-md shadow-sm">
            <Eye className="h-4 w-4 text-slate-600" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/dashboard/projects/new?template=${template.id}`}
            className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            Use Template
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">{template.name}</h3>
        <p className="text-xs text-slate-500 mb-2">{template.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-slate-600 ml-1">{template.rating}</span>
            </div>
            <span className="text-xs text-slate-500">{template.downloads} downloads</span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            {template.type}
          </span>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout title="Templates">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
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
          </div>
        </div>

        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-slate-400">{category.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Premium Upgrade */}
            <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg border border-yellow-200 p-4">
              <div className="flex items-center mb-2">
                <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                <h3 className="text-sm font-semibold text-yellow-900">Go Premium</h3>
              </div>
              <p className="text-xs text-yellow-800 mb-3">
                Unlock 50+ premium templates with advanced designs and commercial licenses.
              </p>
              <button className="w-full bg-yellow-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-yellow-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1">
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Layout className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No templates found</h3>
                <p className="text-slate-500">
                  {searchQuery 
                    ? `No templates match "${searchQuery}". Try a different search term.`
                    : 'No templates available in this category.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}