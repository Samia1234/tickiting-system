
import {
  LayoutDashboard,
  Ticket,
  Users,
  ChartColumn,
  Settings,
  Headset,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Tickets", path: "/tickets", icon: Ticket },
  { label: "Users", path: "/users", icon: Users },
  { label: "Reports", path: "/reports", icon: ChartColumn },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#111827] p-5 text-slate-100">

        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="rounded-xl bg-emerald-500 p-2.5 text-white">
            <Headset size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">SupportDesk</h1>
            <p className="text-xs text-slate-400">IT Management</p>
          </div>
        </div>

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} />
                    <span>{item.label}</span>
                    {isActive && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 pt-5">
          <div className="mb-4 rounded-xl border border-slate-700/50 bg-[#172338] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Headset size={17} className="text-emerald-400" />
              <p className="text-sm font-semibold text-white">Support Center</p>
            </div>
            <p className="text-xs leading-5 text-slate-400">
              Manage your IT support requests and track their progress.
            </p>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-slate-800 bg-[#111827] px-1 py-3 md:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] ${
                  isActive ? "text-emerald-400" : "text-slate-400"
                }`
              }
            >
              <Icon size={21} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
