// src/pages/SolarSystem.jsx - DENGAN EMBED
import { useState, useEffect, useRef } from 'react'

const planetInfo = {
  'Matahari': {
    description: 'Bintang pusat tata surya kita',
    facts: ['99.86% massa tata surya', 'Suhu inti: 15 juta °C', 'Usia: 4.6 miliar tahun'],
    type: 'Bintang',
    distance: '0 km',
    diameter: '1.4 juta km',
    color: 'from-yellow-500 to-orange-500',
    emoji: '☀️'
  },
  'Merkurius': {
    description: 'Planet terkecil dan terdekat dengan Matahari',
    facts: ['Tidak memiliki bulan', 'Suhu ekstrem: -180°C hingga 430°C', '1 hari = 59 hari Bumi'],
    type: 'Planet Kebumian',
    distance: '57.9 juta km',
    diameter: '4,879 km',
    color: 'from-gray-600 to-gray-800',
    emoji: '☿'
  },
  'Venus': {
    description: 'Planet terpanas di tata surya',
    facts: ['Berputar berlawanan arah', 'Tekanan atmosfer 92x Bumi', 'Disebut "Bintang Fajar"'],
    type: 'Planet Kebumian',
    distance: '108.2 juta km',
    diameter: '12,104 km',
    color: 'from-yellow-600 to-orange-800',
    emoji: '♀'
  },
  'Bumi': {
    description: 'Planet biru kita yang indah',
    facts: ['Satu-satunya planet berkehidupan', '71% permukaan adalah air', 'Memiliki 1 bulan'],
    type: 'Planet Kebumian',
    distance: '149.6 juta km',
    diameter: '12,756 km',
    color: 'from-blue-600 to-green-700',
    emoji: '🌍'
  },
  'Mars': {
    description: 'Planet merah, target kolonisasi',
    facts: ['Memiliki 2 bulan kecil', 'Gunung tertinggi: Olympus Mons', 'Misi NASA aktif'],
    type: 'Planet Kebumian',
    distance: '227.9 juta km',
    diameter: '6,792 km',
    color: 'from-red-600 to-red-800',
    emoji: '♂'
  },
  'Jupiter': {
    description: 'Planet terbesar di tata surya',
    facts: ['Memiliki 79 bulan', 'Bintik Merah Besar adalah badai', 'Bisa menampung 1,300 Bumi'],
    type: 'Planet Gas Raksasa',
    distance: '778.3 juta km',
    diameter: '142,984 km',
    color: 'from-orange-500 to-yellow-700',
    emoji: '♃'
  },
  'Saturnus': {
    description: 'Planet dengan cincin menakjubkan',
    facts: ['Cincin terbuat dari es', 'Kepadatan lebih rendah dari air', 'Memiliki 82 bulan'],
    type: 'Planet Gas Raksasa',
    distance: '1.4 miliar km',
    diameter: '120,536 km',
    color: 'from-yellow-500 to-amber-700',
    emoji: '🪐'
  },
  'Uranus': {
    description: 'Planet es yang berputar miring',
    facts: ['Berputar pada sisinya', 'Warna biru dari metana', 'Suhu: -224°C'],
    type: 'Planet Es Raksasa',
    distance: '2.9 miliar km',
    diameter: '51,118 km',
    color: 'from-blue-400 to-cyan-600',
    emoji: '♅'
  },
  'Neptunus': {
    description: 'Planet terjauh dengan angin terkuat',
    facts: ['Angin mencapai 2,100 km/jam', 'Ditemukan melalui matematika', 'Memiliki 14 bulan'],
    type: 'Planet Es Raksasa',
    distance: '4.5 miliar km',
    diameter: '49,528 km',
    color: 'from-blue-700 to-indigo-900',
    emoji: '♆'
  }
}

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('Bumi')
  const [viewMode, setViewMode] = useState('solarsystem')
  const [showPlanetMenu, setShowPlanetMenu] = useState(false)
  const planetMenuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (planetMenuRef.current && !planetMenuRef.current.contains(event.target)) {
        setShowPlanetMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset to Earth jika planet tidak ada di info
  useEffect(() => {
    if (!planetInfo[selectedPlanet]) {
      setSelectedPlanet('Bumi')
    }
  }, [selectedPlanet])

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet)
    setShowPlanetMenu(false) // Close menu on mobile after selection
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Tata Surya 3D Interaktif</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Jelajahi tata surya dengan model 3D profesional dari SolarSystemScope.
          Interaktif penuh dengan informasi detail setiap planet.
        </p>
      </div>

      {/* View Mode Selector
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Mode Tampilan</h2>
              <p className="text-gray-400 text-sm">Pilih cara melihat tata surya</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setViewMode('solarsystem')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'solarsystem'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                🌌 Tata Surya 3D
              </button>
              <button
                onClick={() => setViewMode('night sky')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'night sky'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                🌠 Langit Malam
              </button>
              <button
                onClick={() => setViewMode('planetarium')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'planetarium'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                🛰️ Planetarium
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* SolarSystemScope Embed */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/30 rounded-2xl p-4 md:p-6 border border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">SolarSystemScope 3D</h2>
              <p className="text-gray-400 text-sm md:text-base">Model tata surya interaktif profesional</p>
            </div>
            <div className="text-xs md:text-sm bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700">
              Powered by SolarSystemScope.com
            </div>
          </div>

          {/* Embed Container - RESPONSIF */}
          <div className="relative w-full overflow-hidden rounded-xl border-2 border-blue-500/30 bg-black aspect-video md:aspect-auto md:h-[500px]">
            {/* Loading state */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10" id="loading-overlay">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500 mb-3 md:mb-4"></div>
                <p className="text-gray-300 text-sm md:text-base">Memuat model tata surya 3D...</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">Ini mungkin butuh beberapa detik</p>
              </div>
            </div>

            {/* Embed Iframe - RESPONSIF */}
            <iframe
              src="https://www.solarsystemscope.com/iframe"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="Solar System 3D Interactive Model"
              onLoad={() => {
                document.getElementById('loading-overlay').style.display = 'none'
              }}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

          {/* Controls Info - RESPONSIF */}
          <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl">
              <div className="font-bold mb-1 md:mb-2 text-sm md:text-base">🎮 Kontrol Mouse</div>
              <ul className="text-xs md:text-sm text-gray-300 space-y-1">
                <li>• Kiri + drag: Rotate view</li>
                <li>• Scroll: Zoom in/out</li>
                <li>• Kanan + drag: Pan view</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl">
              <div className="font-bold mb-1 md:mb-2 text-sm md:text-base">📱 Kontrol Touch</div>
              <ul className="text-xs md:text-sm text-gray-300 space-y-1">
                <li>• 1 jari drag: Rotate</li>
                <li>• Pinch: Zoom</li>
                <li>• 2 jari drag: Pan</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-3 md:p-4 rounded-xl">
              <div className="font-bold mb-1 md:mb-2 text-sm md:text-base">⚡ Fitur Khusus</div>
              <ul className="text-xs md:text-sm text-gray-300 space-y-1">
                <li>• Klik planet untuk info</li>
                <li>• Pilih view mode berbeda</li>
                <li>• Lihat orbit planet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Planet Quick Select - RESPONSIF */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Lompat ke Planet</h2>
            
            {/* Mobile Dropdown Button */}
            <button
              onClick={() => setShowPlanetMenu(!showPlanetMenu)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              <span>{planetInfo[selectedPlanet]?.emoji || '🪐'}</span>
              <span className="font-medium">{selectedPlanet}</span>
              <span className={`transition-transform ${showPlanetMenu ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-9 gap-3">
            {Object.keys(planetInfo).map((planetName) => (
              <button
                key={planetName}
                onClick={() => handlePlanetSelect(planetName)}
                className={`flex flex-col items-center p-3 rounded-xl transition ${
                  selectedPlanet === planetName
                    ? `bg-gradient-to-br ${planetInfo[planetName].color} border-2 border-white/30`
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{planetInfo[planetName].emoji}</div>
                <div className="text-sm font-semibold">{planetName}</div>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown Menu */}
          <div ref={planetMenuRef} className="relative md:hidden">
            {showPlanetMenu && (
              <div className="absolute top-2 left-0 right-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-2 max-h-80 overflow-y-auto">
                  {Object.keys(planetInfo).map((planetName) => (
                    <button
                      key={planetName}
                      onClick={() => handlePlanetSelect(planetName)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 last:mb-0 transition ${
                        selectedPlanet === planetName
                          ? `bg-gradient-to-r ${planetInfo[planetName].color}`
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-xl">{planetInfo[planetName].emoji}</div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{planetName}</div>
                        <div className="text-xs text-gray-300 opacity-80">
                          {planetInfo[planetName].type}
                        </div>
                      </div>
                      {selectedPlanet === planetName && (
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Planet Detail */}
      {planetInfo[selectedPlanet] && (
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-8 border border-gray-800">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${planetInfo[selectedPlanet].color} flex items-center justify-center text-3xl`}>
                {planetInfo[selectedPlanet].emoji}
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold">{selectedPlanet}</h2>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    {planetInfo[selectedPlanet].type}
                  </span>
                </div>
                <p className="text-gray-300">{planetInfo[selectedPlanet].description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Facts */}
              <div>
                <h3 className="text-xl font-bold mb-4">Fakta Menarik</h3>
                <ul className="space-y-3">
                  {planetInfo[selectedPlanet].facts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-400 text-sm">✓</span>
                      </div>
                      <span className="text-gray-300">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data */}
              <div>
                <h3 className="text-xl font-bold mb-4">Data Astronomi</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-400">Jarak dari Matahari</div>
                    <div className="text-xl font-bold">{planetInfo[selectedPlanet].distance}</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-400">Diameter</div>
                    <div className="text-xl font-bold">{planetInfo[selectedPlanet].diameter}</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl">
                    <div className="text-sm text-gray-400">Masa Orbit</div>
                    <div className="text-xl font-bold">
                      {selectedPlanet === 'Merkurius' ? '88 hari' :
                       selectedPlanet === 'Venus' ? '225 hari' :
                       selectedPlanet === 'Bumi' ? '365 hari' :
                       selectedPlanet === 'Mars' ? '687 hari' :
                       selectedPlanet === 'Jupiter' ? '12 tahun' :
                       selectedPlanet === 'Saturnus' ? '29 tahun' :
                       selectedPlanet === 'Uranus' ? '84 tahun' :
                       selectedPlanet === 'Neptunus' ? '165 tahun' : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* NASA Missions */}
              <div>
                <h3 className="text-xl font-bold mb-4">Misi NASA</h3>
                <div className="space-y-3">
                  {selectedPlanet === 'Mars' ? (
                    <>
                      <div className="bg-red-900/20 p-3 rounded-lg border border-red-700/30">
                        <div className="font-semibold">Perseverance Rover</div>
                        <div className="text-sm text-gray-400">Mendarat 2021, cari tanda kehidupan</div>
                      </div>
                      <div className="bg-red-900/20 p-3 rounded-lg border border-red-700/30">
                        <div className="font-semibold">Curiosity Rover</div>
                        <div className="text-sm text-gray-400">Mendarat 2012, pelajari geologi Mars</div>
                      </div>
                    </>
                  ) : selectedPlanet === 'Jupiter' ? (
                    <>
                      <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-700/30">
                        <div className="font-semibold">Juno</div>
                        <div className="text-sm text-gray-400">Orbit Jupiter sejak 2016</div>
                      </div>
                      <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-700/30">
                        <div className="font-semibold">Galileo</div>
                        <div className="text-sm text-gray-400">1995-2003, pertama orbit Jupiter</div>
                      </div>
                    </>
                  ) : selectedPlanet === 'Saturnus' ? (
                    <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-700/30">
                      <div className="font-semibold">Cassini-Huygens</div>
                      <div className="text-sm text-gray-400">1997-2017, eksplorasi Saturnus & Titan</div>
                    </div>
                  ) : (
                    <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                      <div className="text-gray-400">
                        {selectedPlanet} telah dipelajari oleh berbagai misi NASA
                        dan teleskop luar angkasa.
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <a
                    href={`https://solarsystem.nasa.gov/planets/${selectedPlanet.toLowerCase()}/overview/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300"
                  >
                    <span>Pelajari lebih lanjut di NASA.gov</span>
                    <span className="ml-2">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">🔭 Tips Observasi</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                {selectedPlanet === 'Venus' ? 
                  'Venus terlihat sebagai "bintang" terang di langit senja atau fajar. Sering disebut Bintang Fajar atau Bintang Senja.' :
                  selectedPlanet === 'Mars' ?
                  'Mars terlihat seperti bintang merah terang. Terbaik diamati saat oposisi (berada di sisi berlawanan dari Bumi).' :
                  selectedPlanet === 'Jupiter' ?
                  'Jupiter sangat terang dan bisa dilihat dengan mata telanjang. Dengan teleskop kecil bisa lihat 4 bulan terbesarnya.' :
                  'Gunakan aplikasi astronomi seperti Stellarium atau Sky Map untuk menemukan planet di langit malam.'}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>💡</span>
                <span>Cari lokasi dengan polusi cahaya minimal untuk pengamatan terbaik</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">📚 Sumber Belajar</h3>
            <div className="space-y-3">
              <a
                href="https://eyes.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4">
                  <span className="text-blue-400">👁️</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-blue-400">NASA's Eyes</div>
                  <div className="text-sm text-gray-400">Visualisasi interaktif NASA</div>
                </div>
              </a>
              <a
                href="https://spaceplace.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-purple-400">🚀</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-purple-400">NASA Space Place</div>
                  <div className="text-sm text-gray-400">Edukasi astronomi untuk semua usia</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-500 text-sm">
          <p>
            Model 3D disediakan oleh <a href="https://www.solarsystemscope.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">SolarSystemScope.com</a>. 
            Data planet dari NASA.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SolarSystem