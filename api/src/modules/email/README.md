# Email Module - Rotaly XYZ

This module handles all email communications for the Rotaly XYZ platform using nodemailer and handlebars templates.

## Features

- Email verification with OTP
- Password reset emails
- Welcome emails
- Contact form forwarding
- **Multi-language support (English & Turkish)**
- Modular template system with partials
- Responsive email design
- Environment variable configuration
- Handlebars templating system

## Run Tests

From api folder run:

```bash
# Test all email templates
npx ts-node src/tests/test-all-emails.ts

# Test individual email types
npx ts-node src/tests/test-verification-email.ts
npx ts-node src/tests/test-password-reset-email.ts
npx ts-node src/tests/test-welcome-email.ts
npx ts-node src/tests/test-contact-email.ts
```

## Templates

### Multi-Language Support

All email templates are both in English (`en/`) and Turkish (`tr/`) versions:

### 1. Verification Email (`verification.hbs`)

- **English**: `en/verification.hbs`
- **Turkish**: `tr/verification.hbs`

### 2. Password Reset Email (`password-reset.hbs`)

- **English**: `en/password-reset.hbs`
- **Turkish**: `tr/password-reset.hbs`

### 3. Welcome Email (`welcome.hbs`)

- **English**: `en/welcome.hbs`
- **Turkish**: `tr/welcome.hbs`

### 4. Contact Form Email (`contact.hbs`)

- **English**: `en/contact.hbs`
- **Turkish**: `tr/contact.hbs`

## Partials System

### Header (`partials/header.hbs`)

- Rotaly XYZ logo and branding
- Usage: `{{> partials/header title="Your Title"}}`

### Footer (`partials/footer.hbs`)

- Copyright information
- Customizable footer message
- Usage: `{{> partials/footer footerMessage="Your message"}}`

## Usage Examples

### Import the service

```typescript
import { emailService } from "../modules/email/service";
```

### Send verification email

```typescript
// English (default)
const success = await emailService.sendVerificationEmail(
  "user@example.com",
  "John Doe"
);

// Turkish
const success = await emailService.sendVerificationEmail(
  "user@example.com",
  "Ahmet Yılmaz",
  "tr"
);
```

### Send password reset email

```typescript
// English (default)
const success = await emailService.sendPasswordResetEmail(
  "user@example.com",
  "John Doe"
);

// Turkish
const success = await emailService.sendPasswordResetEmail(
  "user@example.com",
  "Ahmet Yılmaz",
  "tr"
);
```

### Send welcome email

```typescript
// English (default)
const success = await emailService.sendWelcomeEmail(
  "user@example.com",
  "John Doe"
);

// Turkish
const success = await emailService.sendWelcomeEmail(
  "user@example.com",
  "Ahmet Yılmaz",
  "tr"
);
```

### Send contact form email

```typescript
// English (default)
const success = await emailService.sendContactEmail(
  "user@example.com",
  "John Doe",
  "Support Request",
  "I need help with my booking."
);

// Turkish
const success = await emailService.sendContactEmail(
  "user@example.com",
  "Ahmet Yılmaz",
  "Destek Talebi",
  "Rezervasyonumla ilgili yardıma ihtiyacım var.",
  "tr"
);
```

## API Routes

### With Locale Parameter !

```bash
# English emails
POST /api/email/en/verification
POST /api/email/en/password-reset
POST /api/email/en/welcome
POST /api/email/en/contact-us

# Turkish emails
POST /api/email/tr/verification
POST /api/email/tr/password-reset
POST /api/email/tr/welcome
POST /api/email/tr/contact-us
```

### Legacy Routes (Backward Compatibility)

```bash
# Defaults to English if no locale is provided
POST /api/email/verification
POST /api/email/password-reset
POST /api/email/welcome
POST /api/email/contact-us
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

All email methods return a boolean indicating success/failure

## SMTP Configuration

This service is configured to use Brevo SMTP
