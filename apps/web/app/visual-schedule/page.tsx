'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function VisualSchedulePage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] bg-surface text-slate-800 min-h-screen relative overflow-x-hidden selection:bg-secondary/30 pb-20">
          {/* Ambient Background blobs */}
    <div className="fixed top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-secondary/10 blur-[80px] z-0 animate-float"></div>
    <div className="fixed bottom-[20%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-primary/5 blur-[80px] z-0 animate-float" style={{ animationDelay: '2s' }}></div>
    <div className="bg-noise"></div>

    {/* Header */}
    <header className="relative z-10 px-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
                <i className="ph ph-caret-left text-xl"></i>
            </button>
            <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">Alas Hariku</h1>
                <p className="text-slate-500 text-xs font-medium mt-0.5">Senin, 14 Oktober</p>
            </div>
        </div>
        <div className="px-3 py-1.5 bg-secondary/20 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1.5">
            <i className="ph-fill ph-sun"></i> Pagi
        </div>
    </header>

    <main className="relative z-10 px-6 pb-28 space-y-8">
        
        {/* Hero: Current Active Task */}
        <section className="w-full">
            <div className="flex justify-between items-end mb-3">
                <h2 className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Sekarang
                </h2>
                <span className="text-xs font-bold text-slate-400">09:00 - 10:00</span>
            </div>
            
            <div className="w-full bg-primary rounded-[32px] p-6 shadow-card shadow-primary/20 text-white relative overflow-hidden group">
                {/* Background decorative shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full blur-xl -ml-10 -mb-5"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-4xl mb-4 shadow-glow animate-breathe">
                        🎨
                    </div>
                    <h3 className="text-3xl font-bold mb-1">Melukis Alam</h3>
                    <p className="text-primary-100 text-sm mb-6">Ruang Kreatif 2 • Dengan Ibu Guru Siti</p>
                    
                    {/* Timer/Progress */}
                    <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-secondary w-[65%] rounded-full shadow-[0_0_10px_rgba(233,196,106,0.5)]"></div>
                    </div>
                    <div className="flex justify-between w-full text-xs font-medium text-primary-100 px-1">
                        <span>Sudah 35 menit</span>
                        <span>Sisa 25 menit</span>
                    </div>
                </div>

                {/* Complete Button */}
                <button className="w-full mt-6 bg-white text-primary font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-slate-50">
                    <i className="ph-bold ph-check-circle text-xl"></i>
                    Selesai Kegiatan
                </button>
            </div>
        </section>

        {/* Timeline: Upcoming */}
        <section>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-slate-800">Selanjutnya</h2>
            </div>
            
            <div className="space-y-0">
                
                {/* Item 1: Next */}
                <div className="relative pl-14 pb-8 timeline-item timeline-line">
                    <div className="absolute left-0 top-0 w-12 text-center">
                        <span className="text-xs font-bold text-slate-900 block">10:00</span>
                        <span className="text-[10px] text-slate-400 font-medium">AM</span>
                    </div>
                    <div className="absolute left-[24px] top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 z-10"></div>
                    
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                                🍪
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800">Makan Snack</h4>
                                <p className="text-xs text-slate-500">Kantin Sekolah</p>
                            </div>
                        </div>
                        <i className="ph ph-clock text-slate-300 text-xl"></i>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative pl-14 pb-8 timeline-item timeline-line">
                    <div className="absolute left-0 top-0 w-12 text-center">
                        <span className="text-xs font-bold text-slate-900 block">10:30</span>
                        <span className="text-[10px] text-slate-400 font-medium">AM</span>
                    </div>
                    <div className="absolute left-[24px] top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 z-10"></div>
                    
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                                📖
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800">Membaca Buku</h4>
                                <p className="text-xs text-slate-500">Perpustakaan</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="relative pl-14 pb-8 timeline-item">
                    <div className="absolute left-0 top-0 w-12 text-center">
                        <span className="text-xs font-bold text-slate-900 block">12:00</span>
                        <span className="text-[10px] text-slate-400 font-medium">PM</span>
                    </div>
                    <div className="absolute left-[24px] top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 z-10"></div>
                    
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                                🏠
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800">Pulang Sekolah</h4>
                                <p className="text-xs text-slate-500">Jemputan Ayah</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        
        {/* Add new task floating button (optional hint) */}
        <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 text-sm font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
            <i className="ph-bold ph-plus"></i> Tambah Kegiatan
        </button>

    </main>

    {/* Bottom Navigation */}
        </div>
      <BottomNav />
      </>
    );
}
