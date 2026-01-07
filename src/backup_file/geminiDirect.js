// GEMINI DIRECT API - COMPLETE WITH LONG RESPONSES
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Cache for available models
let availableModels = null;
let workingModel = null;

// Get list of available models from Google API
export const getAvailableModels = async () => {
  if (availableModels) return availableModels;
  
  if (!API_KEY) {
    console.error('❌ API Key tidak ditemukan');
    return [];
  }
  
  try {
    console.log('🔍 Mendapatkan daftar model yang tersedia...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    availableModels = data.models || [];
    
    console.log('✅ Models ditemukan:', availableModels.length);
    return availableModels;
    
  } catch (error) {
    console.error('❌ Gagal mendapatkan models:', error);
    return [];
  }
};

// Find a working model that supports generateContent
export const findWorkingModel = async () => {
  if (workingModel) return workingModel;
  
  const models = await getAvailableModels();
  
  if (models.length === 0) {
    throw new Error('Tidak ada model yang tersedia');
  }
  
  // Try these models in order (based on your available models list)
  const preferredModels = [
    'models/gemini-2.5-flash',      // Gemini 2.5 Flash (terbaru)
    'models/gemini-2.5-pro',        // Gemini 2.5 Pro (terbaru)
    'models/gemini-pro-latest',     // Gemini Pro Latest (stable)
    'models/gemini-flash-latest',   // Gemini Flash Latest
    'models/gemini-2.0-flash',      // Gemini 2.0 Flash
    'models/gemini-2.0-flash-001',  // Gemini 2.0 Flash 001
  ];
  
  console.log('🔍 Mencari model yang bekerja...');
  
  for (const modelName of preferredModels) {
    // Check if this model exists and supports generateContent
    const model = models.find(m => m.name === modelName);
    
    if (model && model.supportedGenerationMethods?.includes('generateContent')) {
      console.log(`🎯 Model ditemukan: ${modelName}`);
      console.log(`📊 Supported methods:`, model.supportedGenerationMethods);
      
      workingModel = modelName.replace('models/', '');
      console.log(`✅ Model dipilih: ${workingModel}`);
      return workingModel;
    }
  }
  
  // If no preferred model works, try any model that supports generateContent
  for (const model of models) {
    if (model.supportedGenerationMethods?.includes('generateContent')) {
      console.log(`🎯 Mencoba model alternatif: ${model.name}`);
      workingModel = model.name.replace('models/', '');
      console.log(`✅ Model alternatif dipilih: ${workingModel}`);
      return workingModel;
    }
  }
  
  throw new Error('Tidak ada model yang mendukung generateContent');
};

// Main function to ask Gemini - LONG RESPONSE VERSION
export const askGeminiDirect = async (question) => {
  console.log('🔍 Question:', question.substring(0, 50));
  
  if (!API_KEY) {
    throw new Error('API Key tidak dikonfigurasi di .env.local');
  }
  
  try {
    // Get or find working model
    let modelToUse = workingModel;
    if (!modelToUse) {
      modelToUse = await findWorkingModel();
    }
    
    console.log(`🚀 Mengirim ke Gemini API (Model: ${modelToUse})...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `Anda adalah SpaceEdu Assistant, asisten ahli astronomi untuk platform edukasi SpaceEdu Indonesia.

**PERAN DAN TUJUAN:**
Anda adalah ahli astronomi yang bertugas membantu siswa, guru, dan penggemar antariksa memahami konsep astronomi dengan mudah dan mendalam.

**INSTRUKSI JAWABAN:**
1. **BAHASA:** Gunakan Bahasa Indonesia yang jelas, edukatif, dan menarik
2. **PANJANG:** Berikan jawaban LENGKAP dan DETAIL (minimal 8-10 kalimat/2-3 paragraf)
3. **STRUKTUR:**
   🌌 **Jawaban Utama:** Ringkasan 1-2 kalimat pembuka
   📚 **Penjelasan Mendalam:** 2-3 paragraf penjelasan komprehensif
   🔭 **Aspek Teknis:** Detail ilmiah jika relevan
   🪐 **Contoh & Analogi:** Gunakan analogi yang mudah dipahami
   🌟 **Fakta Menarik:** 2-3 fakta unik atau mengejutkan
   🚀 **Konteks Eksplorasi:** Hubungan dengan misi NASA/riset terkini
   💡 **Penting untuk Diketahui:** Poin-poin kunci
4. **FORMATTING:** Gunakan markdown untuk struktur yang jelas
5. **TONALITAS:** Ramah, inspiratif, dan membangkitkan rasa ingin tahu
6. **TARGET:** Siswa SMA/mahasiswa/penggemar astronomi pemula hingga menengah

**FORMAT CONTOH YANG DIHARAPKAN:**

🌌 **Jawaban Utama:** [1-2 kalimat pembuka yang menarik]

📚 **Penjelasan Mendalam:**
[Paragraf 1: Penjelasan dasar konsep]
[Paragraf 2: Detail lebih dalam dengan contoh]
[Paragraf 3: Implikasi atau pentingnya dalam astronomi]

🔭 **Detail Ilmiah:**
• Poin teknis 1
• Poin teknis 2

🌟 **Fakta Menarik:**
• Fakta 1: [fakta unik]
• Fakta 2: [fakta mengejutkan]

🚀 **Dalam Eksplorasi Antariksa:**
[Konteks penelitian NASA/misi luar angkasa terkait]

💡 **Penting untuk Diketahui:**
• Poin kunci 1
• Poin kunci 2

**CATATAN:** JANGAN berikan jawaban singkat 1-2 kalimat. Berikan penjelasan yang benar-benar edukatif dan memuaskan rasa ingin tahu.

**PERTANYAAN:** ${question}

**JAWABAN SPACEDU ASSISTANT YANG LENGKAP DAN EDUKATIF:**`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1500, // SANGAT TINGGI untuk jawaban panjang
            topP: 0.9,
            topK: 40,
          }
        })
      }
    );
    
    console.log('📥 Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Gemini API Error:', errorData.error?.message || response.status);
      
      // If this model fails, clear cache and try another model
      if (response.status === 404) {
        workingModel = null;
        throw new Error(`Model ${modelToUse} tidak ditemukan.`);
      }
      
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('Tidak ada jawaban dari Gemini');
    }
    
    const answer = data.candidates[0].content.parts[0].text;
    console.log(`✅ Gemini berhasil! Model: ${modelToUse}, Panjang: ${answer.length} karakter`);
    
    // Validate answer length
    if (answer.length < 100) {
      console.warn('⚠️ Jawaban mungkin terlalu pendek:', answer.length, 'karakter');
    }
    
    return answer;
    
  } catch (error) {
    console.error('❌ Gemini error:', error.message);
    throw new Error(`Kesalahan teknis: ${error.message}`);
  }
};

// Test connection
export const testGeminiConnection = async () => {
  try {
    // First, get available models
    const models = await getAvailableModels();
    
    if (models.length === 0) {
      return { 
        success: false, 
        message: 'Tidak ada model Gemini yang tersedia.' 
      };
    }
    
    // Find a working model
    const model = await findWorkingModel();
    
    // Try to ask a simple question
    const result = await askGeminiDirect('Jelaskan apa itu planet dengan lengkap');
    
    return { 
      success: true, 
      message: 'Gemini API berfungsi dengan jawaban panjang',
      model: workingModel,
      response: result.substring(0, 200) + '...',
      availableModels: models.length,
      responseLength: result.length
    };
    
  } catch (error) {
    return { 
      success: false, 
      message: error.message
    };
  }
};

// List all available models
export const listAllModels = async () => {
  const models = await getAvailableModels();
  
  if (models.length === 0) {
    return [];
  }
  
  // Filter only models that support generateContent
  const generateModels = models.filter(m => 
    m.supportedGenerationMethods?.includes('generateContent')
  );
  
  console.log(`📊 Models with generateContent: ${generateModels.length}/${models.length}`);
  
  return generateModels;
};

// Special function for VERY detailed answers
export const askGeminiSuperDetailed = async (question) => {
  console.log('🔍 SUPER DETAILED Question:', question.substring(0, 50));
  
  if (!API_KEY) {
    throw new Error('API Key tidak dikonfigurasi');
  }
  
  try {
    let modelToUse = workingModel;
    if (!modelToUse) {
      modelToUse = await findWorkingModel();
    }
    
    console.log(`🚀 Mengirim SUPER DETAILED ke Gemini (${modelToUse})...`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: `Anda adalah SpaceEdu Assistant, ahli astronomi dengan gelar PhD.

**MISI:** Memberikan penjelasan paling LENGKAP, DETAIL, dan KOMPREHENSIF tentang astronomi.

**PERINTAH MUTLAK:**
1. Berikan jawaban SANGAT PANJANG dan DETAIL (minimal 15-20 kalimat)
2. Gunakan struktur berikut:
   🎯 **Jawaban Inti:** 2-3 kalimat pembuka
   📖 **Penjelasan Ilmiah:** 4-5 paragraf detail ilmiah
   🧪 **Proses & Mekanisme:** Penjelasan proses jika relevan
   🌍 **Konteks Tata Surya:** Hubungan dengan tata surya kita
   🔬 **Penelitian Terkini:** Temuan NASA/penelitian mutakhir
   📊 **Data & Angka:** Data numerik jika tersedia
   🤔 **Pertanyaan Lanjutan:** Pertanyaan untuk eksplorasi lebih dalam
   📚 **Referensi:** Sumber belajar lebih lanjut
3. JANGAN berhenti di penjelasan dasar. Masuk ke detail mendalam.
4. Gunakan analogi, contoh, dan ilustrasi.
5. Target: Mahasiswa/penggemar serius yang ingin pemahaman mendalam.

**PERTANYAAN:** ${question}

**JAWABAN SUPER DETAIL YANG SANGAT LENGKAP DAN MENDALAM:**`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000, // SANGAT TINGGI
            topP: 0.95,
            topK: 50,
          }
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    const answer = data.candidates[0].content.parts[0].text;
    
    console.log(`✅ Super detailed response: ${answer.length} chars`);
    return answer;
    
  } catch (error) {
    console.error('❌ Super detailed error:', error);
    throw error;
  }
};