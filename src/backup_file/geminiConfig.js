// GEMINI API CONFIG - DYNAMIC MODEL DISCOVERY
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiConfig {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.isAvailable = false;
    this.model = null;
    this.error = null;
    this.initialized = false;
    this.availableModels = [];
    this.selectedModel = '';
    
    console.log('🔧 Initializing Gemini API...');
    
    if (!this.apiKey || this.apiKey === '') {
      this.error = 'API key tidak ditemukan di .env.local';
      console.warn('⚠️ ' + this.error);
      return;
    }
    
    if (this.apiKey.startsWith('test_') || this.apiKey === 'test_key_temporary') {
      console.warn('⚠️ Menggunakan API key test');
      return;
    }
    
    // Initialize without blocking
    this.initialize();
  }
  
  async initialize() {
    try {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      
      // Step 1: Get available models from API
      console.log('📋 Mendapatkan daftar model yang tersedia...');
      const models = await this.getAvailableModels();
      
      if (models.length === 0) {
        this.error = 'Tidak ada model Gemini yang tersedia';
        console.error('❌ ' + this.error);
        return;
      }
      
      console.log('✅ Model tersedia:', models.map(m => m.name));
      
      // Step 2: Try to find a working model
      this.selectedModel = await this.findWorkingModel(models);
      
      if (this.selectedModel) {
        this.isAvailable = true;
        this.initialized = true;
        console.log(`🎯 Model yang dipilih: ${this.selectedModel}`);
      } else {
        this.error = 'Tidak ada model yang bisa digunakan untuk generateContent';
      }
      
    } catch (error) {
      this.error = error.message;
      console.error('❌ Gemini initialization error:', error);
    }
  }
  
  async getAvailableModels() {
    try {
      // Using fetch directly to get models list
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.models || [];
      
    } catch (error) {
      console.error('❌ Gagal mendapatkan daftar model:', error);
      
      // Fallback: Return known models
      return [
        { name: 'models/gemini-1.5-pro-latest' },
        { name: 'models/gemini-1.0-pro-latest' },
        { name: 'models/gemini-pro' },
        { name: 'models/gemini-pro-vision' }
      ];
    }
  }
  
  async findWorkingModel(models) {
    // Try these models in order of preference
    const preferredModels = [
      'gemini-1.5-pro-latest',
      'gemini-1.0-pro-latest',
      'gemini-pro',
      'gemini-1.5-flash-latest',
      'gemini-1.0-pro'
    ];
    
    for (const preferred of preferredModels) {
      // Check if this model exists in available models
      const fullModelName = `models/${preferred}`;
      const modelExists = models.some(m => m.name === fullModelName);
      
      if (modelExists) {
        try {
          console.log(`   Mencoba model: ${preferred}`);
          this.model = this.genAI.getGenerativeModel({ 
            model: preferred,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            }
          });
          
          // Quick test
          await this.model.generateContent('test');
          return preferred;
          
        } catch (error) {
          console.log(`   Model ${preferred} gagal: ${error.message}`);
          continue;
        }
      }
    }
    
    // If none of preferred work, try any model that supports generateContent
    for (const model of models) {
      const modelName = model.name.replace('models/', '');
      
      // Skip models that don't support generateContent
      if (!model.supportedGenerationMethods?.includes('generateContent')) {
        continue;
      }
      
      try {
        console.log(`   Mencoba model alternatif: ${modelName}`);
        this.model = this.genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          }
        });
        
        await this.model.generateContent('test');
        return modelName;
        
      } catch (error) {
        console.log(`   Model ${modelName} gagal: ${error.message}`);
      }
    }
    
    return null;
  }
  
  async ask(question) {
    if (!this.isAvailable || !this.model) {
      throw new Error('Gemini API tidak tersedia: ' + (this.error || ''));
    }
    
    try {
      const prompt = `Anda adalah SpaceEdu Assistant, asisten astronomi.

**ATURAN:**
1. Gunakan BAHASA INDONESIA
2. Jawab SINGKAT (maks 3 paragraf)
3. Fokus pada astronomi: tata surya, planet, NASA, teleskop
4. Jika tidak tahu, jangan membuat jawaban

**FORMAT:**
**Jawaban:** (1-2 kalimat)
**Penjelasan:** (1 paragraf)
**Fakta:** (opsional)

**PERTANYAAN:** ${question}

**JAWABAN:**`;
      
      console.log(`📤 Mengirim ke Gemini (${this.selectedModel})...`);
      const startTime = Date.now();
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const endTime = Date.now();
      console.log(`📥 Diterima dalam ${endTime - startTime}ms`);
      
      return text;
      
    } catch (error) {
      console.error('❌ Gemini API error:', error.message);
      
      // If model error, mark as unavailable
      if (error.message.includes('404') || error.message.includes('not found')) {
        this.isAvailable = false;
        this.error = `Model ${this.selectedModel} tidak tersedia`;
      }
      
      throw new Error(`Gemini error: ${error.message}`);
    }
  }
  
  getStatus() {
    return {
      available: this.isAvailable,
      model: this.selectedModel,
      error: this.error,
      hasApiKey: !!this.apiKey,
      initialized: this.initialized
    };
  }
}

// Export singleton
export const geminiConfig = new GeminiConfig();

// Log status
setTimeout(async () => {
  console.log('📊 Gemini Status:', geminiConfig.getStatus());
}, 3000);