import React from 'react';
import { mockListings } from '@/data/mock-listings';
import { ListingDetailClient } from '@/components/listing/ListingDetailClient';

export function generateStaticParams() {
  return mockListings.map((l) => ({ slug: l.slug || l.id }));
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <ListingDetailClient slug={resolvedParams.slug} />;
}
