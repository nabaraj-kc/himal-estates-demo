'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutGrid,
  PlusSquare,
  Bell,
  User,
} from 'lucide-react';
import { getUnreadNotificationsCount } from '@/lib/storage';
import { useLanguage } from '@/context/LanguageContext';

export function BottomNav() {
  const pathname = usePathname();
  const { isNepali } = useLanguage();
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setUnreadNotifs(getUnreadNotificationsCount());
    };
    updateCounts();

    window.addEventListener('himal_notifications_changed', updateCounts);
    window.addEventListener('storage', updateCounts);

    return () => {
      window.removeEventListener('himal_notifications_changed', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const navItems = [
    {
      href: '/',
      label: isNepali ? 'होम' : 'Home',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      href: '/categories',
      label: isNepali ? 'श्रेणी' : 'Categories',
      icon: LayoutGrid,
      isActive: pathname.startsWith('/categories'),
    },
    {
      href: '/post',
      label: isNepali ? 'पोस्ट' : 'Post Ad',
      icon: PlusSquare,
      isActive: pathname === '/post' || pathname === '/list-property',
    },
    {
      href: '/notifications',
      label: isNepali ? 'सूचना' : 'Notifications',
      icon: Bell,
      isActive: pathname.startsWith('/notifications'),
      badge: unreadNotifs > 0,
    },
    {
      href: '/account',
      label: isNepali ? 'खाता' : 'Account',
      icon: User,
      isActive: pathname === '/account' || pathname === '/profile',
    },
  ];

  return (
    <nav
      aria-label="Hamrobazar Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E5E5E5] h-16 px-1 flex items-center justify-around"
    >
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <div className="relative">
              <div
                className={`flex items-center justify-center transition-colors ${
                  item.isActive
                    ? 'bg-[#F5F5F7] rounded-xl p-1.5 text-[#0F0F0F]'
                    : 'p-1.5 text-[#71717A] hover:text-[#0F0F0F]'
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.75} />
              </div>

              {/* Minimal Unread Dot (Dark Charcoal or subtle Red) */}
              {item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
              )}
            </div>

            <span
              className={`text-[10px] leading-tight mt-0.5 ${
                item.isActive ? 'font-semibold text-[#0F0F0F]' : 'font-normal text-[#71717A]'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
