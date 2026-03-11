import { M_PLUS_2 } from 'next/font/google';
import '@/app/globals.css';
import { FlyoutNav, FloatingDock, LoadingScreen } from '@/components/core';
import { Cart } from '@/components/shop';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';

const mplus = M_PLUS_2({
  subsets: ['latin'],
  variable: '--font-mplus',
  display: 'swap',
});

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className={`${mplus.variable} font-sans bg-void text-mist antialiased`}>
      <LoadingScreen />
      <FlyoutNav />
      <FloatingDock />
      <Cart />
      {children}
      {isDraft && (
        <VisualEditing />
      )}
    </div>
  );
}
