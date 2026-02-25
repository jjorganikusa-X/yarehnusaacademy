'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white backdrop-blur-md border-t border-primary/10 z-50 pb-[max(25px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(26,40,71,0.08)]">
      <div className="w-full">
        <div className="grid grid-cols-5 w-full pt-3">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 w-full relative ${
              isActive('/') ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            } transition-colors`}
          >
            {isActive('/') && (
              <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-b-full shadow-glow"></div>
            )}
            <i className={`${isActive('/') ? 'ph-fill' : 'ph'} ph-house text-[26px]`}></i>
            <span className={`text-[9px] ${isActive('/') ? 'font-bold' : 'font-medium'} leading-none tracking-wide`}>
              Home
            </span>
          </Link>

          {/* Tab 2: Alas Hariku */}
          <Link
            href="/visual-schedule"
            className={`flex flex-col items-center gap-1 w-full relative ${
              isActive('/visual-schedule') ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            } transition-colors`}
          >
            {isActive('/visual-schedule') && (
              <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-b-full shadow-glow"></div>
            )}
            <i className={`${isActive('/visual-schedule') ? 'ph-fill' : 'ph'} ph-calendar-check text-[26px]`}></i>
            <span className={`text-[9px] ${isActive('/visual-schedule') ? 'font-bold' : 'font-medium'} leading-none text-center`}>
              Alas<br />Hariku
            </span>
          </Link>

          {/* Tab 3: Suara Nusa */}
          <Link
            href="/aac-communication"
            className={`flex flex-col items-center gap-1 w-full relative ${
              isActive('/aac-communication') ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            } transition-colors`}
          >
            {isActive('/aac-communication') && (
              <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-b-full shadow-glow"></div>
            )}
            <i className={`${isActive('/aac-communication') ? 'ph-fill' : 'ph'} ph-chat-circle-dots text-[26px]`}></i>
            <span className={`text-[9px] ${isActive('/aac-communication') ? 'font-bold' : 'font-medium'} leading-none text-center`}>
              Suara<br />Nusa
            </span>
          </Link>

          {/* Tab 4: Kisah Amsal */}
          <Link
            href="/social-stories"
            className={`flex flex-col items-center gap-1 w-full relative ${
              isActive('/social-stories') ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            } transition-colors`}
          >
            {isActive('/social-stories') && (
              <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-b-full shadow-glow"></div>
            )}
            <i className={`${isActive('/social-stories') ? 'ph-fill' : 'ph'} ph-book-bookmark text-[26px]`}></i>
            <span className={`text-[9px] ${isActive('/social-stories') ? 'font-bold' : 'font-medium'} leading-none text-center`}>
              Kisah<br />Amsal
            </span>
          </Link>

          {/* Tab 5: Mercusuar Tenang */}
          <Link
            href="/focus-mode"
            className={`flex flex-col items-center gap-1 w-full relative ${
              isActive('/focus-mode') ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
            } transition-colors`}
          >
            {isActive('/focus-mode') && (
              <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-b-full shadow-glow"></div>
            )}
            <i className={`${isActive('/focus-mode') ? 'ph-fill' : 'ph'} ph-lighthouse text-[26px]`}></i>
            <span className={`text-[9px] ${isActive('/focus-mode') ? 'font-bold' : 'font-medium'} leading-none text-center`}>
              Mercusuar<br />Tenang
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
