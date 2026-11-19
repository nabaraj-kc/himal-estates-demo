'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '@/lib/storage';
import { AppNotification } from '@/types';
import {
  Bell,
  ArrowDown,
  MessageCircle,
  CheckCircle2,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';

export function NotificationsClient() {
  const router = useRouter();
  const { isNepali } = useLanguage();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const loadNotifs = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    loadNotifs();

    window.addEventListener('himal_notifications_changed', loadNotifs);
    window.addEventListener('storage', loadNotifs);

    return () => {
      window.removeEventListener('himal_notifications_changed', loadNotifs);
      window.removeEventListener('storage', loadNotifs);
    };
  }, []);

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    loadNotifs();
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationRead(notif.id);
    if (notif.linkUrl) {
      router.push(notif.linkUrl);
    }
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'price_drop':
        return <ArrowDown className="w-4 h-4 stroke-[2]" />;
      case 'message':
        return <MessageCircle className="w-4 h-4 stroke-[1.75]" />;
      case 'approval':
        return <CheckCircle2 className="w-4 h-4 stroke-[1.75]" />;
      default:
        return <Bell className="w-4 h-4 stroke-[1.75]" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F0F0F]">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] flex items-center justify-center">
              <Bell className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-2xl text-[#0F0F0F] tracking-tight">
                {isNepali ? 'सूचना तथा गतिविधि' : 'Notifications'}
              </h1>
              <p className="text-xs text-[#71717A] mt-0.5">
                {isNepali
                  ? 'मूल्य परिवर्तन, एजेन्ट सन्देश तथा सूचीकरण अपडेट'
                  : 'Price drops, agent replies, and listing verifications'}
              </p>
            </div>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-white hover:bg-[#F5F5F7] text-xs font-semibold text-[#0F0F0F] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#71717A]" />
            <span>{isNepali ? 'सबै पढेको चिन्ह लगाउनुहोस्' : 'Mark all as read'}</span>
          </button>
        </div>

        {/* Notifications Feed */}
        {notifications.length === 0 ? (
          <div className="p-12 text-center border border-[#E5E5E5] rounded-xl bg-[#F5F5F7]">
            <Bell className="w-8 h-8 mx-auto text-[#71717A] mb-2" />
            <p className="text-sm font-semibold text-[#0F0F0F]">
              {isNepali ? 'कुनै सूचना छैन' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden divide-y divide-[#E5E5E5] bg-white shadow-sm">
            {notifications.map((notif) => {
              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 flex items-start gap-3.5 hover:bg-[#F5F5F7] transition-colors cursor-pointer ${
                    !notif.isRead ? 'bg-[#F5F5F7]/40' : ''
                  }`}
                >
                  {/* Icon badge */}
                  <div className="w-9 h-9 rounded-lg bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h3
                        className={`text-xs sm:text-sm text-[#0F0F0F] truncate ${
                          !notif.isRead ? 'font-bold' : 'font-semibold'
                        }`}
                      >
                        {isNepali && notif.titleNe ? notif.titleNe : notif.title}
                      </h3>

                      <span className="text-[10px] text-[#71717A] flex-shrink-0">
                        {new Date(notif.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="text-xs text-[#71717A] leading-relaxed">
                      {isNepali && notif.descriptionNe ? notif.descriptionNe : notif.description}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {!notif.isRead ? (
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] flex-shrink-0 mt-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#71717A] flex-shrink-0 mt-1.5" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
