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

  ONLINE_USERS_COUNT: "onlineUsersCount",
  USER_ONLINE: "userOnline",
  USER_OFFLINE: "userOffline",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //     Room events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  JOIN_ROOM: "joinRoom",
  LEAVE_ROOM: "leaveRoom",
  USER_JOINED_ROOM: "userJoinedRoom",
  USER_LEFT_ROOM: "userLeftRoom",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    Message events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  NEW_MESSAGE: "newMessage",
  MESSAGE_SENT: "messageSent",
  MESSAGE_RECEIVED: "messageReceived",
  MESSAGE_READ: "messageRead",
  MESSAGES_READ: "messagesRead",
  MESSAGE_DELETE: "messageDelete",
  MESSAGE_DELETED: "messageDeleted",
  MESSAGE_EDIT: "messageEdit",
  MESSAGE_EDITED: "messageEdited",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    Typing events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  START_TYPING: "startTyping",
  STOP_TYPING: "stopTyping",
  USER_STARTED_TYPING: "userStartedTyping",
  USER_STOPPED_TYPING: "userStoppedTyping",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    Support events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  SUPPORT_REQUEST: "supportRequest",
  SUPPORT_RESPONSE: "supportResponse",
  SUPPORT_ASSIGNED: "supportAssigned",
  SUPPORT_CLOSED: "supportClosed",
  JOIN_SUPPORT_ROOM: "joinSupportRoom",
  LEAVE_SUPPORT_ROOM: "leaveSupportRoom",
  USER_JOINED_SUPPORT_ROOM: "userJoinedSupportRoom",
  USER_LEFT_SUPPORT_ROOM: "userLeftSupportRoom",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //    AI Chat events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  AI_CHAT_MESSAGE: "aiChatMessage",
  AI_RESPONSE: "aiResponse",
  JOIN_AI_CHAT_ROOM: "joinAIChatRoom",
  LEAVE_AI_CHAT_ROOM: "leaveAIChatRoom",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //    Notification events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  NOTIFICATION: "notification",
  SEND_NOTIFICATION: "sendNotification",
  BROADCAST_NOTIFICATION: "broadcastNotification",
  HOTEL_NOTIFICATION: "hotelNotification",
  MARK_NOTIFICATION_READ: "markNotificationRead",
  NOTIFICATION_READ: "notificationRead",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅
  //     Reservation events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅

  RESERVATION_CREATED: "reservationCreated",
  RESERVATION_UPDATED: "reservationUpdated",
  RESERVATION_CANCELLED: "reservationCancelled",

  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅
  //     Hotel events
  // ⋅.˳˳.⋅ॱ˙˙ॱ⋅.˳˳.⋅ॱ˙˙ॱᐧ.˳˳.⋅

  HOTEL_STATUS_CHANGED: "hotelStatusChanged",
  ROOM_AVAILABILITY_CHANGED: "roomAvailabilityChanged",
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
