import { useState, useRef, useEffect } from 'react';
import { spaceAssistant } from '../utils/spaceAssistant';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 'init-' + Date.now(), 
      text: 'Halo! Saya SpaceEdu Assistant 🤖\n\nMenginisialisasi sistem...', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [apiStatus, setApiStatus] = useState('Inisialisasi...');
  const [suggestedQuestions] = useState([
    'Apa itu lubang hitam?',
    'NASA itu apa?',
    'Berapa planet?',
    'James Webb?',
    'Asal bintang?'
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    const checkInit = async () => {
      if (hasInitialized.current) return;
      hasInitialized.current = true;

      await spaceAssistant.waitForInitialization();
      setInitializing(false);
      updateApiStatus();
      
      setTimeout(() => inputRef.current?.focus(), 100);
      
      const readyMessage = {
        id: 'ready-' + Date.now(),
        text: spaceAssistant.isGeminiAvailable 
          ? `✅ **Sistem siap!**\n\nTerhubung ke: ${spaceAssistant.geminiModel}\n\nAda yang ingin ditanyakan tentang astronomi? 🚀`
          : `⚠️ **Mode Offline**\n\nCek koneksi internet atau API Key Anda.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, readyMessage]);
    };
    
    checkInit();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150); 
    return () => clearTimeout(timer);
  }, [messages]);

  const updateApiStatus = () => {
    const status = spaceAssistant.isGeminiAvailable 
      ? `✅ Gemini ${spaceAssistant.geminiModel}`
      : '⚠️ Offline';
    setApiStatus(status);
  };

  const handleSend = async () => {
    if (!input.trim() || loading || initializing) return;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMessage = {
      id: 'user-' + Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const response = await spaceAssistant.ask(userMessage);
      const botMessage = {
        id: 'bot-' + Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      updateApiStatus();
    } catch (error) {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        text: `⚠️ **Error:** ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (question) => {
    if (initializing) return;
    setInput(question);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    spaceAssistant.clearHistoryResponse();
    setMessages([{ 
      id: 'reset-' + Date.now(), 
      text: "🔄 Chat dibersihkan. Apa lagi yang ingin Anda ketahui?", 
      sender: 'bot', 
      timestamp: new Date() 
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans flex flex-col items-center justify-center p-4">
      
      {/* Container Utama - Dipersempit ke max-w-2xl */}
      <div className="w-full max-w-2xl">
        
        {/* Header Ringkas */}
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SpaceEdu Assistant
          </h1>
          <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-[10px] text-gray-400">
            {initializing ? '⏳ Memuat...' : apiStatus}
          </div>
        </div>

        {/* Kotak Chat */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
          
          {/* Header Bar */}
          <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-gray-800/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-lg">🤖</div>
              <div>
                <p className="text-xs font-bold">SpaceEdu AI</p>
                <p className="text-[9px] text-green-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-ping"></span> Online
                </p>
              </div>
            </div>
            <button onClick={handleClearChat} className="text-[10px] text-gray-400 hover:text-red-400 transition-colors">
              Reset Chat
            </button>
          </div>

          {/* Area Pesan - Tinggi diatur agar lebih ramping */}
          <div className="h-[380px] md:h-[450px] overflow-y-auto p-4 space-y-4 bg-gray-950/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                  <div className="text-[8px] mt-1 opacity-50 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-3 py-2 rounded-xl rounded-tl-none animate-pulse text-[10px] text-gray-400">
                  AI sedang berpikir...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Bar */}
          {!initializing && (
            <div className="px-3 py-2 border-t border-gray-800 bg-gray-900/50">
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button key={i} onClick={() => handleSuggestionClick(q)} 
                    className="text-[9px] bg-gray-800 hover:bg-gray-700 border border-gray-700 px-2 py-1 rounded-full text-gray-300 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Tanyakan sesuatu..."
                className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-all"
                disabled={loading || initializing}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading || initializing}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 text-[9px] text-gray-600 tracking-widest uppercase">
          Laboratorium SSD Drive D • SpaceEdu v2.0
        </p>

      </div>
    </div>
  );
};

export default Chatbot;