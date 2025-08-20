# Socket Module Structure

## Directory Structure

```
api/src/modules/socket/
├── controller.ts                    # Main socket controller
├── types/
│   └── socket.types.ts             # TypeScript interfaces and types
├── handlers/
│   ├── connection.handler.ts       # Connection/disconnection logic
│   ├── message.handler.ts          # Message-related events
│   ├── typing.handler.ts           # Typing indicators
│   └── notification.handler.ts     # Notifications and broadcasts
│   .
│   .
│   etc
└── events/
    └── socket.events.ts            # Event name constants
```

## Usage Examples

### Adding a New Event Type

1. Add event constant to `socket.events.ts`
2. Add type definition to `socket.types.ts`
3. Create handler method in appropriate handler
4. Register event listener in main controller

### Integration with Message Service

```typescript
// in your message service
import { SocketController } from "./socket/controller";

class MessageService {
  constructor(private socketController: SocketController) {}

  async sendMessage(data: MessageData) {
    const message = await this.saveMessage(data);

    // Emit to socket
    this.socketController.emitToUser(data.receiverId, "newMessage", message);
  }
}
```

## TODO's

- **Authentication middleware**: Verify user tokens on connection
- **Rate limiting**: Prevent spam and abuse
- **Event logging**: Track socket events for analytics
- **Admin events**: Special events for admin users
- **Hotel-specific rooms**: Automatic room management based on reservations
