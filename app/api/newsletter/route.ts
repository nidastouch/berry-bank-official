import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = 'Berry Bank <noreply@berrybank.app>';

export async function POST(request: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Send this as JSON.' }, { status: 400 });
  }

  const firstName = String(payload.firstName ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const zipCode = String(payload.zipCode ?? '').trim();

  if (!firstName) {
    return NextResponse.json({ error: 'Add your first name.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email address does not look right.' }, { status: 400 });
  }

  if (zipCode && !/^\d{5}(-\d{4})?$/.test(zipCode)) {
    return NextResponse.json({ error: 'Use a five digit ZIP code.' }, { status: 400 });
  }

  // No key configured — accept the signup rather than showing an error in dev.
  if (!resend) {
    console.log('Signup received (Resend not configured):', { firstName, email, zipCode });
    return NextResponse.json({ success: true });
  }

  try {
    const { error: contactError } = await resend.contacts.create({
      email,
      firstName,
      unsubscribed: false,
    });

    if (contactError) {
      console.error('Resend contact error:', contactError);
    }
  } catch (err) {
    // A failure to store the contact should not cost the person their welcome email.
    console.error('Resend contact threw:', err);
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'You are on the Berry Bank list',
      text: [
        `${firstName},`,
        '',
        'Thanks for signing up. Berry Bank builds fundraising tools for individuals and for the organizations working in their neighborhoods.',
        '',
        'Our first platform, the Green Hub, is live. It connects local organizations with supporters who want to fund environmental projects in their own community:',
        'https://berrybank.app/green-hub',
        '',
        'We will write when we have released something or opened somewhere new. Not more often than that.',
        '',
        'Berry Fintech, Inc.',
        'San Antonio, Texas',
        'contact@berrybank.app',
      ].join('\n'),
      html: welcomeEmail(firstName),
    });
  } catch (err) {
    console.error('Resend send error:', err);
    // The person is on the list even if the welcome email bounced off our side.
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}

function welcomeEmail(firstName: string) {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F4EFED;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4EFED;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="max-width:520px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1C1210;">
            <tr>
              <td style="padding-bottom:28px;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;color:#9A8B87;">
                Berry Bank
              </td>
            </tr>
            <tr>
              <td style="font-size:26px;line-height:1.2;letter-spacing:-0.02em;font-weight:600;padding-bottom:18px;">
                ${escape(firstName)}, you are on the list.
              </td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#4A3B38;padding-bottom:16px;">
                Berry Bank builds fundraising tools for individuals and for the organizations
                working in their neighborhoods.
              </td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#4A3B38;padding-bottom:28px;">
                Our first platform, the Green Hub, is live. It connects local organizations with
                supporters who want to fund environmental projects in their own community.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:32px;">
                <a href="https://berrybank.app/green-hub"
                   style="display:inline-block;background:#9E1916;color:#FBF6F5;text-decoration:none;
                          padding:13px 22px;border-radius:2px;font-size:15px;font-weight:600;">
                  See the Green Hub
                </a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #DBD0CC;padding-top:20px;font-size:15px;line-height:1.6;color:#4A3B38;">
                We will write when we have released something or opened somewhere new.
                Not more often than that.
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-size:12px;line-height:1.7;color:#9A8B87;">
                Berry Fintech, Inc.<br />
                San Antonio, Texas<br />
                <a href="mailto:contact@berrybank.app" style="color:#9A8B87;">contact@berrybank.app</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
