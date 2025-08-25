import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "../common/Button";
import { Badge, StatusBadge, CategoryBadge } from "../common/Badge";
import { Select } from "../common/Input";
import {
  SupportTicket,
  SupportFilters,
  SupportCategory,
  SupportStatus,
} from "../../types";
import SupportService from "../../services/supportService";

interface TicketListProps {
  onTicketSelect?: (ticket: SupportTicket) => void;
  onCreateNew?: () => void;
}

export const TicketList: React.FC<TicketListProps> = ({
  onTicketSelect,
  onCreateNew,
}) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SupportFilters>({
    page: 1,
    limit: 10,
    status: "all",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const statusOptions = [
    { value: "all", label: "All Tickets" },
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: SupportCategory.GENERAL, label: "General" },
    { value: SupportCategory.TECHNICAL, label: "Technical" },
    { value: SupportCategory.BILLING, label: "Billing" },
    { value: SupportCategory.RESERVATION, label: "Reservation" },
    { value: SupportCategory.COMPLAINT, label: "Complaint" },
    { value: SupportCategory.FEATURE_REQUEST, label: "Feature Request" },
    { value: SupportCategory.SECURITY, label: "Security" },
    { value: SupportCategory.OTHER, label: "Other" },
  ];

  useEffect(() => {
    loadTickets();
  }, [filters]);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const response = await SupportService.getSupportTickets(filters);
      setTickets(response.supports);
      setPagination({
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      });
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (
    field: keyof SupportFilters,
    value: string | number | undefined
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      // Handle different field types properly
      if (field === "page") {
        newFilters.page =
          typeof value === "number" ? value : parseInt(value as string) || 1;
      } else if (field === "limit") {
        newFilters.limit =
          typeof value === "number" ? value : parseInt(value as string);
        newFilters.page = 1; // Reset to first page when changing limit
      } else if (field === "status") {
        newFilters.status = value as SupportStatus;
        newFilters.page = 1; // Reset to first page when changing filters
      } else if (field === "category") {
        newFilters.category = value ? (value as SupportCategory) : undefined;
        newFilters.page = 1; // Reset to first page when changing filters
      }

      return newFilters;
    });
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleTicketClose = async (ticketId: string) => {
    try {
      await SupportService.closeSupportTicket(ticketId);
      loadTickets(); // Reload tickets to reflect changes
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        {onCreateNew && (
          <Button onClick={onCreateNew} variant="primary">
            Create New Ticket
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) =>
              handleFilterChange("status", e.target.value as SupportStatus)
            }
            options={statusOptions}
          />
          <Select
            label="Category"
            value={filters.category || ""}
            onChange={(e) =>
              handleFilterChange("category", e.target.value || undefined)
            }
            options={categoryOptions}
          />
          <Select
            label="Per Page"
            value={filters.limit.toString()}
            onChange={(e) =>
              handleFilterChange("limit", parseInt(e.target.value))
            }
            options={[
              { value: "5", label: "5 per page" },
              { value: "10", label: "10 per page" },
              { value: "20", label: "20 per page" },
              { value: "50", label: "50 per page" },
            ]}
          />
        </div>
      </div>

      {/* Ticket List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No tickets found.</p>
            {onCreateNew && (
              <Button onClick={onCreateNew} variant="primary" className="mt-4">
                Create your first ticket
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onTicketSelect?.(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {ticket.subject}
                        </h3>
                        <StatusBadge isOpen={!ticket.closedAt} />
                        <CategoryBadge category={ticket.category} />
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {ticket.body}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>
                          Created:{" "}
                          {format(new Date(ticket.createdAt), "MMM dd, yyyy")}
                        </span>
                        <span>Messages: {ticket.messageCount}</span>
                        {ticket.supportRep && (
                          <span>
                            Assigned to: {ticket.supportRep.name}{" "}
                            {ticket.supportRep.surname}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {!ticket.closedAt && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTicketClose(ticket.id);
                          }}
                        >
                          Close
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {(filters.page - 1) * filters.limit + 1} to{" "}
                  {Math.min(filters.page * filters.limit, pagination.total)} of{" "}
                  {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={filters.page === 1}
                    onClick={() => handlePageChange(filters.page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={filters.page === pagination.totalPages}
                    onClick={() => handlePageChange(filters.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
