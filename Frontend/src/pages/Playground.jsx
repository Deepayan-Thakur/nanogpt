import { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';

export default function Playground() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: 'NanoGPT v0.1 initialized. Ready for inputs.' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      // REAL API CALL (Commented out for now)
      // const response = await api.post('/generate', { prompt: input });
      // const text = response.text;

      // DEMO MODE: Simulate Network Delay & Streaming
      await new Promise(r => setTimeout(r, 600)); // Network latency
      
      const fakeResponse = "This is a simulated response from NanoGPT. Once the backend is connected, I will generate text based on your Shakespeare or OpenWebText training data.";
      let currentText = "";
      
      // Create a placeholder for the assistant's message
      setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

      // Simulate character-by-character streaming
      for (let i = 0; i < fakeResponse.length; i++) {
        await new Promise(r => setTimeout(r, 30)); // Typing speed
        currentText += fakeResponse[i];
        
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].content = currentText;
          return newHistory;
        });
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'system', content: `Error: ${error.message}` }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto">
      
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-white">Playground</h2>
        <p className="text-gray-400">Test your model's generation capabilities.</p>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-y-auto mb-4 space-y-4 custom-scrollbar shadow-inner">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : msg.role === 'system'
                  ? 'bg-gray-800/50 text-gray-500 text-xs italic border border-gray-700'
                  : 'bg-gray-800 text-gray-200 border border-gray-700'
              }`}
            >
              {msg.role === 'assistant' && <span className="text-blue-400 font-bold text-xs block mb-1">NanoGPT</span>}
              {msg.content}
              {/* Cursor Blinking Effect during generation */}
              {msg.role === 'assistant' && isGenerating && idx === messages.length - 1 && (
                 <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse align-middle"></span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 p-2 rounded-xl border border-gray-800 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message to the model..."
          className="w-full bg-transparent text-gray-100 p-3 max-h-32 min-h-[56px] focus:outline-none resize-none custom-scrollbar"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isGenerating}
          className={`p-3 rounded-lg transition-all ${
            input.trim() && !isGenerating
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
          }`}
        >
          {/* Send Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
}