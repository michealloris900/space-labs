// geminiDirect.js - CLEAN AND WORKING VERSION
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log('🔑 API Key check:', API_KEY ? '✅ Found' : '❌ Missing');

// Cache untuk model info
let availableModelsCache = null;
let modelPerformanceCache = new Map();
let selectedModel = null;

// Helper untuk deteksi cost berdasarkan nama model
const detectModelCost = (modelName) => {
  const name = modelName.toLowerCase();
  
  // Berdasarkan data aktual dari screenshot Anda
  if (name.includes('gemini-2.5-flash')) {
    return { cost: 'very-high', rpd: 6, priority: 10 };
  }
  if (name.includes('gemini-2.5-flash-lite')) {
    return { cost: 'high', rpd: 6, priority: 9 };
  }
  if (name.includes('gemini-3-flash')) {
    return { cost: 'medium', rpd: 3, priority: 3 };
  }
  if (name.includes('gemini-2.0-flash')) {
    return { cost: 'medium', rpd: 4, priority: 4 };
  }
  if (name.includes('gemma')) {
    return { cost: 'very-low', rpd: 1, priority: 1 };
  }
  
  return { cost: 'unknown', rpd: 5, priority: 5 };
};

// Get all available models
const getAllModels = async (forceRefresh = false) => {
  if (availableModelsCache && !forceRefresh) {
    return availableModelsCache;
  }
  
  try {
    console.log('🔍 Getting available models...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    if (!response.ok) {
      console.error('❌ Failed to fetch models:', response.status);
      return [];
    }
    
    const data = await response.json();
    const allModels = data.models || [];
    
    console.log(`✅ Found ${allModels.length} total models`);
    
    // Filter hanya yang support generateContent
    const generateModels = allModels.filter(m => 
      m.supportedGenerationMethods?.includes('generateContent')
    );
    
    console.log(`📊 GenerateContent models: ${generateModels.length}`);
    
    // Log semua model yang tersedia
    console.log('📋 AVAILABLE MODELS:');
    generateModels.forEach((model, index) => {
      const shortName = model.name.replace('models/', '');
      console.log(`${index + 1}. ${shortName}`);
    });
    
    availableModelsCache = generateModels;
    return generateModels;
    
  } catch (error) {
    console.error('❌ Error getting models:', error);
    return [];
  }
};

// Test a single model
const testModel = async (modelName) => {
  try {
    console.log(`🧪 Testing: ${modelName}`);
    
    const startTime = Date.now();
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Ping. Reply "OK".'
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2,
          }
        })
      }
    );
    
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      const costInfo = detectModelCost(modelName);
      
      modelPerformanceCache.set(modelName, {
        success: true,
        responseTime,
        cost: costInfo,
        testedAt: Date.now()
      });
      
      console.log(`✅ ${modelName} works (${responseTime}ms, RPD: ${costInfo.rpd})`);
      
      return {
        success: true,
        model: modelName,
        responseTime,
        cost: costInfo,
        text
      };
      
    } else {
      const errorData = await response.json();
      const errorMsg = errorData.error?.message || `HTTP ${response.status}`;
      
      modelPerformanceCache.set(modelName, {
        success: false,
        error: errorMsg,
        errorCode: response.status,
        testedAt: Date.now()
      });
      
      console.log(`❌ ${modelName}: ${response.status} - ${errorMsg.substring(0, 80)}`);
      
      return {
        success: false,
        model: modelName,
        error: errorMsg,
        status: response.status
      };
    }
    
  } catch (error) {
    console.error(`❌ ${modelName} test error:`, error.message);
    
    modelPerformanceCache.set(modelName, {
      success: false,
      error: error.message,
      testedAt: Date.now()
    });
    
    return {
      success: false,
      model: modelName,
      error: error.message
    };
  }
};

// Find best working model
export const findBestModel = async () => {
  console.log('🎯 Finding best working model...');
  
  const models = await getAllModels();
  
  if (models.length === 0) {
    throw new Error('No models available');
  }
  
  const modelNames = models.map(m => m.name.replace('models/', ''));
  
  // Priority list berdasarkan yang mungkin work
  const priorityModels = [
    'gemini-2.5-flash-lite',  // Kita tahu ini work
    'gemini-3-flash',         // Coba dulu
    'gemini-2.0-flash-exp',   // Mungkin ada
    'gemini-2.5-flash-thinking-exp', // Mungkin ada
    'gemini-2.5-pro-exp',     // Mungkin ada
  ];
  
  // Test priority models first
  for (const modelName of priorityModels) {
    if (modelNames.includes(modelName)) {
      const result = await testModel(modelName);
      
      if (result.success) {
        selectedModel = modelName;
        console.log(`🎉 Selected model: ${selectedModel}`);
        return selectedModel;
      }
    }
  }
  
  // Jika tidak ada yang work dari priority, coba semua
  console.log('🔄 Testing all models...');
  
  for (const modelName of modelNames) {
    // Skip jika sudah dicoba di priority
    if (priorityModels.includes(modelName)) continue;
    
    const result = await testModel(modelName);
    
    if (result.success) {
      selectedModel = modelName;
      console.log(`🎉 Found working model: ${selectedModel}`);
      return selectedModel;
    }
  }
  
  throw new Error('No working models found');
};

