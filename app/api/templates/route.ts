import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic behavior to prevent static generation errors
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Fallback templates if no database is configured
    const fallbackTemplates = [
      {
        id: '1',
        name: 'Coffee Box Design',
        description: 'Modern coffee packaging design',
        isPremium: false,
        type: 'box',
        image: null,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Premium Bottle',
        description: 'Elegant bottle design',
        isPremium: true,
        type: 'bottle',
        image: null,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Snack Pouch',
        description: 'Flexible pouch design',
        isPremium: false,
        type: 'pouch',
        image: null,
        createdAt: new Date()
      }
    ]

    // Try to get query parameters safely
    let type: string | null = null
    let isPremium: string | null = null
    let limit: string | null = null

    try {
      const url = new URL(request.url)
      const searchParams = url.searchParams
      type = searchParams.get('type')
      isPremium = searchParams.get('isPremium')
      limit = searchParams.get('limit')
    } catch (error) {
      // If URL parsing fails during static generation, use defaults
      console.warn('URL parsing failed, using default parameters')
    }

    try {
      if (prisma) {
        const templates = await prisma.template.findMany({
          where: {
            ...(type && { type }),
            ...(isPremium && { isPremium: isPremium === 'true' }),
          },
          orderBy: {
            createdAt: 'desc'
          },
          ...(limit && { take: parseInt(limit) }),
        })
        return NextResponse.json(templates)
      }
    } catch (error) {
      console.warn('Database not available, using fallback templates:', error)
    }

    // Filter fallback templates if needed
    let filteredTemplates = fallbackTemplates
    if (type) {
      filteredTemplates = filteredTemplates.filter(t => t.type === type)
    }
    if (isPremium) {
      filteredTemplates = filteredTemplates.filter(t => t.isPremium === (isPremium === 'true'))
    }
    if (limit) {
      filteredTemplates = filteredTemplates.slice(0, parseInt(limit))
    }

    return NextResponse.json(filteredTemplates)
  } catch (error) {
    console.error('Templates API error:', error)
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 })
  }
}