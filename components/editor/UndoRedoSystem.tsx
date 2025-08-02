"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { Undo2, Redo2, RotateCcw } from 'lucide-react'

interface EditorState {
  packageColor: string
  textElements: any[]
  selectedTemplate: any
  projectName: string
  timestamp: number
}

interface UndoRedoSystemProps {
  currentState: Omit<EditorState, 'timestamp'>
  onStateChange: (state: Omit<EditorState, 'timestamp'>) => void
  maxHistorySize?: number
}

export function UndoRedoSystem({ 
  currentState, 
  onStateChange, 
  maxHistorySize = 50 
}: UndoRedoSystemProps) {
  const [history, setHistory] = useState<EditorState[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const isUndoRedoOperation = useRef(false)

  // Save current state to history
  const saveState = useCallback(() => {
    if (isUndoRedoOperation.current) {
      isUndoRedoOperation.current = false
      return
    }

    const newState: EditorState = {
      ...currentState,
      timestamp: Date.now()
    }

    setHistory(prev => {
      // Remove any history after current index (when adding new state after undo)
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(newState)
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize)
      }
      
      return newHistory
    })

    setCurrentIndex(prev => {
      const newIndex = prev + 1
      return newIndex >= maxHistorySize ? maxHistorySize - 1 : newIndex
    })
  }, [currentState, currentIndex, maxHistorySize])

  // Auto-save state when it changes
  useEffect(() => {
    const debounceTimer = setTimeout(saveState, 500)
    return () => clearTimeout(debounceTimer)
  }, [currentState, saveState])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  const undo = useCallback(() => {
    if (!canUndo) return

    const prevState = history[currentIndex - 1]
    if (prevState) {
      isUndoRedoOperation.current = true
      onStateChange({
        packageColor: prevState.packageColor,
        textElements: prevState.textElements,
        selectedTemplate: prevState.selectedTemplate,
        projectName: prevState.projectName
      })
      setCurrentIndex(prev => prev - 1)
    }
  }, [canUndo, history, currentIndex, onStateChange])

  const redo = useCallback(() => {
    if (!canRedo) return

    const nextState = history[currentIndex + 1]
    if (nextState) {
      isUndoRedoOperation.current = true
      onStateChange({
        packageColor: nextState.packageColor,
        textElements: nextState.textElements,
        selectedTemplate: nextState.selectedTemplate,
        projectName: nextState.projectName
      })
      setCurrentIndex(prev => prev + 1)
    }
  }, [canRedo, history, currentIndex, onStateChange])

  const reset = useCallback(() => {
    if (history.length === 0) return

    const firstState = history[0]
    if (firstState) {
      isUndoRedoOperation.current = true
      onStateChange({
        packageColor: firstState.packageColor,
        textElements: firstState.textElements,
        selectedTemplate: firstState.selectedTemplate,
        projectName: firstState.projectName
      })
      setCurrentIndex(0)
    }
  }, [history, onStateChange])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault()
          undo()
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault()
          redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const getHistoryInfo = () => {
    if (history.length === 0) {
      return { total: 0, current: 0, percentage: 0 }
    }
    
    return {
      total: history.length,
      current: currentIndex + 1,
      percentage: Math.round(((currentIndex + 1) / history.length) * 100)
    }
  }

  const historyInfo = getHistoryInfo()

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-3 z-10">
      <div className="flex items-center space-x-2">
        {/* Undo Button */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded transition-colors ${
            canUndo 
              ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
              : 'text-slate-300 cursor-not-allowed'
          }`}
          title={`Undo (Ctrl+Z)${canUndo ? '' : ' - No actions to undo'}`}
        >
          <Undo2 className="h-4 w-4" />
        </button>

        {/* Redo Button */}
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded transition-colors ${
            canRedo 
              ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
              : 'text-slate-300 cursor-not-allowed'
          }`}
          title={`Redo (Ctrl+Y)${canRedo ? '' : ' - No actions to redo'}`}
        >
          <Redo2 className="h-4 w-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Reset Button */}
        <button
          onClick={reset}
          disabled={history.length === 0}
          className={`p-2 rounded transition-colors ${
            history.length > 0 
              ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' 
              : 'text-slate-300 cursor-not-allowed'
          }`}
          title="Reset to initial state"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {/* History Info */}
        {history.length > 0 && (
          <div className="text-xs text-slate-500 ml-2">
            {historyInfo.current}/{historyInfo.total}
          </div>
        )}
      </div>

      {/* History Progress Bar */}
      {history.length > 1 && (
        <div className="mt-2">
          <div className="w-full bg-slate-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-200"
              style={{ width: `${historyInfo.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Info */}
      {history.length > 0 && (
        <div className="mt-2 text-xs text-slate-500 text-center">
          Use Ctrl+Z/Ctrl+Y for undo/redo
        </div>
      )}
    </div>
  )
}

// Hook for managing undo/redo state
export function useUndoRedo<T>(
  initialState: T,
  maxHistorySize: number = 50
) {
  const [state, setState] = useState<T>(initialState)
  const [history, setHistory] = useState<T[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateState = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextState = typeof newState === 'function' ? (newState as (prev: T) => T)(prev) : newState
      
      setHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, currentIndex + 1)
        newHistory.push(nextState)
        
        if (newHistory.length > maxHistorySize) {
          return newHistory.slice(-maxHistorySize)
        }
        
        return newHistory
      })

      setCurrentIndex(prev => {
        const newIndex = prev + 1
        return newIndex >= maxHistorySize ? maxHistorySize - 1 : newIndex
      })

      return nextState
    })
  }, [currentIndex, maxHistorySize])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const prevState = history[currentIndex - 1]
      setState(prevState)
      setCurrentIndex(prev => prev - 1)
    }
  }, [history, currentIndex])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const nextState = history[currentIndex + 1]
      setState(nextState)
      setCurrentIndex(prev => prev + 1)
    }
  }, [history, currentIndex])

  const reset = useCallback(() => {
    if (history.length > 0) {
      setState(history[0])
      setCurrentIndex(0)
    }
  }, [history])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    state,
    updateState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    historyLength: history.length,
    currentIndex
  }
}