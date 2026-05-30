import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, CornerDownLeft, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface HistoryPart {
  text: string;
}

interface HistoryMessage {
  role: "user" | "model";
  parts: HistoryPart[];
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "bot",
      text: "Hello! I am the Draftatron AI assistant. How can I help you with your drafting, 3D visualization, or engineering CAD needs in Wisconsin today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Keep track of the chat history structure required by the @google/genai SDK
  const [chatHistory, setChatHistory] = useState<HistoryMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What services do you offer?",
    "Where are you based?",
    "How can I get a quote?",
    "What are your contact details?"
  ];

  // Auto-scroll to bottom when messages or typing status updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmedText = textToSend.trim();
    if (!trimmedText) return;

    setErrorMessage("");
    const userMsgId = `user-${Date.now()}`;
    const newUserMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: trimmedText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmedText,
          history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from server.");
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Update chat history from server response
      if (data.history) {
        setChatHistory(data.history);
      } else {
        // Fallback local append if backend returns empty history
        setChatHistory((prev) => [
          ...prev,
          { role: "user", parts: [{ text: trimmedText }] },
          { role: "model", parts: [{ text: data.text }] }
        ]);
      }

    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorMessage("Service is temporarily resetting. Click send to try again, or contact us directly at 608-215-3761.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "initial",
        sender: "bot",
        text: "Reset complete! Let's start over. How can I help with your project design or drafting schematics?",
        timestamp: new Date()
      }
    ]);
    setChatHistory([]);
    setErrorMessage("");
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        id="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] p-4 rounded-full bg-brand-blue hover:bg-blue-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border border-brand-electric/30 group"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-blue animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-blue"></span>
          </div>
        )}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-32px)] sm:w-[380px] h-[480px] sm:h-[500px] max-h-[calc(100vh-140px)] flex flex-col rounded-2xl glass-panel shadow-2xl border border-white/10 overflow-hidden animate-slideUp text-white"
        >
          {/* Header */}
          <div className="bg-slate-950 p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-brand-blue/20 border border-brand-electric/30">
                <Sparkles className="w-4 h-4 text-brand-electric animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  Draftatron AI
                  <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ONLINE
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">Average response: &lt; 3 seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition"
                title="Restart Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Banner */}
          <div className="bg-brand-blue/10 py-1.5 px-4 border-b border-white/5 text-[10px] text-brand-electric flex items-center justify-between text-center font-medium font-mono">
            <span>WAUKESHA, WI TEAM DISPATCH</span>
            <span>608-215-3761</span>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-blue text-white rounded-tr-none"
                      : "bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none shadow-md"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-slate-900 border border-white/5 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-1.5">
                  <span className="font-mono text-xs">Drafting response</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-electric rounded-full animate-bounce delay-0"></span>
                    <span className="w-1.5 h-1.5 bg-brand-electric rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-electric rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2">
              <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider font-semibold block mb-2">
                Frequently Asked:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickPromptClick(prompt)}
                    className="text-xs bg-white/5 hover:bg-brand-blue/15 hover:text-brand-electric border border-white/10 text-slate-300 rounded-full px-3 py-1.5 transition text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Action Input */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-slate-950 border-t border-white/5 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your design question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-electric transition"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white shadow transition-all duration-200 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-transparent flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
