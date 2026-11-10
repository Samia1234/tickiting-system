export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-[#424242] bg-emerald-500/5 
       p-5 
    transition-colors duration-200 hover:border-[#555555]
    
    
    ">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#B4B4B4]">{title}</p>

        <div className={`rounded-lg p-2 ${color}`}>
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-semibold text-[#F5F5F5]">
        {value}
      </p>
    </div>
  );
}