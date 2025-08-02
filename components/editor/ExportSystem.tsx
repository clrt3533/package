"use client"

import { useState } from 'react'
import { 
  Download, 
  FileImage, 
  FileText, 
  Box,
  Settings,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ExportOptions {
  format: 'png' | 'pdf' | 'glb' | 'obj'
  resolution: '1080p' | '2K' | '4K'
  quality: 'standard' | 'high' | 'ultra'
  transparent: boolean
  includeText: boolean
  includeBackground: boolean
}

interface ExportSystemProps {
  onExport: (options: ExportOptions) => Promise<void>
  isExporting: boolean
  projectName: string
}

export function ExportSystem({ onExport, isExporting, projectName }: ExportSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'png',
    resolution: '2K',
    quality: 'high',
    transparent: false,
    includeText: true,
    includeBackground: true
  })
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle')

  const exportFormats = [
    {
      id: 'png',
      name: 'PNG Image',
      description: 'High-quality raster image',
      icon: FileImage,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Vector-based document',
      icon: FileText,
      color: 'text-red-600',
      bg: 'bg-red-100'
    },
    {
      id: 'glb',
      name: '3D Model (GLB)',
      description: 'Optimized 3D format',
      icon: Box,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      id: 'obj',
      name: '3D Model (OBJ)',
      description: 'Universal 3D format',
      icon: Box,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ]

  const resolutionOptions = [
    { value: '1080p', label: '1080p (1920×1080)', description: 'Standard HD' },
    { value: '2K', label: '2K (2560×1440)', description: 'High Definition' },
    { value: '4K', label: '4K (3840×2160)', description: 'Ultra HD' }
  ]

  const qualityOptions = [
    { value: 'standard', label: 'Standard', description: 'Good for web use' },
    { value: 'high', label: 'High', description: 'Better for print' },
    { value: 'ultra', label: 'Ultra', description: 'Maximum quality' }
  ]

  const handleExport = async () => {
    setExportStatus('exporting')
    try {
      await onExport(exportOptions)
      setExportStatus('success')
      setTimeout(() => {
        setExportStatus('idle')
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      setExportStatus('error')
      setTimeout(() => setExportStatus('idle'), 3000)
    }
  }

  const updateOptions = (updates: Partial<ExportOptions>) => {
    setExportOptions(prev => ({ ...prev, ...updates }))
  }

  const getFileSize = () => {
    const baseSize = exportOptions.resolution === '1080p' ? 2 : 
                     exportOptions.resolution === '2K' ? 5 : 12
    const qualityMultiplier = exportOptions.quality === 'standard' ? 1 : 
                             exportOptions.quality === 'high' ? 1.5 : 2.5
    return Math.round(baseSize * qualityMultiplier)
  }

  return (
    <>
      {/* Export Button */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={isExporting}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        {isExporting ? 'Exporting...' : 'Export'}
      </button>

      {/* Export Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Export Project</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Export "{projectName}" in your preferred format
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Format Selection */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Export Format</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exportFormats.map(format => (
                    <button
                      key={format.id}
                      onClick={() => updateOptions({ format: format.id as any })}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        exportOptions.format === format.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${format.bg}`}>
                          <format.icon className={`h-5 w-5 ${format.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-slate-900">{format.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">{format.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution (for image formats) */}
              {(exportOptions.format === 'png' || exportOptions.format === 'pdf') && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Resolution</h3>
                  <div className="space-y-2">
                    {resolutionOptions.map(option => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="resolution"
                          value={option.value}
                          checked={exportOptions.resolution === option.value}
                          onChange={(e) => updateOptions({ resolution: e.target.value as any })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-900">{option.label}</div>
                          <div className="text-xs text-slate-500">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Quality</h3>
                <div className="space-y-2">
                  {qualityOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="quality"
                        value={option.value}
                        checked={exportOptions.quality === option.value}
                        onChange={(e) => updateOptions({ quality: e.target.value as any })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{option.label}</div>
                        <div className="text-xs text-slate-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Options</h3>
                <div className="space-y-3">
                  {exportOptions.format === 'png' && (
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.transparent}
                        onChange={(e) => updateOptions({ transparent: e.target.checked })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Transparent Background</div>
                        <div className="text-xs text-slate-500">Remove background for overlay use</div>
                      </div>
                    </label>
                  )}

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeText}
                      onChange={(e) => updateOptions({ includeText: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Include Text Elements</div>
                      <div className="text-xs text-slate-500">Export with all text overlays</div>
                    </div>
                  </label>

                  {!exportOptions.transparent && (
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportOptions.includeBackground}
                        onChange={(e) => updateOptions({ includeBackground: e.target.checked })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="text-sm font-medium text-slate-900">Include Background</div>
                        <div className="text-xs text-slate-500">Export with scene background</div>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Preview Info */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Export Preview</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500">Format:</span>
                    <span className="ml-2 font-medium">{exportOptions.format.toUpperCase()}</span>
                  </div>
                  {(exportOptions.format === 'png' || exportOptions.format === 'pdf') && (
                    <div>
                      <span className="text-slate-500">Resolution:</span>
                      <span className="ml-2 font-medium">{exportOptions.resolution}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500">Quality:</span>
                    <span className="ml-2 font-medium capitalize">{exportOptions.quality}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Est. Size:</span>
                    <span className="ml-2 font-medium">~{getFileSize()}MB</span>
                  </div>
                </div>
              </div>

              {/* Export Status */}
              {exportStatus !== 'idle' && (
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                  exportStatus === 'exporting' ? 'bg-blue-50 text-blue-800' :
                  exportStatus === 'success' ? 'bg-green-50 text-green-800' :
                  'bg-red-50 text-red-800'
                }`}>
                  {exportStatus === 'exporting' && <Loader2 className="h-4 w-4 animate-spin" />}
                  {exportStatus === 'success' && <CheckCircle className="h-4 w-4" />}
                  {exportStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {exportStatus === 'exporting' && 'Preparing your export...'}
                    {exportStatus === 'success' && 'Export completed successfully!'}
                    {exportStatus === 'error' && 'Export failed. Please try again.'}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={exportStatus === 'exporting'}
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {exportStatus === 'exporting' ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {exportOptions.format.toUpperCase()}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Export utilities
export const exportUtils = {
  // Convert canvas to PNG
  exportToPNG: async (canvas: HTMLCanvasElement, options: ExportOptions): Promise<Blob> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!)
      }, 'image/png', options.quality === 'ultra' ? 1 : options.quality === 'high' ? 0.9 : 0.7)
    })
  },

  // Convert to PDF
  exportToPDF: async (canvas: HTMLCanvasElement, options: ExportOptions): Promise<Blob> => {
    // This would integrate with a PDF library like jsPDF
    const dataURL = canvas.toDataURL('image/png')
    
    // Placeholder - would implement actual PDF generation
    return new Promise((resolve) => {
      const blob = new Blob([dataURL], { type: 'application/pdf' })
      resolve(blob)
    })
  },

  // Download file
  downloadFile: (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}