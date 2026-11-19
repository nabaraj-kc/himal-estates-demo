import React from 'react';
import { Metadata } from 'next';
import { CategoriesClient } from '@/components/categories/CategoriesClient';

export const metadata: Metadata = {
  title: 'Categories & Subcategories | Himal Estates',
  description: 'Structured directory of flats, apartments, houses, land, shutters and running businesses in Nepal.',
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
