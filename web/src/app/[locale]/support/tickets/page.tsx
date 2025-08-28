"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supportService } from "@/services/support.service";
import { SupportTicket, SupportCategory } from "@/types/support";
import { CreateTicketDialog } from "./components/create-ticket-dialog";
import { getErrorMessage } from "@/lib/error-utils";

const categoryColors = {
  [SupportCategory.GENERAL]: "bg-blue-100 text-blue-800",
  [SupportCategory.TECHNICAL]: "bg-red-100 text-red-800",
  [SupportCategory.BILLING]: "bg-green-100 text-green-800",
  [SupportCategory.BOOKING]: "bg-purple-100 text-purple-800",
  [SupportCategory.CANCELLATION]: "bg-orange-100 text-orange-800",
  [SupportCategory.ACCOUNT]: "bg-yellow-100 text-yellow-800",
  [SupportCategory.OTHER]: "bg-gray-100 text-gray-800",
};

const categoryLabels = {
  [SupportCategory.GENERAL]: "General",
  [SupportCategory.TECHNICAL]: "Technical",
  [SupportCategory.BILLING]: "Billing",
  [SupportCategory.BOOKING]: "Booking",
  [SupportCategory.CANCELLATION]: "Cancellation",
  [SupportCategory.ACCOUNT]: "Account",
  [SupportCategory.OTHER]: "Other",
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "open" | "closed">("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const router = useRouter();

  const fetchTickets = async (status: "all" | "open" | "closed" = "all") => {
    try {
      setLoading(true);
      setError(null);
      const response = await supportService.getSupportTickets(1, 20, status);
      setTickets(response.supports);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to load support tickets"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(activeTab);
  }, [activeTab]);

  const handleTicketCreated = () => {
    setShowCreateDialog(false);
    fetchTickets(activeTab);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const TicketCard = ({ ticket }: { ticket: SupportTicket }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.push(`/support/tickets/${ticket.id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{ticket.subject}</CardTitle>
            <CardDescription className="mt-1">
              Created {formatDate(ticket.createdAt)}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={categoryColors[ticket.category]}>
              {categoryLabels[ticket.category]}
            </Badge>
            {ticket.closedAt ? (
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Closed
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-600"
              >
                <Clock className="w-3 h-3 mr-1" />
                Open
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.body}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{ticket.messageCount} messages</span>
          </div>
          {ticket.lastMessage && (
            <div>Last activity: {formatDate(ticket.lastMessage.createdAt)}</div>
          )}
        </div>
        {ticket.supportRep && (
          <div className="mt-2 text-sm text-gray-600">
            Assigned to: {ticket.supportRep.name} {ticket.supportRep.surname}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const TicketsSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between mt-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-gray-600 mt-1">
            Manage your support requests and get help
          </p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </Button>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "all" | "open" | "closed")
        }
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-400">
          <TabsTrigger value="all">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {loading ? (
            <TicketsSkeleton />
          ) : tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No support tickets
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven&apos;t created any support tickets yet.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  Create Your First Ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="open" className="mt-6">
          {loading ? (
            <TicketsSkeleton />
          ) : tickets.filter((t) => !t.closedAt).length > 0 ? (
            <div className="space-y-4">
              {tickets
                .filter((t) => !t.closedAt)
                .map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No open tickets</h3>
                <p className="text-gray-600">
                  All your tickets have been resolved!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="closed" className="mt-6">
          {loading ? (
            <TicketsSkeleton />
          ) : tickets.filter((t) => t.closedAt).length > 0 ? (
            <div className="space-y-4">
              {tickets
                .filter((t) => t.closedAt)
                .map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No closed tickets
                </h3>
                <p className="text-gray-600">
                  You don&apos;t have any closed tickets yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <CreateTicketDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  );
}
