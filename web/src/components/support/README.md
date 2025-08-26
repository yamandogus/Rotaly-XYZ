# Support System Implementation

This document outlines the implementation of the support system for the Rotaly XYZ application.

## Features Implemented

### Frontend Components

1. **Support Dashboard** (`/support`)

   - View all support tickets
   - Create new support tickets
   - Filter and search tickets
   - Admin dashboard for support representatives

2. **Ticket Detail View** (`/support/ticket/[id]`)

   - View individual ticket details
   - Real-time messaging between customer and support
   - Close tickets
   - Message history

3. **Create Ticket Form**

   - Form validation
   - Category selection
   - Subject and message input
   - Success/error handling

4. **Admin Dashboard** (for support reps and admins)
   - View support representative statistics
   - Monitor workload distribution
   - Manage support tickets

### Backend Integration

The frontend connects to existing backend APIs:

- **Support API** (`/api/support`)

  - `POST /` - Create support ticket
  - `GET /` - List support tickets with filters
  - `GET /:supportId` - Get specific ticket
  - `PATCH /:supportId/close` - Close ticket
  - `GET /statistics/reps` - Admin statistics

- **Message API** (`/api/message`)
  - `POST /send` - Send message (with supportId)
  - `GET /` - Get messages (filtered by supportId)

## Navigation

- Support link is available in the user dropdown menu for authenticated customers
- Direct access via `/support` URL
- AI chat widget can redirect to support page when tickets are created

## User Roles

1. **Customer** - Can create tickets, view their tickets, send messages
2. **Support** - Can view all tickets, respond to messages, access admin dashboard
3. **Admin** - Full access including statistics and management features

## Usage

### For Customers

1. Navigate to Support via user menu or `/support`
2. Create new tickets using the "Yeni Bilet Oluştur" button
3. View ticket list and click on any ticket to see details
4. Send messages within ticket conversations
5. Close tickets when resolved

### For Support Representatives

1. Access admin dashboard via "Yönetim Paneli" tab
2. View workload statistics and ticket distribution
3. Respond to customer messages
4. Monitor open tickets across all representatives

### For Developers

- All components are in `/web/src/components/support/`
- Types are defined in `/web/src/types/support.ts`
- Service layer in `/web/src/services/supportService.ts`
- Turkish localization is used throughout

## Integration with AI Chat

The AI chat widget (bottom-right corner) can create support tickets automatically. When this happens:

- User is redirected to `/support?ticket={ticketId}`
- A notification banner shows the newly created ticket
- User can continue the conversation in the support system

## Styling

- Uses shadcn/ui components
- Fully responsive design
- Dark mode support
- Consistent with the application's design system

## Error Handling

- Form validation with user-friendly error messages
- API error handling with toast notifications
- Loading states for better UX
- Graceful degradation when services are unavailable
