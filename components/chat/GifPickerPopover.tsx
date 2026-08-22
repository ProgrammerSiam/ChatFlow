'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Loader2, Sparkles, TrendingUp } from 'lucide-react';

interface GifPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGif: (gifUrl: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

interface GifItem {
  id: string;
  url: string;
  previewUrl: string;
  title: string;
  category?: string;
}

// Built-in curated popular & trending GIFs library (ultra-fast, instant load & fallback)
const CURATED_GIFS: Record<string, GifItem[]> = {
  trending: [
    {
      id: 't1',
      title: 'Excited Celebration',
      url: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/artj92V8o75VPL7AeQ/200w.gif',
      category: 'trending',
    },
    {
      id: 't2',
      title: 'Happy Dance',
      url: 'https://media.giphy.com/media/blSTtZehjAZ8I/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/blSTtZehjAZ8I/200w.gif',
      category: 'trending',
    },
    {
      id: 't3',
      title: 'Applause Clapping',
      url: 'https://media.giphy.com/media/nbvFVPiEiJH6h44255/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/nbvFVPiEiJH6h44255/200w.gif',
      category: 'trending',
    },
    {
      id: 't4',
      title: 'Mind Blown',
      url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/200w.gif',
      category: 'trending',
    },
    {
      id: 't5',
      title: 'High Five',
      url: 'https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/3oEjHV0z8S7WM4MwnK/200w.gif',
      category: 'trending',
    },
    {
      id: 't6',
      title: 'Thumbs Up',
      url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/111ebonMs90YLu/200w.gif',
      category: 'trending',
    },
  ],
  reactions: [
    {
      id: 'r1',
      title: 'OMG Shocked',
      url: 'https://media.giphy.com/media/5VKbvrjxpVJCM/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/5VKbvrjxpVJCM/200w.gif',
      category: 'reactions',
    },
    {
      id: 'r2',
      title: 'Laughing Out Loud',
      url: 'https://media.giphy.com/media/10JhviFuU2gWD6/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/10JhviFuU2gWD6/200w.gif',
      category: 'reactions',
    },
    {
      id: 'r3',
      title: 'Popcorn Waiting',
      url: 'https://media.giphy.com/media/gl0mkIZOW6Nwc/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/gl0mkIZOW6Nwc/200w.gif',
      category: 'reactions',
    },
    {
      id: 'r4',
      title: 'Zen Mode Calm',
      url: 'https://media.giphy.com/media/l4pTfx2qLszoacZRS/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/l4pTfx2qLszoacZRS/200w.gif',
      category: 'reactions',
    },
    {
      id: 'r5',
      title: 'Suspicious Thinking',
      url: 'https://media.giphy.com/media/a5viI92PAF89q/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/a5viI92PAF89q/200w.gif',
      category: 'reactions',
    },
    {
      id: 'r6',
      title: 'Yes Agree Nod',
      url: 'https://media.giphy.com/media/n4oKYFlAcJU2Y/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/n4oKYFlAcJU2Y/200w.gif',
      category: 'reactions',
    },
  ],
  happy: [
    {
      id: 'h1',
      title: 'Dancing Party',
      url: 'https://media.giphy.com/media/DhstvI3CH0l99G7wxE/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/DhstvI3CH0l99G7wxE/200w.gif',
      category: 'happy',
    },
    {
      id: 'h2',
      title: 'Cute Cat Vibe',
      url: 'https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/GeimqsH0TLDt4tScGw/200w.gif',
      category: 'happy',
    },
    {
      id: 'h3',
      title: 'Celebrate Confetti',
      url: 'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/g9582DNuQppxC/200w.gif',
      category: 'happy',
    },
    {
      id: 'h4',
      title: 'Heart Love',
      url: 'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/M90mJvfWfd5mbUuULX/200w.gif',
      category: 'happy',
    },
  ],
  memes: [
    {
      id: 'm1',
      title: 'Deal With It',
      url: 'https://media.giphy.com/media/VTxmwaCEwSlZm/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/VTxmwaCEwSlZm/200w.gif',
      category: 'memes',
    },
    {
      id: 'm2',
      title: 'This is Fine',
      url: 'https://media.giphy.com/media/9M5jK4GXmD5o1irGrF/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/9M5jK4GXmD5o1irGrF/200w.gif',
      category: 'memes',
    },
    {
      id: 'm3',
      title: 'Bye Homer Bush',
      url: 'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/jUwpNzg9IcyrK/200w.gif',
      category: 'memes',
    },
    {
      id: 'm4',
      title: 'Success Kid',
      url: 'https://media.giphy.com/media/nXxOjZrbnbRxS/giphy.gif',
      previewUrl: 'https://media.giphy.com/media/nXxOjZrbnbRxS/200w.gif',
      category: 'memes',
    },
  ],
};

const CATEGORIES = [
  { key: 'all', label: '🔥 Trending' },
  { key: 'reactions', label: '😲 Reactions' },
  { key: 'happy', label: '🎉 Happy' },
  { key: 'memes', label: '😎 Memes' },
];

export default function GifPickerPopover({
  isOpen,
  onClose,
  onSelectGif,
  triggerRef,
}: GifPickerPopoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlineGifs, setOnlineGifs] = useState<GifItem[]>([]);
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on Outside Click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      const timer = setTimeout(() => {
        setSearchQuery('');
        setSelectedCategory('all');
        setOnlineGifs([]);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fetch online GIFs from Giphy public API when search query is typed
  useEffect(() => {
    if (!isOpen) return;
    const query = searchQuery.trim();
    if (!query) {
      const resetTimer = setTimeout(() => {
        setOnlineGifs([]);
        setIsLoadingOnline(false);
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    let isMounted = true;
    const loadTimer = setTimeout(() => {
      setIsLoadingOnline(true);
    }, 0);

    const timer = setTimeout(async () => {
      try {
        const apiKey = 'dc6zaTOxFJmzC'; // GIPHY public beta key
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
            query
          )}&limit=18&rating=g`
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.data && Array.isArray(data.data)) {
            const mapped: GifItem[] = data.data.map((item: { id: string; title: string; images: { original?: { url: string }; fixed_width?: { url: string } } }) => ({
              id: item.id,
              title: item.title || 'GIF',
              url: item.images?.original?.url || item.images?.fixed_width?.url || '',
              previewUrl: item.images?.fixed_width?.url || item.images?.original?.url || '',
            })).filter((g: GifItem) => Boolean(g.url));

            setOnlineGifs(mapped);
          }
        }
      } catch {
        // Fallback gracefully to curated local GIFs
      } finally {
        if (isMounted) {
          setIsLoadingOnline(false);
        }
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(loadTimer);
      clearTimeout(timer);
    };
  }, [searchQuery, isOpen]);

  // Determine GIFs to display
  const displayGifs = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      if (onlineGifs.length > 0) {
        return onlineGifs;
      }
      // Filter curated GIFs as fallback
      const q = searchQuery.toLowerCase().trim();
      const allCurated = Object.values(CURATED_GIFS).flat();
      return allCurated.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          (g.category && g.category.toLowerCase().includes(q))
      );
    }

    if (selectedCategory === 'all') {
      return Object.values(CURATED_GIFS).flat();
    }

    return CURATED_GIFS[selectedCategory] || [];
  }, [searchQuery, selectedCategory, onlineGifs]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute bottom-16 right-4 sm:right-16 z-50 w-72 sm:w-84 rounded-2xl bg-[#18181B] border border-zinc-800/90 shadow-2xl shadow-black/80 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150 text-white"
      style={{ maxHeight: '420px' }}
    >
      {/* Header & Search Bar */}
      <div className="p-2.5 border-b border-zinc-800/80 bg-[#121214]">
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-zinc-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search GIFs..."
            className="w-full bg-[#27272A] border border-zinc-700/60 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500 shadow-2xs"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-zinc-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>

        {/* Category Pills */}
        {!searchQuery && (
          <div className="flex items-center gap-1 mt-2 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/25 font-bold'
                    : 'bg-[#27272A] text-zinc-300 hover:bg-[#323238] border border-zinc-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* GIFs Grid */}
      <div className="flex-1 overflow-y-auto p-2 no-scrollbar min-h-[220px] max-h-[300px] bg-[#18181B]">
        {isLoadingOnline ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-2 text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
            <span className="text-xs">Finding best GIFs...</span>
          </div>
        ) : displayGifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-4 space-y-1.5 text-zinc-400">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <p className="text-xs font-semibold text-zinc-200">
              No GIFs found
            </p>
            <p className="text-[11px] text-zinc-500">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {displayGifs.map((gif) => (
              <button
                key={gif.id}
                type="button"
                onClick={() => onSelectGif(gif.url)}
                className="group relative rounded-xl overflow-hidden bg-[#27272A] border border-zinc-700/40 aspect-video hover:ring-2 hover:ring-purple-500 hover:scale-[1.02] transition-all cursor-pointer shadow-2xs"
                title={gif.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gif.previewUrl || gif.url}
                  alt={gif.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                  <span className="text-[10px] font-medium text-white truncate drop-shadow-xs">
                    {gif.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="px-3 py-1.5 border-t border-zinc-800/80 bg-[#121214] flex items-center justify-between text-[10px] text-zinc-400">
        <span className="flex items-center gap-1 font-medium">
          <TrendingUp className="h-3 w-3 text-purple-400" />
          Instant GIF Search
        </span>
        <span className="font-bold text-zinc-500">Powered by GIPHY</span>
      </div>
    </div>
  );
}
