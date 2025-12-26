import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { createChatSession, sendMessageToAI } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';
import ReactMarkdown from 'react-markdown';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: ChatSender.AI,
      text: "Hello! I'm your AI strategist for the 31:33 Jewelry Marketing Plan. Ask me anything about the strategy, roadmap, or specific playbooks."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    const initChat = async () => {
      try {
        const session = createChatSession();
        setChatSession(session);
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: ChatSender.USER,
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Create a placeholder for the AI response
      const aiMsgId = (Date.now() + 1).toString();
      const initialAiMsg: ChatMessage = {
        id: aiMsgId,
        sender: ChatSender.AI,
        text: ''
      };
      
      setMessages(prev => [...prev, initialAiMsg]);

      await sendMessageToAI(chatSession, userMsg.text, (fullText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId ? { ...msg, text: fullText } : msg
        ));
      });
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: ChatSender.AI,
        text: "I'm having trouble connecting right now. Please check your API key or try again later.",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-brand-black text-white p-4 rounded-full shadow-xl hover:bg-brand-gold transition-colors duration-300 z-50 flex items-center gap-2"
        >
          <Sparkles size={24} />
          <span className="font-serif font-semibold pr-1">Ask AI Strategist</span>
        </button>
      )}

      {/* Chat Interface Drawer/Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-brand-black p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-brand-gold" />
              <h3 className="font-serif font-semibold">Plan Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-brand-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => {
              if (msg.sender === ChatSender.AI && !msg.text && !msg.isError) return null;

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === ChatSender.USER ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 text-sm ${
                      msg.sender === ChatSender.USER
                        ? 'bg-brand-black text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                  >
                    {msg.sender === ChatSender.AI ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc ml-4 mb-3" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal ml-4 mb-3" {...props} />,
                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-bl-none shadow-sm">
                  <Loader2 size={20} className="animate-spin text-brand-gold" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about the strategy..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="bg-brand-gold text-white p-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;