import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FlaskConical, 
  History, 
  UserCircle,
  Plus,
  LogOut
} from 'lucide-react';

export const OfficerLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'New Test', to: '/new-test', icon: FlaskConical, isAction: true },
    { label: 'History', to: '/history', icon: History },
    { label: 'Profile', to: '/profile', icon: UserCircle }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Application Bar */}
      <Header />

      {/* Main Shell */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-slate-900/40 p-4 shrink-0">
          
          {/* New Test Primary Button */}
          <div className="mb-6">
            <NavLink
              to="/new-test"
              className={({ isActive }) =>
                `w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sky-500/20'
                    : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25 active:scale-[0.98]'
                }`
              }
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Start New Field Test</span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5 flex-1">
            <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Field Operations
            </div>

            {navItems.filter(item => !item.isAction).map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-600/15 text-sky-400 border border-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Field Kit Quick Status / Device Telemetry */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-400 space-y-2 mt-auto">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
              <span>Field Device</span>
              <span className="text-emerald-400 font-mono">ONLINE</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>GPS: <span className="text-slate-200">23.2599° N, 77.4126° E</span></div>
              <div>Firmware: <span className="text-slate-200">CV-CALIB-v2.4</span></div>
              <div>Battery: <span className="text-emerald-400">92% Optimal</span></div>
            </div>
          </div>

          {/* Quick Sign Out Action */}
          <div className="pt-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-800 hover:border-rose-900/60 bg-slate-900/40 hover:bg-rose-950/20 text-xs text-slate-400 hover:text-rose-300 font-medium transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Content Outlet */}
        <main className="flex-1 w-full min-w-0 pb-24 md:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Thumb-Friendly, Operational) */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 border-t border-slate-800/90 backdrop-blur-lg px-2 py-1.5"
      >
        <div className="grid grid-cols-4 items-center">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to === '/new-test' && location.pathname.startsWith('/new-test'));
            
            if (item.isAction) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="flex flex-col items-center justify-center -mt-5"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-950/60 border-2 border-slate-950 active:scale-95 transition-transform">
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-semibold text-sky-400 mt-1">New Test</span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
                  isActive ? 'text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
