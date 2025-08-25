import React, { useState } from "react";
import { CreateTicketForm } from "./components/support/CreateTicketForm";
import { TicketList } from "./components/support/TicketList";
import { AIChatInterface } from "./components/support/AIChatInterface";
import { AdminDashboard } from "./components/support/AdminDashboard";
import { Button } from "./components/common/Button";
import { SupportTicket } from "./types";

type ViewMode = "list" | "create" | "chat" | "admin";

// Mock user for demo purposes
const mockUser = {
  id: "1",
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  role: "CUSTOMER" as const,
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [userRole] = useState<"CUSTOMER" | "SUPPORT" | "ADMIN">("CUSTOMER"); // In real app, this would come from auth

  const handleTicketCreated = (ticket: SupportTicket) => {
    console.log("Ticket created:", ticket);
    setCurrentView("list");
  };

  const handleTicketSelect = (ticket: SupportTicket) => {
    console.log("Ticket selected:", ticket);
    // In a real app, this would navigate to ticket detail view
  };

  const handleAITicketCreated = (supportId: string) => {
    console.log("AI created ticket:", supportId);
    // In a real app, this might show a notification or navigate to the ticket
  };

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Rotaly Support
              </h1>
            </div>

            <div className="flex space-x-4">
              <Button
                variant={currentView === "list" ? "primary" : "secondary"}
                onClick={() => setCurrentView("list")}
              >
                My Tickets
              </Button>

              <Button
                variant={currentView === "create" ? "primary" : "secondary"}
                onClick={() => setCurrentView("create")}
              >
                Create Ticket
              </Button>

              <Button
                variant={currentView === "chat" ? "primary" : "secondary"}
                onClick={() => setCurrentView("chat")}
              >
                AI Chat
              </Button>

              {userRole === "ADMIN" && (
                <Button
                  variant={currentView === "admin" ? "primary" : "secondary"}
                  onClick={() => setCurrentView("admin")}
                >
                  Admin Dashboard
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {mockUser.name} {mockUser.surname}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {userRole}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (currentView) {
      case "list":
        return (
          <TicketList
            onTicketSelect={handleTicketSelect}
            onCreateNew={() => setCurrentView("create")}
          />
        );

      case "create":
        return (
          <CreateTicketForm
            onTicketCreated={handleTicketCreated}
            onCancel={() => setCurrentView("list")}
          />
        );

      case "chat":
        return (
          <div className="max-w-2xl mx-auto">
            <AIChatInterface onTicketCreated={handleAITicketCreated} />
          </div>
        );

      case "admin":
        return userRole === "ADMIN" ? (
          <AdminDashboard />
        ) : (
          <div className="text-center p-8">
            <p className="text-red-600">
              Access denied. Admin privileges required.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavigation()}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 Rotaly XYZ. All rights reserved.</p>
            <p className="mt-1">
              Support Interface Example - Built with React & TypeScript
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
