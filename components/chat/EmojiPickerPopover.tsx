'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, Flame, Smile, ThumbsUp, Heart, Sparkles } from 'lucide-react';

interface EmojiPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
}

interface EmojiCategory {
  id: string;
  name: string;
  icon: typeof Smile;
  emojis: { char: string; name: string }[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: 'popular',
    name: 'Popular',
    icon: Flame,
    emojis: [
      { char: '🔥', name: 'fire lit hot' },
      { char: '✨', name: 'sparkles magic' },
      { char: '❤️', name: 'red heart love' },
      { char: '👍', name: 'thumbs up like good' },
      { char: '😂', name: 'joy laughing tears' },
      { char: '🚀', name: 'rocket launch fast' },
      { char: '🎉', name: 'party celebration popper' },
      { char: '😍', name: 'heart eyes love' },
      { char: '😎', name: 'cool sunglasses' },
      { char: '🙌', name: 'raising hands praise' },
      { char: '👏', name: 'clapping hands applause' },
      { char: '💯', name: 'hundred percent perfect' },
      { char: '🥳', name: 'partying celebration' },
      { char: '🤩', name: 'star struck excited' },
      { char: '💡', name: 'light bulb idea' },
      { char: '⚡', name: 'lightning bolt fast' },
      { char: '🤝', name: 'handshake deal' },
      { char: '🙏', name: 'folded hands pray thank you' },
      { char: '💖', name: 'sparkling heart shiny' },
      { char: '🥺', name: 'pleading puppy eyes' },
      { char: '🤣', name: 'rolling laughing rofl' },
      { char: '🤤', name: 'drooling yummy' },
      { char: '☕', name: 'coffee tea drink' },
      { char: '🎯', name: 'target goal bullseye' },
    ],
  },
  {
    id: 'smileys',
    name: 'Smileys',
    icon: Smile,
    emojis: [
      { char: '😀', name: 'grinning face happy' },
      { char: '😃', name: 'smiling face with open mouth' },
      { char: '😄', name: 'smiling face with smiling eyes' },
      { char: '😁', name: 'beaming face with smiling eyes' },
      { char: '😆', name: 'grinning squinting face' },
      { char: '😅', name: 'grinning face with sweat' },
      { char: '🤣', name: 'rolling on the floor laughing' },
      { char: '😂', name: 'face with tears of joy' },
      { char: '🙂', name: 'slightly smiling face' },
      { char: '🙃', name: 'upside down face' },
      { char: '😉', name: 'winking face' },
      { char: '😊', name: 'smiling face with smiling eyes' },
      { char: '😇', name: 'smiling face with halo angel' },
      { char: '🥰', name: 'smiling face with hearts love' },
      { char: '😍', name: 'smiling face with heart eyes' },
      { char: '🤩', name: 'star struck excited' },
      { char: '😘', name: 'face blowing a kiss' },
      { char: '😗', name: 'kissing face' },
      { char: '😋', name: 'face savoring food delicious' },
      { char: '😛', name: 'face with tongue' },
      { char: '😜', name: 'winking face with tongue' },
      { char: '🤪', name: 'zany face crazy' },
      { char: '😝', name: 'squinting face with tongue' },
      { char: '🤑', name: 'money mouth face rich' },
      { char: '🤗', name: 'smiling face with open hands hug' },
      { char: '🫢', name: 'face with open eyes and hand over mouth' },
      { char: '🤫', name: 'shushing face quiet' },
      { char: '🤔', name: 'thinking face hmm' },
      { char: '🫡', name: 'saluting face yes sir' },
      { char: '🤐', name: 'zipper mouth face secret' },
      { char: '🤨', name: 'face with raised eyebrow suspicious' },
      { char: '😐', name: 'neutral face straight' },
      { char: '😑', name: 'expressionless face' },
      { char: '😶', name: 'face without mouth' },
      { char: '😏', name: 'smirking face flirty' },
      { char: '😒', name: 'unamused face annoyed' },
      { char: '🙄', name: 'face with rolling eyes' },
      { char: '😬', name: 'grimacing face awkward' },
      { char: '🤥', name: 'lying face pinocchio' },
      { char: '😌', name: 'relieved face peaceful' },
      { char: '😔', name: 'pensive face sad' },
      { char: '😪', name: 'sleepy face' },
      { char: '🤤', name: 'drooling face' },
      { char: '😴', name: 'sleeping face zzz' },
      { char: '😷', name: 'face with medical mask sick' },
      { char: '🤒', name: 'face with thermometer' },
      { char: '🤕', name: 'face with head bandage hurt' },
      { char: '🤢', name: 'nauseated face gross' },
      { char: '🤮', name: 'face vomiting puking' },
      { char: '🥵', name: 'hot face sweating' },
      { char: '🥶', name: 'cold face freezing' },
      { char: '🥴', name: 'woozy face drunk dizzy' },
      { char: '😵', name: 'face with crossed out eyes knocked out' },
      { char: '🤯', name: 'exploding head mind blown' },
      { char: '🥳', name: 'partying face celebration' },
      { char: '🥸', name: 'disguised face detective' },
      { char: '😎', name: 'smiling face with sunglasses cool' },
      { char: '🤓', name: 'nerd face smart geek' },
      { char: '🧐', name: 'face with monocle sophisticated' },
      { char: '😕', name: 'confused face' },
      { char: '😟', name: 'worried face' },
      { char: '🙁', name: 'slightly frowning face' },
      { char: '😮', name: 'face with open mouth surprised' },
      { char: '😯', name: 'hushed face' },
      { char: '😲', name: 'astonished face shock' },
      { char: '😳', name: 'flushed face embarrassed' },
      { char: '🥺', name: 'pleading face puppy eyes' },
      { char: '🥹', name: 'face holding back tears happy sad' },
      { char: '😦', name: 'frowning face with open mouth' },
      { char: '😧', name: 'anguished face' },
      { char: '😨', name: 'fearful face scared' },
      { char: '😰', name: 'anxious face with sweat' },
      { char: '😥', name: 'sad but relieved face' },
      { char: '😢', name: 'crying face tear' },
      { char: '😭', name: 'loudly crying face sobbing' },
      { char: '😱', name: 'face screaming in fear scream' },
      { char: '😖', name: 'confounded face frustrated' },
      { char: '😣', name: 'persevering face' },
      { char: '😞', name: 'disappointed face' },
      { char: '😓', name: 'downcast face with sweat' },
      { char: '😩', name: 'weary face tired' },
      { char: '😫', name: 'tired face exhausted' },
      { char: '🥱', name: 'yawning face sleepy' },
      { char: '😤', name: 'face with steam from nose angry' },
      { char: '😡', name: 'enraged face mad' },
      { char: '😠', name: 'angry face furious' },
      { char: '🤬', name: 'face with symbols on mouth swearing' },
    ],
  },
  {
    id: 'gestures',
    name: 'Gestures',
    icon: ThumbsUp,
    emojis: [
      { char: '👋', name: 'waving hand hello bye' },
      { char: '🤚', name: 'raised back of hand' },
      { char: '🖐️', name: 'hand with fingers splayed' },
      { char: '✋', name: 'raised hand high five stop' },
      { char: '🖖', name: 'vulcan salute spock' },
      { char: '🫱', name: 'rightwards hand' },
      { char: '🫲', name: 'leftwards hand' },
      { char: '🫳', name: 'palm down hand' },
      { char: '🫴', name: 'palm up hand' },
      { char: '🫵', name: 'index pointing at the viewer you' },
      { char: '🤞', name: 'crossed fingers luck' },
      { char: '🫰', name: 'hand with index finger and thumb crossed finger heart' },
      { char: '🤟', name: 'love you gesture' },
      { char: '🤘', name: 'sign of the horns rock on' },
      { char: '🤙', name: 'call me hand phone' },
      { char: '👈', name: 'backhand index pointing left' },
      { char: '👉', name: 'backhand index pointing right' },
      { char: '👆', name: 'backhand index pointing up' },
      { char: '🖕', name: 'middle finger' },
      { char: '👇', name: 'backhand index pointing down' },
      { char: '☝️', name: 'index pointing up' },
      { char: '👍', name: 'thumbs up like good yes' },
      { char: '👎', name: 'thumbs down dislike bad no' },
      { char: '✊', name: 'raised fist punch' },
      { char: '👊', name: 'oncoming fist brofist' },
      { char: '🤛', name: 'left facing fist' },
      { char: '🤜', name: 'right facing fist' },
      { char: '👏', name: 'clapping hands applause bravo' },
      { char: '🙌', name: 'raising hands hooray celebration' },
      { char: '🫶', name: 'heart hands love' },
      { char: '👐', name: 'open hands' },
      { char: '🤲', name: 'palms up together prayer' },
      { char: '🤝', name: 'handshake deal agreement' },
      { char: '🙏', name: 'folded hands pray thank you please' },
      { char: '✍️', name: 'writing hand pen notes' },
      { char: '💅', name: 'nail polish sassy' },
      { char: '🤳', name: 'selfie camera photo' },
      { char: '💪', name: 'flexed biceps strong muscle workout' },
    ],
  },
  {
    id: 'hearts',
    name: 'Hearts',
    icon: Heart,
    emojis: [
      { char: '❤️', name: 'red heart love' },
      { char: '🩷', name: 'pink heart cute' },
      { char: '🧡', name: 'orange heart' },
      { char: '💛', name: 'yellow heart friendship' },
      { char: '💚', name: 'green heart nature' },
      { char: '💙', name: 'blue heart peace' },
      { char: '🩵', name: 'light blue heart' },
      { char: '💜', name: 'purple heart royalty' },
      { char: '🖤', name: 'black heart dark' },
      { char: '🩶', name: 'grey heart' },
      { char: '🤍', name: 'white heart pure' },
      { char: '🤎', name: 'brown heart' },
      { char: '💔', name: 'broken heart heartbreak sad' },
      { char: '❤️‍🔥', name: 'heart on fire burning passion' },
      { char: '❤️‍🩹', name: 'mending heart healing' },
      { char: '❣️', name: 'heart exclamation point' },
      { char: '💕', name: 'two hearts love' },
      { char: '💞', name: 'revolving hearts' },
      { char: '💓', name: 'beating heart pulse' },
      { char: '💗', name: 'growing heart' },
      { char: '💖', name: 'sparkling heart shiny' },
      { char: '💘', name: 'heart with arrow cupid' },
      { char: '💝', name: 'heart with ribbon gift' },
      { char: '💟', name: 'heart decoration' },
    ],
  },
  {
    id: 'objects',
    name: 'Objects',
    icon: Sparkles,
    emojis: [
      { char: '🔥', name: 'fire flame lit hot' },
      { char: '✨', name: 'sparkles stars magic' },
      { char: '⚡', name: 'high voltage lightning bolt zap fast' },
      { char: '💥', name: 'collision boom explode' },
      { char: '🌟', name: 'glowing star shine' },
      { char: '💫', name: 'dizzy star' },
      { char: '🌈', name: 'rainbow colorful' },
      { char: '☀️', name: 'sun sunny bright' },
      { char: '🌙', name: 'crescent moon night' },
      { char: '💡', name: 'light bulb idea smart' },
      { char: '💻', name: 'laptop computer tech code' },
      { char: '📱', name: 'mobile phone cell smartphone' },
      { char: '🖥️', name: 'desktop computer pc' },
      { char: '⌨️', name: 'keyboard type' },
      { char: '🖱️', name: 'computer mouse click' },
      { char: '🎮', name: 'video game controller play' },
      { char: '🕹️', name: 'joystick gaming' },
      { char: '🎧', name: 'headphone music audio listen' },
      { char: '🎤', name: 'microphone sing podcast' },
      { char: '📷', name: 'camera photo picture' },
      { char: '📸', name: 'camera with flash snap' },
      { char: '📹', name: 'video camera record' },
      { char: '🎥', name: 'movie camera film' },
      { char: '📡', name: 'satellite antenna signal' },
      { char: '🔋', name: 'battery energy power' },
      { char: '🔌', name: 'electric plug connect' },
      { char: '💎', name: 'gem stone diamond precious' },
      { char: '🏆', name: 'trophy champion win winner' },
      { char: '🥇', name: '1st place medal gold' },
      { char: '🥈', name: '2nd place medal silver' },
      { char: '🥉', name: '3rd place medal bronze' },
      { char: '🎯', name: 'direct hit bullseye goal target' },
      { char: '🚀', name: 'rocket ship space launch fast' },
      { char: '🛸', name: 'flying saucer ufo alien' },
      { char: '☕', name: 'hot beverage coffee tea' },
      { char: '🍕', name: 'pizza food slice' },
      { char: '🍔', name: 'hamburger burger food' },
      { char: '🍟', name: 'french fries food' },
      { char: '🍻', name: 'clinking beer mugs cheers drink' },
      { char: '🥂', name: 'clinking glasses toast champagne' },
    ],
  },
];

