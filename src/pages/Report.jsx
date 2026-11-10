import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

import {
  Ticket,
  CheckCircle,
  Clock,
  TrendingUp,
  FileBarChart,
} from "lucide-react";

export default function Reports({ tickets = [] }) {

  // Calculate statistics
  const totalTickets = tickets.length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const pendingTickets = openTickets + inProgressTickets;

  const resolutionRate =
    totalTickets === 0
      ? 0
      : ((resolvedTickets / totalTickets) * 100).toFixed(1);

  // Tickets by status
  const statusData = [
    { name: "Open", value: openTickets, color: "#F59E0B" },
    { name: "In Progress", value: inProgressTickets, color: "#3B82F6" },
    { name: "Resolved", value: resolvedTickets, color: "#10B981" },
  ];

  // Tickets by priority
  const priorityData = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    tickets: tickets.filter(
      (ticket) => ticket.priority === priority
    ).length,
  }));

  // Tickets by category
  const categories = ["Hardware", "Software", "Network", "Email"];

  const categoryData = categories.map((category) => ({
    name: category,
    tickets: tickets.filter(
      (ticket) => ticket.category === category
    ).length,
  }));

  // Tickets by month
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    const count = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date || ticket.createdAt);

      return (
        !isNaN(ticketDate.getTime()) &&
        ticketDate.getMonth() === date.getMonth() &&
        ticketDate.getFullYear() === date.getFullYear()
      );
    }).length;

    return { month, tickets: count };
  });

  // Recent tickets
  const recentTickets = [...tickets]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt).getTime() || 0;
      const dateB = new Date(b.date || b.createdAt).getTime() || 0;

      return dateB - dateA;
    })
    .slice(0, 5);

  // Summary cards
  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: Ticket,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Resolved Tickets",
      value: resolvedTickets,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Pending Tickets",
      value: pendingTickets,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Resolution Rate",
      value: `${resolutionRate}%`,
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] p-6 text-white">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <FileBarChart size={28} className="text-emerald-400" />

          <h1 className="text-2xl font-bold">
            Reports & Analytics
          </h1>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Monitor ticket performance and support team activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-700/60 bg-[#111C30] p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon size={25} className={stat.color} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Charts Row 1 */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Tickets Overview */}
        <div className="rounded-xl border border-slate-700/60 bg-[#111C30] p-5">

          <h2 className="mb-6 text-lg font-semibold">
            Tickets Overview
          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={55}
                  paddingAngle={4}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Tickets by Priority */}
        <div className="rounded-xl border border-slate-700/60 bg-[#111C30] p-5">

          <h2 className="mb-6 text-lg font-semibold">
            Tickets by Priority
          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="tickets"
                  fill="#10B981"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* Charts Row 2 */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Tickets by Category */}
        <div className="rounded-xl border border-slate-700/60 bg-[#111C30] p-5">

          <h2 className="mb-6 text-lg font-semibold">
            Tickets by Category
          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="tickets"
                  fill="#3B82F6"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Monthly Trends */}
        <div className="rounded-xl border border-slate-700/60 bg-[#111C30] p-5">

          <h2 className="mb-6 text-lg font-semibold">
            Monthly Ticket Trends
          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                  allowDecimals={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* Recent Tickets Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-[#111C30]">

        <div className="border-b border-slate-700/60 p-5">

          <h2 className="text-lg font-semibold">
            Recent Tickets
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest five tickets in the system.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead className="bg-[#172338] text-slate-400">
              <tr>
                <th className="px-5 py-4">Ticket ID</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody>

              {recentTickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-t border-slate-700/50 hover:bg-slate-800/40"
                >

                  <td className="px-5 py-4 text-emerald-400">
                    {ticket.id}
                  </td>

                  <td className="px-5 py-4">
                    {ticket.title}
                  </td>

                  <td className="px-5 py-4">
                    {ticket.priority}
                  </td>

                  <td className="px-5 py-4">
                    {ticket.status}
                  </td>

                </tr>

              ))}

              {recentTickets.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-8 text-center text-slate-400"
                  >
                    No tickets available.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}