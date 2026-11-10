import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tickets, { initialTickets } from "./pages/Ticket";
import Users from "./pages/Users";
import Login from "./pages/Login";
import TicketDetails from "./pages/TicketDetails";
import Reports from "./pages/Report";
export default function App() {

  // Tickets State
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("helpdesk-tickets");

    return savedTickets
      ? JSON.parse(savedTickets)
      : initialTickets;
  });

  // Save tickets in localStorage
  useEffect(() => {
    localStorage.setItem("helpdesk-tickets", JSON.stringify(tickets));
  }, [tickets]);

  // Update ticket status
  const updateStatus = (id, newStatus) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) => {
        if (ticket.id !== id || ticket.status === newStatus) {
          return ticket;
        }

        const newActivity = {
          id: Date.now(),
          action: "Status Updated",
          description: `Status changed from ${ticket.status} to ${newStatus}`,
          date: new Date().toLocaleString(),
        };

        return {
          ...ticket,
          status: newStatus,
          activity: [
            newActivity,
            ...(ticket.activity || []),
          ],
        };
      })
    );
  };

  // Add comment
  const addComment = (id, commentText) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              comments: [
                ...(ticket.comments || []),
                {
                  id: Date.now(),
                  author: "Admin",
                  text: commentText,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : ticket
      )
    );
  };

  
   return (
  <BrowserRouter>
    <div className="flex min-h-screen bg-[#0B1120] text-slate-100">

      <aside className="flex min-h-screen bg-[#0B1120] text-white">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1">
        <Routes>

            <Route
              path="/"
              element={<Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard tickets={tickets}/>}
            />

            <Route
              path="/tickets"
              element={
                <Tickets
                  tickets={tickets}
                  setTickets={setTickets}
                  updateStatus={updateStatus}
                    addComment={addComment}
                />
              }
            />

            <Route
              path="/tickets/:id"
              element={
                <TicketDetails
                  tickets={tickets}
                  addComment={addComment}
                />
              }
            />

            <Route
              path="/users"
              element={<Users />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
            path="/reports"
            element={<Reports tickets={tickets}/>}
            />
<Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}