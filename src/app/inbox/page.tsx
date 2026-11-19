import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { InboxClient } from '@/components/inbox/InboxClient';

export const metadata: Metadata = {
  title: 'Client-Agent Inbox | Himal Estates',
  description: 'Direct verified chat and instant phone calls with assigned middleman brokers for properties in Nepal.',
};

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 text-sm">
          Loading inbox...
        </div>
      }
    >
      <InboxClient />
    </Suspense>
  );
}
