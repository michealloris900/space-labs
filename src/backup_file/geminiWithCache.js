// // GEMINI WITH CACHE & RATE LIMITING
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// // Cache system
// const responseCache = new Map();
// const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// // Rate limiting
// let requestCount = 0;
// const MAX_REQUESTS_PER_DAY = 15; // Conservative limit
// let resetTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

// // Check if we can make another request
// const canMakeRequest = () => {
//   if (Date.now() > resetTime) {
//     requestCount = 0;
//     resetTime = Date.now() + 24 * 60 * 60 * 1000;
//   }
  
//   return requestCount < MAX_REQUESTS_PER_DAY;
// };

// // Get cached response
// const getCachedResponse = (question) => {
//   const cacheKey = question.toLowerCase().trim();
//   const cached = responseCache.get(cacheKey);
  
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     console.log('📦 Using cached response');
//     return cached.response;
//   }
  
//   return null;
// };

// // Store response in cache
// const cacheResponse = (question, response) => {
//   const cacheKey = question.toLowerCase().trim();
//   responseCache.set(cacheKey, {
//     response,
//     timestamp: Date.now()
//   });
  
//   // Clean old cache entries if cache gets too big
//   if (responseCache.size > 50) {
//     const oldestKey = responseCache.keys().next().value;
//     responseCache.delete(oldestKey);
//   }
// };

// // Simple fallback knowledge base
// const FALLBACK_KNOWLEDGE = {
//   // Astronomi dasar
//   'apa itu planet': `**🌌 Apa Itu Planet?**

// **Jawaban Utama:**
// Planet adalah benda langit yang mengorbit bintang (seperti Matahari), memiliki massa cukup untuk membentuk bentuk bulat, dan telah membersihkan orbitnya dari benda-benda lain.

// **Penjelasan Detail:**
// 1. **Definisi Astronomi:** Menurut IAU (International Astronomical Union), planet harus:
//    • Mengorbit Matahari
//    • Memiliki massa cukup untuk gravitasi sendiri sehingga berbentuk bulat
//    • Telah "membersihkan" lingkungan orbitnya dari objek-objek lain

// 2. **Jenis Planet:**
//    • **Planet Terestrial:** Merkurius, Venus, Bumi, Mars (berbatu, permukaan padat)
//    • **Planet Gas Raksasa:** Jupiter, Saturnus (terutama hidrogen & helium)
//    • **Planet Es Raksasa:** Uranus, Neptunus (es, air, amonia, metana)

// 3. **Karakteristik:**
//    • Tidak menghasilkan cahaya sendiri
//    • Memantulkan cahaya dari bintang induk
//    • Memiliki orbit yang relatif stabil
//    • Dapat memiliki atmosfer dan satelit (bulan)

// **Di Tata Surya Kita:**
// • 8 planet utama: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus
// • 5 planet katai: Pluto, Ceres, Haumea, Makemake, Eris

// **Fakta Menarik:**
// • Jupiter adalah planet terbesar (bisa menampung 1.300 Bumi!)
// • Venus adalah planet terpanas (462°C) karena efek rumah kaca ekstrem
// • Bumi adalah satu-satunya planet dengan kehidupan yang diketahui`,

//   'apa itu lubang hitam': `**⚫ Apa Itu Lubang Hitam (Black Hole)?**

// **Jawaban Utama:**
// Lubang hitam adalah wilayah di ruang angkasa dengan gravitasi sangat kuat sehingga tidak ada yang bisa lolos, termasuk cahaya.

// **Penjelasan Detail:**
// 1. **Konsep Dasar:** Terbentuk ketika bintang masif mati dan kolaps karena gravitasinya sendiri
// 2. **Struktur:**
//    • **Event Horizon:** Batas tak terlihat, titik tidak bisa kembali
//    • **Singularity:** Pusat dengan kepadatan tak terhingga
//    • **Ergosphere:** Wilayah di luar event horizon yang berotasi

