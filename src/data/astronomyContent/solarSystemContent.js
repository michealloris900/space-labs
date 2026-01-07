export const solarSystemContent = {
    overview: {
      title: "Tata Surya Kita",
      description: "Tata Surya adalah sistem planet yang terdiri dari Matahari dan semua benda langit yang mengorbitnya, termasuk 8 planet, bulan, asteroid, komet, dan benda-benda kecil lainnya.",
      image: "https://solarsystem.nasa.gov/system/resources/detail_files/2486_stsci-h-p1936a_800x600.jpg",
      facts: [
        "Usia: Sekitar 4.6 miliar tahun",
        "Diameter: Sekitar 287.46 miliar km",
        "Jumlah planet: 8",
        "Jumlah planet katai: 5 diakui",
        "Benda terbesar: Matahari (99.86% massa total)"
      ]
    },
    
    sections: [
      {
        id: 'sun',
        title: 'Matahari',
        icon: '☀️',
        color: 'from-yellow-600 to-orange-600',
        content: {
          description: 'Matahari adalah bintang di pusat Tata Surya kita. Ini adalah bola plasma panas yang bersinar karena reaksi nuklir di intinya.',
          keyFacts: {
            'Jenis': 'Bintang katai kuning (G2V)',
            'Usia': '4.6 miliar tahun',
            'Diameter': '1.39 juta km (109× Bumi)',
            'Massa': '1.989 × 10³⁰ kg (333,000× Bumi)',
            'Suhu Inti': '15 juta °C',
            'Suhu Permukaan': '5,500 °C'
          },
          features: [
            'Inti: Tempat reaksi fusi nuklir (hidrogen → helium)',
            'Zona Radiatif: Energi dipindahkan melalui radiasi',
            'Zona Konvektif: Energi dipindahkan melalui konveksi',
            'Fotosfer: "Permukaan" yang kita lihat',
            'Kromosfer & Korona: Atmosfer Matahari'
          ],
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/415_PIA03149.jpg',
            'https://solarsystem.nasa.gov/system/resources/detail_files/2484_stsci-h-p2001a_800x600.jpg'
          ],
          videoId: '2HoTK_Gqi2Q', // YouTube ID untuk video edukasi
          nasaLink: 'https://solarsystem.nasa.gov/solar-system/sun/overview/'
        }
      },
      
      {
        id: 'mercury',
        title: 'Merkurius',
        icon: '🌑',
        color: 'from-gray-600 to-gray-800',
        content: {
          description: 'Merkurius adalah planet terkecil dan terdekat dengan Matahari. Permukaannya penuh kawah seperti Bulan.',
          keyFacts: {
            'Jenis Planet': 'Planet kebumian',
            'Jarak dari Matahari': '57.9 juta km',
            'Diameter': '4,879 km',
            'Massa': '3.3 × 10²³ kg (0.055× Bumi)',
            'Gravitasi': '3.7 m/s² (0.38× Bumi)',
            'Hari (rotasi)': '59 hari Bumi',
            'Tahun (revolusi)': '88 hari Bumi',
            'Satelit alami': 'Tidak ada'
          },
          interestingFacts: [
            'Perbedaan suhu ekstrem: 430°C di siang hari, -180°C di malam hari',
            'Memiliki inti besi yang sangat besar (85% radius planet)',
            'Atmosfer sangat tipis (eksosfer)',
            'Kawah terbesar: Cekungan Caloris (1,550 km diameter)'
          ],
          missions: [
            { name: 'Mariner 10', year: '1974-1975', achievement: 'Flyby pertama' },
            { name: 'MESSENGER', year: '2011-2015', achievement: 'Orbiter pertama' },
            { name: 'BepiColombo', year: '2025', achievement: 'Misi bersama ESA-JAXA' }
          ],
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/2480_stsci-h-p1943a_800x600.jpg'
          ]
        }
      },
      
      {
        id: 'venus',
        title: 'Venus',
        icon: '♀️',
        color: 'from-yellow-500 to-orange-500',
        content: {
          description: 'Venus sering disebut "kembaran Bumi" karena ukurannya mirip, tetapi kondisi permukaannya sangat berbeda.',
          keyFacts: {
            'Jenis Planet': 'Planet kebumian',
            'Jarak dari Matahari': '108.2 juta km',
            'Diameter': '12,104 km (0.95× Bumi)',
            'Massa': '4.87 × 10²⁴ kg (0.815× Bumi)',
            'Gravitasi': '8.87 m/s² (0.91× Bumi)',
            'Hari (rotasi)': '243 hari Bumi (retrograde)',
            'Tahun (revolusi)': '225 hari Bumi',
            'Satelit alami': 'Tidak ada'
          },
          interestingFacts: [
            'Planet terpanas (rata-rata 462°C) karena efek rumah kaca ekstrem',
            'Atmosfer 96.5% CO₂ dengan tekanan permukaan 92× Bumi',
            'Awan mengandung asam sulfat',
            'Rotasi sangat lambat dan berlawanan arah',
            'Memiliki ribuan gunung berapi'
          ],
          comparison: {
            'Similar dengan Bumi': ['Ukuran', 'Massa', 'Kepadatan', 'Komposisi'],
            'Berbeda dengan Bumi': ['Suhu', 'Atmosfer', 'Rotasi', 'Medan magnet']
          },
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/2481_stsci-h-p1935a_800x600.jpg'
          ]
        }
      },
      
      {
        id: 'earth',
        title: 'Bumi',
        icon: '🌍',
        color: 'from-blue-600 to-green-600',
        content: {
          description: 'Bumi adalah planet ketiga dari Matahari dan satu-satunya planet yang diketahui memiliki kehidupan.',
          keyFacts: {
            'Jenis Planet': 'Planet kebumian',
            'Jarak dari Matahari': '149.6 juta km (1 AU)',
            'Diameter': '12,742 km',
            'Massa': '5.97 × 10²⁴ kg',
            'Gravitasi': '9.8 m/s²',
            'Hari (rotasi)': '24 jam',
            'Tahun (revolusi)': '365.25 hari',
            'Satelit alami': '1 (Bulan)'
          },
          uniqueFeatures: [
            'Satu-satunya planet dengan air dalam bentuk cair di permukaan',
            'Atmosfer kaya nitrogen (78%) dan oksigen (21%)',
            'Memiliki medan magnet yang melindungi dari radiasi',
            'Tektonik lempeng aktif',
            'Keanekaragaman hayati yang luar biasa'
          ],
          layers: [
            { name: 'Kerak', thickness: '5-70 km', composition: 'Batuan silikat' },
            { name: 'Mantel', thickness: '2,900 km', composition: 'Batuan silikat panas' },
            { name: 'Inti Luar', thickness: '2,200 km', composition: 'Besi-nikel cair' },
            { name: 'Inti Dalam', thickness: '1,220 km', composition: 'Besi-nikel padat' }
          ],
          images: [
            'https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001589/GSFC_20171208_Archive_e001589~thumb.jpg'
          ]
        }
      },
      
      {
        id: 'mars',
        title: 'Mars',
        icon: '♂️',
        color: 'from-red-600 to-orange-600',
        content: {
          description: 'Mars, "Planet Merah", adalah target utama eksplorasi manusia karena potensi adanya kehidupan masa lalu dan kolonisasi masa depan.',
          keyFacts: {
            'Jenis Planet': 'Planet kebumian',
            'Jarak dari Matahari': '227.9 juta km',
            'Diameter': '6,779 km (0.53× Bumi)',
            'Massa': '6.42 × 10²³ kg (0.107× Bumi)',
            'Gravitasi': '3.71 m/s² (0.38× Bumi)',
            'Hari (rotasi)': '24 jam 37 menit',
            'Tahun (revolusi)': '687 hari Bumi',
            'Satelit alami': '2 (Phobos & Deimos)'
          },
          surfaceFeatures: [
            'Gunung berapi terbesar: Olympus Mons (tinggi 21 km)',
            'Ngarai terbesar: Valles Marineris (panjang 4,000 km)',
            'Es di kutub: Es air dan karbon dioksida',
            'Debu besi oksida: Memberi warna merah'
          ],
          missions: {
            active: [
              { name: 'Perseverance Rover', agency: 'NASA', launch: '2020' },
              { name: 'Curiosity Rover', agency: 'NASA', launch: '2011' },
              { name: 'Zhurong Rover', agency: 'CNSA', launch: '2020' }
            ],
            future: [
              { name: 'Mars Sample Return', agency: 'NASA-ESA', target: '2030' },
              { name: 'Artemis Base Camp', agency: 'NASA', target: '2030s' }
            ]
          },
          images: [
            'https://mars.nasa.gov/system/resources/detail_files/26749_PIA25829-16.jpg'
          ]
        }
      },
      
      {
        id: 'jupiter',
        title: 'Jupiter',
        icon: '♃',
        color: 'from-orange-600 to-amber-600',
        content: {
          description: 'Jupiter adalah planet terbesar di Tata Surya, sebuah raksasa gas dengan sistem cincin dan banyak bulan.',
          keyFacts: {
            'Jenis Planet': 'Raksasa gas',
            'Jarak dari Matahari': '778.5 juta km',
            'Diameter': '139,820 km (11.2× Bumi)',
            'Massa': '1.90 × 10²⁷ kg (318× Bumi)',
            'Gravitasi': '24.79 m/s² (2.53× Bumi)',
            'Hari (rotasi)': '9 jam 56 menit',
            'Tahun (revolusi)': '11.86 tahun Bumi',
            'Satelit alami': '95 diketahui'
          },
          greatRedSpot: {
            description: 'Badai antisiklon yang telah berlangsung setidaknya 350 tahun',
            size: '16,350 km (1.3× diameter Bumi)',
            windSpeed: '430 km/jam'
          },
          notableMoons: [
            { name: 'Ganymede', feature: 'Bulan terbesar di Tata Surya' },
            { name: 'Callisto', feature: 'Permukaan tertua, banyak kawah' },
            { name: 'Io', feature: 'Tubuh paling vulkanik' },
            { name: 'Europa', feature: 'Lautan bawah es, potensi kehidupan' }
          ],
          missions: [
            { name: 'Pioneer 10 & 11', year: '1973-1974' },
            { name: 'Voyager 1 & 2', year: '1979' },
            { name: 'Galileo', year: '1995-2003' },
            { name: 'Juno', year: '2016-sekarang' }
          ],
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/2482_stsci-h-p1945a_800x600.jpg'
          ]
        }
      },
      
      {
        id: 'saturn',
        title: 'Saturnus',
        icon: '♄',
        color: 'from-yellow-500 to-amber-500',
        content: {
          description: 'Saturnus terkenal dengan sistem cincinnya yang menakjubkan, terdiri dari miliaran partikel es dan batu.',
          keyFacts: {
            'Jenis Planet': 'Raksasa gas',
            'Jarak dari Matahari': '1.43 miliar km',
            'Diameter': '116,460 km (9.45× Bumi)',
            'Massa': '5.68 × 10²⁶ kg (95× Bumi)',
            'Gravitasi': '10.44 m/s² (1.07× Bumi)',
            'Hari (rotasi)': '10 jam 33 menit',
            'Tahun (revolusi)': '29.46 tahun Bumi',
            'Satelit alami': '146 diketahui'
          },
          ringSystem: {
            composition: 'Partikel es (95%) dan batu',
            totalWidth: '282,000 km',
            thickness: 'Hanya 10 meter rata-rata',
            mainRings: 'A, B, C (dari luar ke dalam)',
            gaps: 'Cassini Division (4,800 km)'
          },
          notableMoons: [
            { name: 'Titan', feature: 'Bulan dengan atmosfer tebal, danau metana' },
            { name: 'Enceladus', feature: 'Geyser air dari laut bawah es' },
            { name: 'Mimas', feature: 'Kawah besar membuatnya mirip Death Star' },
            { name: 'Rhea', feature: 'Bulan terbesar kedua' }
          ],
          missions: [
            { name: 'Pioneer 11', year: '1979' },
            { name: 'Voyager 1 & 2', year: '1980-1981' },
            { name: 'Cassini-Huygens', year: '2004-2017' }
          ],
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/2483_stsci-h-p1946a_800x600.jpg'
          ]
        }
      },
      
      {
        id: 'uranus',
        title: 'Uranus',
        icon: '⛢',
        color: 'from-cyan-600 to-blue-600',
        content: {
          description: 'Uranus adalah raksasa es dengan kemiringan sumbu ekstrem sehingga "berbaring" mengorbit Matahari.',
          keyFacts: {
            'Jenis Planet': 'Raksasa es',
            'Jarak dari Matahari': '2.87 miliar km',
            'Diameter': '50,724 km (4× Bumi)',
            'Massa': '8.68 × 10²⁵ kg (14.5× Bumi)',
            'Gravitasi': '8.69 m/s² (0.89× Bumi)',
            'Hari (rotasi)': '17 jam 14 menit (retrograde)',
            'Tahun (revolusi)': '84.01 tahun Bumi',
            'Satelit alami': '27 diketahui'
          },
          uniqueFeatures: [
            'Sumbu rotasi miring 97.77° (berbaring mengorbit)',
            'Atmosfer mengandung metana (memberi warna biru-hijau)',
            'Suhu atmosfer terdingin: -224°C',
            'Memiliki sistem cincin tipis vertikal'
          ],
          discovery: {
            discoverer: 'William Herschel',
            year: '1781',
            fact: 'Planet pertama ditemukan dengan teleskop'
          },
          moons: {
            major: ['Titania', 'Oberon', 'Umbriel', 'Ariel', 'Miranda'],
            features: 'Banyak bulan memiliki permukaan es dengan lembah dan ngarai'
          },
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/601_PIA18182.jpg'
          ]
        }
      },
      
      {
        id: 'neptune',
        title: 'Neptunus',
        icon: '♆',
        color: 'from-blue-700 to-indigo-700',
        content: {
          description: 'Neptunus adalah planet terjauh dari Matahari dan dikenal dengan angin terkuat di Tata Surya.',
          keyFacts: {
            'Jenis Planet': 'Raksasa es',
            'Jarak dari Matahari': '4.5 miliar km',
            'Diameter': '49,244 km (3.88× Bumi)',
            'Massa': '1.02 × 10²⁶ kg (17× Bumi)',
            'Gravitasi': '11.15 m/s² (1.14× Bumi)',
            'Hari (rotasi)': '16 jam 6 menit',
            'Tahun (revolusi)': '164.8 tahun Bumi',
            'Satelit alami': '14 diketahui'
          },
          weather: {
            windSpeed: '2,100 km/jam (tercepat di Tata Surya)',
            greatDarkSpot: 'Badai seukuran Bumi (hilang 1994)',
            temperature: '-214°C'
          },
          discovery: {
            method: 'Prediksi matematika (Urban Le Verrier)',
            year: '1846',
            telescopic: 'Johann Galle'
          },
          notableMoon: {
            name: 'Triton',
            features: [
              'Bulan terbesar Neptunus',
              'Orbit retrograde (mungkin ditangkap)',
              'Geyser nitrogen',
              'Permukaan termuda di Tata Surya'
            ]
          },
          images: [
            'https://solarsystem.nasa.gov/system/resources/detail_files/611_PIA01492.jpg'
          ]
        }
      }
    ],
    
    dwarfPlanets: [
      {
        name: 'Pluto',
        status: 'Planet katai',
        discovery: '1930',
        features: ['Atmosfer tipis', '5 bulan', 'Permukaan es nitrogen'],
        image: 'https://solarsystem.nasa.gov/system/resources/detail_files/933_PIA19952.jpg'
      },
      {
        name: 'Ceres',
        status: 'Planet katai',
        location: 'Sabuk asteroid',
        features: ['Terbesar di sabuk asteroid', 'Es air bawah permukaan'],
        image: 'https://solarsystem.nasa.gov/system/resources/detail_files/788_PIA20350.jpg'
      }
    ],
    
    otherObjects: {
      asteroidBelt: {
        location: 'Antara Mars dan Jupiter',
        composition: 'Batu dan logam',
        largest: 'Ceres (planet katai)',
        totalMass: '4% massa Bulan'
      },
      kuiperBelt: {
        location: 'Di luar Neptunus',
        composition: 'Benda-benda es',
        includes: 'Pluto, Eris, Haumea, Makemake'
      },
      oortCloud: {
        location: 'Tepi Tata Surya (hingga 1.6 tahun cahaya)',
        composition: 'Triliunan komet',
        description: 'Cangkang bola komet yang mengelilingi Tata Surya'
      }
    }
  }
  
  export const solarSystemQuiz = [
    {
      question: "Planet mana yang memiliki rotasi terbalik (retrograde)?",
      options: ["Venus", "Uranus", "Keduanya", "Tidak ada"],
      correct: 2,
      explanation: "Venus berotasi searah jarum jam (retrograde), sedangkan Uranus memiliki kemiringan sumbu 98° sehingga 'berbaring' mengorbit."
    },
    {
      question: "Apa nama bulan terbesar di tata surya?",
      options: ["Bulan (Bumi)", "Titan", "Ganymede", "Europa"],
      correct: 2,
      explanation: "Ganymede (bulan Jupiter) adalah bulan terbesar dengan diameter 5,268 km, bahkan lebih besar dari planet Merkurius."
    },
    {
      question: "Planet mana yang memiliki cincin paling mencolok?",
      options: ["Jupiter", "Saturnus", "Uranus", "Neptunus"],
      correct: 1,
      explanation: "Saturnus memiliki sistem cincin yang paling terang dan mudah dilihat dari Bumi, terdiri dari miliaran partikel es."
    },
    {
      question: "Berapa lama cahaya dari Matahari mencapai Bumi?",
      options: ["8 menit", "8 jam", "8 hari", "8 detik"],
      correct: 0,
      explanation: "Cahaya Matahari membutuhkan sekitar 8 menit 20 detik untuk menempuh jarak 150 juta km ke Bumi."
    },
    {
      question: "Apa yang menyebabkan warna merah Mars?",
      options: ["Lava", "Karatan besi", "Debu vulkanik", "Atmosfer tipis"],
      correct: 1,
      explanation: "Warna merah Mars disebabkan oleh besi oksida (karat) di permukaan tanah dan debunya."
    }
  ]
  
  export const solarSystemActivities = [
    {
      title: "Buat Model Tata Surya Skala",
      materials: ["Kertas", "Bola-bola berbagai ukuran", "Cat", "Tali"],
      steps: [
        "Tentukan skala (contoh: 1 m = 1 AU)",
        "Buat Matahari dari bola terbesar",
        "Susun planet dengan jarak proporsional",
        "Warnai sesuai karakteristik planet"
      ],
      learning: "Memahami skala jarak di Tata Surya"
    },
    {
      title: "Observasi Planet dengan Binokuler",
      materials: ["Binokuler", "Aplikasi peta langit", "Buku catatan"],
      steps: [
        "Gunakan aplikasi untuk mengetahui posisi planet",
        "Cari lokasi gelap jauh dari lampu kota",
        "Fokus binokuler ke planet target",
        "Catat warna, kecerahan, dan posisi"
      ],
      learning: "Mengenal planet melalui observasi langsung"
    }
  ]