export default function EmojiPickerPopover({
  isOpen,
  onClose,
  onSelectEmoji,
}: EmojiPickerPopoverProps) {
  const [activeTab, setActiveTab] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter emojis based on search query
  const filteredEmojis = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      const activeCategory = EMOJI_CATEGORIES.find((c) => c.id === activeTab);
      return activeCategory ? activeCategory.emojis : [];
    }

    const matched: { char: string; name: string }[] = [];
    const seen = new Set<string>();

    for (const cat of EMOJI_CATEGORIES) {
      for (const item of cat.emojis) {
        if (!seen.has(item.char) && item.name.toLowerCase().includes(q)) {
          seen.add(item.char);
          matched.push(item);
        }
      }
    }
    return matched;
  }, [searchQuery, activeTab]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute bottom-full right-0 sm:right-3 mb-3 z-50 w-72 sm:w-80 rounded-2xl bg-white/95 dark:bg-card/95 border border-slate-200/80 dark:border-border/80 shadow-2xl shadow-purple-500/10 backdrop-blur-xl p-3 text-card-foreground select-none animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Top Search Bar */}
      <div className="relative flex items-center mb-2.5">
        <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emojis..."
          className="w-full h-8 rounded-xl border border-slate-200 dark:border-border bg-slate-50/80 dark:bg-muted/40 pl-8 pr-7 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="h-3 w-3" />
          </button>
        ) : null}
      </div>

      {/* Category Tabs (shown when not searching) */}
      {!searchQuery && (
        <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100 dark:border-border/50 mb-2">
          {EMOJI_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-muted/50'
                }`}
                title={cat.name}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      )}

      {/* Emojis Grid - content-start removes awkward vertical gap */}
      <div className="h-52 overflow-y-auto no-scrollbar grid grid-cols-7 sm:grid-cols-8 gap-1 p-0.5 content-start">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={`${emoji.char}-${index}`}
            type="button"
            onClick={() => {
              onSelectEmoji(emoji.char);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:scale-115 active:scale-95 transition-all cursor-pointer select-none shrink-0"
            title={emoji.name}
          >
            {emoji.char}
          </button>
        ))}

        {filteredEmojis.length === 0 && (
          <div className="col-span-full py-8 text-center text-xs text-slate-400">
            No emojis found for &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="pt-2 mt-1 border-t border-slate-100 dark:border-border/40 flex items-center justify-between text-[10px] text-slate-400 px-1">
        <span>Click to insert realtime</span>
        <span>ESC to close</span>
      </div>
    </div>
  );
}
