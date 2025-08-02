"use client"

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, RoundedBox, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  color?: string
  metalness?: number
  roughness?: number
  autoRotate?: boolean
}

// Basic Box Package (e.g., cosmetics, electronics)
export function BoxPackage({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  color = "#ffffff",
  metalness = 0.1,
  roughness = 0.1,
  autoRotate = false
}: ModelProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <RoundedBox
      ref={meshRef}
      args={[2 * scale, 2.5 * scale, 1 * scale]}
      position={position}
      rotation={rotation}
      radius={0.05}
      smoothness={4}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </RoundedBox>
  )
}

// Coffee Bag Package
export function BagPackage({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  color = "#8B4513",
  metalness = 0,
  roughness = 0.8,
  autoRotate = false
}: ModelProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main bag body */}
      <Box
        args={[1.5 * scale, 2.2 * scale, 0.8 * scale]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </Box>
      
      {/* Bag top fold */}
      <Box
        args={[1.5 * scale, 0.3 * scale, 0.2 * scale]}
        position={[0, 1.25 * scale, 0.3 * scale]}
        rotation={[Math.PI / 6, 0, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.8)}
          metalness={metalness}
          roughness={roughness}
        />
      </Box>
    </group>
  )
}

// Bottle Package (e.g., perfume, supplements)
export function BottlePackage({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  color = "#4A90E2",
  metalness = 0.8,
  roughness = 0.1,
  autoRotate = false
}: ModelProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Bottle body */}
      <Cylinder
        args={[0.6 * scale, 0.8 * scale, 2.2 * scale, 8]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={0.9}
        />
      </Cylinder>
      
      {/* Bottle neck */}
      <Cylinder
        args={[0.3 * scale, 0.3 * scale, 0.6 * scale, 8]}
        position={[0, 1.4 * scale, 0]}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          transparent
          opacity={0.9}
        />
      </Cylinder>
      
      {/* Bottle cap */}
      <Cylinder
        args={[0.35 * scale, 0.35 * scale, 0.3 * scale, 8]}
        position={[0, 1.85 * scale, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#2C3E50"
          metalness={0.9}
          roughness={0.1}
        />
      </Cylinder>
    </group>
  )
}

// Can Package (e.g., energy drinks, food cans)
export function CanPackage({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  color = "#E74C3C",
  metalness = 0.9,
  roughness = 0.1,
  autoRotate = false
}: ModelProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Cylinder
      ref={meshRef}
      args={[0.75 * scale, 0.75 * scale, 2.5 * scale, 16]}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </Cylinder>
  )
}

// Pouch Package (e.g., snacks, coffee pods)
export function PouchPackage({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  color = "#9B59B6",
  metalness = 0,
  roughness = 0.9,
  autoRotate = false
}: ModelProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Main pouch body - slightly curved */}
      <Box
        args={[1.8 * scale, 1.5 * scale, 0.6 * scale]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
        />
      </Box>
      
      {/* Pouch top seal */}
      <Box
        args={[1.8 * scale, 0.2 * scale, 0.1 * scale]}
        position={[0, 0.85 * scale, 0.25 * scale]}
        castShadow
      >
        <meshStandardMaterial
          color={new THREE.Color(color).multiplyScalar(0.7)}
          metalness={metalness}
          roughness={roughness}
        />
      </Box>
    </group>
  )
}

// Template Model Mapper
export function getPackageModel(type: string) {
  switch (type.toLowerCase()) {
    case 'box':
      return BoxPackage
    case 'bag':
      return BagPackage
    case 'bottle':
      return BottlePackage
    case 'can':
      return CanPackage
    case 'pouch':
      return PouchPackage
    default:
      return BoxPackage
  }
}