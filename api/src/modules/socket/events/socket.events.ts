export const SOCKET_EVENTS = {
  // ⋅⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳
  //     Connection events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳

  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //     User presence events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  ONLINE_USERS_COUNT: "online_users_count",
  USER_ONLINE: "user_online",
  USER_OFFLINE: "user_offline",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //     Room events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  USER_JOINED_ROOM: "user_joined_room",
  USER_LEFT_ROOM: "user_left_room",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //    Message events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  NEW_MESSAGE: "new_message",
  MESSAGE_SENT: "message_sent",
  MESSAGE_RECEIVED: "message_received",
  MESSAGE_READ: "message_read",
  MESSAGES_READ: "messages_read",
  MESSAGE_DELETE: "message_delete",
  MESSAGE_DELETED: "message_deleted",
  MESSAGE_EDIT: "message_edit",
  MESSAGE_EDITED: "message_edited",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    Typing events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  START_TYPING: "start_typing",
  STOP_TYPING: "stop_typing",
  USER_STARTED_TYPING: "user_started_typing",
  USER_STOPPED_TYPING: "user_stopped_typing",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    Support events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  SUPPORT_REQUEST_CREATED: "support_request_created",
  SUPPORT_ASSIGNED: "support_assigned",
  SUPPORT_RESOLVED: "support_resolved", // Instead of "closed" - indicates resolution but chat remains accessible

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    AI Chat events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  AI_CHAT_MESSAGE: "ai_chat_message",
  AI_RESPONSE: "ai_response",
  JOIN_AI_CHAT_ROOM: "join_ai_chat_room",
  LEAVE_AI_CHAT_ROOM: "leave_ai_chat_room",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //    Notification events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  NOTIFICATION: "notification",
  SEND_NOTIFICATION: "send_notification",
  BROADCAST_NOTIFICATION: "broadcast_notification",
  HOTEL_NOTIFICATION: "hotel_notification",
  MARK_NOTIFICATION_READ: "mark_notification_read",
  NOTIFICATION_READ: "notification_read",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //     Reservation events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  RESERVATION_CREATED: "reservation_created",
  RESERVATION_UPDATED: "reservation_updated",
  RESERVATION_CANCELLED: "reservation_cancelled",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //     Hotel events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  HOTEL_STATUS_CHANGED: "hotel_status_changed",
  ROOM_AVAILABILITY_CHANGED: "room_availability_changed",
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
