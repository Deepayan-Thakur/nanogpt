export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400 mt-2">Overview of your NanoGPT instances and performance metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
          <p className="text-sm font-medium text-gray-500">Model Status</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">Ready</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
          <p className="text-sm font-medium text-gray-500">Total Parameters</p>
          <p className="text-2xl font-bold text-white mt-2">124M</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
          <p className="text-sm font-medium text-gray-500">Last Training Loss</p>
          <p className="text-2xl font-bold text-white mt-2">0.3421</p>
        </div>
      </div>
    </div>
  );
}