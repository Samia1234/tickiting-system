import { useState } from "react";
import { X, Ticket, Send } from "lucide-react";

export default function TicketForm({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
    category: "Hardware",
    priority: "Medium",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTicket = {
      ...formData,
      id: `TK-${Date.now().toString().slice(-6)}`,
      status: "Open",
      date: new Date().toISOString().slice(0, 10),
    };

    onCreate(newTicket);
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm text-white outline-none transition focus:border-[#10A37F]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-[#424242] bg-[#2F2F2F] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#424242] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#10A37F]/15 p-2 text-[#10A37F]">
              <Ticket size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Create New Ticket
              </h2>
              <p className="text-sm text-[#9B9B9B]">
                Describe your IT support request.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-lg p-2 text-[#B4B4B4] hover:bg-[#424242] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm text-[#F5F5F5]">
              Ticket Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Computer not connecting to Wi-Fi"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#F5F5F5]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the problem..."
              rows={4}
              className={`${inputClass} resize-y`}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#F5F5F5]">
              User Name
            </label>
            <input
              name="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Enter the user's name"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-[#F5F5F5]">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Email</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[#F5F5F5]">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-[#424242] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm text-[#B4B4B4] hover:bg-[#424242] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#10A37F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0D8C6C]"
            >
              <Send size={16} />
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}