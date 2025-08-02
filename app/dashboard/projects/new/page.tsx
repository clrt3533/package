"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Canvas3D } from "@/components/3d/Canvas3D"
import { getPackageModel, BoxPackage, BagPackage, BottlePackage, CanPackage, PouchPackage } from "@/components/3d/PackagingModels"
import { TextEditor, useTextEditor } from "@/components/editor/TextEditor"
import { ExportSystem, exportUtils } from "@/components/editor/ExportSystem"
import { UndoRedoSystem } from "@/components/editor/UndoRedoSystem"
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Palette, 
  Type, 
  Image, 
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Play,
  Square
} from 'lucide-react'
import Link from "next/link"

// Template data that matches our templates page
const templates = [
  { id: "1", name: "Premium Coffee Bag", type: "Bag", color: "#8B4513" },
  { id: "2", name: "Skincare Product Box", type: "Box", color: "#F8F9FA" },
  { id: "3", name: "Energy Drink Can", type: "Can", color: "#E74C3C" },
  { id: "4", name: "Organic Tea Box", type: "Box", color: "#2ECC71" },
  { id: "5", name: "Perfume Bottle Label", type: "Bottle", color: "#9B59B6" },
  { id: "6", name: "Vitamin Supplement Bottle", type: "Bottle", color: "#3498DB" }
]

export default function NewProjectPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null)
  const [projectName, setProjectName] = useState("")
  const [packageColor, setPackageColor] = useState("#ffffff")
  const [autoRotate, setAutoRotate] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Text editor hook
  const textEditor = useTextEditor()

  // Initialize with template if provided
  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        setSelectedTemplate(template)
        setProjectName(`${template.name} Project`)
        setPackageColor(template.color)
      }
    }
  }, [templateId])

  const renderPackageModel = () => {
    if (!selectedTemplate) {
      return <BoxPackage color={packageColor} autoRotate={autoRotate} />
    }

    const ModelComponent = getPackageModel(selectedTemplate.type)
    return <ModelComponent color={packageColor} autoRotate={autoRotate} />
  }

  // Export handler
  const handleExport = async (options: any) => {
    setIsExporting(true)
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, this would capture the 3D canvas
      // and export based on the selected options
      console.log('Exporting with options:', options)
      
      // Example: Create a simple blob for download
      const canvas = document.querySelector('canvas')
      if (canvas && options.format === 'png') {
        const blob = await exportUtils.exportToPNG(canvas, options)
        exportUtils.downloadFile(blob, `${projectName || 'design'}.png`)
      }
    } finally {
      setIsExporting(false)
    }
  }

  // Current editor state for undo/redo
  const currentEditorState = {
    packageColor,
    textElements: textEditor.textElements,
    selectedTemplate,
    projectName
  }

  // Handle state changes from undo/redo
  const handleStateChange = (state: any) => {
    setPackageColor(state.packageColor)
    setSelectedTemplate(state.selectedTemplate)
    setProjectName(state.projectName)
    // Note: textElements would need to be handled through the textEditor hook
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/projects"
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {selectedTemplate ? `New ${selectedTemplate.name}` : 'New Project'}
              </h1>
              <p className="text-slate-600">Create and customize your packaging design</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <ExportSystem
              onExport={handleExport}
              isExporting={isExporting}
              projectName={projectName || 'Untitled Project'}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Choose Template</h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template)
                      setPackageColor(template.color)
                      if (!projectName) {
                        setProjectName(`${template.name} Project`)
                      }
                    }}
                    className={`w-full text-left p-3 rounded-md border transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-slate-500">{template.type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customization Tools */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Customize Design</h3>
              <div className="space-y-4">
                {/* Color Picker */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">
                    Package Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={packageColor}
                      onChange={(e) => setPackageColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-300"
                    />
                    <input
                      type="text"
                      value={packageColor}
                      onChange={(e) => setPackageColor(e.target.value)}
                      className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm"
                    />
                  </div>
                </div>

                {/* Quick Tools */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center p-2 border border-slate-300 rounded text-xs hover:bg-slate-50">
                    <Type className="h-4 w-4 mr-1" />
                    Text
                  </button>
                  <button className="flex items-center justify-center p-2 border border-slate-300 rounded text-xs hover:bg-slate-50">
                    <Image className="h-4 w-4 mr-1" />
                    Logo
                  </button>
                  <button className="flex items-center justify-center p-2 border border-slate-300 rounded text-xs hover:bg-slate-50">
                    <Palette className="h-4 w-4 mr-1" />
                    Colors
                  </button>
                  <button className="flex items-center justify-center p-2 border border-slate-300 rounded text-xs hover:bg-slate-50">
                    <Layers className="h-4 w-4 mr-1" />
                    Layers
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              {/* 3D Controls Header */}
              <div className="border-b border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">3D Preview</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`p-2 rounded ${autoRotate ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
                      title={autoRotate ? "Stop rotation" : "Start rotation"}
                    >
                      {autoRotate ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                      <ZoomOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="aspect-video relative">
                <Canvas3D 
                  className="w-full h-full"
                  enableControls={true}
                  autoRotate={false}
                  enableZoom={true}
                >
                  {renderPackageModel()}
                  
                  {/* Text Editor Integration */}
                  <TextEditor
                    textElements={textEditor.textElements}
                    selectedTextId={textEditor.selectedTextId}
                    onAddText={textEditor.addText}
                    onUpdateText={textEditor.updateText}
                    onSelectText={textEditor.selectText}
                    onDeleteText={textEditor.deleteText}
                  />
                </Canvas3D>

                {/* Undo/Redo System */}
                <UndoRedoSystem
                  currentState={currentEditorState}
                  onStateChange={handleStateChange}
                />
              </div>

              {/* Preview Info */}
              <div className="border-t border-slate-200 px-4 py-3 bg-slate-50">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    {selectedTemplate 
                      ? `${selectedTemplate.name} - ${selectedTemplate.type}` 
                      : 'Select a template to begin'
                    }
                  </span>
                  <span>Use mouse to rotate and zoom</span>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
              <h3 className="text-sm font-semibold text-purple-900 mb-2">🤖 AI Design Suggestions</h3>
              <p className="text-sm text-purple-800 mb-4">
                Based on your selected template, here are some AI-powered design recommendations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-md p-3 border border-purple-200">
                  <h4 className="text-xs font-medium text-slate-900 mb-1">Color Harmony</h4>
                  <p className="text-xs text-slate-600">Use complementary colors for better visual appeal</p>
                </div>
                <div className="bg-white rounded-md p-3 border border-purple-200">
                  <h4 className="text-xs font-medium text-slate-900 mb-1">Typography</h4>
                  <p className="text-xs text-slate-600">Modern sans-serif fonts work well for this template</p>
                </div>
                <div className="bg-white rounded-md p-3 border border-purple-200">
                  <h4 className="text-xs font-medium text-slate-900 mb-1">Layout</h4>
                  <p className="text-xs text-slate-600">Center your logo for maximum brand impact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}