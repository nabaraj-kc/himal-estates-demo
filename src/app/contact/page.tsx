'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { brand } from '@/config/brand';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const { isNepali } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 min-w-0">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-[#0F0F0F] tracking-tight">
            {isNepali ? 'हामीसँग सम्पर्क गर्नुहोस्' : 'Contact Himal Estates'}
          </h1>
          <p className="mt-2 text-xs text-[#71717A]">
            {isNepali
              ? 'सम्पत्ति खरिद, बिक्री, भाडा वा कानुनी परामर्शका लागि हाम्रा प्रतिनिधिहरू सधैं तयार छन्।'
              : 'Whether you want to inspect a property, list your house, or verify documents, our Kathmandu advisory team is ready.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] space-y-5">
              <h2 className="font-bold text-sm text-[#0F0F0F]">
                Contact Details
              </h2>

              <div className="space-y-4 text-xs text-[#71717A]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F0F0F] block">Office Address</span>
                    <span>{brand.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F0F0F] block">Direct Phone</span>
                    <a href={`tel:${brand.phone}`} className="hover:text-[#0F0F0F]">{brand.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F0F0F] block">Email Support</span>
                    <a href={`mailto:${brand.email}`} className="hover:text-[#0F0F0F]">{brand.email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] border border-[#E5E5E5] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F0F0F] block">Operating Hours</span>
                    <span>Sunday – Friday: 9:00 AM – 6:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent('Namaste Himal Estates, I would like to make an inquiry.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E5E5]">
              <h2 className="font-bold text-sm text-[#0F0F0F] mb-1">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#71717A] mb-5">
                Fill in your details below and an agent will call or WhatsApp you within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#F5F5F7] text-[#0F0F0F] text-center space-y-2 border border-[#E5E5E5]">
                  <CheckCircle2 className="w-8 h-8 text-[#0F0F0F] mx-auto" />
                  <h3 className="font-bold text-sm">Message Sent Successfully!</h3>
                  <p className="text-xs text-[#71717A]">
                    Thank you, {name}. Our Kathmandu advisory desk will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Thapa"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F0F0F] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@gmail.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F0F0F] mb-1">
                      Message / Requirement *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what property you are looking for, or details of property you want to list..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E5E5E5] bg-[#F5F5F7] text-xs text-[#0F0F0F] focus:outline-none focus:border-[#0F0F0F]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-6 rounded-xl bg-[#0F0F0F] hover:bg-[#27272A] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
