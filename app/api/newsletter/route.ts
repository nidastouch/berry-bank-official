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

  // Same tokens as the site. Tables and inline styles throughout, because
  // Outlook ignores stylesheets and Gmail strips SVG.
  const PAPER = '#F4EFED';
  const PANEL = '#EBE3E0';
  const RULE = '#DBD0CC';
  const INK = '#1C1210';
  const INK_SOFT = '#5C4B47';
  const INK_FAINT = '#736360';
  const BERRY = '#9E1916';
  const ON_BERRY = '#FBF6F5';
  const ON_BERRY_SOFT = '#E4BFBD'; // 75% paper over berry, pre-blended for Outlook
  const GROWTH = '#16A075';

  const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
  const MONO = "'SF Mono',SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace";

  const name = escape(firstName);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>You are on the Berry Bank list</title>
</head>
<body style="margin:0;padding:0;width:100%;background:${PAPER};">

<!-- Inbox preview line, hidden in the body itself. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
  The Green Hub is live. Have a look at what is happening near you.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       bgcolor="${PAPER}" style="background:${PAPER};border-collapse:collapse;">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
             style="width:560px;max-width:560px;border-collapse:collapse;font-family:${SANS};">

        <!-- Masthead: the site's one bold colour field, with the mark in it. -->
        <tr>
          <td bgcolor="${BERRY}" style="background:${BERRY};padding:30px 32px 32px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border-collapse:collapse;">
              <tr>
                <td valign="middle" style="font-family:${MONO};font-size:11px;letter-spacing:0.16em;
                           text-transform:uppercase;color:${ON_BERRY_SOFT};padding-bottom:22px;">
                  Berry Bank
                </td>
              </tr>
              <tr>
                <td valign="bottom" style="font-family:${SANS};font-size:30px;line-height:1.1;
                           letter-spacing:-0.02em;font-weight:700;color:${ON_BERRY};padding-right:12px;">
                  ${name},<br />you are on the list.
                </td>
                <td valign="bottom" width="104" style="width:104px;">
                  <img src="https://berrybank.app/email/berry-mark-paper.png"
                       width="104" height="158" alt=""
                       style="display:block;width:104px;height:158px;border:0;outline:none;text-decoration:none;background:${BERRY};" />
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- What the list actually means -->
        <tr>
          <td style="padding:34px 32px 0 32px;font-family:${SANS};font-size:16px;line-height:1.6;color:${INK_SOFT};">
            We will write when something actually happens: a release, or a new place we have
            opened. Not more often than that.
          </td>
        </tr>

        <!-- The thing to do now -->
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   bgcolor="${PANEL}" style="background:${PANEL};border-collapse:collapse;">
              <tr>
                <td style="padding:26px 26px 28px 26px;">

                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                         style="border-collapse:collapse;">
                    <tr>
                      <td width="7" height="7" bgcolor="${GROWTH}"
                          style="width:7px;height:7px;background:${GROWTH};font-size:0;line-height:0;">&nbsp;</td>
                      <td style="padding-left:9px;font-family:${MONO};font-size:11px;letter-spacing:0.14em;
                                 text-transform:uppercase;color:${INK_SOFT};">
                        Live now
                      </td>
                    </tr>
                  </table>

                  <div style="font-family:${SANS};font-size:21px;line-height:1.25;letter-spacing:-0.015em;
                              font-weight:700;color:${INK};padding:14px 0 10px 0;">
                    In the meantime, the Green Hub is live.
                  </div>

                  <div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${INK_SOFT};padding-bottom:22px;">
                    It connects local environmental organizations with supporters who want to fund
                    their work, whether that is a river cleanup, tree planting, or habitat
                    restoration. Have a look at what is happening near you.
                  </div>

                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                         style="border-collapse:collapse;">
                    <tr>
                      <td bgcolor="${BERRY}" style="background:${BERRY};">
                        <a href="https://berrybank.app/green-hub"
                           style="display:block;padding:13px 24px;font-family:${SANS};font-size:15px;
                                  font-weight:600;color:${ON_BERRY};text-decoration:none;">
                          See the Green Hub
                        </a>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:30px 32px 0 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border-collapse:collapse;">
              <tr><td height="1" bgcolor="${RULE}"
                      style="height:1px;background:${RULE};font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0 32px;font-family:${SANS};font-size:13px;line-height:1.7;color:${INK_FAINT};">
            Berry Fintech, Inc.<br />
            San Antonio, Texas<br />
            <a href="mailto:contact@berrybank.app" style="color:${INK_FAINT};text-decoration:underline;">contact@berrybank.app</a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 32px 8px 32px;font-family:${SANS};font-size:12px;line-height:1.6;color:${INK_FAINT};">
            <a href="mailto:contact@berrybank.app?subject=Unsubscribe" style="color:${INK_FAINT};text-decoration:underline;">Unsubscribe</a> to come off the list.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