// 3. **Jenis Lubang Hitam:**
//    • **Stellar:** 3-20 massa matahari (hasil supernova)
//    • **Supermassive:** Jutaan-miliar massa matahari (di pusat galaksi)
//    • **Intermediate:** Di antara keduanya (jarang ditemukan)

// **Fakta Menarik:**
// • Lubang hitam pertama yang difoto (M87) pada 2019
// • Tidak bisa "dilihat" langsung, hanya efek gravitasinya
// • Waktu melambat di dekat lubang hitam (relativitas Einstein)

// **Di Alam Semesta:**
// • Sagittarius A*: Lubang hitam supermasif di pusat Bima Sakti
// • Cygnus X-1: Lubang hitam pertama yang diidentifikasi (1971)`,

//   'berapa planet di tata surya': `**🪐 Berapa Planet di Tata Surya?**

// **Jawaban: Ada 8 planet utama di tata surya kita.**

// **Daftar Planet:**
// 1. **Merkurius** - Terkecil, terdekat Matahari
// 2. **Venus** - Paling panas, "kembaran Bumi"
// 3. **Bumi** - Satu-satunya dengan kehidupan
// 4. **Mars** - "Planet Merah", robot NASA
// 5. **Jupiter** - Terbesar, 79 bulan
// 6. **Saturnus** - Cincin indah dari es/batu
// 7. **Uranus** - Berotasi miring 98°
// 8. **Neptunus** - Paling berangin (2.100 km/jam)

// **Planet Katai (5):**
// • Pluto • Ceres • Haumea • Makemake • Eris

// **Fakta:**
// • Pluto diklasifikasi ulang sebagai planet katai tahun 2006
// • Tata surya berusia ±4.6 miliar tahun
// • Matahari mengandung 99.86% massa total`,

//   'apa itu nasa': `**🚀 Apa Itu NASA?**

// **Jawaban Utama:**
// NASA (National Aeronautics and Space Administration) adalah badan antariksa pemerintah Amerika Serikat, didirikan tahun 1958.

// **Sejarah & Misi:**
// • **Didirikan:** 29 Juli 1958 (respons terhadap Sputnik USSR)
// • **Markas:** Washington D.C., USA
// • **Anggaran:** ±$25 miliar/tahun
// • **Karyawan:** ±17,000 orang

// **Program Penting:**
// 1. **Apollo** (1961-1972) - Pendaratan di Bulan
// 2. **Space Shuttle** (1981-2011) - Pesawat ulang-alik
// 3. **ISS** (1998-sekarang) - Stasiun Luar Angkasa Internasional
// 4. **Mars Rovers** - Spirit, Opportunity, Curiosity, Perseverance
// 5. **James Webb Telescope** (2021) - Teleskop inframerah

// **Pencapaian:**
// • Manusia pertama di Bulan (Neil Armstrong, 1969)
// • Penjelajahan seluruh planet tata surya
// • Teleskop Hubble & penemuan eksoplanet
// • Kerjasama internasional di ISS

// **Misi Saat Ini:**
// • Artemis (kembali ke Bulan)
// • Mars Sample Return
// • Studi perubahan iklim
// • Eksplorasi tata surya`,

//   'apa itu teleskop james webb': `**🔭 Teleskop James Webb (JWST)**

// **Jawaban Utama:**
// Teleskop Luar Angkasa James Webb adalah observatorium inframerah terbesar dan paling kuat yang pernah diluncurkan ke luar angkasa.

// **Spesifikasi:**
// • **Diluncurkan:** 25 Desember 2021
// • **Lokasi:** Titik Lagrange L2 (1.5 juta km dari Bumi)
// • **Cermin Utama:** 6.5 meter (segmen heksagonal berlapis emas)
// • **Misi Utama:** Melihat alam semesta awal, studi exoplanet

