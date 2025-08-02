"use client"

import { useState, useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { 
  Type, 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Plus,
  Minus,
  Move3D,
  RotateCw
} from 'lucide-react'

interface TextElement {
  id: string
  content: string
  position: [number, number, number]
  rotation: [number, number, number]
  fontSize: number
  color: string
  fontFamily: string
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  align: 'left' | 'center' | 'right'
}

interface Text3DProps {
  element: TextElement
  isSelected: boolean
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: Partial<TextElement>) => void
}

// 3D Text Component
function Text3D({ element, isSelected, onSelect, onUpdate }: Text3DProps) {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (textRef.current && isSelected) {
      // Add subtle glow effect for selected text
      const material = textRef.current.material as any
      if (material && material.emissive) {
        material.emissive.setHex(0x222222)
      }
    } else if (textRef.current) {
      const material = textRef.current.material as any
      if (material && material.emissive) {
        material.emissive.setHex(0x000000)
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={element.position}
      rotation={element.rotation}
      fontSize={element.fontSize}
      color={element.color}
      anchorX={element.align}
      anchorY="middle"
      font="/fonts/Inter-Regular.woff"
      onClick={() => onSelect(element.id)}
      castShadow
      receiveShadow
    >
      {element.content}
      <meshStandardMaterial 
        color={element.color}
        metalness={0.1}
        roughness={0.2}
      />
    </Text>
  )
}

interface TextEditorProps {
  textElements: TextElement[]
  selectedTextId: string | null
  onAddText: () => void
  onUpdateText: (id: string, updates: Partial<TextElement>) => void
  onSelectText: (id: string | null) => void
  onDeleteText: (id: string) => void
}

export function TextEditor({
  textElements,
  selectedTextId,
  onAddText,
  onUpdateText,
  onSelectText,
  onDeleteText
}: TextEditorProps) {
  const selectedElement = textElements.find(el => el.id === selectedTextId)

  const fontFamilies = [
    { value: 'Inter', label: 'Inter (Default)' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Roboto', label: 'Roboto' }
  ]

  const handleTextChange = (updates: Partial<TextElement>) => {
    if (selectedTextId) {
      onUpdateText(selectedTextId, updates)
    }
  }

  const handlePositionChange = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (selectedElement) {
      const newPosition = [...selectedElement.position] as [number, number, number]
      const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
      newPosition[axisIndex] += delta
      handleTextChange({ position: newPosition })
    }
  }

  const handleRotationChange = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (selectedElement) {
      const newRotation = [...selectedElement.rotation] as [number, number, number]
      const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
      newRotation[axisIndex] += delta
      handleTextChange({ rotation: newRotation })
    }
  }

  return (
    <>
      {/* 3D Text Elements */}
      {textElements.map(element => (
        <Text3D
          key={element.id}
          element={element}
          isSelected={element.id === selectedTextId}
          onSelect={onSelectText}
          onUpdate={onUpdateText}
        />
      ))}

      {/* Text Editor Controls Panel */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-slate-200 p-4 max-w-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center">
            <Type className="h-4 w-4 mr-2" />
            Text Editor
          </h3>
          <button
            onClick={onAddText}
            className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Add text"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>

        {selectedElement ? (
          <div className="space-y-4">
            {/* Text Content */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Text Content
              </label>
              <textarea
                value={selectedElement.content}
                onChange={(e) => handleTextChange({ content: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded text-sm resize-none"
                rows={2}
                placeholder="Enter your text..."
              />
            </div>

            {/* Font Controls */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Font Family
                </label>
                <select
                  value={selectedElement.fontFamily}
                  onChange={(e) => handleTextChange({ fontFamily: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                >
                  {fontFamilies.map(font => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Size
                </label>
                <input
                  type="number"
                  value={selectedElement.fontSize}
                  onChange={(e) => handleTextChange({ fontSize: parseFloat(e.target.value) })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                  min="0.1"
                  max="2"
                  step="0.1"
                />
              </div>
            </div>

            {/* Style Controls */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Style
              </label>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleTextChange({ 
                    fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' 
                  })}
                  className={`p-1.5 rounded text-xs ${
                    selectedElement.fontWeight === 'bold' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bold className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleTextChange({ 
                    fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' 
                  })}
                  className={`p-1.5 rounded text-xs ${
                    selectedElement.fontStyle === 'italic' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Italic className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Alignment
              </label>
              <div className="flex space-x-1">
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => handleTextChange({ align: align as any })}
                    className={`p-1.5 rounded text-xs ${
                      selectedElement.align === align 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {align === 'left' && <AlignLeft className="h-3 w-3" />}
                    {align === 'center' && <AlignCenter className="h-3 w-3" />}
                    {align === 'right' && <AlignRight className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedElement.color}
                  onChange={(e) => handleTextChange({ color: e.target.value })}
                  className="w-8 h-8 rounded border border-slate-300"
                />
                <input
                  type="text"
                  value={selectedElement.color}
                  onChange={(e) => handleTextChange({ color: e.target.value })}
                  className="flex-1 px-2 py-1 border border-slate-300 rounded text-xs"
                />
              </div>
            </div>

            {/* Position Controls */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Position
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['x', 'y', 'z'].map(axis => (
                  <div key={axis} className="text-center">
                    <div className="text-xs text-slate-500 mb-1">{axis.toUpperCase()}</div>
                    <div className="flex">
                      <button
                        onClick={() => handlePositionChange(axis as any, -0.1)}
                        className="flex-1 px-1 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-l"
                      >
                        <Minus className="h-3 w-3 mx-auto" />
                      </button>
                      <button
                        onClick={() => handlePositionChange(axis as any, 0.1)}
                        className="flex-1 px-1 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-r"
                      >
                        <Plus className="h-3 w-3 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rotation Controls */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Rotation
              </label>
              <div className="grid grid-cols-3 gap-1">
                {['x', 'y', 'z'].map(axis => (
                  <div key={axis} className="text-center">
                    <div className="text-xs text-slate-500 mb-1">{axis.toUpperCase()}</div>
                    <div className="flex">
                      <button
                        onClick={() => handleRotationChange(axis as any, -0.1)}
                        className="flex-1 px-1 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-l"
                      >
                        <Minus className="h-3 w-3 mx-auto" />
                      </button>
                      <button
                        onClick={() => handleRotationChange(axis as any, 0.1)}
                        className="flex-1 px-1 py-1 bg-slate-100 hover:bg-slate-200 text-xs rounded-r"
                      >
                        <Plus className="h-3 w-3 mx-auto" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                onDeleteText(selectedElement.id)
                onSelectText(null)
              }}
              className="w-full px-3 py-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
            >
              Delete Text
            </button>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Type className="h-8 w-8 mx-auto mb-2 text-slate-400" />
            <p className="text-xs">Click "+" to add text or select existing text to edit</p>
          </div>
        )}
      </div>
    </>
  )
}

// Hook for managing text elements
export function useTextEditor() {
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)

  const addText = () => {
    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      content: 'Your Text Here',
      position: [0, 0, 0.6],
      rotation: [0, 0, 0],
      fontSize: 0.3,
      color: '#000000',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      fontStyle: 'normal',
      align: 'center'
    }
    setTextElements(prev => [...prev, newElement])
    setSelectedTextId(newElement.id)
  }

  const updateText = (id: string, updates: Partial<TextElement>) => {
    setTextElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ))
  }

  const deleteText = (id: string) => {
    setTextElements(prev => prev.filter(el => el.id !== id))
  }

  return {
    textElements,
    selectedTextId,
    addText,
    updateText,
    deleteText,
    selectText: setSelectedTextId
  }
}