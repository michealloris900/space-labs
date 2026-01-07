// src/pages/Home.jsx - DENGAN NASA IMAGE LIBRARY FALLBACK
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [apodData, setApodData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('') // Track data source

  const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY'

  useEffect(() => {
    fetchAPOD()
  }, [])

  // NASA Image Library API - NO API KEY NEEDED
  const fetchFromImageLibrary = async (query) => {
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`
      )
      
      if (!response.ok) throw new Error('Image Library API error')
      
      const data = await response.json()
      const items = data.collection?.items || []
      
      if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)]
        const itemData = randomItem.data[0]
        const links = randomItem.links || []
        
        return {
          title: itemData.title || 'NASA Astronomy Image',
          url: links[0]?.href || '',
          hdurl: links[0]?.href || '',
          explanation: itemData.description || 'A stunning image from NASA archives',
          date: itemData.date_created ? itemData.date_created.split('T')[0] : new Date().toISOString().split('T')[0],
          copyright: itemData.center || 'NASA',
          media_type: 'image',
          source: 'NASA Image Library'
        }
      }
      return null
    } catch (error) {
      console.error('Error fetching from Image Library:', error)
      return null
    }
  }

  const fetchAPOD = async () => {
    try {
      setLoading(true)
      setError(null)
      setSource('')
      
      // ⭐ TRY 1: APOD API PRIMUM
      console.log('Mencoba APOD API...')
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
        { signal: AbortSignal.timeout(5000) } // Timeout 5 detik
      )
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('API rate limit exceeded.')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('✅ APOD API berhasil!')
      setApodData({ ...data, source: 'NASA APOD API' })
      setSource('APOD API')
      
    } catch (error) {
      console.log('⚠️ APOD API gagal:', error.message)
      
      // ⭐ TRY 2: NASA IMAGE LIBRARY FALLBACK
      console.log('Mencoba NASA Image Library...')
      try {
        const imageData = await fetchFromImageLibrary('astronomy nebula galaxy')
        
        if (imageData) {
          console.log('✅ NASA Image Library berhasil!')
          setApodData(imageData)
          setSource('NASA Image Library')
          setError(`APOD API sedang bermasalah. Menampilkan gambar astronomi dari arsip NASA.`)
        } else {
          // ⭐ TRY 3: STATIC FALLBACK
          throw new Error('Semua API gagal')
        }
        
      } catch (fallbackError) {
        console.log('⚠️ Semua API gagal, menggunakan data statis')
        setError('NASA API sedang bermasalah. Menampilkan data contoh.')
        setApodData(getStaticAPOD())
        setSource('Static Data')
      }
    } finally {
      setLoading(false)
    }
  }

  // Static fallback data
  const getStaticAPOD = () => {
    return {
      title: "The Cat's Eye Nebula",
      date: new Date().toISOString().split('T')[0],
      url: "https://images-assets.nasa.gov/image/hubble-cats-eye-nebula_28000029550_o/hubble-cats-eye-nebula_28000029550_o~thumb.jpg",
      hdurl: "https://images-assets.nasa.gov/image/hubble-cats-eye-nebula_28000029550_o/hubble-cats-eye-nebula_28000029550_o~large.jpg",
      explanation: "The Cat's Eye Nebula (NGC 6543) is one of the best known planetary nebulae in the sky. Its more familiar outlines are seen in the brighter central region of this stunning image. But this composite picture combines many exposures to reveal the nebula's extremely faint outer halo.",
      copyright: "NASA, ESA, Hubble",
      media_type: "image",
      source: "Static Fallback"
    }
  }

  // Features data
  const features = [
    { 
      icon: '🌍', 
      title: 'Tata Surya 3D', 
      description: 'Jelajahi planet dengan model interaktif 3D',
      link: '/solar-system'
    },
    { 
      icon: '🔭', 
      title: 'Observasi Langit', 
      description: 'Panduan observasi berdasarkan lokasi Anda',
      link: '/observation'
    },
    { 
      icon: '📚', 
      title: 'Materi Edukasi', 
      description: 'Belajar astronomi dengan konten terstruktur',
      link: '/education'
    },
    { 
      icon: '🚀', 
      title: 'Misi NASA Live', 
      description: 'Tracking misi NASA secara real-time',
      link: '/missions'
    },
  ]

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Jelajahi Luar Angkasa</span>
            <span className="block text-3xl md:text-4xl font-normal text-gray-300 mt-4">
              Dari Perangkat Anda
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Platform edukasi antariksa gratis untuk meningkatkan literasi sains 
            dan menginspirasi generasi muda Indonesia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/solar-system" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition inline-flex items-center justify-center"
            >
              <span>Mulai Eksplorasi</span>
              <span className="ml-2">→</span>
            </Link>
            <Link 
              to="/education" 
              className="px-8 py-4 bg-gray-800 rounded-xl font-semibold text-lg hover:bg-gray-700 transition"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* APOD Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient">Astronomy Picture of the Day</span>
            </h2>
            <p className="text-gray-400">
              {source === 'APOD API' ? 'Gambar astronomi hari ini dari NASA' :
               source === 'NASA Image Library' ? 'Gambar astronomi dari arsip NASA' :
               'Gambar astronomi contoh'}
            </p>
            {source && (
              <div className="inline-block mt-2 px-3 py-1 bg-gray-800 rounded-full text-sm">
                Sumber: {source}
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Memuat gambar dari NASA...</p>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 border border-gray-800">
              {error && (
                <div className={`mb-6 p-4 rounded-lg ${
                  error.includes('API rate limit') 
                    ? 'bg-yellow-900/30 border border-yellow-700 text-yellow-300' 
                    : 'bg-blue-900/30 border border-blue-700 text-blue-300'
                }`}>
                  <p>ℹ️ {error}</p>
                  <button 
                    onClick={fetchAPOD}
                    className="mt-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-sm"
                  >
                    🔁 Coba Lagi
                  </button>
                </div>
              )}
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Image/Video */}
                <div className="relative rounded-xl overflow-hidden">
                  {apodData?.media_type === 'image' ? (
                    <img
                      src={apodData.url}
                      alt={apodData.title || 'NASA Astronomy Picture'}
                      className="w-full h-64 md:h-96 object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://images-assets.nasa.gov/image/logo/logo~thumb.jpg"
                      }}
                    />
                  ) : apodData?.url ? (
                    <iframe
                      src={apodData.url}
                      title={apodData.title || 'NASA Video'}
                      className="w-full h-64 md:h-96 rounded-xl"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center rounded-xl">
                      <span className="text-4xl">🌌</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 bg-black/70 rounded-full text-sm">
                        {apodData?.date || 'Today'}
                      </span>
                      {apodData?.hdurl && (
                        <a
                          href={apodData.hdurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-sm"
                        >
                          Full Resolution ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">
                      {apodData?.title || 'The Beauty of Space'}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {apodData?.explanation?.substring(0, 400) || 
                       "Explore the wonders of our universe through NASA's daily astronomy pictures. Each day features a different image or photograph of our fascinating universe, along with a brief explanation written by a professional astronomer."}
                      {apodData?.explanation?.length > 400 && '...'}
                    </p>
                    
                    {apodData?.copyright && (
                      <p className="mt-6 text-gray-400">
                        <span className="font-semibold">Credit:</span> {apodData.copyright}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                    <Link 
                      to="/gallery" 
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      <span>Lihat gallery lengkap</span>
                      <span className="ml-2">→</span>
                    </Link>
                    
                    <button 
                      onClick={fetchAPOD}
                      className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-sm flex items-center"
                    >
                      <span className="mr-2">🔄</span>
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Apa yang Bisa Anda Jelajahi?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Temukan berbagai konten edukasi antariksa yang interaktif dan menarik
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="bg-gray-900 p-8 rounded-2xl hover:bg-gray-800 transition group border border-gray-800 hover:border-blue-500/30"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="text-sm font-medium">Jelajahi</span>
                <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Fakta Menakjubkan</h2>
            <p className="text-xl text-gray-300">
              Angka-angka yang membuat Anda tercengang
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '8', label: 'Planet', desc: 'Di tata surya', icon: '🪐' },
              { value: '100+', label: 'Misi', desc: 'NASA aktif', icon: '🚀' },
              { value: '5K+', label: 'Exoplanet', desc: 'Ditemukan', icon: '⭐' },
              { value: '∞', label: 'Kemungkinan', desc: 'Di alam semesta', icon: '🌌' },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800"
              >
                <div className="text-4xl mb-4 animate-pulse">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 text-center border border-gray-800">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Perjalanan Antariksa?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan orang yang sudah mulai belajar tentang keindahan alam semesta
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/education" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:opacity-90 transition"
            >
              Mulai Kursus Gratis
            </Link>
            <Link 
              to="/solar-system" 
              className="px-8 py-4 bg-gray-800 rounded-xl font-semibold text-lg hover:bg-gray-700 transition"
            >
              Jelajahi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home