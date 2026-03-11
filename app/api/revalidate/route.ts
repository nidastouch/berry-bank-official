import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation webhook for Sanity Studio.
 *
 * HOW TO CONNECT:
 * 1. In Sanity.io dashboard → API → Webhooks, create a new webhook:
 *    - URL: https://your-domain.com/api/revalidate
 *    - Trigger on: Create, Update, Delete
 *    - Filter: leave blank (all document types)
 *    - Secret: set a strong secret string
 * 2. Add that same secret as SANITY_REVALIDATE_SECRET in your Vercel env vars.
 *
 * When content is published in Sanity, this endpoint purges the Next.js cache
 * so changes appear on the live site immediately (within seconds).
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Parse the Sanity webhook body to identify what changed
    const body = await request.json().catch(() => null);
    const type = body?._type;

    // Revalidate all pages - simple and reliable approach
    // For a site this size, revalidating all paths is fast and ensures
    // no stale content remains anywhere (e.g., company info appears on every page)
    revalidatePath('/', 'layout');

    console.log(`[Revalidation] Triggered by ${type || 'unknown'} document change. All pages revalidated.`);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: type || 'unknown',
    });
  } catch (err) {
    console.error('[Revalidation] Error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
