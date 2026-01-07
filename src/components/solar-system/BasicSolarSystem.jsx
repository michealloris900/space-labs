// src/components/solar-system/BasicSolarSystem.jsx - FINAL WORKING VERSION
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Planet = ({ position, size, color, speed, name }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.01
    }
  })

  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

const OrbitRing = ({ radius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </mesh>
  )
}

const BasicSolarSystem = () => {
  const planets = [
    { name: 'Matahari', size: 1.5, color: '#FFD700', position: [0, 0, 0], speed: 0.05, orbitRadius: 0 },
    { name: 'Merkurius', size: 0.3, color: '#8C7853', position: [3, 0, 0], speed: 0.4, orbitRadius: 3 },
    { name: 'Venus', size: 0.7, color: '#FFC649', position: [5, 0, 0], speed: 0.3, orbitRadius: 5 },
    { name: 'Bumi', size: 0.8, color: '#6B93D6', position: [7, 0, 0], speed: 0.2, orbitRadius: 7 },
    { name: 'Mars', size: 0.4, color: '#FF0000', position: [9, 0, 0], speed: 0.15, orbitRadius: 9 },
    { name: 'Jupiter', size: 1.8, color: '#FFA726', position: [12, 0, 0], speed: 0.1, orbitRadius: 12 },
    { name: 'Saturnus', size: 1.5, color: '#FFD54F', position: [15, 0, 0], speed: 0.08, orbitRadius: 15 },
    { name: 'Uranus', size: 0.6, color: '#80DEEA', position: [18, 0, 0], speed: 0.06, orbitRadius: 18 },
    { name: 'Neptunus', size: 0.58, color: '#3949AB', position: [21, 0, 0], speed: 0.04, orbitRadius: 21 },
  ]

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-blue-500/30">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 60 }}
        style={{ background: '#0a0e17' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#FFD700" />
        
        {/* Orbit Rings */}
        {planets.slice(1).map((planet, index) => (
          <OrbitRing key={`orbit-${index}`} radius={planet.orbitRadius} />
        ))}
        
        {/* Planets */}
        {planets.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
        
        {/* Saturn's Rings */}
        <mesh position={[15, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 3, 32]} />
          <meshBasicMaterial color="#FFD54F" side={2} transparent opacity={0.6} />
        </mesh>
        
        {/* Background Stars */}
        <Stars radius={200} depth={50} count={3000} factor={4} />
        
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
      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-sm">
        <div className="font-bold mb-2">🌌 Tata Surya 3D</div>
        <div className="text-gray-300 text-xs space-y-1">
          <div>• Planet berwarna sesuai karakteristik asli</div>
          <div>• Garis biru: Orbit planet</div>
          <div>• Kuning: Cincin Saturnus</div>
          <div>🎮 Kontrol: Drag rotate • Scroll zoom</div>
        </div>
      </div>
      
      {/* Scale Info */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="text-xs">
          <div className="font-bold mb-1">📐 Skala Tertampilkan</div>
          <div className="text-gray-300">Ukuran: Relatif</div>
          <div className="text-gray-300">Jarak: Dikompresi</div>
        </div>
      </div>
    </div>
  )
}

export default BasicSolarSystem