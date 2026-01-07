// src/utils/geminiApi.js - OPTIMIZED VERSION
import { GoogleGenerativeAI } from '@google/generative-ai';

// QUOTA AWARENESS
const QUOTA_LIMITS = {
  RPM: 15,      // 15 requests per minute
  RPD: 1500,    // 1500 requests per day
};

class RateLimiter {
  constructor() {
    this.minuteRequests = [];
    this.dailyCount = 0;
    this.dailyReset = this.getNextResetTime();
  }

  getNextResetTime() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }

  checkQuota() {
    const now = Date.now();
    
    // Reset daily count jika sudah hari baru
    if (now > this.dailyReset) {
      this.dailyCount = 0;
      this.dailyReset = this.getNextResetTime();
    }
    
    // Clean old minute requests (older than 1 minute)
    const oneMinuteAgo = now - 60000;
    this.minuteRequests = this.minuteRequests.filter(time => time > oneMinuteAgo);
    
    // Check limits
    const minuteLimit = this.minuteRequests.length < QUOTA_LIMITS.RPM;
    const dailyLimit = this.dailyCount < QUOTA_LIMITS.RPD;
    
    return minuteLimit && dailyLimit;
  }

  addRequest() {
    const now = Date.now();
    this.minuteRequests.push(now);
    this.dailyCount++;
  }

  getStatus() {
    return {
      minuteUsed: this.minuteRequests.length,
      minuteRemaining: QUOTA_LIMITS.RPM - this.minuteRequests.length,
      dailyUsed: this.dailyCount,
      dailyRemaining: QUOTA_LIMITS.RPD - this.dailyCount,
      nextReset: new Date(this.dailyReset).toLocaleTimeString(),
    };
  }
}

// SYSTEM PROMPT OPTIMIZED
const SYSTEM_PROMPT = `Anda adalah SpaceEdu Assistant. Berikan jawaban SINGKAT (maks 3 paragraf) tentang astronomi.
Fokus pada: tata surya, planet, NASA, teleskop. Gunakan Bahasa Indonesia.
Jawab dengan format:
1. Jawaban utama (1-2 kalimat)
2. Fakta tambahan (opsional)
3. Saran belajar lebih lanjut`;

class GeminiService {
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.rateLimiter = new RateLimiter();
    this.cache = new Map();
    this.faqCache = this.initializeFAQ();
    
    if (!apiKey) {
      console.warn('API Key tidak ditemukan. Mode mock diaktifkan.');
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ 
        model: 'gemini-pro', // Pakai model yang sesuai quota
        generationConfig: {
          maxOutputTokens: 500, // Batasi output untuk hemat token
          temperature: 0.7,
        }
      });
    }
  }

  initializeFAQ() {
    // FAQ umum untuk reduce API calls
    return new Map([
      ['apa itu tata surya', 'Tata surya adalah sistem yang terdiri dari Matahari dan semua benda langit yang mengorbitnya, termasuk 8 planet, bulan, asteroid, dan komet.'],
      ['berapa planet di tata surya', 'Ada 8 planet: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus. Pluto adalah planet katai.'],
      ['apa nama bulan bumi', 'Bulan (Moon) adalah satu-satunya satelit alami Bumi.'],
      ['teleskop hubble kapan diluncurkan', 'Hubble Space Telescope diluncurkan tahun 1990 dan masih aktif beroperasi.'],
      ['apa itu black hole', 'Black hole (lubang hitam) adalah wilayah di ruang angkasa dengan gravitasi sangat kuat sehingga tidak ada yang bisa lolos, bahkan cahaya.'],
      ['misi apa yang ada di mars', 'NASA memiliki Perseverance Rover (2021) dan Curiosity Rover (2012) di Mars.'],
      ['siapa manusia pertama di bulan', 'Neil Armstrong, misi Apollo 11 NASA, 20 Juli 1969.'],
      ['apa itu international space station', 'ISS adalah stasiun luar angkasa terbesar yang mengorbit Bumi pada ketinggian 408 km.'],
      ['bagaimana bintang terbentuk', 'Bintang terbentuk dari awan gas dan debu (nebula) yang runtuh karena gravitasi.'],
      ['apa perbedaan meteor dan meteorit', 'Meteor adalah batuan yang terbakar di atmosfer (bintang jatuh), meteorit adalah sisa yang mencapai permukaan Bumi.'],
    ]);
  }

  async sendMessage(message) {
    const normalizedMsg = message.toLowerCase().trim();
    
    // 1. Cek cache FAQ dulu
    if (this.faqCache.has(normalizedMsg)) {
      return this.faqCache.get(normalizedMsg);
    }
    
    // 2. Cek general cache
    if (this.cache.has(normalizedMsg)) {
      return this.cache.get(normalizedMsg);
    }
    
    // 3. Cek quota
    if (!this.rateLimiter.checkQuota()) {
      const status = this.rateLimiter.getStatus();
      return `Maaf, kuota harian (${status.dailyUsed}/${QUOTA_LIMITS.RPD}) atau menitan (${status.minuteUsed}/${QUOTA_LIMITS.RPM}) sudah habis. Silakan coba lagi nanti.`;
    }
    
    // 4. Fallback jika no API key
    if (!this.model) {
      return this.getMockResponse(normalizedMsg);
    }
    
    try {
      this.rateLimiter.addRequest();
      
      const prompt = `${SYSTEM_PROMPT}\n\nPertanyaan: ${message}\nJawaban:`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Cache untuk future use
      this.cache.set(normalizedMsg, text);
      
      // Keep cache size manageable
      if (this.cache.size > 100) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
      
      return text;
      
    } catch (error) {
      console.error('Gemini Error:', error);
      return this.getErrorResponse(error);
    }
  }

  getMockResponse(message) {
    // Extended mock responses
    const mockMap = {
      'halo': 'Halo! Saya SpaceEduls Assistant 🤖. Tanya apa saja tentang astronomi!',
      'help': 'Saya bisa jawab tentang: planet, tata surya, NASA, teleskop, bintang, dan luar angkasa.',
      'spaceedu': 'SpaceEduls.ID adalah platform edukasi antariksa Indonesia. Kunjungi halaman Education untuk materi lengkap!',
      'nasa': 'NASA adalah badan antariksa Amerika, didirikan 1958. Punya misi ke Bulan, Mars, dan tata surya.',
      'jwst': 'James Webb Space Telescope diluncurkan 2021, teleskop inframerah terbesar di luar angkasa.',
      'astronot': 'Astronaut adalah penjelajah luar angkasa. Butuh latihan bertahun-tahun dan pendidikan STEM.',
      'rokets': 'Roket menggunakan prinsip aksi-reaksi Newton untuk terbang ke luar angkasa.',
    };
    
    // Cari partial match
    for (const [key, response] of mockMap.entries()) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    return 'Untuk fitur AI Assistant lengkap, pastikan API Key Gemini sudah diatur di .env.local.';
  }

  getErrorResponse(error) {
    if (error.message.includes('quota')) {
      return 'Kuota API sementara habis. Silakan coba lagi dalam 1 menit.';
    }
    if (error.message.includes('429')) {
      return 'Terlalu banyak permintaan. Tunggu beberapa detik.';
    }
    return 'Maaf, terjadi kesalahan teknis. Sepertinya Rofiq tersesat di venus -_-.';
  }

  getQuotaStatus() {
    return this.rateLimiter.getStatus();
  }

  clearCache() {
    this.cache.clear();
  }
}

export const geminiService = new GeminiService();