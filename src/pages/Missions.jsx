import { useState, useEffect } from 'react'

const Missions = () => {
  const [activeMissions, setActiveMissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMission, setSelectedMission] = useState(null)
  const [missionDetails, setMissionDetails] = useState(null)

  // Data misi dari API NASA (kita gunakan data dari NASA API atau simulasi)
  const allMissions = [
    {
      id: 1,
      name: 'Artemis Program',
      status: 'Active',
      launchDate: '2024 (planned)',
      target: 'Moon',
      description: 'Misi untuk membawa manusia kembali ke Bulan, termasuk wanita pertama dan orang kulit berwarna pertama.',
      type: 'Human Exploration',
      agency: 'NASA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-blue-600 to-purple-600',
      details: {
        objective: 'Establish sustainable lunar exploration and prepare for Mars missions',
        duration: '2024-2030+',
        crew: '4 astronauts per mission',
        spacecraft: 'Orion capsule, SLS rocket, Lunar Gateway',
        website: 'https://www.nasa.gov/specials/artemis/'
      }
    },
    {
      id: 2,
      name: 'Mars Perseverance',
      status: 'Active',
      launchDate: 'July 30, 2020',
      target: 'Mars',
      description: 'Rover yang mencari tanda-tanda kehidupan kuno dan mengumpulkan sampel untuk dibawa ke Bumi.',
      type: 'Rover',
      agency: 'NASA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-red-600 to-orange-600',
      details: {
        objective: 'Search for signs of ancient life and collect samples',
        duration: 'At least one Mars year (687 Earth days)',
        landingSite: 'Jezero Crater',
        instruments: '7 scientific instruments, helicopter (Ingenuity)',
        website: 'https://mars.nasa.gov/mars2020/'
      }
    },
    {
      id: 3,
      name: 'James Webb Telescope',
      status: 'Active',
      launchDate: 'Dec 25, 2021',
      target: 'Lagrange Point 2',
      description: 'Teleskop luar angkasa paling kuat yang pernah dibangun, mengamati alam semesta awal.',
      type: 'Telescope',
      agency: 'NASA/ESA/CSA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-yellow-600 to-amber-600',
      details: {
        objective: 'Observe the first galaxies and study planetary systems',
        duration: '5-10+ years',
        mirrorSize: '6.5 meters (21 ft)',
        wavelength: 'Infrared',
        website: 'https://webb.nasa.gov/'
      }
    },
    {
      id: 4,
      name: 'International Space Station',
      status: 'Active',
      launchDate: '1998',
      target: 'Low Earth Orbit',
      description: 'Stasiun luar angkasa internasional untuk penelitian ilmiah di mikrogravitasi.',
      type: 'Space Station',
      agency: 'NASA/Roscosmos/ESA/JAXA/CSA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-green-600 to-emerald-600',
      details: {
        objective: 'International laboratory in microgravity',
        duration: 'Since 1998 (ongoing)',
        crew: '7 astronauts continuously',
        orbit: '408 km altitude, 51.6° inclination',
        website: 'https://www.nasa.gov/mission_pages/station/main/index.html'
      }
    },
    {
      id: 5,
      name: 'DART Mission',
      status: 'Completed',
      launchDate: 'Nov 24, 2021',
      target: 'Asteroid Dimorphos',
      description: 'Misi pertama untuk menguji pertahanan planet dengan menabrakkan pesawat ke asteroid.',
      type: 'Planetary Defense',
      agency: 'NASA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-gray-600 to-gray-800',
      details: {
        objective: 'Test asteroid deflection technology',
        duration: '10 months',
        impactDate: 'September 26, 2022',
        success: 'Changed asteroid orbit by 32 minutes',
        website: 'https://www.nasa.gov/dart'
      }
    },
    {
      id: 6,
      name: 'Parker Solar Probe',
      status: 'Active',
      launchDate: 'Aug 12, 2018',
      target: 'Sun',
      description: 'Pesawat pertama yang "menyentuh" Matahari, mempelajari korona matahari.',
      type: 'Solar Probe',
      agency: 'NASA',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop',
      color: 'from-orange-600 to-red-600',
      details: {
        objective: 'Study the Sun outer atmosphere and solar wind',
        duration: '7 years',
        closestApproach: '6.2 million km from Sun surface',
        speed: '692,000 km/h (fastest human-made object)',
        website: 'https://www.nasa.gov/parkersolarprobe'
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'Semua Misi', count: allMissions.length },
    { id: 'Active', name: 'Aktif', count: allMissions.filter(m => m.status === 'Active').length },
    { id: 'Completed', name: 'Selesai', count: allMissions.filter(m => m.status === 'Completed').length },
    { id: 'Human Exploration', name: 'Eksplorasi Manusia', count: allMissions.filter(m => m.type === 'Human Exploration').length },
    { id: 'Rover', name: 'Rover', count: allMissions.filter(m => m.type === 'Rover').length },
    { id: 'Telescope', name: 'Teleskop', count: allMissions.filter(m => m.type === 'Telescope').length }
  ]

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setActiveMissions(allMissions)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMissions = selectedCategory === 'all' 
    ? allMissions 
    : allMissions.filter(mission => 
        mission.status === selectedCategory || mission.type === selectedCategory
      )

  const handleViewDetails = (mission) => {
    setSelectedMission(mission)
    setMissionDetails(mission.details)
  }

  const handleCloseDetails = () => {
    setSelectedMission(null)
    setMissionDetails(null)
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Misi NASA Live</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Lacak misi-misi aktif NASA yang sedang menjelajahi tata surya dan alam semesta.
          Klik "Lihat Detail Misi" untuk informasi lengkap.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Misi Aktif', value: '100+', icon: '🚀', color: 'bg-blue-900/30' },
            { label: 'Dalam Perjalanan', value: '15+', icon: '🌌', color: 'bg-purple-900/30' },
            { label: 'Rover di Mars', value: '3', icon: '♂️', color: 'bg-red-900/30' },
            { label: 'Tahun Eksplorasi', value: '60+', icon: '📅', color: 'bg-green-900/30' }
          ].map((stat, index) => (
            <div key={index} className={`${stat.color} p-6 rounded-2xl border border-gray-800`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Filter Misi</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Memuat data misi NASA...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition group"
                >
                  {/* Mission Image */}
                  <div className="h-48 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${mission.color} opacity-30`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">{mission.type === 'Rover' ? '♂️' : '🚀'}</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        mission.status === 'Active' ? 'bg-green-900/30 text-green-300 border border-green-700' :
                        mission.status === 'Completed' ? 'bg-gray-800 text-gray-300 border border-gray-700' :
                        'bg-yellow-900/30 text-yellow-300 border border-yellow-700'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                  </div>

                  {/* Mission Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{mission.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{mission.agency}</span>
                          <span>•</span>
                          <span>{mission.type}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {mission.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Target:</span>
                        <span className="font-semibold">{mission.target}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Peluncuran:</span>
                        <span className="font-semibold">{mission.launchDate}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-800">
                      <button 
                        onClick={() => handleViewDetails(mission)}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition font-medium"
                      >
                        Lihat Detail Misi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMissions.length === 0 && (
              <div className="text-center py-20 bg-gray-900/50 rounded-2xl">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Tidak Ada Misi</h3>
                <p className="text-gray-400">
                  Tidak ada misi yang ditemukan dengan filter "{selectedCategory}".
                  Coba kategori lain.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mission Details Modal */}
      {selectedMission && missionDetails && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{selectedMission.name}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-gray-400">{selectedMission.agency}</span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {selectedMission.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      selectedMission.status === 'Active' ? 'bg-green-900/30 text-green-300 border border-green-700' :
                      selectedMission.status === 'Completed' ? 'bg-gray-800 text-gray-300 border border-gray-700' :
                      'bg-yellow-900/30 text-yellow-300 border border-yellow-700'
                    }`}>
                      {selectedMission.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="p-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {/* Mission Info */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">📝 Deskripsi Misi</h3>
                  <p className="text-gray-300">{selectedMission.description}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="text-sm text-gray-400">Target</div>
                      <div className="font-bold text-lg">{selectedMission.target}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Tanggal Peluncuran</div>
                      <div className="font-bold text-lg">{selectedMission.launchDate}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">🎯 Detail Teknis</h3>
                  <div className="space-y-4">
                    {Object.entries(missionDetails).map(([key, value]) => (
                      key !== 'website' && (
                        <div key={key}>
                          <div className="text-sm text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div className="font-bold">{value}</div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">🔗 Sumber Daya Tambahan</h3>
                <div className="space-y-3">
                  {missionDetails.website && (
                    <a
                      href={missionDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4">
                        <span className="text-blue-400">🌐</span>
                      </div>
                      <div>
                        <div className="font-semibold group-hover:text-blue-400">
                          Website Resmi {selectedMission.name}
                        </div>
                        <div className="text-sm text-gray-400">Informasi lengkap dari NASA</div>
                      </div>
                    </a>
                  )}
                  
                  <a
                    href={`https://www.nasa.gov/mission_pages/${selectedMission.name.toLowerCase().replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center mr-4">
                      <span className="text-purple-400">📰</span>
                    </div>
                    <div>
                      <div className="font-semibold group-hover:text-purple-400">Berita Terbaru</div>
                      <div className="text-sm text-gray-400">Update dan perkembangan misi</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCloseDetails}
                  className="px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  Tutup
                </button>
                {missionDetails.website && (
                  <a
                    href={missionDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition"
                  >
                    Kunjungi Website NASA
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Mission - Artemis */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-4">
                  <span className="text-xl">🌙</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Misi Unggulan: Artemis</h2>
                  <p className="text-gray-400">Kembali ke Bulan</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                Program Artemis adalah misi NASA untuk membawa manusia kembali ke Bulan,
                termasuk wanita pertama dan orang kulit berwarna pertama. Misi ini akan
                membangun kehadiran manusia yang berkelanjutan di Bulan sebagai batu loncatan
                untuk misi Mars di masa depan.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-xl">
                  <div className="text-sm text-gray-400">Target</div>
                  <div className="font-bold">Kutub Selatan Bulan</div>
                </div>
                <div className="bg-black/30 p-4 rounded-xl">
                  <div className="text-sm text-gray-400">Jadwal</div>
                  <div className="font-bold">Artemis II: 2024</div>
                </div>
              </div>
              
              <button 
                onClick={() => handleViewDetails(allMissions[0])}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Lihat Detail Artemis
              </button>
            </div>
            
            <div className="relative h-64 lg:h-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🌙</div>
                  <div className="text-2xl font-bold">Artemis Program</div>
                  <div className="text-gray-300">Next Giant Leap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">📡 Sumber Data NASA</h3>
            <div className="space-y-3">
              <a
                href="https://www.nasa.gov/missions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4">
                  <span className="text-blue-400">🚀</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-blue-400">NASA Missions</div>
                  <div className="text-sm text-gray-400">Database misi NASA lengkap</div>
                </div>
              </a>
              <a
                href="https://api.nasa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-purple-400">🔧</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-purple-400">NASA API</div>
                  <div className="text-sm text-gray-400">Data real-time untuk developer</div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">🎓 Belajar Lebih Lanjut</h3>
            <p className="text-gray-300 mb-4">
              Ingin tahu lebih banyak tentang eksplorasi luar angkasa? 
              Kunjungi sumber-sumber edukasi NASA:
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.nasa.gov/learning-resources" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-900/30 rounded-lg hover:bg-blue-800/30 transition text-sm">
                Learning Resources
              </a>
              <a href="https://www.nasa.gov/stem" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-900/30 rounded-lg hover:bg-purple-800/30 transition text-sm">
                STEM Engagement
              </a>
              <a href="https://www.nasa.gov/kidsclub" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-900/30 rounded-lg hover:bg-green-800/30 transition text-sm">
                Kids' Club
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Missions