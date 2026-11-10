import React from "react";
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

const stats = [
  {
    title: "Total Tickets",
    value: "128",
    icon: Ticket,
    color: "bg-[#10A37F]/15 text-[#10A37F]",
  },
  {
    title: "Pending Tickets",
    value: "24",
    icon: Clock,
    color: "bg-amber-500/15 text-amber-400",
  },
  {
    title: "Resolved Tickets",
    value: "86",
    icon: CheckCircle,
    color: "bg-sky-500/15 text-sky-400",
  },
  {
    title: "Urgent Tickets",
    value: "8",
    icon: AlertTriangle,
    color: "bg-red-500/15 text-red-400",
  },
];

const tickets = [
  {
    id: "#TK-1001",
    title: "Computer not connecting to network",
    user: "Ahmed Ali",
    priority: "High",
    status: "Open",
  },
  {
    id: "#TK-1002",
    title: "Email access problem",
    user: "Sara Mohamed",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "#TK-1003",
    title: "Printer not working",
    user: "Omar Hassan",
    priority: "Low",
    status: "Resolved",
  },
  {
    id: "#TK-1004",
    title: "Software installation request",
    user: "Mona Khalid",
    priority: "High",
    status: "Open",
  },
];

// Priority Badge
function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-500/10 text-red-400 ring-1 ring-red-500/20",
    Medium: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20",
    Low: "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Open: "bg-[#10A37F]/15 text-[#10A37F]",
    "In Progress": "bg-amber-500/15 text-amber-400",
    Resolved: "bg-sky-500/15 text-sky-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100">
      <Header />

      <main className="space-y-8 p-6">
        {/* Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">
              Overview
            </h2>

            <p className="mt-1 text-sm text-[#9B9B9B]">
              Here is what is happening with your support desk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </section>

        {/* Recent tickets */}
        <section className="overflow-hidden rounded-xl border border-[#424242] bg-slate-900/70 ">
          <div className="flex flex-col gap-3 border-b border-[#424242] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#F5F5F5]">
                Recent Tickets
              </h2>

              <p className="mt-1 text-sm text-[#9B9B9B]">
                Latest support requests from your team.
              </p>
            </div>

            <button
              type="button"
              className="self-start rounded-lg border border-[#424242] px-4 py-2 text-sm text-[#D4D4D4] transition hover:bg-[#424242] hover:text-white sm:self-auto"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-emerald-500/5  text-[#9B9B9B]">
                <tr>
                  <th className="px-5 py-4 font-medium">Ticket</th>
                  <th className="px-5 py-4 font-medium">Title</th>
                  <th className="px-5 py-4 font-medium">User</th>
                  <th className="px-5 py-4 font-medium">Priority</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#424242]">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="transition-colors hover:bg-[#363636]"
                  >
                    <td className="px-5 py-4 font-medium text-[#10A37F]">
                      {ticket.id}
                    </td>

                    <td className="px-5 py-4 text-[#F5F5F5]">
                      {ticket.title}
                    </td>

                    <td className="px-5 py-4 text-[#B4B4B4]">
                      {ticket.user}
                    </td>

                    <td className="px-5 py-4">
                      <PriorityBadge priority={ticket.priority} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#424242] px-5 py-4 text-xs text-[#9B9B9B]">
            Showing 4 sample tickets
          </div>
        </section>
      </main>
    </div>
  );
}