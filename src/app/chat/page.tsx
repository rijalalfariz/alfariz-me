'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Brain, ChevronDown, ChevronUp, Settings, X,
  Trash2, Plus, Sparkles, Copy, Check, Menu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  isStreaming?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

// ── Markdown renderer (no extra library) ────────────────────────────────────

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-xl overflow-hidden border border-white/[0.06] bg-black/40">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
        <span className="text-xs text-zinc-500 font-mono">{lang || 'code'}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-zinc-300 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderMarkdown(text: string): React.ReactNode[] {
  const codeBlockRe = /```(\w+)?\n?([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRe.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(renderInline(text.slice(last, match.index), parts.length));
    }
    parts.push(<CodeBlock key={match.index} lang={match[1] || ''} code={match[2].trimEnd()} />);
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(renderInline(text.slice(last), parts.length + 1000));
  }

  return parts;
}

function renderInline(text: string, baseKey: number): React.ReactNode {
  const lines = text.split('\n');

  return (
    <span key={baseKey}>
      {lines.map((line, i) => {
        // Headings
        const h3 = line.match(/^### (.+)/);
        if (h3) return <p key={i} className="font-semibold text-white mt-3 mb-1 text-sm">{h3[1]}</p>;
        const h2 = line.match(/^## (.+)/);
        if (h2) return <p key={i} className="font-semibold text-white mt-4 mb-1">{h2[1]}</p>;
        const h1 = line.match(/^# (.+)/);
        if (h1) return <p key={i} className="font-bold text-white mt-4 mb-1 text-base">{h1[1]}</p>;

        // Bullet
        const bullet = line.match(/^[-*] (.+)/);
        if (bullet) return <li key={i} className="ml-4 list-disc">{inlineSpans(bullet[1])}</li>;

        // Numbered
        const num = line.match(/^\d+\. (.+)/);
        if (num) return <li key={i} className="ml-4 list-decimal">{inlineSpans(num[1])}</li>;

        if (line.trim() === '') return <br key={i} />;

        return (
          <span key={i}>
            {inlineSpans(line)}
            {i < lines.length - 1 && '\n'}
          </span>
        );
      })}
    </span>
  );
}

function inlineSpans(text: string): React.ReactNode {
  // Parse bold, italic, inline code
  const tokenRe = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = tokenRe.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={m.index} className="font-semibold text-white">{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={m.index} className="italic text-zinc-300">{m[3]}</em>);
    else if (m[4]) parts.push(
      <code key={m.index} className="bg-white/10 border border-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-violet-300">
        {m[4]}
      </code>
    );
    last = m.index + m[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ── Thinking block ───────────────────────────────────────────────────────────

function ThinkingBlock({ content, isStreaming }: { content: string; isStreaming?: boolean }) {
  const [open, setOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, isStreaming, open]);

  return (
    <div className="mb-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-amber-400/80 hover:bg-amber-500/[0.06] transition-colors"
      >
        {/* Animated brain icon */}
        <span className={`relative ${isStreaming ? 'animate-pulse' : ''}`}>
          <Brain size={13} />
          {isStreaming && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          )}
        </span>
        <span className="text-xs font-medium tracking-wide">
          {isStreaming ? 'Thinking…' : `Thought process`}
        </span>
        {!isStreaming && (
          <span className="ml-1 text-xs text-amber-500/50">
            ({content.split(' ').length} words)
          </span>
        )}
        <span className="ml-auto text-amber-500/40">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div
              ref={scrollRef}
              className="px-4 pb-3 pt-1 max-h-52 overflow-y-auto scrollbar-thin"
            >
              <p className="text-xs text-amber-300/50 leading-relaxed whitespace-pre-wrap font-mono">
                {content}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-3 bg-amber-400/60 animate-pulse ml-0.5 translate-y-0.5" />
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end"
      >
        <div className="max-w-[78%] px-4 py-3 rounded-2xl rounded-tr-sm bg-indigo-600/80 border border-indigo-500/40 text-sm text-white leading-relaxed shadow-lg shadow-indigo-900/20">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col gap-0"
    >
      {/* Thinking */}
      {message.reasoning && (
        <ThinkingBlock
          content={message.reasoning}
          isStreaming={message.isStreaming && !message.content}
        />
      )}

      {/* Response */}
      {(message.content || (message.isStreaming && !message.reasoning)) && (
        <div className="relative">
          <div className="text-sm text-zinc-300 leading-relaxed">
            {renderMarkdown(message.content)}
            {message.isStreaming && (
              <span className="inline-block w-1.5 h-4 bg-zinc-400 animate-pulse ml-0.5 translate-y-0.5 rounded-sm" />
            )}
          </div>

          {!message.isStreaming && message.content && (
            <button
              onClick={copy}
              className="mt-2 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-all"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Copy response'}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Starter prompts ──────────────────────────────────────────────────────────

const STARTERS = [
  { icon: '⚡', label: 'Explain a complex topic', prompt: 'Explain quantum entanglement in simple terms' },
  { icon: '🛠️', label: 'Debug code', prompt: 'Help me debug a tricky React hook issue' },
  { icon: '✍️', label: 'Write something', prompt: 'Write a concise technical blog intro about streaming LLM responses' },
  { icon: '🔍', label: 'Deep analysis', prompt: 'Analyse the trade-offs between REST and GraphQL in detail' },
];

// ── Main page ────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const activeConv = conversations.find(c => c.id === activeConvId) ?? null;
  const messages = activeConv?.messages ?? [];

  // ── Auto-scroll ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Auto-resize textarea ──
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }, [input]);

  // ── Helpers ──
  const updateMessages = useCallback((convId: string, updater: (msgs: Message[]) => Message[]) => {
    setConversations(prev =>
      prev.map(c => c.id === convId ? { ...c, messages: updater(c.messages) } : c)
    );
  }, []);

  const newConversation = useCallback(() => {
    const id = Date.now().toString();
    setConversations(prev => [{ id, title: 'New chat', messages: [] }, ...prev]);
    setActiveConvId(id);
  }, []);

  // ── Send message ──
  const sendMessage = useCallback(async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text || isLoading) return;

    // Resolve or create conversation
    let convId = activeConvId;
    let prevMessages: Message[] = activeConv?.messages ?? [];

    if (!convId) {
      convId = Date.now().toString();
      const title = text.slice(0, 48) + (text.length > 48 ? '…' : '');
      setConversations(prev => [{ id: convId!, title, messages: [] }, ...prev]);
      setActiveConvId(convId);
      prevMessages = [];
    } else if (prevMessages.length === 0) {
      // Update title for conversation created via "New chat" button
      const title = text.slice(0, 48) + (text.length > 48 ? '…' : '');
      setConversations(prev =>
        prev.map(c => c.id === convId ? { ...c, title } : c)
      );
    }

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: text };
    const assistantId = `a-${Date.now() + 1}`;
    const assistantMsg: Message = {
      id: assistantId, role: 'assistant',
      content: '', reasoning: '', isStreaming: true,
    };

    setInput('');
    setIsLoading(true);

    // Optimistically add both messages
    setConversations(prev =>
      prev.map(c =>
        c.id === convId
          ? { ...c, messages: [...c.messages, userMsg, assistantMsg] }
          : c
      )
    );

    const apiMessages = [
      ...prevMessages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content: text },
    ];

    try {
      abortRef.current = new AbortController();

      // const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      const response = await fetch("/api/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'z-ai/glm-5.1',
          messages: apiMessages,
          temperature: 1,
          top_p: 1,
          max_tokens: 16384,
          chat_template_kwargs: { enable_thinking: true, clear_thinking: false },
          stream: true,
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const err = await response.text().catch(() => response.statusText);
        throw new Error(`${response.status}: ${err}`);
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;
          if (!trimmed.startsWith('data: ')) continue;

          try {
            const parsed = JSON.parse(trimmed.slice(6));
            const delta = parsed.choices?.[0]?.delta;
            if (!delta) continue;

            const reasoningChunk: string = delta.reasoning_content ?? '';
            const contentChunk: string = delta.content ?? '';

            if (reasoningChunk || contentChunk) {
              updateMessages(convId!, msgs =>
                msgs.map(m =>
                  m.id === assistantId
                    ? {
                      ...m,
                      reasoning: (m.reasoning ?? '') + reasoningChunk,
                      content: m.content + contentChunk,
                    }
                    : m
                )
              );
            }
          } catch {
            // Malformed chunk — skip
          }
        }
      }

      // Mark done
      updateMessages(convId!, msgs =>
        msgs.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m)
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        updateMessages(convId!, msgs =>
          msgs.map(m => m.id === assistantId ? { ...m, isStreaming: false } : m)
        );
      } else {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        updateMessages(convId!, msgs =>
          msgs.map(m =>
            m.id === assistantId
              ? { ...m, content: `⚠ Error: ${msg}`, isStreaming: false }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, activeConvId, activeConv, updateMessages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConvId === id) setActiveConvId(null);
  };

  const stop = () => abortRef.current?.abort();

  // ── Render ──
  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden font-sans">

      {/* ── Sidebar ── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 256 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col flex-shrink-0 overflow-hidden border-r border-white/[0.06] bg-zinc-900/60 backdrop-blur"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                <Sparkles size={13} />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">GLM Chat</p>
                <p className="text-[10px] text-zinc-600 mt-0.5 leading-none">z-ai/glm-5.1 · thinking</p>
              </div>
            </div>

            {/* New chat */}
            <div className="px-3 pt-3 pb-1">
              <button
                onClick={newConversation}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200 transition-colors group"
              >
                <Plus size={15} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                New chat
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
              {conversations.length === 0 && (
                <p className="text-xs text-zinc-700 text-center py-8 px-4">
                  Start a conversation to see it here
                </p>
              )}
              {conversations.map(conv => (
                <motion.div
                  key={conv.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer text-sm transition-colors ${activeConvId === conv.id
                      ? 'bg-white/[0.08] text-zinc-200'
                      : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
                    }`}
                >
                  <span className="flex-1 truncate leading-snug">{conv.title}</span>
                  <button
                    onClick={e => { e.stopPropagation(); deleteConversation(conv.id); }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-zinc-700 hover:text-red-400 transition-all flex-shrink-0"
                  >
                    <Trash2 size={12} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Settings */}
            <div className="p-3 border-t border-white/[0.05]">
              <button
                onClick={() => {}}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300 transition-colors"
              >
                <Settings size={15} />
                Settings
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="text-zinc-600 hover:text-zinc-300 transition-colors p-1.5 rounded-lg hover:bg-white/5"
            aria-label="Toggle sidebar"
          >
            <Menu size={17} />
          </button>

          <span className="text-sm text-zinc-500 truncate">
            {activeConv ? activeConv.title : 'GLM 5.1 · Thinking model'}
          </span>

          {isLoading && (
            <button
              onClick={stop}
              className="ml-auto flex items-center gap-2 text-xs text-red-400/80 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 px-3 py-1.5 rounded-lg transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Stop
            </button>
          )}
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-5 px-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
                  <Sparkles size={26} className="text-indigo-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-950 flex items-center justify-center">
                  <Brain size={8} className="text-white" />
                </span>
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold text-zinc-200">GLM 5.1</p>
                <p className="text-sm text-zinc-600 mt-1">Thinking model · Powered by NVIDIA</p>
              </div>

              <div className="grid grid-cols-2 gap-2 max-w-sm w-full mt-1">
                {STARTERS.map(s => (
                  <button
                    key={s.prompt}
                    onClick={() => {
                      if (!activeConvId) newConversation();
                      setTimeout(() => sendMessage(s.prompt), 0);
                    }}
                    className="text-left p-3.5 rounded-xl border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.03] text-zinc-500 hover:text-zinc-300 transition-all"
                  >
                    <span className="text-base mb-1.5 block">{s.icon}</span>
                    <span className="text-xs leading-snug">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">
              {messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-white/[0.06]">
          <div className="max-w-2xl mx-auto">
            <div
              className={`flex gap-3 items-end bg-zinc-900/80 border rounded-2xl px-4 py-3 transition-all ${isLoading
                  ? 'border-white/[0.05]'
                  : 'border-white/[0.08] focus-within:border-indigo-500/40 focus-within:shadow-lg focus-within:shadow-indigo-900/20'
                }`}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message GLM 5.1…"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-700 resize-none outline-none max-h-48 disabled:opacity-40 leading-relaxed"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-700 text-white flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-indigo-900/20 disabled:shadow-none"
              >
                {isLoading
                  ? <span className="w-3 h-3 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
                  : <Send size={14} />
                }
              </button>
            </div>
            <p className="text-center text-xs text-zinc-800 mt-2">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}