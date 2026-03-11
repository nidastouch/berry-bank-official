import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirect') || '/';

  (await draftMode()).enable();

  redirect(redirectTo);
}
