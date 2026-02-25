'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

interface SocialStory {
  id: number;
  title: string;
  title_en: string;
  title_ja: string;
  category: string;
  category_en: string;
  category_ja: string;
  proverb: string;
  icon: string;
  color: string;
  description: string;
  description_en: string;
  description_ja: string;
  story_content: string;
  story_content_en: string;
  story_content_ja: string;
  image_url: string | null;
  is_featured: boolean;
}

type Language = 'id' | 'en' | 'ja';

export default function SocialStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<SocialStory[]>([]);
  const [filteredStories, setFilteredStories] = useState<SocialStory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [language, setLanguage] = useState<Language>('id');
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<SocialStory | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Semua') {
      setFilteredStories(stories);
    } else {
      setFilteredStories(stories.filter(story => story.category === selectedCategory));
    }
  }, [selectedCategory, stories]);

  const fetchStories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social-stories`);
      const data = await res.json();
      setStories(data);
      setFilteredStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedText = (story: SocialStory, field: 'title' | 'category' | 'description' | 'story_content') => {
    if (language === 'en') return story[`${field}_en` as keyof SocialStory] as string;
    if (language === 'ja') return story[`${field}_ja` as keyof SocialStory] as string;
    return story[field];
  };

  const categories = ['Semua', ...Array.from(new Set(stories.map(s => s.category)))];

  const featuredStory = stories.find(s => s.is_featured);

  const readStory = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (language === 'en') {
        utterance.lang = 'en-US';
      } else if (language === 'ja') {
        utterance.lang = 'ja-JP';
      } else {
        utterance.lang = 'id-ID';
      }
      
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'border-purple-200 hover:border-purple-300 bg-purple-50',
      blue: 'border-blue-200 hover:border-blue-300 bg-blue-50',
      orange: 'border-orange-200 hover:border-orange-300 bg-orange-50',
      green: 'border-green-200 hover:border-green-300 bg-green-50',
      pink: 'border-pink-200 hover:border-pink-300 bg-pink-50',
    };
    return colors[color] || 'border-purple-200 hover:border-purple-300 bg-purple-50';
  };

  const getIconColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-50 text-purple-600',
      blue: 'bg-blue-50 text-blue-500',
      orange: 'bg-orange-50 text-orange-500',
      green: 'bg-green-50 text-green-600',
      pink: 'bg-pink-50 text-pink-500',
    };
    return colors[color] || 'bg-purple-50 text-purple-600';
  };

  const getLanguageLabel = (lang: Language) => {
    if (lang === 'id') return '🇮🇩 Indonesia';
    if (lang === 'en') return '🇬🇧 English';
    if (lang === 'ja') return '🇯🇵 日本語';
    return '';
  };

  return (
    <>
      <div className="pt-[55px] bg-surface text-slate-800 min-h-screen relative overflow-x-hidden selection:bg-secondary/30 pb-20">
        {/* Ambient Background blobs */}
        <div className="fixed top-[-10%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-purple-100 blur-[80px] z-0 animate-float"></div>
        <div className="fixed bottom-[15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[60px] z-0 animate-float" style={{ animationDelay: '2.5s' }}></div>
        <div className="bg-noise"></div>

        {/* Header */}
        <header className="relative z-10 px-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
              <i className="ph ph-caret-left text-xl"></i>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                {language === 'id' && 'Kisah Amsal'}
                {language === 'en' && 'Social Stories'}
                {language === 'ja' && 'ソーシャルストーリー'}
              </h1>
              <p className="text-slate-500 text-xs font-medium mt-0.5">
                {language === 'id' && 'Pustaka Cerita Sosial'}
                {language === 'en' && 'Social Story Library'}
                {language === 'ja' && 'ソーシャルストーリーライブラリ'}
              </p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-10 h-10 rounded-full bg-white border border-slate-100 text-slate-600 flex items-center justify-center active:scale-90 transition-transform shadow-sm appearance-none text-center cursor-pointer"
            >
              <option value="id">🇮🇩</option>
              <option value="en">🇬🇧</option>
              <option value="ja">🇯🇵</option>
            </select>
          </div>
        </header>

        <main className="relative z-10 px-6 pb-28">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              {/* Featured Story (Hero) */}
              {featuredStory && (
                <section className="mb-6 animate-slide-up">
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <i className="ph-fill ph-star text-secondary"></i>
                    {language === 'id' && 'Cerita Hari Ini'}
                    {language === 'en' && 'Today\'s Story'}
                    {language === 'ja' && '今日の話'}
                  </h2>
                  <div 
                    onClick={() => setSelectedStory(featuredStory)}
                    className="relative w-full h-64 rounded-[32px] overflow-hidden shadow-card group cursor-pointer active:scale-[0.98] transition-all"
                  >
                    <img 
                      src={featuredStory.image_url || 'https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                      alt={getLocalizedText(featuredStory, 'title')} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold mb-3 border border-white/10">
                        <i className={`ph-fill ${featuredStory.icon}`}></i> {featuredStory.proverb}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{getLocalizedText(featuredStory, 'title')}</h3>
                      <p className="text-white/80 text-sm line-clamp-2">{getLocalizedText(featuredStory, 'description')}</p>
                      
                      <button className="mt-4 px-5 py-2.5 bg-secondary text-slate-900 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors w-fit">
                        <i className="ph-fill ph-play-circle text-lg"></i>
                        {language === 'id' && 'Baca & Dengar'}
                        {language === 'en' && 'Read & Listen'}
                        {language === 'ja' && '読んで聞く'}
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* Categories */}
              <section className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-slate-800 text-white shadow-md'
                          : 'bg-white border border-slate-200 text-slate-600 active:scale-95'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Story List */}
              <section className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {filteredStories.filter(s => !s.is_featured || selectedCategory !== 'Semua').map((story) => (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className={`group bg-white rounded-3xl p-4 shadow-sm border transition-all flex items-center gap-4 active:scale-[0.99] cursor-pointer relative overflow-hidden ${getColorClass(story.color)}`}
                  >
                    <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-colors`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner ${getIconColorClass(story.color)}`}>
                      <i className={`ph-fill ${story.icon}`}></i>
                    </div>
                    
                    <div className="flex-1 z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{getLocalizedText(story, 'category')}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span className="text-[10px] font-bold text-primary">{story.proverb}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mb-0.5">{getLocalizedText(story, 'title')}</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{getLocalizedText(story, 'description')}</p>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 transition-colors`}>
                      <i className="ph-bold ph-caret-right"></i>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </main>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-6 animate-fade-in">
          <div className="bg-white w-full md:max-w-2xl md:rounded-[32px] rounded-t-[32px] max-h-[90vh] overflow-y-auto animate-slide-up">
            {/* Story Image */}
            {selectedStory.image_url && (
              <div className="relative w-full h-48 md:h-64">
                <img 
                  src={selectedStory.image_url} 
                  alt={getLocalizedText(selectedStory, 'title')} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 shadow-lg active:scale-90 transition-transform"
                >
                  <i className="ph ph-x text-xl"></i>
                </button>
              </div>
            )}

            {/* Story Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{getLocalizedText(selectedStory, 'category')}</span>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <span className="text-xs font-bold text-primary">{selectedStory.proverb}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">{getLocalizedText(selectedStory, 'title')}</h2>
              <p className="text-slate-600 mb-6">{getLocalizedText(selectedStory, 'description')}</p>

              {/* Audio Controls */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => readStory(getLocalizedText(selectedStory, 'story_content'))}
                  className="flex-1 px-5 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <i className="ph-fill ph-speaker-high text-lg"></i>
                  {language === 'id' && 'Dengarkan Cerita'}
                  {language === 'en' && 'Listen to Story'}
                  {language === 'ja' && '物語を聞く'}
                </button>
                <button
                  onClick={() => window.speechSynthesis.cancel()}
                  className="px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <i className="ph ph-stop text-lg"></i>
                </button>
              </div>

              {/* Story Text */}
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {getLocalizedText(selectedStory, 'story_content')}
                </p>
              </div>

              <button
                onClick={() => setSelectedStory(null)}
                className="w-full mt-6 px-5 py-3 bg-slate-800 text-white rounded-xl font-bold active:scale-95 transition-transform"
              >
                {language === 'id' && 'Tutup'}
                {language === 'en' && 'Close'}
                {language === 'ja' && '閉じる'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}