// **Perbedaan dengan Hubble:**
// • **Hubble:** Cahaya tampak/UV • **Webb:** Inframerah
// • **Hubble:** Orbit rendah (547 km) • **Webb:** L2 (1.5 juta km)
// • **Hubble:** 2.4 meter • **Webb:** 6.5 meter

// **Penemuan Penting:**
// • Galaksi pertama di alam semesta
// • Atmosfer exoplanet
// • Proses pembentukan bintang & planet
// • Komposisi kimia nebula

// **Fakta Menarik:**
// • Biaya: $10 miliar (pengembangan 25 tahun)
// • Suhu operasi: -223°C (selimut 5 lapis)
// • Bisa melihat objek 100x lebih redup dari Hubble`,

//   'bagaimana bintang terbentuk': `**⭐ Bagaimana Bintang Terbentuk?**

// **Jawaban Utama:**
// Bintang terbentuk dari keruntuhan gravitasi awan gas dan debu raksasa (nebula) yang kemudian memicu fusi nuklir di intinya.

// **Proses Pembentukan (5 Tahap):**
// 1. **Nebula:** Awan molekul raksasa (H₂, debu kosmik)
// 2. **Keruntuhan:** Gravitasi mengatasi tekanan gas
// 3. **Protobintang:** Pemanasan pusat, mulai berotasi
// 4. **Deret Utama:** Fusi hidrogen → helium (stabil)
// 5. **Bintang Matang:** Keseimbangan hidrostatik

// **Detail Proses:**
// • **Material:** 71% Hidrogen, 27% Helium, 2% elemen berat
// • **Waktu:** Beberapa juta tahun untuk bintang seperti Matahari
// • **Ukuran:** Bintang kecil (0.08M☉) hingga raksasa (100+M☉)

// **Faktor Penentu:**
// 1. **Massa Awal:** Menentukan jenis bintang & umur
// 2. **Komposisi Kimia:** "Metalicity" mempengaruhi evolusi
// 3. **Lingkungan:** Cluster vs bintang tunggal

// **Contoh:**
// • **Matahari:** Terbentuk 4.6 miliar tahun lalu, hidup 10 miliar tahun total
// • **Bintang Masif:** Hidup cepat, mati sebagai supernova
// • **Bintang Katai:** Hidup triliunan tahun

// **Fakta:** Matahari kita adalah bintang generasi ketiga (terbentuk dari sisa supernova kuno)!`
// };

// // Find a working model with retry logic
// export const findWorkingModelWithRetry = async () => {
//   const models = [
//     'gemini-2.0-flash',
//     'gemini-2.0-flash-001', 
//     'gemini-pro-latest',
//     'gemini-flash-latest',
//     'gemini-2.5-pro',
//     'gemma-3-27b-it'
//   ];
  
//   let lastError = null;
  
//   for (const model of models) {
//     try {
//       console.log(`🔄 Trying model: ${model}`);
      
//       // Simple test request
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: 'test' }] }],
//             generationConfig: { maxOutputTokens: 10 }
//           })
//         }
//       );
      
//       if (response.status === 429) {
//         console.log(`   ❌ ${model} quota exceeded`);
//         continue;
//       }
      
//       if (response.ok) {
//         console.log(`   ✅ ${model} available`);
//         return model;
//       }
      
//     } catch (error) {
//       lastError = error;
//       console.log(`   ❌ ${model} failed:`, error.message);
//       continue;
//     }
//   }
  
//   throw lastError || new Error('No working model found');
// };

// // Main function with caching and fallback
// export const askGeminiSmart = async (question) => {
//   console.log(`🤔 Question: "${question.substring(0, 50)}..."`);
  
//   if (!API_KEY) {
//     throw new Error('API Key tidak dikonfigurasi');
//   }
  
//   // 1. Check cache first
//   const cached = getCachedResponse(question);
//   if (cached) {
//     return cached;
//   }
  
