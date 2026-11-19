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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-zinc-300 text-xs font-semibold mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>{brand.name} • Certified Broker</span>
          </div>

          {/* Avatar with pulse ring */}
          <div className="relative mx-auto w-20 h-20 mb-4">
            <div
              className={`absolute inset-0 rounded-full bg-white/10 ${
                callState === 'ringing' ? 'animate-ping' : ''
              }`}
            ></div>
            <div className="relative w-full h-full rounded-full bg-[#18181B] flex items-center justify-center border border-[#27272A] shadow-lg">
              <span className="font-bold text-xl text-white">HE</span>
            </div>
          </div>

          <h3 className="font-bold text-lg text-white">
            Himal Estates Advisory
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">{brand.phone}</p>

          {propertyTitle && (
            <p className="text-[11px] text-zinc-300 mt-2 px-3 py-1 rounded-lg bg-[#18181B] line-clamp-1 border border-[#27272A]">
              Ref: {propertyTitle}
            </p>
          )}

          {/* Call Status Indicator */}
          <div className="mt-4">
            {callState === 'ringing' && (
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-300 animate-pulse">
                <PhoneCall className="w-4 h-4" />
                <span>{isNepali ? 'सम्पर्क गरिँदैछ (Ringing)...' : 'Connecting to Agent...'}</span>
              </div>
            )}
            {callState === 'connected' && (
              <div className="flex items-center justify-center gap-2 text-sm text-white font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Connected • {formatTimer(timer)}</span>
              </div>
            )}
            {callState === 'ended' && (
              <div className="text-sm text-zinc-400">
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
                  ? 'bg-red-600/30 text-red-400 border border-red-500/50'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
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
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
              title="Speaker"
            >
              {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <a
              href={`tel:${brand.phone}`}
              className="p-3.5 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all sm:hidden"
              title="Dial on phone"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* End Call / Connect Mobile Button */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleEndCall}
              className="w-full py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <PhoneOff className="w-4 h-4" />
              <span>{isNepali ? 'कल अन्त्य गर्नुहोस्' : 'End Call'}</span>
            </button>

            {/* Direct Phone Dial Link */}
            <a
              href={`tel:${brand.phone}`}
              className="text-[11px] text-zinc-400 hover:text-white transition-colors py-1"
            >
              {isNepali ? 'वा मोबाइलमा सिधै डायल गर्नुहोस्' : 'Or call directly'}: {brand.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
