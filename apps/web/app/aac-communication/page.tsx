'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BottomNav from '@/app/components/BottomNav';
import { useAuthStore } from '@/app/lib/auth-store';

interface Card {
  id: number;
  label: string;
  labelEn?: string;
  labelJa?: string;
  icon: string;
  color: string;
  category: string;
}

type Language = 'id' | 'en' | 'ja';

const colorClasses: { [key: string]: { bg: string; hover: string; icon: string } } = {
  blue: { bg: 'bg-blue-50', hover: 'hover:border-blue-200', icon: 'text-blue-500' },
  orange: { bg: 'bg-orange-50', hover: 'hover:border-orange-200', icon: 'text-orange-500' },
  red: { bg: 'bg-red-50', hover: 'hover:border-red-200', icon: 'text-red-400' },
  cyan: { bg: 'bg-cyan-50', hover: 'hover:border-cyan-200', icon: 'text-cyan-600' },
  purple: { bg: 'bg-purple-50', hover: 'hover:border-purple-200', icon: 'text-purple-500' },
  green: { bg: 'bg-green-50', hover: 'hover:border-green-200', icon: 'text-green-600' },
  yellow: { bg: 'bg-yellow-50', hover: 'hover:border-yellow-200', icon: 'text-yellow-500' },
  teal: { bg: 'bg-teal-50', hover: 'hover:border-teal-200', icon: 'text-teal-600' },
  pink: { bg: 'bg-pink-50', hover: 'hover:border-pink-200', icon: 'text-pink-500' },
};

// Standar global AAC (Augmentative and Alternative Communication)
// Berdasarkan sistem PECS dan Boardmaker
const globalAACTemplates = {
  kebutuhan: [
    { label: 'Makan', labelEn: 'Eat', labelJa: '食べる', icon: 'ph-fill ph-fork-knife', category: 'Kebutuhan Dasar' },
    { label: 'Minum', labelEn: 'Drink', labelJa: '飲む', icon: 'ph-fill ph-drop', category: 'Kebutuhan Dasar' },
    { label: 'Toilet', labelEn: 'Toilet', labelJa: 'トイレ', icon: 'ph-fill ph-toilet-paper', category: 'Kebutuhan Dasar' },
    { label: 'Istirahat', labelEn: 'Rest', labelJa: '休む', icon: 'ph-fill ph-bed', category: 'Kebutuhan Dasar' },
    { label: 'Bantuan', labelEn: 'Help', labelJa: '助けて', icon: 'ph-fill ph-hand-waving', category: 'Kebutuhan Dasar' },
  ],
  emosi: [
    { label: 'Senang', labelEn: 'Happy', labelJa: '嬉しい', icon: 'ph-fill ph-smiley', category: 'Perasaan' },
    { label: 'Sedih', labelEn: 'Sad', labelJa: '悲しい', icon: 'ph-fill ph-smiley-sad', category: 'Perasaan' },
    { label: 'Marah', labelEn: 'Angry', labelJa: '怒る', icon: 'ph-fill ph-smiley-angry', category: 'Perasaan' },
    { label: 'Takut', labelEn: 'Scared', labelJa: '怖い', icon: 'ph-fill ph-smiley-nervous', category: 'Perasaan' },
    { label: 'Sakit', labelEn: 'Hurt', labelJa: '痛い', icon: 'ph-fill ph-first-aid', category: 'Perasaan' },
  ],
  aktivitas: [
    { label: 'Main', labelEn: 'Play', labelJa: '遊ぶ', icon: 'ph-fill ph-game-controller', category: 'Aktivitas' },
    { label: 'Belajar', labelEn: 'Learn', labelJa: '勉強', icon: 'ph-fill ph-book', category: 'Aktivitas' },
    { label: 'Menggambar', labelEn: 'Draw', labelJa: '描く', icon: 'ph-fill ph-paint-brush', category: 'Aktivitas' },
    { label: 'Menyanyi', labelEn: 'Sing', labelJa: '歌う', icon: 'ph-fill ph-music-note', category: 'Aktivitas' },
    { label: 'Jalan-jalan', labelEn: 'Walk', labelJa: '散歩', icon: 'ph-fill ph-walk', category: 'Aktivitas' },
  ],
  sosial: [
    { label: 'Halo', labelEn: 'Hello', labelJa: 'こんにちは', icon: 'ph-fill ph-hand-waving', category: 'Sosial' },
    { label: 'Tolong', labelEn: 'Please', labelJa: 'お願い', icon: 'ph-fill ph-hand-heart', category: 'Sosial' },
    { label: 'Terima kasih', labelEn: 'Thank you', labelJa: 'ありがとう', icon: 'ph-fill ph-heart', category: 'Sosial' },
    { label: 'Maaf', labelEn: 'Sorry', labelJa: 'ごめん', icon: 'ph-fill ph-hand-peace', category: 'Sosial' },
    { label: 'Ya', labelEn: 'Yes', labelJa: 'はい', icon: 'ph-fill ph-check-circle', category: 'Sosial' },
    { label: 'Tidak', labelEn: 'No', labelJa: 'いいえ', icon: 'ph-fill ph-x-circle', category: 'Sosial' },
  ],
  keluarga: [
    { label: 'Ibu', labelEn: 'Mother', labelJa: 'お母さん', icon: 'ph-fill ph-gender-female', category: 'Keluarga' },
    { label: 'Ayah', labelEn: 'Father', labelJa: 'お父さん', icon: 'ph-fill ph-gender-male', category: 'Keluarga' },
    { label: 'Kakak', labelEn: 'Sibling', labelJa: '兄・姉', icon: 'ph-fill ph-person', category: 'Keluarga' },
    { label: 'Adik', labelEn: 'Younger sibling', labelJa: '弟・妹', icon: 'ph-fill ph-baby', category: 'Keluarga' },
    { label: 'Guru', labelEn: 'Teacher', labelJa: '先生', icon: 'ph-fill ph-chalkboard-teacher', category: 'Keluarga' },
  ]
};

