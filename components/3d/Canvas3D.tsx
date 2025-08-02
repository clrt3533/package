"use client"

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PresentationControls } from '@react-three/drei'

interface Canvas3DProps {
  children?: React.ReactNode
  className?: string
  enableControls?: boolean
  autoRotate?: boolean
  enableZoom?: boolean
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-slate-600">Loading 3D Preview...</p>
      </div>
    </div>
  )
}

export function Canvas3D({ 
  children, 
  className = "w-full h-96",
  enableControls = true,
  autoRotate = false,
  enableZoom = true
}: Canvas3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 100
        }}
        dpr={[1, 2]}
        shadows
        className="bg-slate-50"
      >
        {/* Lighting Setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="studio" />
        
        {/* Ground shadows */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Controls */}
        {enableControls && (
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <OrbitControls
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              enableZoom={enableZoom}
              enablePan={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
            />
          </PresentationControls>
        )}

        {/* 3D Content */}
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
      
      {/* Loading overlay */}
      <Suspense fallback={<LoadingFallback />}>
        <div style={{ display: 'none' }} />
      </Suspense>
    </div>
  )
}