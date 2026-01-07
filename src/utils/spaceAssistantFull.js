// // SPACE ASSISTANT - 100% GEMINI API, NO TEMPLATES
// import { askGeminiFull, getGeminiStatus, testGeminiConnection, resetDailyCount } from './geminiFullApi';

// class SpaceAssistant {
//   constructor() {
//     this.conversationHistory = [];
//     this.maxHistory = 20;
//     this.isAvailable = false;
//     this.status = null;
//     this.startTime = Date.now();
    
//     console.log('🚀 Space Assistant (Full API Mode) initializing...');
    
//     // Check initial status
//     this.updateStatus();
    
//     // Log initialization
//     setTimeout(() => {
//       console.log('📊 Initial Status:', this.status);
//     }, 1000);
//   }
  
//   updateStatus() {
//     this.status = getGeminiStatus();
//     this.isAvailable = this.status.remainingRequests > 0 && this.status.apiKeyConfigured;
//   }
  
//   getStatus() {
//     return this.status;
//   }
  
//   isGeminiAvailable() {
//     return this.isAvailable;
//   }
  
//   async ask(question) {
//     console.log(`📝 Question: "${question}"`);
    
//     // Update status first
//     this.updateStatus();
    
//     // Add to conversation history
//     this.conversationHistory.push({
//       question,
//       timestamp: new Date().toISOString(),
//       requestNumber: this.status.dailyRequestCount + 1
//     });
    
//     if (this.conversationHistory.length > this.maxHistory) {
//       this.conversationHistory.shift();
//     }
    
//     // Special commands
//     const lowerQ = question.toLowerCase().trim();
    
//     if (lowerQ === 'help' || lowerQ === 'bantuan') {
//       return this.getHelpResponse();
//     }
    
//     if (lowerQ === 'status' || lowerQ === 'kuota') {
//       return this.getStatusResponse();
//     }
    
//     if (lowerQ === 'reset quota' && lowerQ.includes('reset')) {
//       return this.resetQuotaResponse();
//     }
    
//     if (lowerQ === 'test' || lowerQ === 'test api') {
//       return await this.testApiResponse();
//     }
    
//     if (lowerQ === 'history' || lowerQ === 'riwayat') {
//       return this.getHistoryResponse();
//     }
    
//     if (lowerQ === 'clear' || lowerQ === 'hapus') {
//       return this.clearHistoryResponse();
//     }
    
//     // Check availability
//     if (!this.isAvailable) {
//       return this.getQuotaExceededResponse(question);
//     }
    
//     // Make Gemini API request
//     try {
//       console.log(`🔢 Request #${this.status.dailyRequestCount + 1}/${this.status.maxRequestsPerDay}`);
//       const startTime = Date.now();
      
//       const answer = await askGeminiFull(question);
      
//       const endTime = Date.now();
//       const responseTime = endTime - startTime;
      
//       // Update history
//       if (this.conversationHistory.length > 0) {
//         const lastEntry = this.conversationHistory[this.conversationHistory.length - 1];
//         lastEntry.responseTime = responseTime;
//         lastEntry.answerLength = answer.length;
//         lastEntry.success = true;
//       }
      
//       // Update status
//       this.updateStatus();
      
//       console.log(`✅ Response received in ${responseTime}ms (${answer.length} chars)`);
      
//       return answer;
      
//     } catch (error) {
//       console.error('❌ Gemini API error:', error.message);
      
//       // Update history
//       if (this.conversationHistory.length > 0) {
//         this.conversationHistory[this.conversationHistory.length - 1].success = false;
//         this.conversationHistory[this.conversationHistory.length - 1].error = error.message;
//       }
      
//       // Update status
//       this.updateStatus();
      
//       return this.getApiErrorResponse(question, error);
//     }
//   }
  
//   getQuotaExceededResponse(question) {
//     const remainingTime = this.getRemainingTime();
    
//     return `**⚠️ KUOTA HARIAN HABIS**

// Maaf, tidak dapat menjawab: "${question}"

// **STATUS KUOTA:**
// • Request hari ini: ${this.status.dailyRequestCount}/${this.status.maxRequestsPerDay}
// • Sisa: 0 request
// • Reset: ${remainingTime}

// **APA ITU KUOTA?**
// Gemini API gratis memiliki batas 60 request per hari. Setiap pertanyaan = 1 request.

