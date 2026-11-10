import { Search, Bell, Plus } from "lucide-react";

export default function Header() {
  return (
    
    <header className="
  flex flex-col gap-4 border-b 
      border-slate-800/80 
      bg-[#0B1120]/95 px-6 py-6 sm:flex-row sm:items-center sm:justify-between
    
    ">
      <div>
        <h1 className="text-2xl font-semibold text-[#F5F5F5]">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#9B9B9B]">
          Welcome back! Here is your support overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#424242] bg-[#2F2F2F] px-3 py-2">
          <Search size={18} className="text-[#9B9B9B]" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#8E8E8E] sm:w-32"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg border border-[#424242] bg-[#2F2F2F] p-2.5 text-[#B4B4B4] transition hover:text-white"
        >
          <Bell size={18} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-[#10A37F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0D8C6C]"
        >
          <Plus size={18} />
          <span>New Ticket</span>
        </button>
      </div>
    </header>
  );
}