// spaceAssistant.js - SIMPLIFIED
import { 
    askGeminiDirect, 
    testGeminiConnection, 
    listAllModels,
    getModelStats,
    debugModels,
    findBestModel 
  } from './geminiDirect';
  
  class SpaceAssistant {
    constructor() {
      this.conversationHistory = [];
      this.maxHistory = 10;
      this.isGeminiAvailable = false;
      this.geminiModel = null;
      this.availableModels = [];
      this.startTime = Date.now();
      this.initialized = false;
      this.initializationPromise = null;
      
      console.log('🚀 Space Assistant initializing...');
      
      this.initializationPromise = this.initializeGemini();
    }
    
    async initializeGemini() {
      try {
        console.log('🔧 Testing connection...');
        
        const testResult = await testGeminiConnection();
        this.isGeminiAvailable = testResult.success;
        this.geminiModel = testResult.model;
        
        if (testResult.success) {
          console.log('✅ API READY');
          console.log(`📊 Model: ${this.geminiModel}`);
          console.log(`💰 Estimated RPD: ${testResult.estimatedRPD || '?'}`);
          
          const models = await listAllModels();
          this.availableModels = models.slice(0, 10);
          
        } else {
          console.warn('⚠️ API UNAVAILABLE');
          console.warn(`📊 Reason: ${testResult.message}`);
        }
        
        this.initialized = true;
        console.log('🏁 Space Assistant initialized');
        
      } catch (error) {
        console.error('❌ Initialization error:', error);
        this.isGeminiAvailable = false;
        this.initialized = true;
      }
    }
    
    async waitForInitialization() {
      if (!this.initialized && this.initializationPromise) {
        console.log('⏳ Waiting for initialization...');
        await this.initializationPromise;
      }
      return this.initialized;
    }
    
    getGeminiStatus() { return this.isGeminiAvailable; }
    getGeminiModel() { return this.geminiModel; }
    getAvailableModelsCount() { return this.availableModels.length; }
    
    async ask(question) {
      console.log(`📝 Question: "${question}"`);
      
      await this.waitForInitialization();
      
      console.log(`📊 Using model: ${this.geminiModel || 'none'}`);
      
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
      
      const lowerQ = question.toLowerCase().trim();
      
      // Special commands
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
      
      if (lowerQ === 'debug' || lowerQ === 'model stats') {
        return this.getModelStatsResponse();
      }
      
      if (lowerQ === 'debug models') {
        return await debugModels();
      }
      
      if (lowerQ === 'scan models') {
        return await this.scanModelsResponse();
      }
      
      if (lowerQ === 'init status') {
        return this.getInitStatus();
      }
      
      // Try API if available
      if (this.isGeminiAvailable) {
        try {
          console.log(`🎯 Asking ${this.geminiModel}...`);
          const startTime = Date.now();
          
          const answer = await askGeminiDirect(question);
          
          const endTime = Date.now();
          console.log(`✅ Success in ${endTime - startTime}ms`);
          
          if (this.conversationHistory.length > 0) {
            this.conversationHistory[this.conversationHistory.length - 1].source = 'gemini';
            this.conversationHistory[this.conversationHistory.length - 1].responseTime = endTime - startTime;
          }
          
          return answer;
          
        } catch (error) {
          console.error('❌ API failed:', error.message);
          
          this.isGeminiAvailable = false;
          this.geminiModel = null;
          
          if (this.conversationHistory.length > 0) {
            this.conversationHistory[this.conversationHistory.length - 1].source = 'api_error';
            this.conversationHistory[this.conversationHistory.length - 1].error = error.message;
          }
          
          return this.getErrorResponse(question, error);
        }
      }
      
      // API not available
      console.log('⚠️ No API available');
      
      if (this.conversationHistory.length > 0) {
        this.conversationHistory[this.conversationHistory.length - 1].source = 'fallback';
      }
      
      return this.getFallbackResponse(question);
    }
    
    async scanModelsResponse() {
      try {
        console.log('🔄 Scanning for models...');
        const model = await findBestModel();
        this.isGeminiAvailable = true;
        this.geminiModel = model;
        
        return `**🔍 SCAN COMPLETE**\n\nFound: ✅ ${model}\n\nUse "model stats" for details.`;
      } catch (error) {
        this.isGeminiAvailable = false;
        return `**❌ SCAN FAILED**\n\n${error.message}`;
      }
    }
    
    getModelStatsResponse() {
      const stats = getModelStats();
      
      let response = '**📈 MODEL STATISTICS**\n\n';
      response += `• Total Tested: ${stats.totalTested}\n`;
      response += `• Working Models: ${stats.workingModels}\n`;
      response += `• Failed Models: ${stats.failedModels}\n`;
      
      if (stats.cheapestWorking) {
        response += `\n**💰 Best Model:**\n`;
        response += `• ${stats.cheapestWorking.model}\n`;
        response += `• RPD: ${stats.cheapestWorking.cost.rpd}\n`;
        response += `• Cost: ${stats.cheapestWorking.cost.cost}\n`;
      }
      
      response += `\n**Current Model:** ${this.geminiModel || 'None'}`;
      
      return response;
    }
    
    getInitStatus() {
      return `**🔧 INIT STATUS**\n\n• Initialized: ${this.initialized ? '✅ Yes' : '⏳ No'}\n• API Available: ${this.isGeminiAvailable ? '✅ Yes' : '❌ No'}\n• Model: ${this.geminiModel || 'None'}\n• Models: ${this.availableModels.length}`;
    }
    
    getErrorResponse(question, error) {
      return `**❌ ERROR**\n\nQuestion: "${question}"\n\nError: ${error.message}\n\nStatus: ${this.isGeminiAvailable ? '✅ Available' : '❌ Unavailable'}`;
    }
    
    getFallbackResponse(question) {
      return `**⚠️ API UNAVAILABLE**\n\nCannot answer: "${question}"\n\nStatus: API ❌ Unavailable\nModel: ${this.geminiModel || 'None'}`;
    }
    
    async getModelsListResponse() {
      try {
        const models = await listAllModels();
        let response = '**📊 AVAILABLE MODELS**\n\n';
        
        models.slice(0, 10).forEach((model, index) => {
          response += `${index + 1}. **${model.displayName}**\n`;
        });
        
        if (models.length > 10) {
          response += `\n... and ${models.length - 10} more`;
        }
        
        return response;
      } catch (error) {
        return 'Cannot get models list.';
      }
    }
    
    async testGeminiResponse() {
      try {
        const result = await testGeminiConnection();
        this.isGeminiAvailable = result.success;
        this.geminiModel = result.model;
        
        if (result.success) {
          return `**✅ TEST PASSED**\n\nModel: ${result.model}\nRPD: ${result.estimatedRPD || '?'}\nAvailable Models: ${result.availableModels}`;
        } else {
          return `**❌ TEST FAILED**\n\n${result.message}\nAvailable Models: ${result.availableModels || 0}`;
        }
      } catch (error) {
        return `**❌ TEST ERROR**\n\n${error.message}`;
      }
    }
    
    getDetailedStatusResponse() {
      return `**📊 STATUS**\n\n• API: ${this.isGeminiAvailable ? '✅ Available' : '❌ Unavailable'}\n• Model: ${this.geminiModel || 'None'}\n• Models: ${this.availableModels.length}\n• History: ${this.conversationHistory.length} messages`;
    }
    
    getHelpResponse() {
      return `**🆘 HELP**\n\n**Commands:**\n• status - System status\n• test api - Test connection\n• models - List models\n• model stats - Model statistics\n• debug models - Debug info\n• scan models - Rescan models\n• reset - Reset chat\n• init status - Init status`;
    }
    
    clearHistoryResponse() {
      this.conversationHistory = [];
      return `**🔄 CHAT RESET**\n\nChat cleared.\n\nCurrent model: ${this.geminiModel || 'None'}`;
    }
  }
  
  export const spaceAssistant = new SpaceAssistant();