// **SOLUSI:**
// 1. **Tunggu hingga besok** - Kuota reset setiap 24 jam
// 2. **Upgrade ke Google AI Studio Paid** - Unlimited requests
// 3. **Gunakan pertanyaan dengan bijak** - Setiap request berharga

// **WAKTU RESET:** ${remainingTime}

// **NOTE:** Sistem ini menggunakan **100% Gemini API real-time**, tanpa template atau jawaban offline.`;
//   }
  
//   getApiErrorResponse(question, error) {
//     return `**❌ ERROR GEMINI API**

// Gagal mendapatkan jawaban untuk: "${question}"

// **Error:** ${error.message}

// **Status Sistem:**
// • API Key: ${this.status.apiKeyConfigured ? '✅ Configured' : '❌ Missing'}
// • Requests Today: ${this.status.dailyRequestCount}/${this.status.maxRequestsPerDay}
// • Queue: ${this.status.queueLength} requests waiting

// **Kemungkinan Penyebab:**
// 1. API Key tidak valid atau expired
// 2. Network connectivity issue
// 3. Gemini API service down
// 4. Rate limiting (coba lagi nanti)

// **Tindakan:**
// 1. Cek file .env.local memiliki VITE_GEMINI_API_KEY yang valid
// 2. Cek koneksi internet
// 3. Tunggu beberapa menit lalu coba lagi
// 4. Ketik "status" untuk info sistem

// **NOTE:** Sistem menggunakan **real Gemini API** - semua jawaban langsung dari AI Google.`;
//   }
  
//   getStatusResponse() {
//     const remainingTime = this.getRemainingTime();
//     const avgResponseTime = this.getAverageResponseTime();
    
//     return `**📊 STATUS GEMINI API**

// **🔑 API CONFIGURATION:**
// • API Key: ${this.status.apiKeyConfigured ? '✅ Ditemukan' : '❌ Tidak ditemukan'}
// • Mode: **100% Real Gemini API** (no templates)

// **📈 USAGE TODAY:**
// • Digunakan: ${this.status.dailyRequestCount} requests
// • Maksimum: ${this.status.maxRequestsPerDay} requests/hari
// • Tersisa: ${this.status.remainingRequests} requests
// • Reset: ${remainingTime}

// **⚙️ SYSTEM:**
// • Queue: ${this.status.queueLength} requests waiting
// • Processing: ${this.status.isProcessing ? '✅ Yes' : '❌ No'}
// • Uptime: ${this.getUptime()}
// • Avg Response Time: ${avgResponseTime}ms

// **📊 HISTORY:**
// • Total Questions: ${this.conversationHistory.length}
// • Success Rate: ${this.getSuccessRate()}%

// **🔄 REQUEST QUEUE:**
// 1. Request dikirim dengan delay 2 detik
// 2. Antrian otomatis jika banyak request
// 3. Rate limiting untuk hindari quota habis

// **💡 TIPS:**
// • Setiap pertanyaan = 1 request
// • Kuota reset setiap 24 jam
// • Gunakan pertanyaan spesifik untuk jawaban terbaik
// • Upgrade ke paid plan untuk unlimited requests

// **NOTE:** Semua jawaban **real-time dari Gemini AI**, tidak ada template!`;
//   }
  
//   async testApiResponse() {
//     try {
//       const testResult = await testGeminiConnection();
      
//       if (testResult.success) {
//         return `**✅ TEST API BERHASIL**

// Gemini API berfungsi dengan baik!

// **Response Test:** ${testResult.response}

// **Status:**
// • Requests Today: ${testResult.status.dailyRequestCount}/${testResult.status.maxRequestsPerDay}
// • Available: ✅ Yes
// • API Key: ✅ Valid

// Sistem siap menerima pertanyaan Anda. Setiap jawaban akan **langsung dari Gemini AI** dalam waktu nyata.`;
//       } else {
//         return `**❌ TEST API GAGAL**

// Error: ${testResult.message}

// **Status Detail:**
// ${JSON.stringify(testResult.status, null, 2)}

// **Solusi:**
// 1. Cek VITE_GEMINI_API_KEY di .env.local
// 2. Pastikan API key valid di Google AI Studio
// 3. Tunggu reset quota (setiap 24 jam)
// 4. Coba lagi nanti`;
//       }
//     } catch (error) {
//       return `**⚠️ TEST ERROR**

// Error: ${error.message}

// Silakan cek konfigurasi API key dan coba lagi.`;
//     }
//   }
  
//   resetQuotaResponse() {
//     resetDailyCount();
//     this.updateStatus();
    
