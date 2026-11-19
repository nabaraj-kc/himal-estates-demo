'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, Plus, MessageSquare, User } from 'lucide-react';
import { getFavoriteIds, getTotalUnreadCount } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';

export function BottomNav() {
  const pathname = usePathname();
  const { isNepali } = useLanguage();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setFavoriteCount(getFavoriteIds().length);
      setUnreadCount(getTotalUnreadCount());
    };

    updateCounts();

    window.addEventListener('himal_favorites_changed', updateCounts);
    window.addEventListener('himal_conversations_changed', updateCounts);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('himal_favorites_changed', updateCounts);
      window.removeEventListener('himal_conversations_changed', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const navItems = [
    {
      href: '/',
      label: isNepali ? 'गृहपृष्ठ' : 'Home',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      href: '/saved',
      label: isNepali ? 'सुरक्षित' : 'Saved',
      icon: Heart,
      isActive: pathname === '/saved',
      badge: favoriteCount > 0 ? favoriteCount : undefined,
    },
    {
      href: '/list-property',
      label: isNepali ? 'पोस्ट (+)' : 'Post (+)',
      icon: Plus,
      isCenter: true,
      isActive: pathname === '/list-property',
    },
    {
      href: '/inbox',
      label: isNepali ? 'इन्बक्स' : 'Inbox',
      icon: MessageSquare,
      isActive: pathname.startsWith('/inbox'),
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      href: '/profile',
      label: isNepali ? 'प्रोफाइल' : 'Profile',
      icon: User,
      isActive: pathname === '/profile',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-teal-800 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform group-hover:bg-teal-900 border-2 border-white">
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-teal-800 mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                item.isActive ? 'text-teal-800' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    item.isActive ? 'stroke-[2.2] text-teal-800' : 'text-gray-500'
                  }`}
                />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 leading-none ${
                  item.isActive ? 'font-bold text-teal-800' : 'font-medium text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
