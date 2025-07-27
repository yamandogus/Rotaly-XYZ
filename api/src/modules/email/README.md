# Email Service Documentation

This email service is built using nodemailer and nodemailer-express-handlebars with Brevo (formerly Sendinblue) SMTP configuration.

## Features

- ✅ Email verification with OTP
- ✅ Password reset emails
- ✅ Welcome emails
- ✅ Booking confirmation emails
- ✅ HTML email templates with Handlebars
- ✅ Environment variable configuration

## Files Created

```
api/src/config/email.ts                           # Email configuration and transporter
api/src/modules/email/service.ts                  # Email service class with methods
api/src/modules/email/templates/verification.html # Verification email template
api/src/modules/email/templates/password-reset.html # Password reset email template
api/src/utils/otp.ts                              # OTP generation utility
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
