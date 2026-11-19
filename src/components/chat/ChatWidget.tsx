'use client';

import React, { useState, useEffect, useRef } from 'react';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import { CallModal } from '@/components/chat/CallModal';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  ShieldCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
}

export function ChatWidget() {
  const { isNepali } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: isNepali
        ? 'नमस्ते! हिमाल एस्टेटमा स्वागत छ। तपाईं घर, फ्ल्याट वा जग्गा खोज्दै हुनुहुन्छ कि आफ्नो सम्पत्ति बेच्न चाहनुहुन्छ?'
        : 'Namaste! Welcome to Himal Estates. Are you looking to rent, buy, or list a property in Nepal?',
      time: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateAutoReply = (userQuery: string) => {
    const q = userQuery.toLowerCase();
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';

      if (q.includes('flat') || q.includes('rent') || q.includes('bhk') || q.includes('room') || q.includes('भाडा')) {
        reply = isNepali
          ? 'हामीसँग झम्सिखेल, लाजिम्पाट र नयाँ बानेश्वरमा २ बीएचके र ३ बीएचकेका उत्कृष्ट फ्ल्याटहरू उपलब्ध छन्। तपाईंको मासिक बजेट र उपयुक्त स्थान कुन हो?'
          : 'We have verified 1BHK, 2BHK, and 3BHK flats ready for immediate move-in in Jhamsikhel, Lazimpat, and Baneshwor. What is your preferred monthly budget?';
      } else if (q.includes('land') || q.includes('aana') || q.includes('ropani') || q.includes('plot') || q.includes('जग्गा') || q.includes('घडेरी')) {
        reply = isNepali
          ? 'इमाडोल टिकाथलीमा ४ आना (रु ३६ लाख/आना) र बुढानीलकण्ठमा १ रोपनी जग्गा तुरुन्त पास हुने अवस्थामा छन्। के तपाईं स्थलगत भ्रमण गर्न चाहनुहुन्छ?'
          : 'We have pristine 4 Aana residential land in Imadol (NPR 36 Lakh/Aana) and 1 Ropani in Budhanilkantha with clear Lalpurja. Would you like to schedule a site inspection?';
      } else if (q.includes('house') || q.includes('villa') || q.includes('buy') || q.includes('sale') || q.includes('घर')) {
        reply = isNepali
          ? 'सानेपामा साढे २ तलाको लक्जरी बंगला र बुढानीलकण्ठमा नयाँ घर उपलब्ध छन्। विस्तृत तस्बिर हेर्न चाहनुहुन्छ?'
          : 'We have verified standalone modern houses in Sanepa and Budhanilkantha. Would you like our senior broker to send complete floor plans to your WhatsApp?';
      } else if (q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('contact') || q.includes('सम्पर्क')) {
        reply = isNepali
          ? `तपाईं हामीलाई सिधै ${brand.phone} मा फोन गर्न सक्नुहुन्छ वा माथि रहेको कल बटन थिचेर सिधै कुरा गर्न सक्नुहुन्छ!`
          : `You can reach our broker team directly at ${brand.phone} or click the Call button above to speak right away!`;
      } else {
        reply = isNepali
          ? 'सम्पर्क गर्नुभएकोमा धन्यवाद! हाम्रा आधिकारिक एजेन्टहरूले प्रत्येक सूचीको स्थलगत निरीक्षण गर्छन्। तपाईंको सम्पर्क नम्बर वा WhatsApp शेयर गर्नुहोस्, हामी तुरुन्त सहयोग गर्नेछौं।'
          : 'Thank you for your message! Our local advisory team coordinates direct physical visits and documents checking. Please share your phone or WhatsApp number so we can assist promptly.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    generateAutoReply(userText);
  };

  return (
    <>
      {/* Floating Launcher Button - positioned above bottom nav on mobile */}
      <div className="fixed bottom-20 sm:bottom-5 right-4 sm:right-5 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2 px-3.5 py-3 rounded-full bg-[#0F0F0F] hover:bg-[#27272A] text-white shadow-xl border border-[#18181B] transition-all duration-200 active:scale-95"
            aria-label="Open chat"
          >
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"></span>
            </div>
            <span className="text-xs font-semibold tracking-wide hidden sm:inline">
              {isNepali ? 'एजेन्टसँग कुरा गर्नुहोस्' : 'Chat with Agent'}
            </span>
          </button>
        ) : null}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-5 right-3 sm:right-5 z-50 w-[calc(100vw-1.5rem)] sm:w-[360px] max-w-[360px] h-[480px] max-h-[80vh] rounded-2xl bg-white border border-[#E5E5E5] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#0F0F0F] p-3.5 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs">
                  HE
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#0F0F0F]"></span>
              </div>
              <div>
                <h4 className="font-bold text-xs leading-tight flex items-center gap-1">
                  <span>Himal Estates Advisor</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </h4>
                <p className="text-[10px] text-[#A1A1AA]">
                  {isNepali ? 'अनलाइन • १५ मिनेट भित्र जवाफ' : 'Online • 15-min human response'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                title="Call Agent"
                aria-label="Call Agent"
              >
                <Phone className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Info Strip */}
          <div className="bg-[#F5F5F7] px-3.5 py-1.5 border-b border-[#E5E5E5] text-[11px] text-[#71717A] flex items-center justify-between">
            <span>Direct Middleman Support</span>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0F0F0F] hover:underline"
            >
              WhatsApp
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0F0F0F] text-white rounded-br-xs'
                      : 'bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#71717A] mt-0.5 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 p-2 rounded-xl bg-[#F5F5F7] border border-[#E5E5E5] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-[#71717A] ml-1">
                  {isNepali ? 'टाइप गर्दै...' : 'Typing...'}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-white border-t border-[#E5E5E5] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isNepali ? 'आफ्नो प्रश्न यहाँ लेख्नुहोस्...' : 'Ask about a property, rent, price...'}
              className="flex-1 px-3 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] placeholder-[#71717A] focus:outline-none focus:border-[#0F0F0F]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] disabled:opacity-40 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Call Simulator Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        propertyTitle="Himal Estates Advisory Broker"
      />
    </>
  );
}
