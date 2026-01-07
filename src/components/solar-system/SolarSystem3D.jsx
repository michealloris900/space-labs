import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import { useState } from 'react'

const Planet = ({ position, size, color, name, distance, speed }) => {
  const [hovered, setHovered] = useState(false)
  
  return (
    <group position={position}>
      <mesh 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={hovered ? color : '#000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {hovered && (
        <Text
          position={[0, size + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  )
}

const SolarSystem3D = () => {
  const planets = [
    { name: 'Matahari', size: 2, color: '#FFD700', distance: 0 },
    { name: 'Merkurius', size: 0.4, color: '#8C7853', distance: 5 },
    { name: 'Venus', size: 0.9, color: '#FFC649', distance: 8 },
    { name: 'Bumi', size: 1, color: '#6B93D6', distance: 12 },
    { name: 'Mars', size: 0.5, color: '#FF0000', distance: 16 },
    { name: 'Jupiter', size: 2.2, color: '#FFA726', distance: 22 },
    { name: 'Saturnus', size: 1.9, color: '#FFD54F', distance: 28 },
    { name: 'Uranus', size: 1.4, color: '#80DEEA', distance: 34 },
    { name: 'Neptunus', size: 1.3, color: '#3949AB', distance: 40 },
  ]

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-blue-500/30">
      <Canvas camera={{ position: [0, 20, 45], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
        
        {/* Planet-planet */}
        {planets.map((planet, index) => (
          <Planet
            key={planet.name}
            position={[planet.distance, 0, 0]}
            size={planet.size}
            color={planet.color}
            name={planet.name}
          />
        ))}
        
        {/* Orbit rings */}
        {planets.slice(1).map((planet, index) => (
          <mesh rotation={[Math.PI / 2, 0, 0]} key={`orbit-${index}`}>
            <ringGeometry args={[planet.distance - 0.1, planet.distance + 0.1, 64]} />
            <meshBasicMaterial color="#3b82f6" opacity={0.2} transparent />
          </mesh>
        ))}
        
        <Stars radius={300} depth={60} count={5000} factor={4} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.8}
          maxDistance={100}
          minDistance={10}
        />
      </Canvas>
    </div>
  )
}

export default SolarSystem3D