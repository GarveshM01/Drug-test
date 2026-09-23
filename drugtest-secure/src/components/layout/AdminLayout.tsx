import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Header } from './Header';
import { 
  BarChart3, 
  Files, 
  Users, 
  ShieldAlert, 
  ArrowLeft,
  Lock
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const adminNav = [
    { label: 'Overview', to: '/admin', icon: BarChart3, exact: true },
    { label: 'All Tests & Chain of Custody', to: '/admin/tests', icon: Files },
    { label: 'Field Officers', to: '/admin/officers', icon: Users },
    { label: 'Cryptographic Audit', to: '/admin/audit', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      <Header isAdminView={true} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Supervisor Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-900/50 p-4 shrink-0">
          <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Supervisor Console</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Zonal Oversight Level 3</p>
            </div>
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </div>

          <nav className="space-y-1 flex-1">
            {adminNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Return to Field Officer View */}
          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-700 bg-slate-800/70 hover:bg-slate-700 text-xs text-slate-300 hover:text-white font-medium transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Officer</span>
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-16">
          {/* Mobile Admin Nav Strip */}
          <div className="md:hidden border-b border-slate-800 bg-slate-900/80 px-4 py-2 flex items-center justify-between overflow-x-auto gap-2">
            {adminNav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `text-xs whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    isActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};
