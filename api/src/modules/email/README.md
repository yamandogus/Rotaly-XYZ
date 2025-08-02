# Email Module - Rotaly XYZ

This module handles all email communications for the Rotaly XYZ platform using nodemailer and handlebars templates.

## Structure

```
├── README.md
├── partials
│   ├── footer.hbs
│   ├── header.hbs
│   └── styles.hbs
├── service.ts
└── templates
    ├── password-reset.hbs
    ├── verification.hbs
    └── welcome.hbs
```

## Features

- ✅ Email verification with OTP
- ✅ Password reset emails
- ✅ Welcome emails
- ✅ Modular template system with partials
- ✅ Responsive email design
- ✅ Environment variable configuration
- ✅ Handlebars templating system

## Templates

### 1. Verification Email (`verification.hbs`)

### 2. Password Reset Email (`password-reset.hbs`)

### 3. Welcome Email (`welcome.hbs`)

## Partials System

### Header (`partials/header.hbs`)

- Rotaly XYZ logo and branding
- Usage: `{{> partials/header title="Your Title"}}`

### Footer (`partials/footer.hbs`)

- Copyright information
- Customizable footer message
- Closing HTML tags
- Usage: `{{> partials/footer footerMessage="Your message"}}`

## Styling System

### Modifying Styles

- Edit `partials/styles.hbs` for global style changes
- Test responsive design on mobile devices

### Key Classes

- `.email-container`: Main email wrapper
- `.title.{type}`: Colored titles for different email types
- `.otp-container.{type}`: Styled OTP code containers
- `.features-grid`: Responsive grid for welcome email features
- `.highlight`: Brand color highlights

## Run Tests

From api folder run :

```bash
npx ts-node src/tests/test-email.ts
```

## Usage Examples

### Import the service

```typescript
import { emailService } from "../modules/email/service";
```

### Send verification email

```typescript
const success = await emailService.sendVerificationEmail(
  "user@example.com",
  "John Doe"
);
```

### Send password reset email

```typescript
const success = await emailService.sendPasswordResetEmail(
  "user@example.com",
  "John Doe"
);
```

### Send welcome email

```typescript
const success = await emailService.sendWelcomeEmail(
  "user@example.com",
  "John Doe"
);
```

## OTP Utility

### Generate OTP

```typescript
import { generateOTP } from "../utils/otp";

// Basic OTP (6 digits by default)
const otp = generateOTP();

// OTP (4 digits)
const otp = generateOTP(4);
```

## Error Handling

All email methods return a boolean indicating success/failure and log errors to the console:

## Dependencies

Make sure these packages are installed:

```bash
npm install nodemailer nodemailer-express-handlebars
npm install --save-dev @types/nodemailer @types/nodemailer-express-handlebars
```

## SMTP Configuration

This service is configured to use Brevo SMTP
