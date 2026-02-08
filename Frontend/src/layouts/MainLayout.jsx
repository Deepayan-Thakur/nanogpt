import { Outlet, NavLink } from 'react-router-dom';

export default function MainLayout() {
  
  // Helper to apply classes based on active state
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'
    }`;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-900 text-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-tight text-blue-500">
            NanoGPT <span className="text-xs text-gray-500 font-normal">v0.1</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/" className={navLinkClasses} end>
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink to="/train" className={navLinkClasses}>
            <span className="font-medium">Training</span>
          </NavLink>
          
          <NavLink to="/logs" className={navLinkClasses}>
            <span className="font-medium">System Logs</span>
          </NavLink>
        </nav>

        {/* Footer / User Profile Placeholder */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
              DT
            </div>
            <div className="text-sm">
              <p className="text-gray-200">Deepayan T.</p>
              <p className="text-gray-500 text-xs">Engineer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-950 relative">
        <div className="max-w-7xl mx-auto p-8">
          {/* The Page Content Renders Here */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}