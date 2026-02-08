import { useEffect, useState, useRef } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [isTraining, setIsTraining] = useState(true); // Simulator state
  const bottomRef = useRef(null);

  // SIMULATION: Auto-generate logs to test the UI
  // In production, you would replace this with a setInterval fetching /api/logs
  useEffect(() => {
    if (!isTraining) return;

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `[${timestamp}] INFO: Epoch ${Math.floor(Math.random() * 10)} | Loss: ${(Math.random()).toFixed(4)}`;
      
      setLogs((prev) => [...prev, newLog]);
    }, 800); // Add a log every 800ms

    return () => clearInterval(interval);
  }, [isTraining]);

  // AUTO-SCROLL: Whenever 'logs' change, scroll to the bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      
      {/* Header with Control Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">System Logs</h2>
          <p className="text-gray-400">Real-time training output stream.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setLogs([])}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={() => setIsTraining(!isTraining)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isTraining 
                ? 'bg-red-900/50 text-red-400 hover:bg-red-900/80' 
                : 'bg-green-900/50 text-green-400 hover:bg-green-900/80'
            }`}
          >
            {isTraining ? 'Stop Stream' : 'Resume Stream'}
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="flex-1 bg-black rounded-xl border border-gray-800 p-4 overflow-hidden shadow-2xl font-mono text-sm relative">
        
        {/* Scrollable Area */}
        <div className="h-full overflow-y-auto pr-2 space-y-1 custom-scrollbar">
          {logs.length === 0 && (
            <div className="text-gray-600 italic">Waiting for training to start...</div>
          )}
          
          {logs.map((log, i) => (
            <div key={i} className="text-gray-300 break-all hover:bg-gray-900/50 px-1 rounded">
              <span className="text-blue-500 select-none mr-2">$</span>
              {log}
            </div>
          ))}
          
          {/* Invisible element to scroll to */}
          <div ref={bottomRef} />
        </div>

      </div>
    </div>
  );
}