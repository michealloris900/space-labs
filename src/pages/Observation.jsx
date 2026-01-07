import { useState, useEffect } from 'react'

const Observation = () => {
  const [location, setLocation] = useState({ lat: -6.2088, lng: 106.8456 }) // Jakarta default
  const [time, setTime] = useState(new Date())
  const [moonPhase, setMoonPhase] = useState(0.5)
  const [visiblePlanets, setVisiblePlanets] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  // Sample data untuk simulasi
  const samplePlanets = [
    { name: 'Venus', magnitude: -4.2, constellation: 'Capricornus', visible: true, riseTime: '18:30', setTime: '05:45' },
    { name: 'Mars', magnitude: 1.2, constellation: 'Gemini', visible: true, riseTime: '20:15', setTime: '07:30' },
    { name: 'Jupiter', magnitude: -2.1, constellation: 'Aries', visible: true, riseTime: '19:45', setTime: '06:15' },
    { name: 'Saturn', magnitude: 0.8, constellation: 'Aquarius', visible: false, riseTime: '04:30', setTime: '16:45' },
  ]

  const sampleEvents = [
    { date: '2024-02-10', name: 'New Moon', type: 'moon', description: 'Bulan baru, kondisi gelap optimal untuk observasi' },
    { date: '2024-02-24', name: 'Full Moon', type: 'moon', description: 'Purnama, kondisi terang kurang ideal untuk observasi deep sky' },
    { date: '2024-03-20', name: 'Spring Equinox', type: 'season', description: 'Ekuinoks musim semi' },
    { date: '2024-04-08', name: 'Solar Eclipse', type: 'eclipse', description: 'Gerhana Matahari total (terlihat di Amerika)' },
    { date: '2024-05-05', name: 'Eta Aquarids Meteor Shower', type: 'meteor', description: 'Hujan meteor Eta Aquarids' },
  ]

  const constellations = [
    { name: 'Orion', season: 'Winter', visibility: 'Excellent', stars: 'Betelgeuse, Rigel' },
    { name: 'Ursa Major', season: 'All Year', visibility: 'Good', stars: 'Big Dipper asterism' },
    { name: 'Scorpius', season: 'Summer', visibility: 'Good', stars: 'Antares' },
    { name: 'Crux', season: 'All Year', visibility: 'Good (Southern)', stars: 'Southern Cross' },
    { name: 'Cassiopeia', season: 'All Year', visibility: 'Excellent', stars: 'W-shaped formation' },
    { name: 'Leo', season: 'Spring', visibility: 'Good', stars: 'Regulus' },
  ]

  useEffect(() => {
    // Simulasi data observasi
    setVisiblePlanets(samplePlanets.filter(p => p.visible))
    setUpcomingEvents(sampleEvents)
    
    // Update waktu setiap menit
    const interval = setInterval(() => {
      setTime(new Date())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const getMoonPhaseEmoji = (phase) => {
    if (phase < 0.1) return '🌑' // New Moon
    if (phase < 0.25) return '🌒' // Waxing Crescent
    if (phase < 0.35) return '🌓' // First Quarter
    if (phase < 0.65) return '🌔' // Waxing Gibbous
    if (phase < 0.75) return '🌕' // Full Moon
    if (phase < 0.85) return '🌖' // Waning Gibbous
    if (phase < 0.95) return '🌗' // Last Quarter
    return '🌘' // Waning Crescent
  }

  const getLightPollutionLevel = (lat, lng) => {
    // Simulasi sederhana berdasarkan koordinat
    if (lat > 0) return 'High' // Northern hemisphere assumed more polluted
    return 'Moderate'
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="text-center pt-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Observasi Langit</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Panduan observasi langit malam untuk Indonesia. Lihat apa yang terlihat di langit malam ini.
        </p>
      </div>

      {/* Current Conditions */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">🌃 Kondisi Langit Saat Ini</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Waktu</div>
              <div className="text-2xl font-bold">{time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-sm text-gray-400">{time.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Fase Bulan</div>
              <div className="text-3xl mb-1">{getMoonPhaseEmoji(moonPhase)}</div>
              <div className="text-lg font-bold">{(moonPhase * 100).toFixed(0)}%</div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Planet Terlihat</div>
              <div className="text-2xl font-bold">{visiblePlanets.length}</div>
              <div className="text-sm text-gray-400">dari 4 planet utama</div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Polusi Cahaya</div>
              <div className="text-2xl font-bold">{getLightPollutionLevel(location.lat, location.lng)}</div>
              <div className="text-sm text-gray-400">Untuk observasi optimal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Planet Visibility */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-6">🪐 Planet yang Terlihat Malam Ini</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3">Planet</th>
                  <th className="pb-3">Kecerahan</th>
                  <th className="pb-3">Rasi Bintang</th>
                  <th className="pb-3">Terbit</th>
                  <th className="pb-3">Terbenam</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {samplePlanets.map((planet, index) => (
                  <tr key={index} className="border-b border-gray-800/50">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full mr-3 ${
                          planet.name === 'Venus' ? 'bg-yellow-500' :
                          planet.name === 'Mars' ? 'bg-red-500' :
                          planet.name === 'Jupiter' ? 'bg-orange-500' :
                          'bg-yellow-300'
                        }`}></div>
                        <span className="font-semibold">{planet.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className={`mr-2 ${planet.magnitude < 0 ? 'text-yellow-300' : 'text-gray-300'}`}>
                          {planet.magnitude}
                        </span>
                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${Math.min(100, (Math.abs(planet.magnitude) / 5) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{planet.constellation}</td>
                    <td className="py-4">{planet.riseTime}</td>
                    <td className="py-4">{planet.setTime}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        planet.visible 
                          ? 'bg-green-900/30 text-green-300 border border-green-700'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        {planet.visible ? 'Terlihat' : 'Tidak Terlihat'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>💡 <strong>Tips:</strong> Planet dengan magnitude negatif (-) lebih terang. Semakin kecil angka, semakin terang.</p>
          </div>
        </div>
      </div>

      {/* Star Map Placeholder */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">✨ Peta Bintang Interaktif</h2>
              <p className="text-gray-400">Untuk Jakarta, {time.toLocaleDateString('id-ID')}, 20:00 WIB</p>
            </div>
            <div className="text-sm bg-blue-900/30 px-3 py-1 rounded-full border border-blue-700">
              Simulasi
            </div>
          </div>

          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-8xl mb-4">🌌</div>
              <h3 className="text-2xl font-bold mb-2">Peta Bintang Live</h3>
              <p className="text-gray-400 mb-4">
                Fitur peta bintang interaktif akan segera hadir
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">Dalam Pengembangan</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Koordinat</div>
              <div className="font-bold">6°S, 107°E</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Zona Waktu</div>
              <div className="font-bold">WIB (UTC+7)</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <div className="text-sm text-gray-400">Musim</div>
              <div className="font-bold">Musim Hujan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Constellations Guide */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 border border-purple-500/30">
          <h2 className="text-2xl font-bold mb-6">⭐ Rasi Bintang Populer</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constellations.map((constellation, index) => (
              <div
                key={index}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{constellation.name}</h3>
                  <span className="px-2 py-1 bg-purple-900/30 rounded text-sm">
                    {constellation.season}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-400 mr-2">Visibilitas:</span>
                    <span className={`font-semibold ${
                      constellation.visibility === 'Excellent' ? 'text-green-400' :
                      constellation.visibility === 'Good' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {constellation.visibility}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="text-gray-400">Bintang Terang:</span>
                    <div className="text-gray-300">{constellation.stars}</div>
                  </div>
                  
                  <button className="w-full mt-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-sm">
                    Lihat Posisi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">📅 Kalendar Astronomi 2024</h2>
          
          <div className="space-y-4">
            {sampleEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition group"
              >
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex flex-col items-center justify-center mr-4 flex-shrink-0">
                  <div className="text-lg">
                    {event.type === 'moon' ? '🌙' :
                     event.type === 'eclipse' ? '🌗' :
                     event.type === 'meteor' ? '☄️' : '🌍'}
                  </div>
                  <div className="text-xs text-gray-400">{event.date.split('-')[2]}</div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <p className="text-gray-400 text-sm">{event.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-gray-900 rounded-full text-sm">
                      {event.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition">
              Lihat Kalendar Lengkap
            </button>
          </div>
        </div>
      </div>

      {/* Observation Tips */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">🔭 Tips Observasi</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Cari lokasi jauh dari polusi cahaya kota</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Biarkan mata beradaptasi dengan gelap minimal 20 menit</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Gunakan aplikasi astronomi seperti Stellarium atau Sky Map</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Untuk pemula, mulailah dengan bulan dan planet terang</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Catat pengamatan Anda dalam logbook</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">📱 Sumber & Aplikasi</h3>
            <div className="space-y-3">
              <a
                href="https://stellarium.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4">
                  <span className="text-blue-400">⭐</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-blue-400">Stellarium</div>
                  <div className="text-sm text-gray-400">Planetarium software gratis</div>
                </div>
              </a>
              
              <a
                href="https://skyandtelescope.org/observing/sky-at-a-glance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center mr-4">
                  <span className="text-purple-400">📰</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-purple-400">Sky & Telescope</div>
                  <div className="text-sm text-gray-400">Sky this week updates</div>
                </div>
              </a>
              
              <a
                href="https://www.timeanddate.com/astronomy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-900/50 flex items-center justify-center mr-4">
                  <span className="text-green-400">🌙</span>
                </div>
                <div>
                  <div className="font-semibold group-hover:text-green-400">Time and Date</div>
                  <div className="text-sm text-gray-400">Moon phases & astronomy</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 text-center border border-blue-500/30">
          <h2 className="text-2xl font-bold mb-4">Bergabung dengan Komunitas</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Ingin berbagi pengamatan atau bertanya tentang astronomi? Bergabunglah dengan
            komunitas astronomi amatir Indonesia!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition">
              Cari Komunitas Lokal
            </button>
            <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700 transition">
              Forum Diskusi
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Observation