// src/components/solar-system/SimpleSolarSystem.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Planet component sederhana
const Planet = ({ position, size, color, rotationSpeed }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Orbit ring
const OrbitRing = ({ radius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
    </mesh>
  )
}

const SimpleSolarSystem = () => {
  // Data planet sederhana
  const planets = [
    // name, size, color, position[x], rotationSpeed
    { name: 'Matahari', size: 1.5, color: '#FFD700', position: [0, 0, 0], rotationSpeed: 0.002 },
    { name: 'Merkurius', size: 0.3, color: '#8C7853', position: [4, 0, 0], rotationSpeed: 0.004 },
    { name: 'Venus', size: 0.7, color: '#FFC649', position: [6, 0, 0], rotationSpeed: 0.003 },
    { name: 'Bumi', size: 0.8, color: '#6B93D6', position: [8, 0, 0], rotationSpeed: 0.005 },
    { name: 'Mars', size: 0.4, color: '#FF0000', position: [10, 0, 0], rotationSpeed: 0.004 },
    { name: 'Jupiter', size: 1.4, color: '#FFA726', position: [14, 0, 0], rotationSpeed: 0.008 },
    { name: 'Saturnus', size: 1.2, color: '#FFD54F', position: [18, 0, 0], rotationSpeed: 0.006 },
    { name: 'Uranus', size: 0.6, color: '#80DEEA', position: [22, 0, 0], rotationSpeed: 0.004 },
    { name: 'Neptunus', size: 0.58, color: '#3949AB', position: [26, 0, 0], rotationSpeed: 0.004 },
  ]

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden border border-blue-500/30 bg-black">
      <Canvas
        camera={{ position: [0, 15, 35], fov: 60 }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
        
        {/* Orbit rings (kecuali matahari) */}
        {planets.slice(1).map((planet, index) => (
          <OrbitRing key={`orbit-${index}`} radius={planet.position[0]} />
        ))}
        
        {/* Planets */}
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            position={planet.position}
            size={planet.size}
            color={planet.color}
            rotationSpeed={planet.rotationSpeed}
          />
        ))}
        
        {/* Saturn's rings */}
        <mesh position={[18, 0, 0]} rotation={[Math.PI / 2, 0.1, 0]}>
          <ringGeometry args={[1.4, 2.5, 32]} />
          <meshBasicMaterial color="#FFD54F" side={2} transparent opacity={0.6} />
        </mesh>
        
        {/* Background stars */}
        <Stars radius={300} depth={50} count={2000} factor={4} />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.8}
          maxDistance={50}
          minDistance={5}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-2 text-blue-400">🌌 Tata Surya 3D</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• <span className="text-yellow-300">Matahari</span> - Bintang pusat</li>
          <li>• <span className="text-blue-400">Bumi</span> - Planet biru kita</li>
          <li>• <span className="text-red-400">Mars</span> - Planet merah</li>
          <li>• <span className="text-orange-400">Jupiter</span> - Planet terbesar</li>
          <li>🎮 Drag untuk rotate • Scroll untuk zoom</li>
        </ul>
      </div>
    </div>
  )
}

export default SimpleSolarSystem