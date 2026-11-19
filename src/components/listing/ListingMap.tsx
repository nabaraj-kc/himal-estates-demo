'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Listing } from '@/types';
import { formatNPRShort } from '@/lib/utils';
import { MapPin, Navigation } from 'lucide-react';

interface ListingMapProps {
  listings: Listing[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  selectedListingId?: string;
  onSelectListing?: (id: string) => void;
}

export function ListingMap({
  listings,
  center = [27.700769, 85.30014], // Kathmandu valley center
  zoom = 12,
  className = 'w-full h-full min-h-[420px] rounded-2xl',
  selectedListingId,
  onSelectListing,
}: ListingMapProps) {
  const [mounted, setMounted] = useState(false);
  const [mapContainerId] = useState(`map-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let mapInstance: any = null;

    // Dynamically import Leaflet only in browser
    import('leaflet').then((L) => {
      // Fix default Leaflet icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const container = document.getElementById(mapContainerId);
      if (!container) return;

      // Initialize map
      mapInstance = L.map(container).setView(center, zoom);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Create custom price badge markers
      listings.forEach((listing) => {
        if (!listing.location.mapLat || !listing.location.mapLng) return;

        const isSelected = selectedListingId === listing.id;
        const priceLabel = formatNPRShort(listing.price);

        // Custom HTML DivIcon for modern pin with price
        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `
            <div style="
              background-color: ${isSelected ? '#0F0F0F' : '#27272A'};
              color: white;
              padding: 4px 8px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
              border: 2px solid ${isSelected ? '#0F0F0F' : '#FFFFFF'};
              white-space: nowrap;
              cursor: pointer;
              transform: translate(-50%, -50%);
              transition: transform 0.2s;
            ">
              ${priceLabel}
            </div>
          `,
          iconSize: [60, 24],
          iconAnchor: [30, 12],
        });

        const marker = L.marker([listing.location.mapLat, listing.location.mapLng], {
          icon: customIcon,
        }).addTo(mapInstance);

        // Popup content with property photo and link
        const imgUrl = listing.images[0]?.url || '';
        const popupContent = `
          <div style="width: 200px; font-family: inherit; padding: 2px;">
            ${imgUrl ? `<img src="${imgUrl}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />` : ''}
            <div style="font-weight: 700; font-size: 13px; color: #0F0F0F; line-height: 1.2; margin-bottom: 4px;">
              ${listing.title}
            </div>
            <div style="color: #0F0F0F; font-weight: 800; font-size: 13px; margin-bottom: 4px;">
              ${priceLabel}
            </div>
            <div style="font-size: 11px; color: #71717A; margin-bottom: 8px;">
              📍 ${listing.location.tole || ''} ${listing.location.district || listing.location.city}
            </div>
            <a href="/listings/${listing.slug || listing.id}" style="
              display: block;
              text-align: center;
              background-color: #0F0F0F;
              color: white;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              text-decoration: none;
            ">
              View Details
            </a>
          </div>
        `;

        marker.bindPopup(popupContent);

        if (onSelectListing) {
          marker.on('click', () => {
            onSelectListing(listing.id);
          });
        }
      });
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mounted, listings, center, zoom, selectedListingId, mapContainerId, onSelectListing]);

  if (!mounted) {
    return (
      <div className={`${className} bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400 text-xs`}>
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#0F0F0F] animate-spin" />
          <span>Loading Nepal Property Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div id={mapContainerId} className={className} />
    </div>
  );
}