//   // 2. Check rate limit
//   if (!canMakeRequest()) {
//     console.log('⚠️ Daily limit reached, using fallback knowledge');
//     return getFallbackResponse(question);
//   }
  
//   // 3. Check fallback knowledge
//   const fallback = getFallbackResponse(question, false);
//   if (fallback) {
//     console.log('📚 Using fallback knowledge');
//     return fallback;
//   }
  
//   // 4. Try Gemini with error handling
//   try {
//     const model = await findWorkingModelWithRetry();
//     requestCount++;
    
//     console.log(`🚀 Request ${requestCount}/${MAX_REQUESTS_PER_DAY} to ${model}...`);
    
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [{
//             parts: [{ 
//               text: `Jawab dalam Bahasa Indonesia dengan singkat dan jelas: ${question}`
//             }]
//           }],
//           generationConfig: {
//             temperature: 0.7,
//             maxOutputTokens: 800,
//           }
//         })
//       }
//     );
    
//     if (!response.ok) {
//       if (response.status === 429) {
//         console.log('⚠️ Rate limited, using fallback');
//         return getFallbackResponse(question);
//       }
//       throw new Error(`HTTP ${response.status}`);
//     }
    
//     const data = await response.json();
//     const answer = data.candidates[0].content.parts[0].text;
    
//     // Cache the response
//     cacheResponse(question, answer);
//     console.log(`✅ Gemini response cached`);
    
//     return answer;
    
//   } catch (error) {
//     console.error('❌ Gemini error, using fallback:', error.message);
//     return getFallbackResponse(question);
//   }
// };

// // Get fallback response from knowledge base
// export const getFallbackResponse = (question, log = true) => {
//   const lowerQ = question.toLowerCase().trim();
  
//   // Try exact match first
//   for (const [key, response] of Object.entries(FALLBACK_KNOWLEDGE)) {
//     if (lowerQ.includes(key)) {
//       if (log) console.log(`📚 Fallback match: "${key}"`);
//       return response;
//     }
//   }
  
//   // Try partial match
//   const keywords = ['planet', 'lubang hitam', 'nasa', 'teleskop', 'bintang', 'tata surya', 'mars'];
//   for (const keyword of keywords) {
//     if (lowerQ.includes(keyword)) {
//       const baseQuestion = `apa itu ${keyword}`;
//       if (FALLBACK_KNOWLEDGE[baseQuestion]) {
//         if (log) console.log(`📚 Partial fallback: "${keyword}"`);
//         return FALLBACK_KNOWLEDGE[baseQuestion];
//       }
//     }
//   }
  
//   // Default fallback
//   return `**⚠️ KUOTA GEMINI API HABIS**

// Maaf, quota Gemini API untuk hari ini sudah habis (20 requests/hari gratis).

// **Pertanyaan Anda:** "${question}"

// **Solusi:**
// 1. **Tunggu besok** - Quota akan reset setiap 24 jam
// 2. **Upgrade ke paid plan** di Google AI Studio untuk quota lebih
// 3. **Gunakan pertanyaan umum** di bawah ini:

// **Pertanyaan yang tersedia (mode offline):**
// • "Apa itu planet?"
// • "Apa itu lubang hitam?"
// • "Berapa planet di tata surya?"
// • "Apa itu NASA?"
// • "Apa itu teleskop James Webb?"
// • "Bagaimana bintang terbentuk?"

// **Status:** ${requestCount}/${MAX_REQUESTS_PER_DAY} requests used today`;
// };

// // Test function
// export const testGeminiSmart = async () => {
//   try {
//     const result = await askGeminiSmart('Apa itu planet?');
//     return {
//       success: true,
//       message: 'System working',
//       cached: responseCache.size,
//       requestsUsed: requestCount,
//       response: result.substring(0, 100) + '...'
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//       cached: responseCache.size,
//       requestsUsed: requestCount
//     };
//   }
// };