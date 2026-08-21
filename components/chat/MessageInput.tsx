'use client';

import { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Smile } from 'lucide-react';
import EmojiPickerPopover from './EmojiPickerPopover';
import CoolTooltip from '@/shared/CoolTooltip';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;

    onSendMessage(trimmed);
    setText('');
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInsertEmoji = (emoji: string) => {
    const el = textareaRef.current;
    if (!el) {
      setText((prev) => prev + emoji);
      return;
    }

    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);

    setTimeout(() => {
      el.focus();
      const nextPos = start + emoji.length;
      el.setSelectionRange(nextPos, nextPos);
    }, 10);
  };

  const isSendDisabled = disabled || text.trim().length === 0;

  return (
    <div className="relative">
      <EmojiPickerPopover
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onSelectEmoji={handleInsertEmoji}
      />

      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white dark:bg-card border-t border-slate-100 dark:border-border/70 flex items-end gap-2 text-card-foreground"
      >
        <div className="relative flex-1 flex items-center bg-slate-50/70 dark:bg-muted/40 border border-slate-200/90 dark:border-border/80 rounded-2xl focus-within:ring-2 focus-within:ring-purple-400/50 focus-within:border-purple-400 focus-within:bg-white dark:focus-within:bg-muted/70 transition-all shadow-2xs">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            rows={1}
            disabled={disabled}
            className="w-full resize-none bg-transparent pl-4 pr-11 py-3 text-sm placeholder:text-slate-400 text-slate-900 dark:text-white focus:outline-none max-h-36 scrollbar-none font-sans"
          />

          {/* Emoji Button inside input on right */}
          <div className="absolute right-2.5 bottom-2">
            <CoolTooltip content={showEmojiPicker ? 'Close Emojis' : 'Insert Emoji'} side="top">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`flex h-7.5 w-7.5 items-center justify-center rounded-xl transition-all cursor-pointer ${
                  showEmojiPicker
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600'
                    : 'text-slate-400 hover:text-purple-600 hover:bg-slate-200/50 dark:hover:bg-muted'
                }`}
              >
                <Smile className="h-4.5 w-4.5" />
              </button>
            </CoolTooltip>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSendDisabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/25 transition-all hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          title="Send Message"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
