import { Server as SocketServer } from "socket.io";
import {
  AuthenticatedSocket,
  NotificationEventData,
} from "../types/socket.types";

export class NotificationHandler {
  constructor(private io: SocketServer) {}

  handleSendNotification(
    socket: AuthenticatedSocket,
    data: NotificationEventData
  ): void {
    console.log(`Sending notification to user ${data.userId}:`, data);

    socket.to(`user:${data.userId}`).emit("notification", {
      ...data,
      sentBy: socket.userId,
      timestamp: new Date(),
    });

    console.log(`Notification sent to user ${data.userId}`);
  }

  handleBroadcastNotification(
    socket: AuthenticatedSocket,
    data: Omit<NotificationEventData, "userId">
  ): void {
    console.log(`Broadcasting notification:`, data);

    this.io.emit("notification", {
      ...data,
      sentBy: socket.userId,
      timestamp: new Date(),
    });

    console.log(`Notification broadcasted to all users`);
  }

  handleHotelNotification(
    socket: AuthenticatedSocket,
    data: NotificationEventData & { hotelId: string }
  ): void {
    console.log(`Sending hotel notification : ${data.hotelId}:`, data);

    socket.to(`hotel:${data.hotelId}`).emit("notification", {
      ...data,
      sentBy: socket.userId,
      timestamp: new Date(),
    });

    console.log(`Hotel notification sent : ${data.hotelId}`);
  }

  handleMarkNotificationRead(
    socket: AuthenticatedSocket,
    data: { notificationId: string }
  ): void {
    console.log(
      `Notification marked as read by ${socket.userId}:`,
      data.notificationId
    );

    // NOTE: emit this back to admin interface or analytics
    socket.broadcast.emit("notificationRead", {
      notificationId: data.notificationId,
      readBy: socket.userId,
      timestamp: new Date(),
    });
  }
}
