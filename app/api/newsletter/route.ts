import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'] as const;

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, zipCode, phone, ageRange } = await request.json();

    // 1. Validate required fields
    if (!firstName || !lastName || !email || !ageRange) {
      return NextResponse.json(
        { error: 'First name, last name, email, and age range are required.' },
        { status: 400 }
      );
    }

    // 2. Validate Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 3. Validate age range
    if (!AGE_RANGES.includes(ageRange)) {
      return NextResponse.json(
        { error: 'Invalid age range' },
        { status: 400 }
      );
    }

    // 4. Validate optional phone format (digits, spaces, dashes, parens, plus)
    if (phone && !/^[\d\s\-().+]+$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // 5. Check configuration
    if (!process.env.RESEND_API_KEY) {
      console.log('Newsletter signup (Resend not configured):', { firstName, lastName, email, zipCode, phone, ageRange });
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed (Demo Mode)',
      });
    }

    // 6. Add to Resend Contacts with metadata
    try {
      const { data, error } = await resend!.contacts.create({
        email,
        firstName: firstName,
        lastName: lastName,
        unsubscribed: false,
      });

      if (error) {
        console.error('Resend Contact Error:', error);
      } else {
        console.log('Resend Contact Success:', data);
      }
    } catch (contactError) {
      // Don't block the welcome email if contact storage fails
      console.error('Could not add to contacts:', contactError);
    }

    // 7. Send Welcome Email
    await resend!.emails.send({
      from: 'Berry Bank <noreply@berrybank.app>',
      to: email,
      subject: 'Welcome to Berry Bank! 🌱',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; background-color: #0B0B0B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              
              <!-- Logo / Icon -->
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">🌱</span>
              </div>

              <!-- Headline -->
              <h1 style="color: #FAFAFA; text-align: center; font-size: 28px; margin: 0 0 8px 0;">
                Welcome, ${firstName}!
              </h1>
              <p style="color: #16A075; text-align: center; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 30px 0;">
                Latin America's First Green Digital Bank
              </p>

              <!-- Divider -->
              <div style="width: 60px; height: 3px; background: linear-gradient(90deg, #9E1916, #16A075); margin: 0 auto 30px auto; border-radius: 2px;"></div>

              <!-- Body -->
              <p style="color: #FAFAFA; text-align: center; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; opacity: 0.9;">
                Thank you for joining the green banking movement! You're now on our waitlist and will be among the first to know when we launch.
              </p>

              <!-- Stat Highlight -->
              <div style="background-color: rgba(22, 160, 117, 0.1); border: 1px solid rgba(22, 160, 117, 0.2); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
                <p style="color: #FAFAFA; font-size: 14px; margin: 0; opacity: 0.7;">
                  <strong style="color: #16A075;">Did you know?</strong> Switching to a green bank reduces your carbon footprint by <strong style="color: #16A075;">52.2%</strong>.
                </p>
              </div>

              <!-- Divider -->
              <div style="width: 100%; height: 1px; background-color: rgba(250, 250, 250, 0.1); margin: 30px 0;"></div>

              <!-- Footer -->
              <p style="color: #FAFAFA; text-align: center; font-size: 12px; opacity: 0.4; margin: 0 0 8px 0;">
                © ${new Date().getFullYear()} Berry Fintech, Inc. | Austin, TX
              </p>
              <p style="text-align: center; margin: 0;">
                <a href="https://berrybank.app/privacy" style="color: #9E1916; font-size: 12px; text-decoration: none;">Privacy Policy</a>
              </p>

            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the newsletter!',
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}