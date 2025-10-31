import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  avatar?: string;
}

interface ChatUIProps {
  currentUserAvatar?: string;
  otherUserAvatar?: string;
  otherUserName?: string;
}

export const ChatUI = ({ 
  currentUserAvatar = "https://i.guim.co.uk/img/media/ef573276855d9e04aaed3dae615757a8725e52d9/297_329_2974_1784/master/2974.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=54907bf26973da8d098262abe333b802",
  otherUserAvatar = "https://pngimg.com/d/microsoft_PNG9.png",
  otherUserName = "AI"
}: ChatUIProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callDeepSeek = async (userMessage: string): Promise<string> => {
    const conversationHistory = messages.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as any;
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json() as any;
      return data.message || "No response from AI";
    } catch (error) {
      console.error("Chat API error:", error);
      return `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callDeepSeek(userMessage);
    
    const responseMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: "other",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setIsLoading(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img
            src={otherUserAvatar}
            alt={otherUserName}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{otherUserName}</h3>
          <p className="text-xs text-white/60">Active now</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/40 text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={message.sender === "user" ? currentUserAvatar : otherUserAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"} max-w-[70%]`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white/20 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <span className="text-xs text-white/40 mt-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={otherUserAvatar}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-1 px-4 py-2 bg-white/20 rounded-2xl">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5 text-white/60" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Add emoji"
          >
            <Smile className="w-5 h-5 text-white/60" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-white/10 disabled:cursor-not-allowed rounded-full transition-colors"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};
