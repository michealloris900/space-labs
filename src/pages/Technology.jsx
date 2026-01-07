import { useState, useEffect, useRef } from 'react'

const Technology = () => {
  const [activeTech, setActiveTech] = useState('jwst')
  const [showTechMenu, setShowTechMenu] = useState(false)
  const techMenuRef = useRef(null)

  // Data untuk setiap teknologi
  const technologies = {
    jwst: {
      id: 'jwst',
      name: 'James Webb Space Telescope',
      shortName: 'JWST',
      description: 'Teleskop luar angkasa inframerah terbesar dan terkuat yang pernah diluncurkan. Mengamati alam semesta awal, exoplanet, dan formasi bintang.',
      launchYear: '2021',
      status: 'Aktif',
      distance: '1.5 juta km dari Bumi (L2)',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_jwst?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true',
      features: [
        'Cermin utama 6.5 meter (emas)',
        'Mengamati dalam inframerah',
        'Target: Galaksi pertama setelah Big Bang',
        'Suhu operasi: -223°C'
      ],
      icon: '✨',
      color: 'from-purple-600 to-pink-600'
    },
    hubble: {
      id: 'hubble',
      name: 'Hubble Space Telescope',
      shortName: 'Hubble',
      description: 'Teleskop luar angkasa pertama yang mengubah pemahaman kita tentang alam semesta. Beroperasi lebih dari 30 tahun.',
      launchYear: '1990',
      status: 'Aktif',
      distance: '547 km dari Bumi',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_hubble_space_telescope?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true',
      features: [
        'Cermin utama 2.4 meter',
        'Gambar ikonik: Pillars of Creation',
        'Penemuan: Ekspansi alam semesta dipercepat',
        'Servis 5 kali oleh astronaut'
      ],
      icon: '🔭',
      color: 'from-blue-600 to-cyan-600'
    },
    voyager1: {
      id: 'voyager1',
      name: 'Voyager 1',
      shortName: 'Voyager 1',
      description: 'Wahana antariksa terjauh dari Bumi. Telah meninggalkan heliosfer dan memasuki ruang antarbintang.',
      launchYear: '1977',
      status: 'Aktif (45+ tahun)',
      distance: '24 miliar km dari Bumi',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_voyager_1?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true&lighting=flood',
      features: [
        'Pertama meninggalkan tata surya (2012)',
        'Membawa Golden Record',
        'Daya: Generator radioisotop (RTG)',
        'Masih mengirim data'
      ],
      icon: '🛰️',
      color: 'from-green-600 to-emerald-600'
    },
    iss: {
      id: 'iss',
      name: 'International Space Station',
      shortName: 'ISS',
      description: 'Stasiun luar angkasa terbesar yang pernah dibangun. Laboratorium penelitian di orbit rendah Bumi.',
      launchYear: '1998',
      status: 'Aktif',
      distance: '408 km dari Bumi',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_iss?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true',
      features: [
        'Ukuran: Lapangan sepak bola',
        'Kecepatan: 28,000 km/jam',
        'Orbit: 90 menit mengelilingi Bumi',
        'Awak: 7 astronaut permanen'
      ],
      icon: '🛰️',
      color: 'from-yellow-600 to-orange-600'
    },
    chandra: {
      id: 'chandra',
      name: 'Chandra X-ray Observatory',
      shortName: 'Chandra',
      description: 'Teleskop sinar-X yang mengamati objek panas di alam semesta seperti lubang hitam dan sisa supernova.',
      launchYear: '1999',
      status: 'Aktif',
      distance: '139,000 km dari Bumi',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_chandra?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true',
      features: [
        'Observasi sinar-X energi tinggi',
        'Cermin parabola terbesar',
        'Suhu operasi: -120°C',
        'Studi: Lubang hitam, neutron stars'
      ],
      icon: '☄️',
      color: 'from-red-600 to-pink-600'
    },
    deepspace: {
      id: 'deepspace',
      name: 'Deep Space Network',
      shortName: 'DSN',
      description: 'Jaringan antena radio NASA yang berkomunikasi dengan wahana antariksa di seluruh tata surya.',
      launchYear: '1963',
      status: 'Aktif',
      distance: 'Bumi (California, Spanyol, Australia)',
      embedUrl: 'https://eyes.nasa.gov/apps/solar-system/#/sc_deep_space_1?featured=false&detailPanel=false&logo=false&search=false&shareButton=false&menu=false&collapseSettingsOptions=true&hideFullScreenToggle=true&locked=true&hideExternalLinks=true',
      features: [
        '3 kompleks antena global',
        'Diameter antena: 70 meter',
        'Komunikasi dengan Voyager',
        'Jangkauan: Sampai Neptunus+'
      ],
      icon: '📡',
      color: 'from-indigo-600 to-violet-600'
    }
  }

  const currentTech = technologies[activeTech]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (techMenuRef.current && !techMenuRef.current.contains(event.target)) {
        setShowTechMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTechSelect = (techId) => {
    setActiveTech(techId)
    setShowTechMenu(false) // Close menu on mobile after selection
  }

  // Navigation functions
  const goToPreviousTech = () => {
    const techIds = Object.keys(technologies)
    const currentIndex = techIds.indexOf(activeTech)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : techIds.length - 1
    setActiveTech(techIds[prevIndex])
  }

  const goToNextTech = () => {
    const techIds = Object.keys(technologies)
    const currentIndex = techIds.indexOf(activeTech)
    const nextIndex = currentIndex < techIds.length - 1 ? currentIndex + 1 : 0
    setActiveTech(techIds[nextIndex])
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Teknologi Observasi Antariksa</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Jelajahi alat-alat canggih NASA yang membantu kita memahami alam semesta.
          Setiap teknologi membuka jendela baru ke kosmos.
        </p>
      </div>

      {/* Technology Selector - RESPONSIF */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pilih Teknologi</h2>
            
            {/* Mobile Dropdown Button */}
            <button
              onClick={() => setShowTechMenu(!showTechMenu)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
            >
              <span className="text-xl">{currentTech.icon}</span>
              <span className="font-medium">{currentTech.shortName}</span>
              <span className={`transition-transform ${showTechMenu ? 'rotate-180' : ''}`}>▼</span>
            </button>
          </div>

          {/* Desktop Grid (hidden on mobile) */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.values(technologies).map((tech) => (
              <button
                key={tech.id}
                onClick={() => handleTechSelect(tech.id)}
                className={`flex flex-col items-center p-4 rounded-xl transition ${
                  activeTech === tech.id
                    ? `bg-gradient-to-br ${tech.color} border-2 border-white/30`
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl md:text-3xl mb-2">{tech.icon}</div>
                <div className="text-sm font-semibold text-center">{tech.shortName}</div>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown Menu */}
          <div ref={techMenuRef} className="relative md:hidden">
            {showTechMenu && (
              <div className="absolute top-2 left-0 right-0 z-50 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-2 max-h-80 overflow-y-auto">
                  {Object.values(technologies).map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => handleTechSelect(tech.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 last:mb-0 transition ${
                        activeTech === tech.id
                          ? `bg-gradient-to-r ${tech.color}`
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-xl">{tech.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{tech.shortName}</div>
                        <div className="text-xs text-gray-300 opacity-80">
                          Diluncurkan: {tech.launchYear}
                        </div>
                      </div>
                      {activeTech === tech.id && (
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

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 md:p-8 border border-gray-800">
          {/* Technology Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
            <div className="flex items-start gap-4 md:gap-6">
              <div className={`text-4xl md:text-5xl ${activeTech === 'jwst' ? 'animate-pulse' : ''}`}>
                {currentTech.icon}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentTech.name}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                    Diluncurkan: {currentTech.launchYear}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    currentTech.status === 'Aktif' 
                      ? 'bg-green-900/30 text-green-300' 
                      : 'bg-yellow-900/30 text-yellow-300'
                  }`}>
                    {currentTech.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-400">Jarak dari Bumi</div>
              <div className="text-lg font-bold">{currentTech.distance}</div>
            </div>
          </div>

          {/* NASA Embed */}
          <div className="mb-8">
            <div className="relative w-full overflow-hidden rounded-xl border-2 border-blue-500/30 bg-black">
              {/* Loading overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10" id={`embed-loading-${currentTech.id}`}>
                <div className="text-center p-6">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-300">Memuat visualisasi {currentTech.shortName}...</p>
                  <p className="text-gray-400 text-sm mt-2">Data real-time dari NASA</p>
                </div>
              </div>

              {/* Embed Iframe */}
              <iframe
                src={currentTech.embedUrl}
                width="100%"
                height="500"
                style={{ border: 'none' }}
                title={`NASA Visualization - ${currentTech.name}`}
                onLoad={() => {
                  document.getElementById(`embed-loading-${currentTech.id}`).style.display = 'none'
                }}
                allowFullScreen
                className="min-h-[500px]"
              />
            </div>
            
            <div className="text-center mt-2 text-sm text-gray-400">
              Visualisasi interaktif dari NASA's Eyes on the Solar System
            </div>
          </div>

          {/* Technology Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Deskripsi</h3>
                <p className="text-gray-300 leading-relaxed">
                  {currentTech.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Fitur Teknis</h3>
                <ul className="space-y-3">
                  {currentTech.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-400">✓</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Interesting Facts */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Fakta Menarik</h3>
                <div className="space-y-3">
                  {activeTech === 'jwst' && (
                    <>
                      <p className="text-gray-300">• Webb dapat melihat galaksi yang terbentuk 13.5 miliar tahun lalu</p>
                      <p className="text-gray-300">• Cerminnya terdiri dari 18 segmen heksagonal berlapis emas</p>
                      <p className="text-gray-300">• Pelindung matahari sebesar lapangan tenis</p>
                    </>
                  )}
                  {activeTech === 'hubble' && (
                    <>
                      <p className="text-gray-300">• Hubble telah mengorbit Bumi lebih dari 175,000 kali</p>
                      <p className="text-gray-300">• Gambar Deep Field menunjukkan 3,000 galaksi dalam area kecil</p>
                      <p className="text-gray-300">• Diperbaiki 5 kali oleh misi servis Space Shuttle</p>
                    </>
                  )}
                  {activeTech === 'voyager1' && (
                    <>
                      <p className="text-gray-300">• Membawa Golden Record dengan suara dan gambar dari Bumi</p>
                      <p className="text-gray-300">• Butuh 20 jam untuk sinyal mencapai Bumi dari Voyager 1</p>
                      <p className="text-gray-300">• Masih mengirim data setelah 45+ tahun</p>
                    </>
                  )}
                  {activeTech === 'iss' && (
                    <>
                      <p className="text-gray-300">• ISS dapat dilihat dengan mata telanjang dari Bumi</p>
                      <p className="text-gray-300">• Astronot mengalami 16 matahari terbit/terbenam setiap hari</p>
                      <p className="text-gray-300">• Laboratorium dengan lebih dari 3,000 eksperimen</p>
                    </>
                  )}
                  {activeTech === 'chandra' && (
                    <>
                      <p className="text-gray-300">• Dapat melihat sinar-X dari sumber 10 miliar tahun cahaya</p>
                      <p className="text-gray-300">• Orbit elips membawanya 1/3 jarak ke Bulan</p>
                      <p className="text-gray-300">• Membantu menemukan lubang hitam di pusat galaksi</p>
                    </>
                  )}
                  {activeTech === 'deepspace' && (
                    <>
                      <p className="text-gray-300">• Satu-satunya fasilitas yang bisa berkomunikasi dengan Voyager</p>
                      <p className="text-gray-300">• Antena 70 meter setinggi 20 lantai</p>
                      <p className="text-gray-300">• Mengirim perintah ke rover Mars dan wahana lainnya</p>
                    </>
                  )}
                </div>
              </div>

              {/* Related Missions */}
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Misi Terkait</h3>
                <div className="space-y-2">
                  {activeTech === 'jwst' && (
                    <>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">Hubble Space Telescope</span>
                        <span className="text-blue-400">→</span>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">Roman Space Telescope</span>
                        <span className="text-blue-400">→</span>
                      </div>
                    </>
                  )}
                  {activeTech === 'voyager1' && (
                    <>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">Voyager 2</span>
                        <span className="text-blue-400">→</span>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">New Horizons</span>
                        <span className="text-blue-400">→</span>
                      </div>
                    </>
                  )}
                  {activeTech === 'iss' && (
                    <>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">Space Shuttle Program</span>
                        <span className="text-blue-400">→</span>
                      </div>
                      <div className="flex items-center justify-between p-2 hover:bg-gray-700/50 rounded">
                        <span className="text-gray-300">Artemis Program</span>
                        <span className="text-blue-400">→</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - RESPONSIF */}
          <div className="mt-10 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={goToPreviousTech}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                <span>←</span>
                <span>Teknologi Sebelumnya</span>
              </button>
              
              <button
                onClick={goToNextTech}
                className="flex-1 sm:flex-none px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
              >
                <span>Teknologi Selanjutnya</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Comparison - RESPONSIF */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 md:p-8 border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-6 text-center">Perbandingan Teknologi</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4">Nama</th>
                  <th className="text-left py-3 px-4">Diluncurkan</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Jarak</th>
                  <th className="text-left py-3 px-4">Tipe</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(technologies).map((tech) => (
                  <tr 
                    key={tech.id} 
                    className={`border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer ${
                      activeTech === tech.id ? 'bg-gray-800/50' : ''
                    }`}
                    onClick={() => handleTechSelect(tech.id)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tech.icon}</span>
                        <span className="font-medium">{tech.shortName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{tech.launchYear}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        tech.status === 'Aktif' 
                          ? 'bg-green-900/30 text-green-300' 
                          : 'bg-yellow-900/30 text-yellow-300'
                      }`}>
                        {tech.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{tech.distance.split(' ')[0]}</td>
                    <td className="py-3 px-4">
                      {tech.id === 'iss' || tech.id === 'voyager1' ? 'Wahana' : 'Observatorium'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">📊 Fakta Teknologi Antariksa</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-2xl font-bold">6</div>
              <div className="text-gray-400">Teknologi Aktif</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">⏱️</div>
              <div className="text-2xl font-bold">45+</div>
              <div className="text-gray-400">Tahun Voyager Aktif</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">📡</div>
              <div className="text-2xl font-bold">24M km</div>
              <div className="text-gray-400">Jarak Voyager</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🌌</div>
              <div className="text-2xl font-bold">13.5B</div>
              <div className="text-gray-400">Tahun Cahaya (JWST)</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 md:p-12 text-center border border-blue-500/30">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ingin Belajar Lebih Lanjut?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Semua data ini berasal langsung dari NASA. Kunjungi situs resmi NASA
            untuk informasi terbaru tentang misi dan teknologi antariksa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-base md:text-lg hover:opacity-90 transition"
            >
              Kunjungi NASA.gov
            </a>
            <a
              href="https://eyes.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 md:px-8 py-3 md:py-4 bg-gray-800 rounded-xl font-semibold text-base md:text-lg hover:bg-gray-700 transition"
            >
              NASA's Eyes
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Technology