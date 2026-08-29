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
      // Our privacy policy promises an unsubscribe route in every email we
      // send, so give mail clients a real one.
      headers: {
        'List-Unsubscribe': '<mailto:contact@berrybank.app?subject=Unsubscribe>',
      },
      text: [
        `${firstName},`,
        '',
        'You are on the list. We will write when something actually happens: a release, or a new place we have opened. Not more often than that.',
        '',
        'In the meantime, the Green Hub is live and worth a look. It connects local environmental organizations with supporters who want to fund their work, whether that is a river cleanup, tree planting, or habitat restoration.',
        '',
        'https://berrybank.app/green-hub',
        '',
        'Berry Fintech, Inc.',
        'San Antonio, Texas',
        'contact@berrybank.app',
        '',
        'To come off the list, reply to this email or write to contact@berrybank.app.',
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
              <td style="padding-bottom:28px;font-size:12px;letter-spacing:0.13em;text-transform:uppercase;color:#5C4B47;">
                Berry Bank
              </td>
            </tr>
            <tr>
              <td style="font-size:27px;line-height:1.15;letter-spacing:-0.02em;font-weight:600;padding-bottom:18px;">
                ${escape(firstName)}, you are on the list.
              </td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#4A3B38;padding-bottom:30px;">
                We will write when something actually happens: a release, or a new place we
                have opened. Not more often than that.
              </td>
            </tr>

            <tr>
              <td style="border-top:1px solid #DBD0CC;padding-top:28px;font-size:20px;line-height:1.25;letter-spacing:-0.015em;font-weight:600;padding-bottom:12px;">
                In the meantime, the Green Hub is live.
              </td>
            </tr>
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#4A3B38;padding-bottom:26px;">
                It connects local environmental organizations with supporters who want to fund
                their work, whether that is a river cleanup, tree planting, or habitat
                restoration. Have a look at what is happening near you.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:34px;">
                <a href="https://berrybank.app/green-hub"
                   style="display:inline-block;background:#9E1916;color:#FBF6F5;text-decoration:none;
                          padding:14px 24px;border-radius:2px;font-size:15px;font-weight:600;">
                  See the Green Hub
                </a>
              </td>
            </tr>

            <tr>
              <td style="border-top:1px solid #DBD0CC;padding-top:22px;font-size:13px;line-height:1.7;color:#736360;">
                Berry Fintech, Inc.<br />
                San Antonio, Texas<br />
                <a href="mailto:contact@berrybank.app" style="color:#736360;">contact@berrybank.app</a>
              </td>
            </tr>
            <tr>
              <td style="padding-top:14px;font-size:12px;line-height:1.6;color:#736360;">
                <a href="mailto:contact@berrybank.app?subject=Unsubscribe" style="color:#736360;">Unsubscribe</a> to come off the list.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
