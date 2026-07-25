'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Send, Bot, User, CheckCircle2, 
  FileText, Mail, ShieldAlert, ArrowRight, Copy, Check, Loader2, Key
} from 'lucide-react';
import { useCrmStore } from '../../store/useCrmStore';
import { generateAiResponse, AiMessage } from '../../services/aiService';

export const AiCopilotDrawer: React.FC = () => {
  const { isAiDrawerOpen, toggleAiDrawer, brandCustomization, setActiveTab } = useCrmStore();
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const aiName = brandCustomization?.aiName || 'Vertex AI';
  const hasApiKey = Boolean(brandCustomization?.aiApiKey?.trim());

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: `Hello! I am ${aiName} Copilot. How can I assist with your executive revenue pipeline, email generation, or risk detection today?`
        }
      ]);
    }
  }, [aiName, messages.length]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isAiDrawerOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg = { sender: 'user' as const, text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputPrompt('');
    setIsLoading(true);

    const history: AiMessage[] = updatedMessages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const responseText = await generateAiResponse(query, history, brandCustomization);
      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'ai', text: `⚠️ Error: ${err?.message || 'Failed to process request.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg h-full bg-white shadow-2xl border-l border-slate-200 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-500/20 border border-brand-400/30 text-brand-300">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight">{aiName} Copilot</h3>
                <p className="text-[11px] text-brand-200 flex items-center gap-1">
                  {hasApiKey ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live API Connected ({brandCustomization.aiProvider || 'Gemini'} · {brandCustomization.aiModel || 'default'})
                    </span>
                  ) : (
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      Demo Mode • Enter API Key in Settings for Live LLM
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleAiDrawer(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            {[
              'Generate Renewal Email',
              'Audit Churn Risks',
              'Draft $1.2M Proposal',
              'Q3 Forecast'
            ].map((p) => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600 shrink-0 transition-colors shadow-2xs disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!hasApiKey && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Connect your Google Gemini or OpenAI API key to enable live LLM generation.</span>
                </div>
                <button
                  onClick={() => { toggleAiDrawer(false); setActiveTab('settings'); }}
                  className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg shrink-0 text-[10px]"
                >
                  Configure
                </button>
              </div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                )}
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none font-medium shadow-md shadow-brand-500/20'
                    : 'bg-slate-100/80 text-slate-800 rounded-bl-none border border-slate-200/60 font-mono whitespace-pre-wrap'
                }`}>
                  {msg.text}
                  {msg.sender === 'ai' && (
                    <div className="mt-2 pt-2 border-t border-slate-200/50 flex justify-end">
                      <button
                        onClick={() => copyToClipboard(msg.text, idx)}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedIndex === idx ? 'Copied' : 'Copy Output'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center text-xs text-slate-400 font-mono">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-brand-400" />
                </div>
                <div className="p-3 bg-slate-100 rounded-2xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                  <span>{aiName} is thinking & generating response...</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={`Ask ${aiName} to write emails, draft proposals...`}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !inputPrompt.trim()}
                className="absolute right-2 p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-2xs disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
              {aiName} Enterprise Assistant • {brandCustomization?.aiProvider ? `${brandCustomization.aiProvider.toUpperCase()} (${brandCustomization.aiModel || 'default'})` : 'Live API Ready'}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
