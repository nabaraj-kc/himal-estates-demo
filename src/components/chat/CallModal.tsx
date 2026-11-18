'use client';

import React, { useState, useEffect } from 'react';
import { brand } from '@/config/brand';
import { useLanguage } from '@/context/LanguageContext';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  ShieldCheck,
  X,
} from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export function CallModal({ isOpen, onClose, propertyTitle }: CallModalProps) {
  const { isNepali } = useLanguage();
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  // Handle ringing transition to connected after 2.8 seconds
  useEffect(() => {
    let ringTimeout: any;
    let timerInterval: any;

    if (isOpen) {
      setCallState('ringing');
      setTimer(0);

      ringTimeout = setTimeout(() => {
        setCallState('connected');
      }, 2600);
    } else {
      setCallState('ended');
      setTimer(0);
    }

    return () => {
      clearTimeout(ringTimeout);
      clearInterval(timerInterval);
    };
  }, [isOpen]);

  // Handle call duration timer
  useEffect(() => {
    let interval: any;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-center text-white flex flex-col items-center justify-between min-h-[460px]">
        {/* Close Button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Info */}
        <div className="w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>{brand.name} • Certified Broker</span>
          </div>

          {/* Avatar with pulse ring */}
          <div className="relative mx-auto w-24 h-24 mb-4">
            <div
              className={`absolute inset-0 rounded-full bg-teal-500/20 ${
                callState === 'ringing' ? 'animate-ping' : ''
              }`}
            ></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center border-2 border-teal-400 shadow-lg">
              <span className="font-display font-bold text-2xl text-white">HE</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-xl text-white">
            Himal Estates Advisory
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-mono">{brand.phone}</p>

          {propertyTitle && (
            <p className="text-[11px] text-teal-300/80 mt-2 px-3 py-1 rounded-lg bg-slate-800/80 line-clamp-1 border border-slate-700">
              Ref: {propertyTitle}
            </p>
          )}

          {/* Call Status Indicator */}
          <div className="mt-4">
            {callState === 'ringing' && (
              <div className="flex items-center justify-center gap-2 text-sm text-amber-400 animate-pulse">
                <PhoneCall className="w-4 h-4" />
                <span>{isNepali ? 'सम्पर्क गरिँदैछ (Ringing)...' : 'Connecting to Agent...'}</span>
              </div>
            )}
            {callState === 'connected' && (
              <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Connected • {formatTimer(timer)}</span>
              </div>
            )}
            {callState === 'ended' && (
              <div className="text-sm text-rose-400">
                <span>{isNepali ? 'कल समाप्त भयो' : 'Call Ended'}</span>
              </div>
            )}
          </div>
        </div>

        {/* In-Call Controls */}
        <div className="w-full pt-6">
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              disabled={callState !== 'connected'}
              className={`p-3.5 rounded-full transition-all ${
                isMuted
                  ? 'bg-rose-600/30 text-rose-400 border border-rose-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Mute"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              disabled={callState !== 'connected'}
              className={`p-3.5 rounded-full transition-all ${
                isSpeaker
                  ? 'bg-teal-600/30 text-teal-300 border border-teal-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title="Speaker"
            >
              {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <a
              href={`tel:${brand.phone}`}
              className="p-3.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all sm:hidden"
              title="Dial on phone"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
            </a>
          </div>

          {/* End Call / Connect Mobile Button */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleEndCall}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/40 transition-all"
            >
              <PhoneOff className="w-5 h-5" />
              <span>{isNepali ? 'कल अन्त्य गर्नुहोस्' : 'End Call'}</span>
            </button>

            {/* Direct Phone Dial Link for Real Phones */}
            <a
              href={`tel:${brand.phone}`}
              className="text-[11px] text-slate-400 hover:text-teal-300 transition-colors py-1"
            >
              {isNepali ? 'वा मोबाइलमा सिधै डायल गर्नुहोस्' : 'Or open phone dialer directly'}: {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
