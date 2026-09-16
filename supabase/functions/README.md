# RSVP notification function

The `notify-rsvp` Edge Function sends an email when a new row is inserted into `public.rsvps`.

## Supabase setup

1. Deploy `notify-rsvp` from the Supabase dashboard or CLI.
2. Add these Edge Function secrets:

```text
RESEND_API_KEY=your-resend-api-key
RSVP_NOTIFICATION_EMAIL=mistmago.dev@gmail.com
RSVP_WEBHOOK_SECRET=generate-a-long-random-secret
```

3. Create a Database Webhook for `public.rsvps`:
   - Event: `INSERT`
   - Target: Edge Function
   - Function: `notify-rsvp`
   - Header: `x-webhook-secret` with the same value as `RSVP_WEBHOOK_SECRET`
4. Send one test RSVP and confirm the email arrives at `mistmago.dev@gmail.com`.

For initial testing, Resend's `onboarding@resend.dev` sender can deliver to the email address associated with the Resend account. Verify a custom domain before production use.
