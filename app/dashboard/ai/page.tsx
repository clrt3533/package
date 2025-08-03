"use client"

// Force dynamic rendering for authentication-protected pages
export const dynamic = 'force-dynamic'

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { 
  Sparkles, 
  Send, 
  Lightbulb, 
  Palette, 
  Type, 
  Layout,
  Image,
  Wand2
} from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI design assistant. I can help you with color schemes, typography, layout suggestions, and creative ideas for your packaging designs. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Suggest colors for a coffee brand",
        "Help with eco-friendly packaging",
        "Modern typography recommendations",
        "Luxury brand design tips"
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickPrompts = [
    {
      icon: Palette,
      title: "Color Palette",
      description: "Get AI-generated color schemes",
      prompt: "Suggest a modern color palette for premium skincare packaging"
    },
    {
      icon: Type,
      title: "Typography",
      description: "Font pairing recommendations",
      prompt: "What typography styles work best for energy drink packaging?"
    },
    {
      icon: Layout,
      title: "Layout Ideas",
      description: "Design composition tips",
      prompt: "How should I arrange elements on a coffee bag design?"
    },
    {
      icon: Lightbulb,
      title: "Creative Ideas",
      description: "Unique design concepts",
      prompt: "Give me creative packaging ideas for organic tea products"
    }
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    // Simulate AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: `Great question! Here are some suggestions based on your request: "${inputMessage}". I'd recommend focusing on contrast, readability, and brand alignment. Would you like me to elaborate on any specific aspect?`,
      timestamp: new Date(),
      suggestions: [
        "Show me examples",
        "More color options",
        "Different style variations",
        "Apply to my current project"
      ]
    }

    setMessages(prev => [...prev, userMessage, aiResponse])
    setInputMessage("")
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <DashboardLayout title="AI Design Assistant">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-purple-600" />
                Quick Start
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <prompt.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-900">{prompt.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{prompt.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Pro Tips
              </h3>
              <div className="space-y-3">
                <div className="text-xs text-blue-800">
                  <strong>Color Psychology:</strong> Use warm colors for food products, cool colors for tech products.
                </div>
                <div className="text-xs text-blue-800">
                  <strong>Typography:</strong> Sans-serif fonts convey modernity, serif fonts suggest tradition.
                </div>
                <div className="text-xs text-blue-800">
                  <strong>Layout:</strong> Follow the rule of thirds for balanced compositions.
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-slate-900">AI Design Assistant</h3>
                    <p className="text-sm text-slate-500">Powered by advanced design AI</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left px-3 py-2 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me about colors, fonts, layouts, or design ideas..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="flex-shrink-0 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Projects */}
            <div className="mt-6 bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">AI-Generated Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Palette className="h-4 w-4 text-purple-600 mr-2" />
                    <h4 className="text-sm font-medium">Coffee Brand Palette</h4>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: '#8B4513' }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: '#D2691E' }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: '#F4A460' }}></div>
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: '#2F1B14' }}></div>
                  </div>
                  <p className="text-xs text-slate-600">Warm, earthy tones perfect for premium coffee packaging</p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Type className="h-4 w-4 text-blue-600 mr-2" />
                    <h4 className="text-sm font-medium">Modern Typography</h4>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="text-lg font-bold">Montserrat Bold</div>
                    <div className="text-sm">Open Sans Regular</div>
                  </div>
                  <p className="text-xs text-slate-600">Clean, readable fonts for tech product packaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}