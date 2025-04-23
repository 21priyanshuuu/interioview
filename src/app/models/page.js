"use client"

// components/GltfViewer.js
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function Home() {
  return (
    <div>
      <h1>3D Model Viewer</h1>
      <GltfViewer modelUrl="/designs.gltf" />
    </div>
  )
}
export  function GltfViewer({ modelUrl }) {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}