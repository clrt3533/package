import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample templates
  const templates = [
    {
      name: 'Classic Product Box',
      type: 'box',
      modelUrl: '/models/product-box.glb',
      thumbnailUrl: '/templates/product-box-thumb.jpg',
      metadata: JSON.stringify({
        dimensions: { width: 150, height: 100, depth: 50 },
        materials: ['cardboard', 'kraft'],
        printAreas: [
          { id: 'front', name: 'Front Panel', position: [0, 0, 0.5] },
          { id: 'back', name: 'Back Panel', position: [0, 0, -0.5] },
          { id: 'top', name: 'Top Panel', position: [0, 0.5, 0] },
        ]
      })
    },
    {
      name: 'Cosmetic Bottle',
      type: 'bottle',
      modelUrl: '/models/cosmetic-bottle.glb',
      thumbnailUrl: '/templates/cosmetic-bottle-thumb.jpg',
      metadata: JSON.stringify({
        dimensions: { width: 40, height: 120, depth: 40 },
        materials: ['plastic', 'glass'],
        printAreas: [
          { id: 'label', name: 'Main Label', position: [0, 0, 0.2] },
        ]
      })
    },
    {
      name: 'Food Pouch',
      type: 'pouch',
      modelUrl: '/models/food-pouch.glb',
      thumbnailUrl: '/templates/food-pouch-thumb.jpg',
      metadata: JSON.stringify({
        dimensions: { width: 120, height: 180, depth: 20 },
        materials: ['plastic', 'foil'],
        printAreas: [
          { id: 'front', name: 'Front Panel', position: [0, 0, 0.1] },
          { id: 'back', name: 'Back Panel', position: [0, 0, -0.1] },
        ]
      })
    },
    {
      name: 'Luxury Gift Box',
      type: 'box',
      modelUrl: '/models/luxury-box.glb',
      thumbnailUrl: '/templates/luxury-box-thumb.jpg',
      metadata: JSON.stringify({
        dimensions: { width: 200, height: 150, depth: 100 },
        materials: ['cardboard', 'velvet'],
        printAreas: [
          { id: 'lid', name: 'Lid', position: [0, 0.75, 0] },
          { id: 'front', name: 'Front Panel', position: [0, 0, 0.5] },
        ]
      }),
      isPremium: true
    },
    {
      name: 'Coffee Bag',
      type: 'bag',
      modelUrl: '/models/coffee-bag.glb',
      thumbnailUrl: '/templates/coffee-bag-thumb.jpg',
      metadata: JSON.stringify({
        dimensions: { width: 100, height: 150, depth: 60 },
        materials: ['kraft', 'foil'],
        printAreas: [
          { id: 'front', name: 'Front Panel', position: [0, 0, 0.3] },
          { id: 'back', name: 'Back Panel', position: [0, 0, -0.3] },
        ]
      })
    }
  ]

  for (const template of templates) {
    await prisma.template.create({
      data: template
    })
  }

  // Create a sample user
  await prisma.user.create({
    data: {
      email: 'demo@packagepro.com',
      name: 'Demo User',
      plan: 'free',
      credits: 10
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })