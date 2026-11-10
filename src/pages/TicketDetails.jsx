import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  CalendarDays,
  User,
  Tag,
  AlertCircle,
  Clock,
  Ticket,
  FileText,
} from "lucide-react";

export default function TicketDetails({
  tickets,
  addComment,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
const [commentText, setCommentText] = useState("");
  const [ticket, setTicket] = useState(null);

  // Get ticket from localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("helpdesk-tickets");

    if (savedTickets) {
      const tickets = JSON.parse(savedTickets);

      const selectedTicket = tickets.find(
        (item) => item.id === id
      );

      setTicket(selectedTicket || null);
    }
  }, [id]);

  // Loading / Not Found
  if (!ticket) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <Ticket size={50} className="mb-4 text-gray-500" />

        <h2 className="text-2xl font-bold text-white">
          Ticket Not Found
        </h2>

        <p className="mt-2 text-gray-400">
          The ticket you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate("/tickets")}
          className="mt-6 rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  // Status colors
  const statusColors = {
    Open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "In Progress":
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Resolved:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  // Priority colors
  const priorityColors = {
    Low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    Medium:
      "bg-orange-500/10 text-orange-400 border-orange-500/20",
    High: "bg-red-500/10 text-red-400 border-red-500/20",
  };
const handleAddComment = () => {
  if (!commentText.trim()) return;

  addComment(ticket.id, commentText);

  setCommentText("");
};
  return (
    <div className="flex justify-content space-between">
    <div className="space-y-6 align-center">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div className="">
          <button
            onClick={() => navigate("/tickets")}
            className="mb-4 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Tickets
          </button>

          <h1 className="text-2xl font-bold text-white">
            Ticket Details
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            View and manage ticket information.
          </p>
        </div>

        <button
          onClick={() => navigate("/tickets")}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          <Pencil size={17} />
          Back to Edit
        </button>

      </div>

      {/* Ticket Main Information */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

          <div>
            <p className="text-sm font-medium text-emerald-400">
              {ticket.id}
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white">
              {ticket.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                statusColors[ticket.status] ||
                "bg-gray-500/10 text-gray-400"
              }`}
            >
              {ticket.status}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                priorityColors[ticket.priority] ||
                "bg-gray-500/10 text-gray-400"
              }`}
            >
              {ticket.priority} Priority
            </span>

          </div>
        </div>

        <div className="my-6 border-t border-slate-700" />

        {/* Description */}
        <div>
          <div className="mb-3 flex items-center gap-2 text-gray-300">
            <FileText size={18} />
            <h3 className="font-medium">Description</h3>
          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-400">
            {ticket.description || "No description available."}
          </p>
        </div>

      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* User Information */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

          <h3 className="mb-5 font-semibold text-white">
            User Information
          </h3>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <User size={20} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                {ticket.user}
              </p>

              <p className="text-xs text-gray-400">
                Ticket Creator
              </p>
            </div>

          </div>

        </div>

        {/* Ticket Metadata */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">

          <h3 className="mb-5 font-semibold text-white">
            Ticket Information
          </h3>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-gray-400">
                <Tag size={17} />
                <span className="text-sm">Category</span>
              </div>

              <span className="text-sm text-white">
                {ticket.category}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-gray-400">
                <AlertCircle size={17} />
                <span className="text-sm">Priority</span>
              </div>

              <span className="text-sm text-white">
                {ticket.priority}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={17} />
                <span className="text-sm">Status</span>
              </div>

              <span className="text-sm text-white">
                {ticket.status}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-gray-400">
                <CalendarDays size={17} />
                <span className="text-sm">Created At</span>
              </div>

              <span className="text-sm text-white">
                {ticket.date || "Not available"}
              </span>

            </div>

          </div>

       
        </div>
{/* Activity Timeline */}
<div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">

  <h2 className="mb-6 text-lg font-semibold text-white">
    Activity Timeline
  </h2>

  <div className="relative border-l border-slate-600 pl-6 space-y-6">

    <div className="relative">
      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-500"></span>

      <h3 className="text-sm font-medium text-white">
        Ticket Created
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Ticket was created successfully.
      </p>

      <span className="text-xs text-slate-500">
        Today
      </span>
    </div>

    <div className="relative">
      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-blue-500"></span>

      <h3 className="text-sm font-medium text-white">
        Status Updated
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Status changed to In Progress.
      </p>

      <span className="text-xs text-slate-500">
        Today
      </span>
    </div>

  </div>
</div>
{/* Comments Section */}
<div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/50 p-6">

  <h2 className="mb-6 text-lg font-semibold text-white">
    Comments
  </h2>

  <div className="mb-5 flex gap-3">

    <textarea
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="Write a comment..."
      className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white outline-none focus:border-emerald-500"
      rows="3"
    />

    <button
      onClick={handleAddComment}
      className="self-end rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
    >
      Send
    </button>

  </div>

  <div className="space-y-4">

    {(ticket.comments || []).map((comment) => (
      <div
        key={comment.id}
        className="rounded-lg border border-slate-700 bg-slate-900 p-4"
      >
        <div className="flex justify-between">

          <span className="text-sm font-semibold text-white">
            {comment.author}
          </span>

          <span className="text-xs text-slate-500">
            {comment.date}
          </span>

        </div>

        <p className="mt-2 text-sm text-slate-300">
          {comment.text}
        </p>

      </div>
    ))}

    {(!ticket.comments || ticket.comments.length === 0) && (
      <p className="text-center text-sm text-slate-500">
        No comments yet.
      </p>
    )}

  </div>
</div>
      </div>

    </div>
    </div>
  );
}