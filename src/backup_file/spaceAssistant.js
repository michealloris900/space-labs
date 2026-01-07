// SPACE ASSISTANT - WITH INITIALIZATION WAIT
import { askGeminiDirect, testGeminiConnection, listAllModels } from './geminiDirect';

class SpaceAssistant {
  constructor() {
    this.conversationHistory = [];
    this.maxHistory = 10;
    this.isGeminiAvailable = false;
    this.geminiModel = null;
    this.availableModels = [];
    this.startTime = Date.now();
    this.initialized = false; // ← NEW: Track initialization
    this.initializationPromise = null; // ← NEW: Promise for init
    
    console.log('🚀 Space Assistant initializing...');
    
    // Start initialization but don't wait here
    this.initializationPromise = this.initializeGemini();
  }
  
  async initializeGemini() {
    try {
      console.log('🔧 Testing Gemini connection...');
      
      const testResult = await testGeminiConnection();
      this.isGeminiAvailable = testResult.success;
      this.geminiModel = testResult.model;
      
      if (testResult.success) {
        console.log('✅ Gemini API READY');
        console.log(`📊 Model: ${this.geminiModel}`);
        
        // Get available models
        const models = await listAllModels();
        this.availableModels = models;
        
        console.log(`📊 Available generateContent models: ${models.length}`);
      } else {
        console.warn('⚠️ Gemini API UNAVAILABLE');
        console.warn(`📊 Reason: ${testResult.message}`);
      }
      
      this.initialized = true;
      console.log('🏁 Space Assistant initialized successfully');
      
    } catch (error) {
      console.error('❌ Initialization error:', error);
      this.isGeminiAvailable = false;
      this.initialized = true;
    }
  }
  
  // Wait for initialization before asking
  async waitForInitialization() {
    if (!this.initialized && this.initializationPromise) {
      console.log('⏳ Waiting for initialization...');
      await this.initializationPromise;
    }
    return this.initialized;
  }
  
  // PUBLIC METHODS
  getGeminiStatus() {
    return this.isGeminiAvailable;
  }
  
  getGeminiModel() {
    return this.geminiModel;
  }
  
  getAvailableModelsCount() {
    return this.availableModels.length;
  }
  
  async ask(question) {
    console.log(`📝 Question: "${question}"`);
    
    // WAIT FOR INITIALIZATION FIRST
    await this.waitForInitialization();
    
    console.log(`📊 Gemini available: ${this.isGeminiAvailable}`);
    console.log(`📊 Gemini model: ${this.geminiModel}`);
    console.log(`📊 Initialized: ${this.initialized}`);
    
    // Add to conversation history
    this.conversationHistory.push({
      question,
      timestamp: new Date().toISOString(),
      source: null,
      geminiAvailable: this.isGeminiAvailable,
      model: this.geminiModel,
      initialized: this.initialized
    });
    
    if (this.conversationHistory.length > this.maxHistory) {
      this.conversationHistory.shift();
    }
    
    // Special commands
    const lowerQ = question.toLowerCase().trim();
    
    if (lowerQ === 'help' || lowerQ === 'bantuan') {
      return this.getHelpResponse();
    }
    
    if (lowerQ === 'status' || lowerQ === 'mode') {
      return this.getDetailedStatusResponse();
    }
    
    if (lowerQ === 'models' || lowerQ === 'list models') {
      return await this.getModelsListResponse();
    }
    
    if (lowerQ === 'test gemini' || lowerQ === 'test api') {
      return await this.testGeminiResponse();
    }
    
    if (lowerQ === 'reset' || lowerQ === 'clear') {
      return this.clearHistoryResponse();
    }
    
    if (lowerQ === 'debug') {
      return this.getDebugInfo();
    }
    
    if (lowerQ === 'init status') {
      return this.getInitStatus();
    }
    
    // Try Gemini API if available
    if (this.isGeminiAvailable) {
      try {
        console.log('🎯 Using Gemini API...');
        const startTime = Date.now();
        
        const answer = await askGeminiDirect(question);
        
        const endTime = Date.now();
        console.log(`✅ Gemini SUCCESS in ${endTime - startTime}ms`);
        
        // Update history
        if (this.conversationHistory.length > 0) {
          this.conversationHistory[this.conversationHistory.length - 1].source = 'gemini';
          this.conversationHistory[this.conversationHistory.length - 1].responseTime = endTime - startTime;
        }
        
        return answer;
        
      } catch (error) {
        console.error('❌ Gemini API failed:', error.message);
        
        // Update Gemini availability
        this.isGeminiAvailable = false;
        this.geminiModel = null;
        
        // Add to history
        if (this.conversationHistory.length > 0) {
          this.conversationHistory[this.conversationHistory.length - 1].source = 'gemini_error';
          this.conversationHistory[this.conversationHistory.length - 1].error = error.message;
        }
        
        return this.getErrorResponse(question, error);
      }
    }
    
    // Gemini not available - show detailed error
    console.log('⚠️ Gemini not available, using fallback');
    
    if (this.conversationHistory.length > 0) {
      this.conversationHistory[this.conversationHistory.length - 1].source = 'fallback';
    }
    
    return this.getFallbackResponse(question);
  }
  
  // NEW: Get initialization status
  getInitStatus() {
    return `**🔧 INITIALIZATION STATUS**

• Initialized: ${this.initialized ? '✅ Yes' : '⏳ No'}
• Gemini Available: ${this.isGeminiAvailable ? '✅ Yes' : '❌ No'}
• Gemini Model: ${this.geminiModel || 'None'}
• Available Models: ${this.availableModels.length}
• Conversation History: ${this.conversationHistory.length}
• Uptime: ${this.getUptime()}

**Recommendation:**
${!this.initialized ? '⏳ Still initializing...' : 
  this.isGeminiAvailable ? '✅ Ready to use!' : 
  '❌ Gemini not available'}`;
  }
  
  getErrorResponse(question, error) {
    return `**❌ GEMINI API ERROR**

Maaf, terjadi kesalahan saat memproses pertanyaan: "${question}"

**Error:** ${error.message}

**Status Sistem:**
• Gemini: ${this.isGeminiAvailable ? '✅ Available' : '❌ Unavailable'}
• Model: ${this.geminiModel || 'None'}
• Initialized: ${this.initialized ? '✅ Yes' : '❌ No'}

**Solusi:**
1. Coba lagi dalam beberapa detik
2. Ketik "test gemini" untuk test ulang
3. Ketik "status" untuk info sistem
4. Refresh halaman jika perlu`;
  }
  
  getFallbackResponse(question) {
    return `**⚠️ GEMINI API NOT AVAILABLE**

Saat ini saya tidak dapat menggunakan Gemini AI untuk menjawab: "${question}"

**Status:**
• Gemini API: ❌ Tidak tersedia
• Model: ${this.geminiModel || 'Tidak ada'}
• Sistem: ${this.initialized ? '✅ Terinisialisasi' : '⏳ Sedang inisialisasi'}

**Yang bisa dilakukan:**
1. Tunggu beberapa detik lalu coba lagi
2. Ketik "init status" untuk cek status inisialisasi
3. Ketik "test gemini" untuk test koneksi
4. Refresh halaman untuk restart sistem

Mohon maaf atas ketidaknyamanannya.`;
  }
  
  // ... (keep other methods: getModelsListResponse, getDetailedStatusResponse, 
  // getDebugInfo, testGeminiResponse, getHelpResponse, clearHistoryResponse, getUptime)
  // SAMA SEPERTI SEBELUMNYA, tidak perlu diubah ...
}

export const spaceAssistant = new SpaceAssistant();