//     return `**🔄 KUOTA DIRESET**

// Daily request count telah direset ke 0.

// **Status Baru:**
// • Requests Today: ${this.status.dailyRequestCount}/${this.status.maxRequestsPerDay}
// • Remaining: ${this.status.remainingRequests} requests
// • Available: ✅ Yes

// Sistem siap menerima pertanyaan baru!`;
//   }
  
//   getHistoryResponse() {
//     if (this.conversationHistory.length === 0) {
//       return '**📝 RIWAYAT KOSONG**\n\nBelum ada percakapan.';
//     }
    
//     let response = '**📝 RIWAYAT PERCAKAPAN**\n\n';
    
//     this.conversationHistory.slice(-10).reverse().forEach((entry, index) => {
//       response += `**${this.conversationHistory.length - index}. ${entry.question}**\n`;
//       response += `   Waktu: ${new Date(entry.timestamp).toLocaleTimeString()}\n`;
//       if (entry.responseTime) {
//         response += `   Durasi: ${entry.responseTime}ms\n`;
//       }
//       if (entry.answerLength) {
//         response += `   Panjang: ${entry.answerLength} chars\n`;
//       }
//       response += `   Status: ${entry.success ? '✅' : '❌'}\n\n`;
//     });
    
//     response += `**Total:** ${this.conversationHistory.length} percakapan\n`;
//     response += `**Success Rate:** ${this.getSuccessRate()}%`;
    
//     return response;
//   }
  
//   getHelpResponse() {
//     return `**🆘 BANTUAN SPACEDU ASSISTANT**

// **TENTANG:**
// Saya adalah asisten astronomi yang menggunakan **100% Google Gemini API** untuk semua jawaban. Tidak ada template, tidak ada jawaban offline.

// **CARA KERJA:**
// 1. Pertanyaan Anda dikirim ke Gemini AI
// 2. Gemini memproses dan memberikan jawaban
// 3. Jawaban langsung ditampilkan ke Anda
// 4. Setiap pertanyaan = 1 API request

// **KUOTA:**
// • **Free Tier:** 60 requests per hari
// • **Reset:** Setiap 24 jam (00:00 waktu server)
// • **Hitungan:** ${this.status?.dailyRequestCount || 0}/${this.status?.maxRequestsPerDay || 60} used today

// **PERINTAH KHUSUS:**
// • **help** - Tampilkan bantuan ini
// • **status** - Lihat status kuota & sistem
// • **test** - Test koneksi Gemini API
// • **history** - Lihat riwayat percakapan
// • **clear** - Hapus riwayat percakapan

// **CONTOH PERTANYAAN:**
// • "Jelaskan tentang planet Jupiter secara detail"
// • "Apa perbedaan teleskop Hubble dan James Webb?"
// • "Bagaimana proses pembentukan bintang?"
// • "Apa misi terbaru NASA ke Mars?"

// **CATATAN PENTING:**
// • Semua jawaban **real-time dari Gemini AI**
// • Tidak ada cache atau template
// • Kuota terbatas, gunakan dengan bijak
// • Error mungkin terjadi jika kuota habis atau API down

// **Untuk unlimited requests, upgrade ke Google AI Studio paid plan.**`;
//   }
  
//   clearHistoryResponse() {
//     this.conversationHistory = [];
//     return '**✅ RIWAYAT DIHAPUS**\n\nRiwayat percakapan telah dihapus. Percakapan baru dapat dimulai.';
//   }
  
//   // Utility methods
//   getRemainingTime() {
//     const now = new Date();
//     const tomorrow = new Date(now);
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0);
    
//     const diff = tomorrow - now;
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours} jam ${minutes} menit`;
//   }
  
//   getUptime() {
//     const uptimeMs = Date.now() - this.startTime;
//     const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
//     const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours} jam ${minutes} menit`;
//   }
  
//   getAverageResponseTime() {
//     const times = this.conversationHistory
//       .filter(e => e.responseTime)
//       .map(e => e.responseTime);
    
//     if (times.length === 0) return 0;
    
//     return Math.round(times.reduce((a, b) => a + b, 0) / times.length);
//   }
  
//   getSuccessRate() {
//     const successes = this.conversationHistory.filter(e => e.success === true).length;
//     const total = this.conversationHistory.filter(e => e.success !== undefined).length;
    
//     if (total === 0) return 100;
    
//     return Math.round((successes / total) * 100);
//   }
// }

// // Export singleton
// export const spaceAssistant = new SpaceAssistant();