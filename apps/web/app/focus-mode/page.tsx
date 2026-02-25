'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

export default function FocusModePage() {
  const router = useRouter();

    return (
      <>
        <div className="pt-[55px] bg-surface text-slate-800 min-h-screen relative overflow-x-hidden selection:bg-calm/30 pb-20">
          {/* Ambient Background blobs - Cooler tones for calming effect */}
    <div className="fixed top-[-10%] left-[-20%] w-[90vw] h-[90vw] rounded-full bg-calm/20 blur-[80px] z-0 animate-float"></div>
    <div className="fixed bottom-[10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-ocean/10 blur-[90px] z-0 animate-float" style={{ animationDelay: '2s' }}></div>
    <div className="bg-noise"></div>

    {/* Header */}
    <header className="relative z-10 px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
                <i className="ph ph-caret-left text-xl"></i>
            </button>
            <div>
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">Mercusuar Tenang</h1>
                <p className="text-slate-500 text-xs font-medium mt-0.5">Ruang Tenang & Fokus</p>
            </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-blue-50 text-ocean flex items-center justify-center active:scale-90 transition-transform shadow-sm">
            <i className="ph-fill ph-moon text-lg"></i>
        </button>
    </header>

    <main className="relative z-10 px-6 pb-28">

        {/* Breathing Hero Section */}
        <section className="mb-8">
            <div className="relative w-full aspect-square max-h-[340px] bg-gradient-to-b from-blue-50 to-white rounded-[40px] border border-blue-100 shadow-card flex flex-col items-center justify-center overflow-hidden group">
                {/* Decorative concentric circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[300px] h-[300px] border border-calm/20 rounded-full absolute animate-ping" style={{ animationDuration: '4s' }}></div>
                    <div className="w-[200px] h-[200px] border border-calm/30 rounded-full absolute animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                </div>

                {/* Main Breathing Circle */}
                <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-calm to-ocean shadow-glow flex items-center justify-center animate-breathe-circle cursor-pointer active:scale-95 transition-transform">
                    <div className="text-white text-center">
                        <i className="ph-fill ph-wind text-4xl mb-2 opacity-90"></i>
                        <p className="text-sm font-bold tracking-widest opacity-90 uppercase">Tarik Napas</p>
                    </div>
                </div>

                <div className="absolute bottom-8 text-center px-6">
                    <p className="text-slate-500 text-sm font-medium">Ketuk lingkaran untuk memulai panduan napas.</p>
                </div>
            </div>
        </section>

        {/* Current Sound Player (Mini) */}
        <section className="mb-6">
            <div className="bg-slate-900 rounded-3xl p-5 text-white flex items-center justify-between shadow-lg relative overflow-hidden">
                {/* Background visual */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-ocean rounded-full blur-2xl opacity-40 -mr-10 -mt-10"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl backdrop-blur-sm">
                        <i className="ph-fill ph-waves"></i>
                    </div>
                    <div>
                        <h3 className="text-base font-bold mb-0.5">Suara Ombak</h3>
                        <div className="flex items-end gap-1 h-3">
                            <div className="w-1 bg-calm/70 rounded-full animate-wave bar"></div>
                            <div className="w-1 bg-calm/70 rounded-full animate-wave bar"></div>
                            <div className="w-1 bg-calm/70 rounded-full animate-wave bar"></div>
                            <div className="w-1 bg-calm/70 rounded-full animate-wave bar"></div>
                            <div className="w-1 bg-calm/70 rounded-full animate-wave bar"></div>
                        </div>
                    </div>
                </div>

                <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center text-lg active:scale-90 transition-transform relative z-10">
                    <i className="ph-fill ph-pause"></i>
                </button>
            </div>
        </section>

        {/* Sound Library Grid */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Pilih Suara</h2>
                <button className="text-xs font-bold text-ocean">Lihat Semua</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                
                {/* Sound Card 1 */}
                <button className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:border-calm transition-all text-left active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
                            <i className="ph-fill ph-cloud-rain"></i>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-calm group-hover:border-calm group-hover:text-white transition-colors">
                            <i className="ph-bold ph-play text-xs"></i>
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-800">Hujan Rintik</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Menenangkan pikiran</p>
                </button>

                {/* Sound Card 2 */}
                <button className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:border-green-200 transition-all text-left active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl">
                            <i className="ph-fill ph-tree"></i>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-white transition-colors">
                            <i className="ph-bold ph-play text-xs"></i>
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-800">Hutan Pagi</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Suara burung & angin</p>
                </button>

                {/* Sound Card 3 */}
                <button className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:border-orange-200 transition-all text-left active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xl">
                            <i className="ph-fill ph-fire"></i>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-colors">
                            <i className="ph-bold ph-play text-xs"></i>
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-800">Api Unggun</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Hangat & nyaman</p>
                </button>

                {/* Sound Card 4 */}
                <button className="group bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:border-purple-200 transition-all text-left active:scale-[0.98]">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-xl">
                            <i className="ph-fill ph-music-notes"></i>
                        </div>
                        <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-colors">
                            <i className="ph-bold ph-play text-xs"></i>
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-800">Piano Lembut</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Musik pengantar tidur</p>
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
