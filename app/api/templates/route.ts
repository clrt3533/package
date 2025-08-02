import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const isPremium = searchParams.get('isPremium')
    const limit = searchParams.get('limit')

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

    return NextResponse.json({
      success: true,
      templates,
      count: templates.length
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}