const languageConfig = {
  id: { name: 'Indonesia', flag: '🇮🇩', code: 'id-ID' },
  en: { name: 'English', flag: '🇬🇧', code: 'en-US' },
  ja: { name: '日本語', flag: '🇯🇵', code: 'ja-JP' }
};

export default function AacCommunicationPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [cards, setCards] = useState<Card[]>([]);
  const [sentence, setSentence] = useState<Card[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [newCard, setNewCard] = useState({ 
    label: '', 
    labelEn: '', 
    labelJa: '', 
    icon: 'ph-fill ph-star', 
    color: 'blue', 
    category: 'Umum' 
  });
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('id');

  useEffect(() => {
    if (user?.id) {
      loadCards();
    }
  }, [user]);

  const loadCards = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communication-cards?userId=${user.id}`);
      const data = await res.json();
      setCards(data.cards || []);
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  };

  const addCard = async () => {
    if (!user?.id || !newCard.label.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communication-cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newCard, userId: user.id })
      });
      const data = await res.json();
      setCards([...cards, data.card]);
      setNewCard({ label: '', labelEn: '', labelJa: '', icon: 'ph-fill ph-star', color: 'blue', category: 'Umum' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const addTemplateCard = async (template: { label: string; labelEn?: string; labelJa?: string; icon: string; category: string }) => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communication-cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...template, 
          color: 'blue',
          userId: user.id 
        })
      });
      const data = await res.json();
      setCards([...cards, data.card]);
    } catch (error) {
      console.error('Error adding template card:', error);
    }
  };

  const addTemplateCategory = async (categoryCards: { label: string; labelEn?: string; labelJa?: string; icon: string; category: string }[]) => {
    if (!user?.id) return;
    for (const template of categoryCards) {
      await addTemplateCard(template);
    }
    setShowTemplateModal(false);
  };

  const updateCard = async () => {
    if (!editingCard) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communication-cards`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCard)
      });
      const data = await res.json();
      setCards(cards.map(c => c.id === data.card.id ? data.card : c));
      setShowEditModal(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const deleteCard = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/communication-cards?id=${id}`, {
        method: 'DELETE'
      });
      setCards(cards.filter(c => c.id !== id));
      setShowEditModal(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const addToSentence = (card: Card) => {
    setSentence([...sentence, card]);
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const getCardLabel = (card: Card) => {
    if (selectedLanguage === 'en') return card.labelEn || card.label;
    if (selectedLanguage === 'ja') return card.labelJa || card.label;
    return card.label;
  };

  const speak = () => {
    const text = sentence.map(c => getCardLabel(c)).join(' ');
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageConfig[selectedLanguage].code;
      speechSynthesis.speak(utterance);
    }
  };

  const categories = ['Semua', ...Array.from(new Set(cards.map(c => c.category)))];
  const filteredCards = selectedCategory === 'Semua' ? cards : cards.filter(c => c.category === selectedCategory);

  const iconOptions = [
    'ph-fill ph-star', 'ph-fill ph-heart', 'ph-fill ph-smiley', 'ph-fill ph-fork-knife',
    'ph-fill ph-drop', 'ph-fill ph-sun', 'ph-fill ph-moon-stars', 'ph-fill ph-house',
    'ph-fill ph-car', 'ph-fill ph-book', 'ph-fill ph-game-controller', 'ph-fill ph-hand-waving',
    'ph-fill ph-toilet-paper', 'ph-fill ph-ball', 'ph-fill ph-pizza', 'ph-fill ph-music-note',
    'ph-fill ph-bed', 'ph-fill ph-paint-brush', 'ph-fill ph-walk', 'ph-fill ph-smiley-sad',
    'ph-fill ph-smiley-angry', 'ph-fill ph-first-aid', 'ph-fill ph-check-circle', 'ph-fill ph-x-circle'
  ];

  return (
    <>
      <div className="pt-[55px] bg-surface text-slate-800 min-h-screen relative overflow-x-hidden selection:bg-secondary/30 pb-20">
        {/* Ambient Background blobs */}
        <div className="fixed top-[10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-calm/10 blur-[80px] z-0 animate-float"></div>
        <div className="fixed bottom-[10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-secondary/5 blur-[80px] z-0 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="bg-noise"></div>

        {/* Header */}
        <header className="relative z-10 px-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform">
              <i className="ph ph-caret-left text-xl"></i>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">AAC Communication</h1>
              <p className="text-slate-500 text-xs font-medium mt-0.5">Papan Komunikasi Alternatif</p>
            </div>
          </div>
          
          {/* Language Selector Button */}
          <button 
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-2 shadow-sm active:scale-95 transition-transform"
          >
            <span className="text-2xl">{languageConfig[selectedLanguage].flag}</span>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">{languageConfig[selectedLanguage].name}</p>
              <p className="text-[9px] text-slate-400">{languageConfig[selectedLanguage].code}</p>
            </div>
            <i className="ph-bold ph-caret-down text-slate-400"></i>
          </button>
        </header>

        <main className="relative z-10 px-6 pb-28 flex flex-col h-full">
          
          {/* Sentence Builder Output (Sticky) */}
          <section className="sticky top-[55px] z-30 bg-surface/95 backdrop-blur-md pb-4 pt-2 -mx-6 px-6 border-b border-slate-100/50">
            <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-soft min-h-[80px] flex items-center justify-between gap-3">
              
              {/* Chips Container (Horizontal Scroll) */}
              <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar items-center h-full py-1">
                {sentence.map((card, i) => {
                  const colorClass = colorClasses[card.color] || colorClasses.blue;
                  return (
                    <div key={i} className={`flex-shrink-0 ${colorClass.bg} ${colorClass.icon} px-3 py-1.5 rounded-lg flex items-center gap-2 border border-${card.color}-100 animate-pop`}>
                      <i className={card.icon}></i>
                      <span className="text-sm font-bold">{getCardLabel(card)}</span>
                    </div>
                  );
                })}
                {/* Placeholder Cursor */}
                <div className="w-0.5 h-6 bg-primary/30 animate-pulse rounded-full"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
                <button onClick={clearSentence} className="w-10 h-10 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                  <i className="ph-bold ph-backspace text-xl"></i>
                </button>
                <button onClick={speak} className="w-12 h-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center active:scale-90 transition-transform hover:bg-primary/90">
                  <i className="ph-fill ph-speaker-high text-2xl"></i>
                </button>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="mt-4 mb-5">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold shadow-md transition-transform active:scale-95 whitespace-nowrap ${
                    selectedCategory === cat ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* AAC Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            
            {filteredCards.map(card => {
              const colorClass = colorClasses[card.color] || colorClasses.blue;
              return (
                <button
                  key={card.id}
                  onClick={() => addToSentence(card)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setEditingCard(card);
                    setShowEditModal(true);
                  }}
                  className={`${colorClass.bg} border-2 border-transparent ${colorClass.hover} rounded-[24px] p-4 flex flex-col items-center justify-center aspect-square shadow-sm active:scale-95 transition-all group relative overflow-hidden`}
                >
                  <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${colorClass.icon} text-3xl mb-3 shadow-sm group-hover:-translate-y-1 transition-transform`}>
                    <i className={card.icon}></i>
                  </div>
                  <span className="text-base font-bold text-slate-800">{getCardLabel(card)}</span>
                </button>
              );
            })}
            
            {/* Add Template Cards */}
            <button
              onClick={() => setShowTemplateModal(true)}
              className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:border-purple-300 rounded-[24px] p-4 flex flex-col items-center justify-center aspect-square shadow-sm active:scale-95 transition-all group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-500 text-3xl mb-3 shadow-sm group-hover:-translate-y-1 transition-transform">
                <i className="ph-fill ph-sparkle"></i>
              </div>
              <span className="text-xs font-bold text-purple-700 text-center">Kartu AAC<br/>Standar</span>
            </button>

            {/* Add Custom */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-slate-50 border-2 border-dashed border-slate-300 hover:border-primary rounded-[24px] p-4 flex flex-col items-center justify-center aspect-square shadow-none active:scale-95 transition-all group opacity-70"
            >
              <div className="w-14 h-14 bg-transparent rounded-2xl flex items-center justify-center text-slate-400 text-3xl mb-3 group-hover:text-primary transition-colors">
                <i className="ph-bold ph-plus"></i>
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-primary">Tambah<br/>Custom</span>
            </button>

          </section>

        </main>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowLanguageModal(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Pilih Bahasa</h2>
                <p className="text-sm text-slate-500 mt-1">Suara akan disesuaikan dengan bahasa</p>
              </div>
              <button onClick={() => setShowLanguageModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <i className="ph-bold ph-x text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-3">
              {(Object.keys(languageConfig) as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setShowLanguageModal(false);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    selectedLanguage === lang 
                      ? 'border-primary bg-blue-50' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-4xl shadow-md flex-shrink-0">
                      {languageConfig[lang].flag}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-slate-800">{languageConfig[lang].name}</h3>
                      <p className="text-sm text-slate-600">{languageConfig[lang].code}</p>
                    </div>
                    
                    {selectedLanguage === lang && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0">
                        <i className="ph-fill ph-check text-lg"></i>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-3">
                <i className="ph-fill ph-info text-2xl text-blue-500 flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-blue-900">Multi-bahasa</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    Kartu AAC mendukung 3 bahasa: Indonesia, English, dan 日本語. Suara akan otomatis disesuaikan dengan bahasa yang dipilih.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Cards Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Kartu AAC Standar Global</h2>
                <p className="text-sm text-slate-500 mt-1">Berdasarkan sistem PECS & Boardmaker</p>
              </div>
              <button onClick={() => setShowTemplateModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <i className="ph-bold ph-x text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Kebutuhan Dasar */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-blue-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                      <i className="ph-fill ph-first-aid text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Kebutuhan Dasar</h3>
                      <p className="text-xs text-slate-500">{globalAACTemplates.kebutuhan.length} kartu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTemplateCategory(globalAACTemplates.kebutuhan)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
                  >
                    + Tambah Semua
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {globalAACTemplates.kebutuhan.map((card, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className={card.icon}></i>
                      {card.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Perasaan */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-pink-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                      <i className="ph-fill ph-smiley text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Perasaan & Emosi</h3>
                      <p className="text-xs text-slate-500">{globalAACTemplates.emosi.length} kartu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTemplateCategory(globalAACTemplates.emosi)}
                    className="px-4 py-2 bg-pink-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
                  >
                    + Tambah Semua
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {globalAACTemplates.emosi.map((card, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-pink-200 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className={card.icon}></i>
                      {card.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Aktivitas */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-green-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white">
                      <i className="ph-fill ph-game-controller text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Aktivitas</h3>
                      <p className="text-xs text-slate-500">{globalAACTemplates.aktivitas.length} kartu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTemplateCategory(globalAACTemplates.aktivitas)}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
                  >
                    + Tambah Semua
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {globalAACTemplates.aktivitas.map((card, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-green-200 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className={card.icon}></i>
                      {card.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sosial */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-purple-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                      <i className="ph-fill ph-hand-waving text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Sosial & Kesopanan</h3>
                      <p className="text-xs text-slate-500">{globalAACTemplates.sosial.length} kartu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTemplateCategory(globalAACTemplates.sosial)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
                  >
                    + Tambah Semua
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {globalAACTemplates.sosial.map((card, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className={card.icon}></i>
                      {card.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Keluarga */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-orange-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                      <i className="ph-fill ph-users text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Keluarga & Orang</h3>
                      <p className="text-xs text-slate-500">{globalAACTemplates.keluarga.length} kartu</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addTemplateCategory(globalAACTemplates.keluarga)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
                  >
                    + Tambah Semua
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {globalAACTemplates.keluarga.map((card, i) => (
                    <div key={i} className="px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <i className={card.icon}></i>
                      {card.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-start gap-3">
                <i className="ph-fill ph-lightbulb text-2xl text-blue-500 flex-shrink-0"></i>
                <div>
                  <p className="text-sm font-medium text-blue-900">Tentang Kartu AAC Standar</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    Kartu-kartu ini mengikuti standar internasional AAC (Augmentative and Alternative Communication) yang dirancang oleh ahli terapi wicara untuk membantu anak berkebutuhan khusus berkomunikasi lebih efektif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Tambah Kartu Kustom</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label (Indonesia)</label>
                <input
                  type="text"
                  value={newCard.label}
                  onChange={(e) => setNewCard({ ...newCard, label: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                  placeholder="Contoh: Makan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label (English)</label>
                <input
                  type="text"
                  value={newCard.labelEn}
                  onChange={(e) => setNewCard({ ...newCard, labelEn: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                  placeholder="Example: Eat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label (日本語)</label>
                <input
                  type="text"
                  value={newCard.labelJa}
                  onChange={(e) => setNewCard({ ...newCard, labelJa: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                  placeholder="例：食べる"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setNewCard({ ...newCard, icon })}
                      className={`p-3 border-2 rounded-xl ${newCard.icon === icon ? 'border-primary bg-blue-50' : 'border-slate-200'}`}
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Warna</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(colorClasses).map(color => (
                    <button
                      key={color}
                      onClick={() => setNewCard({ ...newCard, color })}
                      className={`w-10 h-10 rounded-full ${colorClasses[color].bg} border-2 ${newCard.color === color ? 'border-slate-800' : 'border-transparent'}`}
                    ></button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <input
                  type="text"
                  value={newCard.category}
                  onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                  placeholder="Contoh: Makanan"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-medium">Batal</button>
                <button onClick={addCard} className="flex-1 py-3 rounded-xl bg-primary text-white font-medium">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Card Modal */}
      {showEditModal && editingCard && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-t-3xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Edit Kartu</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label (Indonesia)</label>
                <input
                  type="text"
                  value={editingCard.label}
                  onChange={(e) => setEditingCard({ ...editingCard, label: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label (English)</label>
                <input
                  type="text"
                  value={editingCard.labelEn || ''}
                  onChange={(e) => setEditingCard({ ...editingCard, labelEn: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label (日本語)</label>
                <input
                  type="text"
                  value={editingCard.labelJa || ''}
                  onChange={(e) => setEditingCard({ ...editingCard, labelJa: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setEditingCard({ ...editingCard, icon })}
                      className={`p-3 border-2 rounded-xl ${editingCard.icon === icon ? 'border-primary bg-blue-50' : 'border-slate-200'}`}
                    >
                      <i className={`${icon} text-2xl`}></i>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Warna</label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(colorClasses).map(color => (
                    <button
                      key={color}
                      onClick={() => setEditingCard({ ...editingCard, color })}
                      className={`w-10 h-10 rounded-full ${colorClasses[color].bg} border-2 ${editingCard.color === color ? 'border-slate-800' : 'border-transparent'}`}
                    ></button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <input
                  type="text"
                  value={editingCard.category}
                  onChange={(e) => setEditingCard({ ...editingCard, category: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => deleteCard(editingCard.id)} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium">Hapus</button>
                <button onClick={updateCard} className="flex-1 py-3 rounded-xl bg-primary text-white font-medium">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}