// Main ask function
export const askGeminiDirect = async (question) => {
  console.log('🔍 Question:', question.substring(0, 50));
  
  if (!API_KEY) {
    throw new Error('API Key tidak dikonfigurasi');
  }
  
  try {
    // Get or find model
    let modelToUse = selectedModel;
    
    if (!modelToUse) {
      modelToUse = await findBestModel();
    }
    
    console.log(`🚀 Using model: ${modelToUse}`);
    
    const prompt = `Anda adalah SpaceEduls Assistant, asisten astronomi.
Jawab pertanyaan ini dengan akurat dan jelas dalam bahasa Indonesia:

${question}

Berikan jawaban yang informatif.`;
    
    const startTime = Date.now();
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
            topP: 0.8,
            topK: 40,
          }
        })
      }
    );
    
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.error?.message || `HTTP ${response.status}`;
      
      // Jika quota habis, reset model
      if (response.status === 429 || errorMsg.includes('quota')) {
        modelPerformanceCache.set(modelToUse, {
          success: false,
          error: errorMsg,
          testedAt: Date.now()
        });
        selectedModel = null;
        throw new Error(`Model ${modelToUse}: Quota habis. Coba lagi nanti.`);
      }
      
      throw new Error(`Model ${modelToUse}: ${errorMsg}`);
    }
    
    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Response format tidak valid');
    }
    
    const answer = data.candidates[0].content.parts[0].text;
    
    console.log(`✅ Success! Model: ${modelToUse}, Time: ${responseTime}ms`);
    
    return answer;
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
    throw error;
  }
};

// Test connection
export const testGeminiConnection = async () => {
  try {
    console.log('🔧 Testing connection...');
    
    const models = await getAllModels();
    
    if (models.length === 0) {
      return { 
        success: false, 
        message: 'No models available' 
      };
    }
    
    // Try to find a working model
    const model = await findBestModel();
    const testResult = await testModel(model);
    
    if (testResult.success) {
      const costInfo = detectModelCost(model);
      
      return { 
        success: true,
        model: model,
        message: `Connected to ${model}`,
        cost: costInfo,
        availableModels: models.length,
        estimatedRPD: costInfo.rpd
      };
    }
    
    return { 
      success: false, 
      model: null,
      message: 'No working models found',
      availableModels: models.length
    };
    
  } catch (error) {
    console.error('❌ Connection test error:', error);
    return { 
      success: false, 
      model: null,
      message: error.message
    };
  }
};

// List all models
export const listAllModels = async () => {
  try {
    const models = await getAllModels();
    
    return models.map(m => ({
      name: m.name,
      displayName: m.name.replace('models/', ''),
      description: m.description || '',
      supportedMethods: m.supportedGenerationMethods || [],
      estimatedCost: detectModelCost(m.name)
    }));
    
  } catch (error) {
    console.error('❌ Error listing models:', error);
    return [];
  }
};

// Get model statistics
export const getModelStats = () => {
  const stats = {
    totalTested: modelPerformanceCache.size,
    workingModels: 0,
    failedModels: 0,
    cheapestWorking: null,
  };
  
  let cheapestCost = Infinity;
  
  for (const [model, data] of modelPerformanceCache.entries()) {
    if (data.success) {
      stats.workingModels++;
      if (data.cost && data.cost.priority < cheapestCost) {
        cheapestCost = data.cost.priority;
        stats.cheapestWorking = {
          model,
          cost: data.cost,
          responseTime: data.responseTime
        };
      }
    } else {
      stats.failedModels++;
    }
  }
  
  return stats;
};

// Debug function untuk lihat semua model
export const debugModels = async () => {
  const models = await getAllModels(true);
  
  let result = `**🔍 DEBUG: ${models.length} MODELS AVAILABLE**\n\n`;
  
  // Group by type
  const groups = {};
  
  models.forEach(model => {
    const name = model.name.replace('models/', '');
    const type = name.split('-')[0] || 'other';
    
    if (!groups[type]) groups[type] = [];
    groups[type].push(name);
  });
  
  for (const [type, modelList] of Object.entries(groups)) {
    result += `**${type.toUpperCase()}** (${modelList.length}):\n`;
    modelList.slice(0, 10).forEach(model => {
      result += `• ${model}\n`;
    });
    if (modelList.length > 10) {
      result += `  ... and ${modelList.length - 10} more\n`;
    }
    result += '\n';
  }
  
  return result;
};