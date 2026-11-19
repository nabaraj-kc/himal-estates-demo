import React from 'react';
import { Metadata } from 'next';
import { NotificationsClient } from '@/components/notifications/NotificationsClient';

export const metadata: Metadata = {
  title: 'Notifications | Himal Estates',
  description: 'Price drops, agent replies and verification updates on Nepal properties.',
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
