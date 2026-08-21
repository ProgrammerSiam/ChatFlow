'use client';

import { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSendMessage,
  disabled = false,
}: MessageInputProps) {
  const [text, setText] = useState('');
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

  const isSendDisabled = disabled || text.trim().length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white dark:bg-card border-t border-border/80 flex items-end gap-2 text-card-foreground"
    >
      <div className="relative flex-1 flex items-center bg-background border border-input rounded-2xl focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all shadow-xs">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
          rows={1}
          disabled={disabled}
          className="w-full resize-none bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none max-h-36 scrollbar-none"
        />
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
  );
}
