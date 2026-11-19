'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  getConversations,
  getConversationById,
  getOrCreateConversationForListing,
  sendMessageToConversation,
  markConversationRead,
} from '@/lib/storage';
import { Conversation, InboxMessage } from '@/types';
import { formatNPR } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  Send,
  ArrowLeft,
  Search,
  CheckCheck,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Building,
  User,
} from 'lucide-react';

export function InboxClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const listingIdParam = searchParams.get('listingId');
  const convIdParam = searchParams.get('convId');
  const { isNepali } = useLanguage();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load and sync conversations
  const loadConversations = () => {
    let list = getConversations();

    // If listingId was passed in query, get or create that conversation
    if (listingIdParam) {
      const active = getOrCreateConversationForListing(listingIdParam);
      list = getConversations();
      setSelectedConvId(active.id);
    } else if (convIdParam) {
      setSelectedConvId(convIdParam);
    } else if (!selectedConvId && list.length > 0) {
      // Default to first conversation on desktop
      setSelectedConvId(list[0].id);
    }

    setConversations(list);
  };

  useEffect(() => {
    loadConversations();

    const handleSync = () => {
      setConversations(getConversations());
    };
    window.addEventListener('himal_conversations_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('himal_conversations_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [listingIdParam, convIdParam]);

  const activeConversation = conversations.find((c) => c.id === selectedConvId) || null;

  // Mark as read when selected
  useEffect(() => {
    if (activeConversation && activeConversation.unreadCount > 0) {
      markConversationRead(activeConversation.id);
    }
  }, [selectedConvId, activeConversation?.unreadCount]);

  // Scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isAgentTyping]);

  const handleSendMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || messageInput).trim();
    if (!textToSend || !activeConversation) return;

    // Send client message
    sendMessageToConversation(activeConversation.id, textToSend, 'client');
    setMessageInput('');

    // Simulate Agent auto-reply after 1.2s
    setIsAgentTyping(true);
    setTimeout(() => {
      let replyText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('visit') || lower.includes('inspect') || lower.includes('भ्रमण') || lower.includes('कहिले')) {
        replyText = isNepali
          ? 'नमस्ते! म भोलि दिउँसो २ बजे स्थलगत निरीक्षण मिलाइदिन्छु। म तपाईंसँगै उपस्थित भएर लालपुर्जा र सिमाना देखाउनेछु।'
          : 'Namaste! I can schedule an on-site inspection for tomorrow afternoon. I will personally accompany you with the ownership deed copy.';
      } else if (lower.includes('price') || lower.includes('negotiable') || lower.includes('सस्तो') || lower.includes('मूल्य')) {
        replyText = isNepali
          ? 'मालिकसँग केही प्रतिशत मूल्य घटाउने छलफल हुन सक्छ। तपाईंको अन्तिम अफर कति हो, म कुरा अगाडि बढाउँछु।'
          : 'The owner is open to reasonable negotiations for serious buyers. Let me know your best offer and I will advocate for you.';
      } else if (lower.includes('lalpurja') || lower.includes('road') || lower.includes('नक्सा') || lower.includes('बाटो')) {
        replyText = isNepali
          ? 'हाम्रो टोलीले नापी ट्रेस नक्सा र सडक चौडाइ स्थलगत जाँच गरिसकेको छ। सम्पूर्ण कानुनी कागजात १००% दुरुस्त छन्।'
          : 'Our field team has cross-verified the cadastral map and exact road width. The documents are 100% dispute-free.';
      } else {
        replyText = isNepali
          ? `सोधपुछको लागि धन्यवाद! म यस सम्पत्तिको थप विवरण तपाईंको सम्पर्कमा उपलब्ध गराउँछु। तपाईं मलाई सिधै ${activeConversation.agentPhone} मा फोन गर्न पनि सक्नुहुन्छ!`
          : `Thank you for your message! I will assist you throughout this deal. You can also tap 'Call Agent' above to speak with me directly at ${activeConversation.agentPhone}!`;
      }

      sendMessageToConversation(activeConversation.id, replyText, 'agent');
      setIsAgentTyping(false);
    }, 1200);
  };

  const filteredConversations = conversations.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.listingTitle.toLowerCase().includes(q) ||
      c.agentName.toLowerCase().includes(q) ||
      c.listingLocation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Breadcrumb / Status header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              {isNepali ? 'इन्बक्स तथा सन्देशहरू' : 'Client-Agent Inbox'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {isNepali
                ? 'प्रमाणित ब्रोकरहरूसँग सिधै सन्देश आदानप्रदान वा फोन कल गर्नुहोस्'
                : 'Direct verified chat & instant phone calls with assigned middleman brokers'}
            </p>
          </div>
          <div className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {conversations.length} {isNepali ? 'कुराकानीहरू' : 'Conversations'}
          </div>
        </div>

        {/* 2-Column Inbox Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm min-h-[620px]">
          {/* LEFT COLUMN: Conversation List (Visible on desktop, or on mobile when no conversation is selected) */}
          <div
            className={`md:col-span-4 lg:col-span-4 border-r border-gray-200 flex flex-col ${
              selectedConvId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Search filter */}
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isNepali ? 'सम्पत्ति वा एजेन्ट खोज्नुहोस्...' : 'Search chats or agents...'}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F0F0F]"
                />
              </div>
            </div>

            {/* Conversation Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <span>{isNepali ? 'कुनै सन्देश फेला परेन' : 'No conversations found'}</span>
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const lastMsg = conv.messages[conv.messages.length - 1];
                  const isSelected = conv.id === selectedConvId;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => {
                        setSelectedConvId(conv.id);
                        markConversationRead(conv.id);
                      }}
                      className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors hover:bg-[#F5F5F7] ${
                        isSelected ? 'bg-[#F5F5F7] border-l-4 border-[#0F0F0F]' : ''
                      }`}
                    >
                      {/* Property Thumbnail */}
                      <img
                        src={conv.listingImage}
                        alt={conv.listingTitle}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-[#E5E5E5]"
                      />

                      {/* Info & Last message */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1 mb-0.5">
                          <span className="font-semibold text-xs sm:text-sm text-[#0F0F0F] truncate">
                            {conv.agentName}
                          </span>
                          <span className="text-[10px] text-[#71717A] flex-shrink-0">
                            {new Date(conv.updatedAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <p className="text-[11px] font-medium text-[#71717A] truncate">
                          {conv.listingTitle}
                        </p>

                        <p className="text-xs text-[#71717A] truncate mt-0.5">
                          {lastMsg ? lastMsg.text : 'No messages yet'}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {conv.unreadCount > 0 && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] flex-shrink-0 mt-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Active Conversation Thread */}
          <div
            className={`md:col-span-8 lg:col-span-8 flex flex-col bg-white ${
              !selectedConvId ? 'hidden md:flex' : 'flex'
            }`}
          >
            {activeConversation ? (
              <>
                {/* 1. Chat Header with Back Button & Direct Call Agent Action */}
                <div className="p-3.5 sm:p-4 border-b border-gray-200 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Mobile Back Button */}
                    <button
                      onClick={() => setSelectedConvId(null)}
                      className="md:hidden p-1.5 -ml-1 text-gray-600 hover:text-gray-900 rounded-lg"
                      aria-label="Back to chat list"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="w-9 h-9 rounded-full bg-[#0F0F0F] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {activeConversation.agentName.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#0F0F0F] truncate">
                          {activeConversation.agentName}
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#71717A] flex-shrink-0" />
                      </div>
                      <p className="text-[11px] text-[#71717A] truncate">
                        {activeConversation.agentRole} • {activeConversation.agentPhone}
                      </p>
                    </div>
                  </div>

                  {/* Direct Call Agent Button */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${activeConversation.agentPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F0F0F] hover:bg-[#27272A] text-white text-xs font-semibold shadow-sm transition-all active:scale-95 flex-shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{isNepali ? 'कल गर्नुहोस्' : 'Call Agent'}</span>
                    </a>
                  </div>
                </div>

                {/* 2. Sticky Property Context Bar */}
                <div className="p-2.5 sm:p-3 bg-[#F5F5F7] border-b border-[#E5E5E5] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={activeConversation.listingImage}
                      alt={activeConversation.listingTitle}
                      className="w-12 h-10 rounded object-cover border border-[#E5E5E5] flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#0F0F0F] block truncate">
                        {formatNPR(activeConversation.listingPrice)}
                        {activeConversation.listingPriceType === 'perMonth' ? ' / mo' : ''}
                        {activeConversation.listingPriceType === 'perAana' ? ' / aana' : ''}
                      </span>
                      <p className="text-[11px] text-[#71717A] truncate">
                        {activeConversation.listingTitle}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/listings/${activeConversation.listingSlug}`}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F0F0F] hover:underline flex-shrink-0"
                  >
                    <span>{isNepali ? 'सम्पत्ति हेर्नुहोस्' : 'View Listing'}</span>
                    <ExternalLink className="w-3 h-3 text-[#71717A]" />
                  </Link>
                </div>

                {/* 3. Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F5F7]/30">
                  {activeConversation.messages.map((msg) => {
                    const isClient = msg.sender === 'client';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                            isClient
                              ? 'bg-[#0F0F0F] text-white rounded-br-none'
                              : 'bg-white text-[#0F0F0F] border border-[#E5E5E5] rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-[#71717A] mt-1 px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isAgentTyping && (
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#71717A] w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce [animation-delay:0.4s]" />
                      <span className="ml-1 text-[11px]">
                        {activeConversation.agentName} {isNepali ? 'लेख्दै हुनुहुन्छ...' : 'is typing...'}
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* 4. Quick Suggestions Bar */}
                <div className="px-3 pt-2 pb-1 bg-white border-t border-[#E5E5E5] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
                  {[
                    isNepali ? 'कहिले हेर्न मिल्छ?' : 'When can I visit?',
                    isNepali ? 'मूल्य केही घट्छ?' : 'Is price negotiable?',
                    isNepali ? 'लालपुर्जा प्रमाणित छ?' : 'Is Lalpurja checked?',
                    isNepali ? 'सडक कति फिट छ?' : 'What is the road width?',
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(undefined, chip)}
                      className="px-2.5 py-1 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5E5] text-[#0F0F0F] whitespace-nowrap transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* 5. Message Composer */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white border-t border-[#E5E5E5] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={
                      isNepali
                        ? 'एजेन्टलाई सन्देश लेख्नुहोस् (स्थलगत भ्रमण, मूल्य, कागजात...)'
                        : 'Write your message to the agent (site visit, price, docs...)'
                    }
                    className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#F5F5F7] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0F0F0F] focus:bg-white text-[#0F0F0F]"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="p-2.5 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] disabled:opacity-40 text-white transition-all active:scale-95 flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="text-sm font-semibold text-gray-700">
                  {isNepali ? 'कुराकानी चयन गर्नुहोस्' : 'Select a conversation'}
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  {isNepali
                    ? 'कुनै पनि सम्पत्ति विवरण पृष्ठबाट "एजेन्टलाई सन्देश" क्लिक गर्नुहोस् वा सूचीबाट छान्नुहोस्'
                    : 'Choose a conversation from the left or click "Message Agent" on any property page'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
