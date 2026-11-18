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
  CheckCircle2,
  Sparkles,
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
          ? 'सानेपामा साढे २ तलाको लक्जरी बंगला (६.८ करोड) र बुढानीलकण्ठमा नयाँ घर (३.९५ करोड) उपलब्ध छन्। विस्तृत तस्बिर हेर्न चाहनुहुन्छ?'
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
    }, 1400);
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
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-xl shadow-teal-900/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-teal-500/30"
            aria-label="Open chat"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide hidden sm:inline">
              {isNepali ? 'एजेन्टसँग कुरा गर्नुहोस्' : 'Chat with Agent'}
            </span>
          </button>
        ) : null}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 to-teal-700 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-sm">
                  HE
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-teal-800"></span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Himal Estates Advisor</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                </h4>
                <p className="text-[11px] text-teal-100/90 font-medium">
                  {isNepali ? 'अनलाइन • १५ मिनेट भित्र जवाफ' : 'Online • 15-min human response'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsCallModalOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title="Call Agent"
                aria-label="Call Agent"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Info Strip */}
          <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-500" />
              {isNepali ? 'प्रत्यक्ष मध्यस्थता सहायता' : 'Direct Middleman Support'}
            </span>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              WhatsApp
            </a>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-br-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-400 ml-1">
                  {isNepali ? 'टाइप गर्दै...' : 'Typing reply...'}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isNepali ? 'आफ्नो प्रश्न यहाँ लेख्नुहोस्...' : 'Ask about a property, rent, price...'}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Call Simulator Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </>
  );
}
