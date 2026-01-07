import { useState, useEffect } from 'react'

const Gallery = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('apod')
  const [selectedRover, setSelectedRover] = useState('curiosity')
  
  const API_KEY = import.meta.env.VITE_NASA_API_KEY

  const categories = [
    { id: 'apod', name: 'Astronomy Picture of the Day', icon: '📅' },
    { id: 'mars', name: 'Mars Rover Photos', icon: '♂️' },
    { id: 'earth', name: 'Earth from Space', icon: '🌍' },
    { id: 'nebula', name: 'Nebulas & Galaxies', icon: '🌌' }
  ]

  const rovers = [
    { id: 'curiosity', name: 'Curiosity', color: 'from-yellow-600 to-orange-600' },
    { id: 'perseverance', name: 'Perseverance', color: 'from-red-600 to-pink-600' }
  ]

  // NASA Image and Video Library API
  const fetchNASAImages = async (query, mediaType = 'image') => {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=${mediaType}`
    
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`API Error: ${response.status}`)
      
      const data = await response.json()
      return data.collection.items || []
    } catch (error) {
      console.error('Error fetching NASA images:', error)
      return []
    }
  }

  // Fungsi fetch data
  const fetchNASAData = async (category, rover = 'curiosity') => {
    try {
      setLoading(true)
      setError(null)

      console.log('Fetching:', category)

      let formattedPhotos = []
      
      switch(category) {
        case 'apod':
          // Coba APOD dulu, jika gagal gunakan Image Library
          try {
            const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=8&thumbs=true`
            const response = await fetch(apodUrl)
            
            if (response.ok) {
              const data = await response.json()
              formattedPhotos = Array.isArray(data) ? data.map((item, index) => ({
                id: `apod-${item.date || index}`,
                img_src: item.url || item.hdurl || item.thumbnail_url,
                title: item.title || `Astronomy Picture - ${item.date || 'Unknown'}`,
                explanation: item.explanation || '',
                date: item.date || new Date().toISOString().split('T')[0]
              })) : []
            } else {
              // Fallback ke Image Library
              throw new Error('APOD API down')
            }
          } catch {
            // Gunakan NASA Image Library untuk astronomy pictures
            const items = await fetchNASAImages('astronomy nebula galaxy', 'image')
            formattedPhotos = items.slice(0, 8).map((item, index) => {
              const data = item.data[0]
              const links = item.links || []
              
              return {
                id: `nasa-img-${data.nasa_id || index}`,
                img_src: links[0]?.href || '',
                title: data.title || 'NASA Image',
                explanation: data.description || '',
                date: data.date_created ? data.date_created.split('T')[0] : 'Unknown'
              }
            })
          }
          break
          
        case 'mars':
          // Gunakan NASA Image Library untuk Mars
          const marsItems = await fetchNASAImages(`mars rover ${rover}`, 'image')
          formattedPhotos = marsItems.slice(0, 8).map((item, index) => {
            const data = item.data[0]
            const links = item.links || []
            
            return {
              id: `mars-${data.nasa_id || index}`,
              img_src: links[0]?.href || '',
              title: data.title || `${rover} Mars Rover`,
              explanation: data.description || '',
              date: data.date_created ? data.date_created.split('T')[0] : 'Unknown',
              rover: { name: rover }
            }
          })
          
          // Jika tidak ada hasil, gunakan fallback Mars
          if (formattedPhotos.length === 0) {
            formattedPhotos = getFallbackMars(rover)
          }
          break
          
        case 'earth':
          // Gunakan NASA Image Library untuk Earth
          const earthItems = await fetchNASAImages('earth from space planet', 'image')
          formattedPhotos = earthItems.slice(0, 8).map((item, index) => {
            const data = item.data[0]
            const links = item.links || []
            
            return {
              id: `earth-${data.nasa_id || index}`,
              img_src: links[0]?.href || '',
              title: data.title || 'Earth from Space',
              explanation: data.description || '',
              date: data.date_created ? data.date_created.split('T')[0] : 'Unknown'
            }
          })
          break
          
        case 'nebula':
          // Gunakan NASA Image Library untuk Nebula & Galaxy
          const nebulaItems = await fetchNASAImages('nebula galaxy universe', 'image')
          formattedPhotos = nebulaItems.slice(0, 8).map((item, index) => {
            const data = item.data[0]
            const links = item.links || []
            
            return {
              id: `nebula-${data.nasa_id || index}`,
              img_src: links[0]?.href || '',
              title: data.title || 'Nebula/Galaxy',
              explanation: data.description || '',
              date: data.date_created ? data.date_created.split('T')[0] : 'Unknown'
            }
          })
          break
      }
      
      // Filter out items tanpa gambar
      formattedPhotos = formattedPhotos.filter(photo => photo.img_src)
      
      if (formattedPhotos.length === 0) {
        throw new Error('Tidak ada gambar yang ditemukan')
      }
      
      setPhotos(formattedPhotos)
      
    } catch (err) {
      console.error('Error fetching NASA data:', err)
      setError(`Gagal memuat data ${category}. ${err.message}`)
      setPhotos(getFallbackPhotos(category, rover))
    } finally {
      setLoading(false)
    }
  }

  // Fallback data
  const getFallbackMars = (rover) => {
    const marsPhotos = [
      {
        id: 'mars-1',
        img_src: 'https://images-assets.nasa.gov/image/PIA24201/PIA24201~thumb.jpg',
        title: `${rover} at Jezero Crater`,
        explanation: `Mars rover ${rover} exploring Jezero Crater`,
        date: '2023-08-15',
        rover: { name: rover }
      },
      {
        id: 'mars-2',
        img_src: 'https://images-assets.nasa.gov/image/PIA24546/PIA24546~thumb.jpg',
        title: `${rover} Selfie`,
        explanation: `Self portrait of ${rover} rover on Mars`,
        date: '2023-05-20',
        rover: { name: rover }
      }
    ]
    return marsPhotos
  }

  const getFallbackPhotos = (category, rover) => {
    const fallback = {
      apod: [
        {
          id: 'apod-1',
          img_src: 'https://images-assets.nasa.gov/image/hubble-observes-a-cosmic-sea-creature_28000029550_o/hubble-observes-a-cosmic-sea-creature_28000029550_o~thumb.jpg',
          title: 'Cosmic Sea Creature',
          explanation: 'Hubble observes a cosmic sea creature nebula',
          date: '2023-10-15'
        }
      ],
      mars: getFallbackMars(rover),
      earth: [
        {
          id: 'earth-1',
          img_src: 'https://images-assets.nasa.gov/image/iss065e022292/iss065e022292~thumb.jpg',
          title: 'Earth from ISS',
          explanation: 'View of Earth from International Space Station',
          date: '2021-06-15'
        }
      ],
      nebula: [
        {
          id: 'nebula-1',
          img_src: 'https://images-assets.nasa.gov/image/PIA12110/PIA12110~thumb.jpg',
          title: 'Orion Nebula',
          explanation: 'The Orion Nebula captured by Hubble',
          date: '2009-12-10'
        }
      ]
    }
    return fallback[category] || fallback.apod
  }

  useEffect(() => {
    fetchNASAData(selectedCategory, selectedRover)
  }, [selectedCategory, selectedRover])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="space-y-12 pb-16">
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Galeri NASA</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Koleksi gambar menakjubkan dari NASA Image and Video Library
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Pilih Kategori</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`p-4 rounded-xl transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 transform scale-105'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.name}</div>
              </button>
            ))}
          </div>

          {selectedCategory === 'mars' && (
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-lg font-bold mb-4">Pilih Rover Mars</h3>
              <div className="flex flex-wrap gap-3">
                {rovers.map((rover) => (
                  <button
                    key={rover.id}
                    onClick={() => setSelectedRover(rover.id)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedRover === rover.id
                        ? `bg-gradient-to-r ${rover.color}`
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    {rover.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Memuat gambar dari NASA...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-900/20 rounded-2xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={() => fetchNASAData(selectedCategory, selectedRover)}
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              🔁 Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'apod' && 'Astronomy Pictures'}
                {selectedCategory === 'mars' && `Foto Mars dari ${selectedRover}`}
                {selectedCategory === 'earth' && 'Bumi dari Luar Angkasa'}
                {selectedCategory === 'nebula' && 'Nebula & Galaksi'}
              </h2>
              <div className="text-sm text-gray-400">
                {photos.length} gambar
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={photo.img_src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images-assets.nasa.gov/image/logo/logo~thumb.jpg'
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-sm">
                        {photo.date && photo.date !== 'Unknown' && (
                          <div className="font-semibold">Tanggal: {photo.date}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold mb-2 truncate" title={photo.title}>
                      {photo.title}
                    </h3>
                    
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                      <div>
                        {photo.date && photo.date !== 'Unknown' && (
                          <div className="flex items-center">
                            <span className="mr-1">📅</span>
                            <span>{photo.date}</span>
                          </div>
                        )}
                      </div>
                      {photo.rover?.name && (
                        <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                          {photo.rover.name}
                        </span>
                      )}
                    </div>

                    {photo.explanation && (
                      <p className="text-gray-300 text-sm line-clamp-3">
                        {photo.explanation.substring(0, 150)}...
                      </p>
                    )}
                    
                    <div className="mt-4">
                      <a 
                        href={photo.img_src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                      >
                        🔗 Lihat gambar asli
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                Data dari <a href="https://images.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-blue-400">NASA Image and Video Library</a>
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => fetchNASAData(selectedCategory, selectedRover)}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm"
                >
                  🔁 Refresh Data
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-lg font-bold mb-4">ℹ️ Informasi API</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-300">NASA Image and Video Library:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Tidak butuh API key</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Ribuan gambar NASA tersedia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Lebih stabil dari API.nasa.gov</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-yellow-300">Catatan:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Beberapa gambar mungkin besar (loading lambat)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Hasil pencarian mungkin bervariasi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Fallback data tersedia jika API down</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery