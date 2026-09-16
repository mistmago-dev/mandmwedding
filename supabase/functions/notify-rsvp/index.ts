const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

type RsvpRecord = {
	full_name: string;
	contact: string;
	guest_count: number;
	guest_names: string | null;
	message: string | null;
	created_at: string;
};

function escapeHtml(value: string | number | null) {
	return String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

Deno.serve(async (request) => {
	if (request.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	if (request.method !== 'POST') {
		return new Response('Method not allowed', { status: 405, headers: corsHeaders });
	}

	const webhookSecret = Deno.env.get('RSVP_WEBHOOK_SECRET');
	if (!webhookSecret || request.headers.get('x-webhook-secret') !== webhookSecret) {
		return new Response('Unauthorized', { status: 401, headers: corsHeaders });
	}

	const resendApiKey = Deno.env.get('RESEND_API_KEY');
	const notificationEmail = Deno.env.get('RSVP_NOTIFICATION_EMAIL');
	if (!resendApiKey || !notificationEmail) {
		return new Response('Email notification is not configured', { status: 500, headers: corsHeaders });
	}

	const payload = await request.json();
	const record = payload.record as RsvpRecord | undefined;
	if (!record?.full_name || !record.contact || !record.guest_count) {
		return new Response('Invalid RSVP payload', { status: 400, headers: corsHeaders });
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			from: 'Wedding RSVP <onboarding@resend.dev>',
			to: [notificationEmail],
			subject: `New RSVP from ${record.full_name}`,
			html: `
				<h2>New RSVP received</h2>
				<p><strong>Name:</strong> ${escapeHtml(record.full_name)}</p>
				<p><strong>Contact:</strong> ${escapeHtml(record.contact)}</p>
				<p><strong>Guests:</strong> ${escapeHtml(record.guest_count)}</p>
				<p><strong>Guest names:</strong> ${escapeHtml(record.guest_names) || 'Not provided'}</p>
				<p><strong>Message:</strong> ${escapeHtml(record.message) || 'No message'}</p>
			`,
		}),
	});

	if (!response.ok) {
		const error = await response.text();
		console.error('Resend error:', error);
		return new Response('Unable to send notification email', { status: 502, headers: corsHeaders });
	}

	return new Response(JSON.stringify({ sent: true }), {
		status: 200,
		headers: { ...corsHeaders, 'Content-Type': 'application/json' },
	});
});
