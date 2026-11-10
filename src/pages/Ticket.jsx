import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import {
  Search,
  Plus,
  SlidersHorizontal,
  CalendarDays,
  Ticket as TicketIcon,
  Pencil,
  Trash2,
  X,
  Eye,
} from "lucide-react";
export const initialTickets = [
  {
    id: "TK-1001",
    title: "Computer not connecting to network",
    description: "The computer cannot connect to the office network.",
    user: "Ahmed Ali",
    category: "Network",
    priority: "High",
    status: "Open",
    date: "2026-10-18",
  },
  {
    id: "TK-1002",
    title: "Email access problem",
    description: "Unable to access the company email account.",
    user: "Sara Mohamed",
    category: "Email",
    priority: "Medium",
    status: "In Progress",
    date: "2026-10-17",
  },
  {
    id: "TK-1003",
    title: "Printer not working",
    description: "The printer does not respond to print commands.",
    user: "Omar Hassan",
    category: "Hardware",
    priority: "Low",
    status: "Resolved",
    date: "2026-10-16",
  },
  {
    id: "TK-1004",
    title: "Software installation request",
    description: "A request to install required software.",
    user: "Mona Khalid",
    category: "Software",
    priority: "High",
    status: "Open",
    date: "2026-10-15",
  },
  {
    id: "TK-1005",
    title: "Computer running slowly",
    description: "The computer has become slow during daily use.",
    user: "Youssef Karim",
    category: "Hardware",
    priority: "Medium",
    status: "In Progress",
    date: "2026-10-14",
  },
];
// Badge component
function Badge({ value, type }) {
  const colors = {
    priority: {
      High: "border border-red-500/20 bg-red-500/10 text-red-400",
      Medium:
        "border border-amber-500/20 bg-amber-500/10 text-amber-400",
      Low: "border border-sky-500/20 bg-sky-500/10 text-sky-400",
    },
    status: {
      Open: "border border-blue-500/20 bg-blue-500/10 text-blue-400",
      "In Progress":
        "border border-amber-500/20 bg-amber-500/10 text-amber-400",
      Resolved:
        "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    },
  };

  const badgeColor =
    colors[type]?.[value] ||
    "border border-slate-500/20 bg-slate-500/10 text-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${badgeColor}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
// Summary Card
function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/10">

      {/* Decorative background */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/5 
      blur-2xl transition-all duration-300 group-hover:bg-emerald-500/10" />

      <div className="relative flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Updated with your tickets
          </p>
        </div>

        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/10 p-3 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
          <Icon size={23} strokeWidth={1.8} />
        </div>

      </div>
    </div>
  );
}

export default function Tickets({
  tickets,
  setTickets,
}) {
  const navigate=useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [editingTicket, setEditingTicket] = useState(null);
// Ticket selected for viewing
const [viewingTicket, setViewingTicket] = useState(null);
// Edit form data
const [editForm, setEditForm] = useState({
  title: "",
  description: "",
  user: "",
  category: "Hardware",
  priority: "Medium",
  status: "Open",
});

  // Search and filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priorityFilter, setPriorityFilter] = useState("All");

// Pagination
const [currentPage, setCurrentPage] = useState(1);
const ticketsPerPage = 5;
  // Form visibility
  const [showForm, setShowForm] = useState(false);

  // Create a new ticket
  const handleCreateTicket = (newTicket) => {
  setTickets((previousTickets) => [
    newTicket,
    ...previousTickets,
  ]);

  setShowForm(false);

  setSuccessMessage("Ticket created successfully!");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};

// Open the edit modal
const handleEdit = (ticket) => {
  setEditingTicket(ticket);

  setEditForm({
    title: ticket.title,
    description: ticket.description || "",
    user: ticket.user,
    category: ticket.category,
    priority: ticket.priority,
    status: ticket.status,
  });
};

// Update form fields
const handleEditChange = (event) => {
  const { name, value } = event.target;

  setEditForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

// Save edited ticket
const handleSaveEdit = (event) => {
  event.preventDefault();

  if (!editForm.title.trim() || !editForm.user.trim()) {
    alert("Please enter a ticket title and requester name.");
    return;
  }

  setTickets((previousTickets) =>
    previousTickets.map((ticket) =>
      ticket.id === editingTicket.id
        ? {
            ...ticket,
            ...editForm,
            title: editForm.title.trim(),
            user: editForm.user.trim(),
            description: editForm.description.trim(),
          }
        : ticket
    )
  );
setSuccessMessage("Ticket updated successfully!");

setTimeout(() => {
  setSuccessMessage("");
}, 3000);
  setEditingTicket(null);
};

// Delete ticket
// Delete ticket
const handleDelete = (ticket) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ticket ${ticket.id}?`
  );

  if (!confirmed) return;

  setTickets((previousTickets) =>
    previousTickets.filter(
      (item) => item.id !== ticket.id
    )
  );

  setSuccessMessage("Ticket deleted successfully!");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};
  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      ticket.title.toLowerCase().includes(searchValue) ||
      ticket.user.toLowerCase().includes(searchValue) ||
      ticket.id.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
  // Sort filtered tickets
const sortedTickets = [...filteredTickets].sort((a, b) => {
  if (sortBy === "newest") {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  if (sortBy === "oldest") {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }

  if (sortBy === "priority") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    return priorityOrder[b.priority] - priorityOrder[a.priority];
  }

  if (sortBy === "title") {
    return a.title.localeCompare(b.title);
  }

  return 0;
});
// Pagination calculations
const totalPages = Math.ceil(
  filteredTickets.length / ticketsPerPage
);

const indexOfLastTicket = currentPage * ticketsPerPage;

const indexOfFirstTicket =
  indexOfLastTicket - ticketsPerPage;

const currentTickets = sortedTickets.slice(
  indexOfFirstTicket,
  indexOfLastTicket
);
  // Calculate summary
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
// Reset pagination when filters change
useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, priorityFilter]);

// Keep the current page valid
useEffect(() => {
  if (totalPages === 0) {
    setCurrentPage(1);
  } else if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
}, [currentPage, totalPages]);
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
{/* Success Message */}
{successMessage && (
  <div className="fixed right-5 top-5 z-[100] flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-[#1A2E28] px-5 py-4 text-sm text-emerald-400 shadow-xl">
    <span className="text-lg">✓</span>
    <p>{successMessage}</p>
  </div>
)}
      {/* Header */}
      <header className="flex flex-col gap-4 border-b 
      border-slate-800/80 
      bg-[#0B1120]/95 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Tickets
          </h1>

          <p className="mt-1 text-sm text-[#9B9B9B]">
            Manage and track all IT support requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-500/10 active:translate-y-0"
        >
        <Plus size={18} />
New Ticket
        </button>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">

        {/* Summary Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Tickets"
            value={totalTickets}
            icon={TicketIcon}
          />

          <SummaryCard
            title="Open Tickets"
            value={openTickets}
            icon={Search}
          />

          <SummaryCard
            title="In Progress"
            value={inProgressTickets}
            icon={SlidersHorizontal}
          />

          <SummaryCard
            title="Resolved Tickets"
            value={resolvedTickets}
            icon={CalendarDays}
          />
        </section>

        {/* Search and Filters */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg shadow-black/10 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal
              size={19}
              className="text-[#10A37F]"
            />

            <h2 className="font-medium">
              Search and Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 transition-all duration-200 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/10">
              <Search
                size={18}
                className="text-[#9B9B9B]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search tickets..."
                aria-label="Search tickets"
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              aria-label="Filter by status"
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none transition-all hover:border-slate-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10"
            >
              <option value="All">All statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              aria-label="Filter by priority"
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none transition-all hover:border-slate-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10"
               >
              <option value="All">All priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
{/* Sort By */}
<select
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
  aria-label="Sort tickets"
  className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 outline-none transition-all hover:border-slate-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10"
>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
  <option value="priority">Priority: High to Low</option>
  <option value="title">Title: A–Z</option>
</select>
          </div>
        </section>

        {/* Tickets Table */}
        <section className="overflow-hidden rounded-xl border border-[#424242] bg-slate-900/60">

          <div className="flex items-center justify-between border-b border-[#424242] p-5">
            <div>
              <h2 className="font-semibold">
                All Tickets
              </h2>

              <p className="mt-1 text-sm text-[#9B9B9B]">
                {filteredTickets.length} tickets found
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">

              <thead className="text-[#9B9B9B] border-b border-t">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Ticket ID
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Title
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Requester
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Priority
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Created
                  </th>
                  <th className="px-5 py-4 font-medium">
  Actions
</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#424242]">

                {currentTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="transition-colors hover:bg-[#363636]"
                  >
                    {/* Ticket ID */}
                    <td className="px-5 py-4 font-medium text-[#10A37F]">
                      {ticket.id}
                    </td>

                    {/* Title and Category */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="text-[#F5F5F5]">
                        {ticket.title}
                      </p>

                      <p className="mt-1 text-xs text-[#9B9B9B]">
                        {ticket.category}
                      </p>
                    </td>

                    {/* Requester */}
                    <td className="px-5 py-4 text-[#B4B4B4]">
                      {ticket.user}
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <Badge
                        value={ticket.priority}
                        type="priority"
                      />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <Badge
                          value={ticket.status}
                          type="status"
                        />

                        <select
                          aria-label={`Change status for ${ticket.id}`}
                          value={ticket.status}
                          onChange={(event) =>
                            updateStatus(
                              ticket.id,
                              event.target.value
                            )
                          }
                          className="max-w-36 rounded-lg border border-[#424242] bg-[#212121] px-2 py-2 text-xs text-[#F5F5F5] outline-none focus:border-[#10A37F]"
                        >
                          <option value="Open">
                            Open
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Resolved">
                            Resolved
                          </option>
                        </select>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-[#9B9B9B]">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={15} />
                        {ticket.date}
                      </span>
                    </td>
                    {/* Actions */}

<td className="px-5 py-4">
  <div className="flex items-center gap-2">
<button
  onClick={() =>navigate(`/tickets/${ticket.id}`)}
  className="text-emerald-400 hover:text-emerald-300"
>
  View Details
</button>
    {/* View */}
    <button
      type="button"
      onClick={() => setViewingTicket(ticket)}
      title="View ticket"
      aria-label={`View ${ticket.id}`}
      className="rounded-lg p-2 text-sky-400 transition hover:bg-sky-400/10"
    >
      <Eye size={17} />
    </button>

    {/* Edit */}
    <button
      type="button"
      onClick={() => handleEdit(ticket)}
      title="Edit ticket"
      aria-label={`Edit ${ticket.id}`}
      className="rounded-lg p-2 text-amber-400 transition hover:bg-amber-400/10"
    >
      <Pencil size={17} />
    </button>

    {/* Delete */}
    <button
      type="button"
      onClick={() => handleDelete(ticket)}
      title="Delete ticket"
      aria-label={`Delete ${ticket.id}`}
      className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
    >
      <Trash2 size={17} />
    </button>

  </div>
</td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
{/* Pagination */}
{filteredTickets.length > 0 && (
  <div className="flex flex-col items-center justify-between gap-4 border-t border-[#424242] p-5 sm:flex-row">

    <p className="text-sm text-[#9B9B9B]">
      Showing{" "}
      {indexOfFirstTicket + 1}
      {" - "}
      {Math.min(
        indexOfLastTicket,
        filteredTickets.length
      )}
      {" of "}
      {filteredTickets.length} tickets
    </p>

    <div className="flex items-center gap-2">

      <button
        type="button"
        onClick={() =>
          setCurrentPage((page) => page - 1)
        }
        disabled={currentPage === 1}
        className="rounded-lg border border-[#424242] px-3 py-2 text-sm transition hover:bg-[#424242] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          className={`rounded-lg px-3 py-2 text-sm transition ${
            currentPage === page
              ? "bg-[#10A37F] text-white"
              : "border border-[#424242] hover:bg-[#424242]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() =>
          setCurrentPage((page) => page + 1)
        }
        disabled={currentPage === totalPages}
        className="rounded-lg border border-[#424242] px-3 py-2 text-sm transition hover:bg-[#424242] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>

    </div>
  </div>
)}
          {/* Empty State */}
          {filteredTickets.length === 0 && (
            <div className="p-10 text-center">
              <Search
                size={30}
                className="mx-auto mb-3 text-[#777777]"
              />

              <p className="font-medium">
                No tickets found
              </p>

              <p className="mt-1 text-sm text-[#9B9B9B]">
                Try changing your search or filters.
              </p>
            </div>
          )}

        </section>
      </main>

      {/* New Ticket Form */}
      {showForm && (
        <TicketForm
          onClose={() => setShowForm(false)}
          onCreate={handleCreateTicket}
        />
      )}
      {/* View Ticket Modal */}
{viewingTicket && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

    <div className="w-full max-w-lg rounded-2xl border border-[#424242] bg-[#2F2F2F] p-6">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Ticket Details
          </h2>

          <p className="mt-1 text-sm text-[#10A37F]">
            {viewingTicket.id}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setViewingTicket(null)}
          aria-label="Close ticket details"
          className="rounded-lg p-2 hover:bg-[#424242]"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-[#9B9B9B]">Title</p>
          <p className="mt-1 font-medium">
            {viewingTicket.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-[#9B9B9B]">Description</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
            {viewingTicket.description || "No description provided."}
          </p>
        </div>

        <div>
          <p className="text-sm text-[#9B9B9B]">Requester</p>
          <p className="mt-1">{viewingTicket.user}</p>
        </div>

        <div>
          <p className="text-sm text-[#9B9B9B]">Category</p>
          <p className="mt-1">{viewingTicket.category}</p>
        </div>

        <div className="flex flex-wrap gap-8">
          <div>
            <p className="mb-2 text-sm text-[#9B9B9B]">
              Priority
            </p>
            <Badge
              value={viewingTicket.priority}
              type="priority"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-[#9B9B9B]">
              Status
            </p>
            <Badge
              value={viewingTicket.status}
              type="status"
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-[#9B9B9B]">Created</p>
          <p className="mt-1">{viewingTicket.date}</p>
        </div>

      </div>

      <button
        type="button"
        onClick={() => setViewingTicket(null)}
        className="mt-6 w-full rounded-lg bg-[#10A37F] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0D8C6C]"
      >
        Close
      </button>

    </div>
  </div>
)}
{/* Edit Ticket Modal */}
{editingTicket && (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">

    <div className="my-auto w-full max-w-xl rounded-2xl border border-[#424242] bg-[#2F2F2F] p-6 shadow-2xl">

      {/* Modal Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Edit Ticket
          </h2>

          <p className="mt-1 text-sm text-[#9B9B9B]">
            {editingTicket.id}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditingTicket(null)}
          aria-label="Close edit form"
          className="rounded-lg p-2 text-[#B4B4B4] hover:bg-[#424242]"
        >
          <X size={20} />
        </button>

      </div>

      {/* Edit Form */}
      <form onSubmit={handleSaveEdit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm text-[#B4B4B4]">
            Ticket Title
          </label>

          <input
            type="text"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
            required
            className="w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
          />
        </div>

        {/* Requester */}
        <div>
          <label className="mb-2 block text-sm text-[#B4B4B4]">
            Requester
          </label>

          <input
            type="text"
            name="user"
            value={editForm.user}
            onChange={handleEditChange}
            required
            className="w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm text-[#B4B4B4]">
            Description
          </label>

          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            rows={3}
            className="w-full resize-y rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm text-[#B4B4B4]">
            Category
          </label>

          <select
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            className="w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
          >
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Network">Network</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-[#B4B4B4]">
              Priority
            </label>

            <select
              name="priority"
              value={editForm.priority}
              onChange={handleEditChange}
              className="w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#B4B4B4]">
              Status
            </label>

            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="w-full rounded-lg border border-[#424242] bg-[#212121] px-4 py-3 text-sm outline-none focus:border-[#10A37F]"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 border-t border-[#424242] pt-5">

          <button
            type="button"
            onClick={() => setEditingTicket(null)}
            className="rounded-lg border border-[#424242] px-4 py-2.5 text-sm transition hover:bg-[#424242]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#10A37F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0D8C6C]"
          >
            Save Changes
          </button>

        </div>

      </form>
      
    </div>
  </div>
)}
    </div>
  );
}