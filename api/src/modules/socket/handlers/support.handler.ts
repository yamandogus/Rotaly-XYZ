import { Server as SocketServer } from "socket.io";
import {
  AuthenticatedSocket,
  SupportEventData,
  SupportAssignmentData,
} from "../types/socket.types";

export class SupportHandler {
  constructor(private io: SocketServer) {}

  handleSupportRequestCreated(
    socket: AuthenticatedSocket,
    data: SupportEventData
  ): void {
    console.log(`🎫 Support request created:`, data);

    // Notify support team about new request
    socket.to("support-team").emit("supportRequestCreated", {
      supportId: data.supportId,
      userId: data.userId,
      subject: data.subject,
      category: data.category,
      timestamp: new Date(),
    });

    // Notify the user about successful creation
    socket.emit("supportRequestCreated", {
      supportId: data.supportId,
      message: "Your support request has been created successfully",
      timestamp: new Date(),
    });

    console.log(`Support request ${data.supportId} notifications sent`);
  }

  handleSupportAssignment(
    socket: AuthenticatedSocket,
    data: SupportAssignmentData
  ): void {
    console.log(`👨‍💼 Support assignment:`, data);

    const supportRoom = `support:${data.supportId}`;

    // Notify everyone in the support room about assignment
    this.io.to(supportRoom).emit("supportAssigned", {
      supportId: data.supportId,
      supportRepId: data.supportRepId,
      timestamp: new Date(),
    });

    // Notify the user directly
    this.io.to(`user:${data.userId}`).emit("supportAssigned", {
      supportId: data.supportId,
      supportRepId: data.supportRepId,
      message: "A support representative has been assigned to your request",
      timestamp: new Date(),
    });

    // Notify the support rep directly
    this.io.to(`user:${data.supportRepId}`).emit("newSupportAssignment", {
      supportId: data.supportId,
      userId: data.userId,
      timestamp: new Date(),
    });

    console.log(`Support assignment notifications sent for ${data.supportId}`);
  }

  handleSupportResolved(
    socket: AuthenticatedSocket,
    data: SupportEventData
  ): void {
    console.log(`Support request resolved:`, data);

    const supportRoom = `support:${data.supportId}`;

    // Notify everyone in the support room
    this.io.to(supportRoom).emit("supportResolved", {
      supportId: data.supportId,
      resolvedBy: socket.userId,
      timestamp: new Date(),
    });

    // Notify the user if they're not the one who resolved it
    if (socket.userId !== data.userId) {
      this.io.to(`user:${data.userId}`).emit("supportResolved", {
        supportId: data.supportId,
        message:
          "Your support request has been resolved. The chat remains available for reference.",
        timestamp: new Date(),
      });
    }

    // Notify support team about resolution
    socket.to("support-team").emit("supportResolved", {
      supportId: data.supportId,
      resolvedBy: socket.userId,
      timestamp: new Date(),
    });

    console.log(`Support resolution notifications sent for ${data.supportId}`);
  }

  // Utility method to emit support events from services
  emitSupportRequestCreated(data: SupportEventData): void {
    // Notify support team
    this.io.to("support-team").emit("supportRequestCreated", {
      supportId: data.supportId,
      userId: data.userId,
      subject: data.subject,
      category: data.category,
      timestamp: new Date(),
    });

    // Notify the user
    this.io.to(`user:${data.userId}`).emit("supportRequestCreated", {
      supportId: data.supportId,
      message: "Your support request has been created successfully",
      timestamp: new Date(),
    });
  }

  emitSupportAssignment(data: SupportAssignmentData): void {
    const supportRoom = `support:${data.supportId}`;

    // Notify everyone in the support room
    this.io.to(supportRoom).emit("supportAssigned", {
      supportId: data.supportId,
      supportRepId: data.supportRepId,
      timestamp: new Date(),
    });

    // Notify the user
    this.io.to(`user:${data.userId}`).emit("supportAssigned", {
      supportId: data.supportId,
      supportRepId: data.supportRepId,
      message: "A support representative has been assigned to your request",
      timestamp: new Date(),
    });

    // Notify the support rep
    this.io.to(`user:${data.supportRepId}`).emit("newSupportAssignment", {
      supportId: data.supportId,
      userId: data.userId,
      timestamp: new Date(),
    });
  }
}
