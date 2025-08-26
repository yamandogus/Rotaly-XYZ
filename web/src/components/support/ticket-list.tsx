"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge, CategoryBadge } from "./common/badges";
import { SelectField } from "./common/form-fields";
import {
  SupportTicket,
  SupportFilters,
  SupportCategory,
  SupportStatus,
} from "@/types/support";
import { SupportService } from "@/services/supportService";
import { toast } from "react-hot-toast";
import { Eye, MessageCircle, Plus } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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

  const router = useRouter();
  const t = useTranslations("Support");

  const statusOptions = [
    { value: "all", label: t("allTickets") },
    { value: "open", label: t("open") },
    { value: "closed", label: t("closed") },
  ];

  const categoryOptions = [
    { value: "", label: t("allCategories") },
    { value: SupportCategory.GENERAL, label: t("general") },
    { value: SupportCategory.TECHNICAL, label: t("technical") },
    { value: SupportCategory.BILLING, label: t("billing") },
    { value: SupportCategory.RESERVATION, label: t("reservation") },
    { value: SupportCategory.COMPLAINT, label: t("complaint") },
    { value: SupportCategory.FEATURE_REQUEST, label: t("featureRequest") },
    { value: SupportCategory.SECURITY, label: t("security") },
    { value: SupportCategory.OTHER, label: t("other") },
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
      toast.error(t("ticketsLoadError"));
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

      if (field === "page") {
        newFilters.page =
          typeof value === "number" ? value : parseInt(value as string) || 1;
      } else if (field === "limit") {
        newFilters.limit =
          typeof value === "number" ? value : parseInt(value as string);
        newFilters.page = 1;
      } else if (field === "status") {
        newFilters.status = value as SupportStatus;
        newFilters.page = 1;
      } else if (field === "category") {
        newFilters.category = value ? (value as SupportCategory) : undefined;
        newFilters.page = 1;
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
      toast.success(t("ticketClosedSuccess"));
      loadTickets();
    } catch (error) {
      console.error("Error closing ticket:", error);
      toast.error(t("ticketCloseError"));
    }
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    if (onTicketSelect) {
      onTicketSelect(ticket);
    } else {
      router.push(`/support/ticket/${ticket.id}`);
    }
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    // Always navigate to ticket detail, regardless of onTicketSelect
    router.push(`/support/ticket/${ticket.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("myTickets")}
        </h1>
        <Button onClick={onCreateNew} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("createNewTicket")}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              label={t("status")}
              value={filters.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("status", e.target.value as SupportStatus)
              }
              options={statusOptions}
            />
            <SelectField
              label={t("category")}
              value={filters.category || ""}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("category", e.target.value || undefined)
              }
              options={categoryOptions}
            />
            <SelectField
              label={t("perPage")}
              value={filters.limit.toString()}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("limit", parseInt(e.target.value))
              }
              options={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ticket List */}
      <Card>
        {loading ? (
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">{t("loadingTickets")}</p>
          </CardContent>
        ) : tickets.length === 0 ? (
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">{t("noTicketsFound")}</p>
            <Button onClick={onCreateNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t("createFirstTicket")}
            </Button>
          </CardContent>
        ) : (
          <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => handleTicketClick(ticket)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {ticket.subject}
                        </h3>
                        <StatusBadge isOpen={!ticket.closedAt} />
                        <CategoryBadge category={ticket.category} />
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {ticket.body}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <span>
                          {t("created")}:{" "}
                          {format(new Date(ticket.createdAt), "dd MMM yyyy", {
                            locale: tr,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {ticket.messageCount} {t("messages")}
                        </span>
                        {ticket.supportRep && (
                          <span>
                            {t("assigned")}: {ticket.supportRep.name}{" "}
                            {ticket.supportRep.surname}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewTicket(ticket);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        {t("view")}
                      </Button>
                      {!ticket.closedAt && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTicketClose(ticket.id);
                          }}
                        >
                          {t("close")}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {(filters.page - 1) * filters.limit + 1} -{" "}
                  {Math.min(filters.page * filters.limit, pagination.total)} /{" "}
                  {t("total")} {pagination.total} {t("results")}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={filters.page === 1}
                    onClick={() => handlePageChange(filters.page - 1)}
                  >
                    {t("previous")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={filters.page === pagination.totalPages}
                    onClick={() => handlePageChange(filters.page + 1)}
                  >
                    {t("next")}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
