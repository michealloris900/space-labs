// // File: src/utils/geminiFullApi.js
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// // Rate limiting queue system
// let requestQueue = [];
// let isProcessing = false;
// let dailyRequestCount = 0;
// const MAX_REQUESTS_PER_DAY = 60;
// const REQUEST_DELAY = 2000;

// const getToday = () => {
//   const now = new Date();
//   return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
// };

// const loadDailyCount = () => {
//   const today = getToday();
//   const saved = localStorage.getItem(`gemini_daily_count_${today}`);
//   return saved ? parseInt(saved) : 0;
// };

// const saveDailyCount = (count) => {
//   const today = getToday();
//   localStorage.setItem(`gemini_daily_count_${today}`, count.toString());
//   dailyRequestCount = count;
// };

// dailyRequestCount = loadDailyCount();

// const canMakeRequest = () => {
//   const savedDate = localStorage.getItem('gemini_last_date');
//   const today = getToday();
  
//   if (savedDate !== today) {
//     dailyRequestCount = 0;
//     saveDailyCount(0);
//     localStorage.setItem('gemini_last_date', today);
//     console.log('🔄 Daily quota reset');
//   }
  
//   return dailyRequestCount < MAX_REQUESTS_PER_DAY;
// };

// const processQueue = async () => {
//   if (isProcessing || requestQueue.length === 0) return;
  
//   isProcessing = true;
  
//   while (requestQueue.length > 0) {
//     const { question, resolve, reject } = requestQueue.shift();
    
//     if (!canMakeRequest()) {
//       reject(new Error(`Daily quota exceeded (${MAX_REQUESTS_PER_DAY} requests). Please try again tomorrow.`));
//       continue;
//     }
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      
//       const result = await makeGeminiRequest(question);
//       resolve(result);
      
//     } catch (error) {
//       reject(error);
//     }
//   }
  
//   isProcessing = false;
// };

// const makeGeminiRequest = async (question) => {
//   console.log(`🚀 Making Gemini API request #${dailyRequestCount + 1}/${MAX_REQUESTS_PER_DAY}`);
  
//   if (!API_KEY) {
//     throw new Error('API Key not configured. Add VITE_GEMINI_API_KEY to .env.local');
//   }
  
//   const models = [
//     'gemini-2.0-flash',
//     'gemini-2.0-flash-001',
//     'gemini-pro-latest',
//     'gemini-flash-latest',
//     'gemini-2.5-flash'
//   ];
  
//   let lastError = null;
  
//   for (const model of models) {
//     try {
//       const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             contents: [{
//               parts: [{ 
//                 text: `Anda adalah SpaceEdu Assistant, asisten astronomi profesional.

// **INSTRUKSI:**
// 1. Gunakan BAHASA INDONESIA yang jelas dan edukatif
// 2. Berikan jawaban LENGKAP dan DETAIL (minimum 5 paragraf)
// 3. Struktur jawaban:
//    • Pembukaan yang menarik
//    • Penjelasan ilmiah mendalam
//    • Contoh dan analogi
//    • Fakta menarik
//    • Konteks eksplorasi antariksa
//    • Sumber belajar lanjutan
// 4. Fokus pada akurasi ilmiah
// 5. Target audiens: siswa dan penggemar astronomi

// **Pertanyaan:** ${question}

// **Jawaban SpaceEdu Assistant:**`
//               }]
//             }],
//             generationConfig: {
//               temperature: 0.8,
//               maxOutputTokens: 1500,
//               topP: 0.9,
//               topK: 40,
//             }
//           })
//         }
//       );
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
        
//         if (response.status === 429) {
//           console.log(`❌ Model ${model} quota exceeded, trying next...`);
//           lastError = new Error(`Model ${model}: Quota exceeded`);
//           continue;
//         }
        
//         throw new Error(errorData.error?.message || `HTTP ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (!data.candidates || !data.candidates[0]) {
//         throw new Error('No response from Gemini');
//       }
      
//       const answer = data.candidates[0].content.parts[0].text;
      
//       dailyRequestCount++;
//       saveDailyCount(dailyRequestCount);
      
//       console.log(`✅ Request #${dailyRequestCount} successful (Model: ${model}, Length: ${answer.length} chars)`);
      
//       return answer;
      
//     } catch (error) {
//       lastError = error;
//       console.log(`❌ Model ${model} failed:`, error.message);
//     }
//   }
  
//   throw lastError || new Error('All Gemini models failed');
// };

// export const askGeminiFull = (question) => {
//   return new Promise((resolve, reject) => {
//     requestQueue.push({ question, resolve, reject });
//     processQueue();
//   });
// };

// export const getGeminiStatus = () => {
//   const today = getToday();
//   const savedDate = localStorage.getItem('gemini_last_date');
//   const isNewDay = savedDate !== today;
  
//   return {
//     apiKeyConfigured: !!API_KEY,
//     dailyRequestCount,
//     maxRequestsPerDay: MAX_REQUESTS_PER_DAY,
//     remainingRequests: MAX_REQUESTS_PER_DAY - dailyRequestCount,
//     isNewDay,
//     queueLength: requestQueue.length,
//     isProcessing
//   };
// };

// export const resetDailyCount = () => {
//   dailyRequestCount = 0;
//   saveDailyCount(0);
//   localStorage.setItem('gemini_last_date', '');
//   return 'Daily count reset successfully';
// };

// export const testGeminiConnection = async () => {
//   try {
//     if (!canMakeRequest()) {
//       return {
//         success: false,
//         message: `Daily quota exhausted (${dailyRequestCount}/${MAX_REQUESTS_PER_DAY})`,
//         status: getGeminiStatus()
//       };
//     }
    
//     const testQuestion = 'Jelaskan apa itu planet dalam 3 kalimat';
//     const response = await askGeminiFull(testQuestion);
    
//     return {
//       success: true,
//       message: 'Gemini API is working',
//       response: response.substring(0, 200) + '...',
//       status: getGeminiStatus()
//     };
    
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message,
//       status: getGeminiStatus()
//     };
//   }
// };