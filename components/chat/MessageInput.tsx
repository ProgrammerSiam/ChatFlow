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
  const emojiBtnRef = useRef<HTMLButtonElement>(null);

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
        triggerRef={emojiBtnRef}
      />

      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white dark:bg-card border-t border-slate-100 dark:border-border/70 flex items-end gap-2 text-card-foreground"
      >
        {/* Main Textarea Container */}
        <div className="relative flex-1 flex items-center bg-slate-50/70 dark:bg-muted/40 border border-slate-200/90 dark:border-border/80 rounded-2xl focus-within:ring-2 focus-within:ring-purple-400/50 focus-within:border-purple-400 focus-within:bg-white dark:focus-within:bg-muted/70 transition-all shadow-2xs">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
            rows={1}
            disabled={disabled}
            className="w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-slate-400 text-slate-900 dark:text-white focus:outline-none max-h-36 scrollbar-none font-sans"
          />
        </div>

        {/* Emoji Button (Outside Text Input) */}
        <CoolTooltip content={showEmojiPicker ? 'Close Emojis' : 'Insert Emoji'} side="top">
          <button
            ref={emojiBtnRef}
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all cursor-pointer ${
              showEmojiPicker
                ? 'bg-purple-100 dark:bg-purple-950/70 border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-300 shadow-2xs'
                : 'border-slate-200/80 dark:border-border/80 bg-slate-50/80 dark:bg-muted/40 text-slate-400 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 dark:hover:bg-purple-950/40'
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-115 group-active:scale-90"
            >
              <circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <circle cx="8.5" cy="10" r="1.25" fill="currentColor" />
              <circle cx="15.5" cy="10" r="1.25" fill="currentColor" />
              <path
                d="M8 14.2C9 16.5 10.5 17.5 12 17.5C13.5 17.5 15 16.5 16 14.2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </CoolTooltip>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isSendDisabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-md shadow-slate-950/20 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          title="Send Message"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
