'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function HomePage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] bg-white text-slate-800 min-h-screen relative overflow-x-hidden selection:bg-secondary/30 pb-20">
          {/* Subtle Background - Navy & Gold accents */}
    <div className="fixed top-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-[100px] z-0 animate-float"></div>
    <div className="fixed bottom-[10%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-secondary/10 blur-[100px] z-0 animate-float" style={{ animationDelay: '2s' }}></div>
    <div className="bg-noise"></div>

    {/* Header with Logo */}
    <header className="relative z-10 px-6 mb-6">
        <div className="flex items-center justify-center mb-4">
            <img 
                src="https://app-cdn.appgen.com/d1d0bb23-e871-43d1-8694-ea0013947282/assets/uploaded_1772030996935_ggozep.jpeg" 
                alt="Yarehnusa Academy Logo" 
                className="w-24 h-24 object-contain"
            />
        </div>
        <div className="flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">Yarehnusa Academy</span>
                </div>
                <h1 className="text-3xl font-bold text-primary leading-tight">Halo, Budi! <span className="inline-block animate-pulse">👋</span></h1>
                <p className="text-slate-600 text-sm mt-1">Siap berpetualang hari ini?</p>
            </div>
            <button onClick={() => router.push('/profile')} className="w-12 h-12 rounded-full border-2 border-secondary shadow-card overflow-hidden transition-transform active:scale-95">
                <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
            </button>
        </div>
    </header>

    <main className="relative z-10 px-6 pb-28 space-y-8">
        
        {/* Hero: Current Status/Timeline */}
        <section className="w-full">
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold text-primary">Kegiatan Sekarang</h2>
                <span className="text-xs font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">09:00 - 10:00</span>
            </div>
            
            <div onClick={() => router.push('/visual-schedule')} className="group relative w-full bg-white rounded-3xl p-6 shadow-card border border-primary/10 overflow-hidden cursor-pointer transition-all active:scale-[0.98]">
                {/* Progress bar overlay */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary/10 w-full">
                    <div className="h-full bg-secondary w-[45%] rounded-r-full shadow-glow"></div>
                </div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <span className="inline-block px-3 py-1 mb-3 rounded-lg bg-secondary/20 text-accent font-bold text-xs">Seni Lukis</span>
                        <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Melukis Alam</h3>
                        <p className="text-slate-600 text-sm flex items-center gap-2">
                            <i className="ph-fill ph-map-pin"></i> Ruang Kreatif 2
                        </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary text-3xl">
                        <i className="ph-fill ph-paint-brush-broad"></i>
                    </div>
                </div>
            </div>
        </section>

        {/* Main Modules Grid */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-primary">Menu Utama</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                
                {/* Card 1: Alas Hariku (Schedule) */}
                <button onClick={() => router.push('/visual-schedule')} className="col-span-1 bg-primary/5 hover:bg-primary/10 rounded-[24px] p-5 text-left transition-all duration-300 active:scale-95 group shadow-sm border border-primary/10 hover:border-primary/20">
                    <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="ph-fill ph-calendar-check"></i>
                    </div>
                    <h3 className="text-base font-bold text-primary leading-tight mb-1">Alas<br />Hariku</h3>
                    <p className="text-[11px] text-slate-600 font-medium">Jadwal & Rutinitas</p>
                </button>

                {/* Card 2: Suara Nusa (AAC) */}
                <button onClick={() => router.push('/aac-communication')} className="col-span-1 bg-secondary/10 hover:bg-secondary/20 rounded-[24px] p-5 text-left transition-all duration-300 active:scale-95 group shadow-sm border border-secondary/20 hover:border-secondary/30">
                    <div className="w-12 h-12 rounded-xl bg-white text-secondary flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="ph-fill ph-chat-circle-dots"></i>
                    </div>
                    <h3 className="text-base font-bold text-accent leading-tight mb-1">Suara<br />Nusa</h3>
                    <p className="text-[11px] text-slate-600 font-medium">Bantu Komunikasi</p>
                </button>

                {/* Card 3: Kisah Amsal (Social Stories) */}
                <button onClick={() => router.push('/social-stories')} className="col-span-1 bg-secondary/10 hover:bg-secondary/20 rounded-[24px] p-5 text-left transition-all duration-300 active:scale-95 group shadow-sm border border-secondary/20 hover:border-secondary/30">
                    <div className="w-12 h-12 rounded-xl bg-white text-secondary flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="ph-fill ph-book-bookmark"></i>
                    </div>
                    <h3 className="text-base font-bold text-accent leading-tight mb-1">Kisah<br />Amsal</h3>
                    <p className="text-[11px] text-slate-600 font-medium">Cerita Sosial</p>
                </button>

                {/* Card 4: Mercusuar Tenang (Focus Mode) */}
                <button onClick={() => router.push('/focus-mode')} className="col-span-1 bg-primary/5 hover:bg-primary/10 rounded-[24px] p-5 text-left transition-all duration-300 active:scale-95 group shadow-sm border border-primary/10 hover:border-primary/20 animate-breathe">
                    <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <i className="ph-fill ph-lighthouse"></i>
                    </div>
                    <h3 className="text-base font-bold text-primary leading-tight mb-1">Mercusuar<br />Tenang</h3>
                    <p className="text-[11px] text-slate-600 font-medium">Mode Fokus</p>
                </button>
            </div>
        </section>

        {/* Mood / Feeling Check-in */}
        <section className="bg-white rounded-3xl p-5 shadow-soft border border-primary/5">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-primary">Apa yang kamu rasakan?</h2>
            </div>
            <div className="flex justify-between gap-2">
                <button className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-green-50 transition-colors">
                    <span className="text-2xl grayscale hover:grayscale-0 transition-all">😄</span>
                    <span className="text-[10px] font-medium text-slate-600">Senang</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-yellow-50 transition-colors">
                    <span className="text-2xl grayscale hover:grayscale-0 transition-all">😐</span>
                    <span className="text-[10px] font-medium text-slate-600">Biasa</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-red-50 transition-colors">
                    <span className="text-2xl grayscale hover:grayscale-0 transition-all">😠</span>
                    <span className="text-[10px] font-medium text-slate-600">Marah</span>
                </button>
                <button className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-blue-50 transition-colors">
                    <span className="text-2xl grayscale hover:grayscale-0 transition-all">😢</span>
                    <span className="text-[10px] font-medium text-slate-600">Sedih</span>
                </button>
            </div>
        </section>

    </main>

    {/* Bottom Navigation */}
        </div>
      <BottomNav />
      </>
    );
}
