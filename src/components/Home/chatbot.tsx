import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { MessageCircle, X, Send, User, RefreshCw, Bot } from 'lucide-react';
import { difyService } from '../../api/dify_service';
import { useLanguage } from '../../contexts/LanguageContext';
import './chatbot.css';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbox: React.FC = () => {
  const { translate } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [sessionId] = useState<string>(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize chat on component mount
  useEffect(() => {
    const initializeChat = async () => {
      console.log('Initializing chat...');
      
      // Load saved messages
      const savedMessages = sessionStorage.getItem(`bgpu_chat_messages_${sessionId}`);
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          setMessages(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (e) {
          console.error('Failed to load messages:', e);
        }
      }

      // Load conversation ID
      const savedConvId = sessionStorage.getItem('bgpu_chat_conversation_id');
      if (savedConvId) {
        setConversationId(savedConvId);
      } else {
        // Create new conversation ID
        const newConvId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setConversationId(newConvId);
        sessionStorage.setItem('bgpu_chat_conversation_id', newConvId);
      }
      
      // Load chat open state
      const savedOpenState = sessionStorage.getItem('bgpu_chat_is_open');
      if (savedOpenState === 'true') {
        setIsOpen(true);
      }
    };

    initializeChat();
  }, [sessionId]);

  // Save messages to session storage
  useEffect(() => {
    sessionStorage.setItem(`bgpu_chat_messages_${sessionId}`, JSON.stringify(messages));
  }, [messages, sessionId]);

  // Save chat open state
  useEffect(() => {
    sessionStorage.setItem('bgpu_chat_is_open', isOpen.toString());
  }, [isOpen]);

  // Save conversation ID
  useEffect(() => {
    if (conversationId) {
      sessionStorage.setItem('bgpu_chat_conversation_id', conversationId);
    }
  }, [conversationId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Handle sending a message
  const handleSend = async (): Promise<void> => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to Dify:', {
        query: userInput,
        conversationId
      });

      // Call Dify API
      const response = await difyService.sendMessage(
        userInput, conversationId
      );

      console.log('Received response from Dify:', response);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response?.answer || translate(`ฉันได้รับ: "${userInput}"`, `I received: "${userInput}"`),
        timestamp: new Date(response?.created_at ? response.created_at * 1000 : Date.now())
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error: any) {
      console.error('Error in handleSend:', error);
      
      // Fallback response with translation
      const errorMessage = translate(
        'ฉันกำลังมีปัญหาเชื่อมต่อกับฐานความรู้ในขณะนี้ กรุณาลองใหม่อีกครั้งในอีกสักครู่',
        "I'm having trouble connecting to my knowledge base right now. Please try again in a moment."
      );

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: errorMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key in textarea
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Toggle chat window
  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  // Reset conversation
  const resetSession = async (): Promise<void> => {
    console.log('Resetting session...');
    
    // Fallback to local conversation ID
    const newConvId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConvId);
    console.log('Created local conversation ID:', newConvId);

    setMessages([]);
  
    // Clear session storage for messages
    sessionStorage.removeItem(`bgpu_chat_messages_${sessionId}`);
    
    console.log('Session reset complete');
  };

  // Format time display
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Floating Chat Button - Always visible */}
      <button
        onClick={toggleChat}
        className={`chatbox-toggle-btn ${isOpen ? 'chatbox-hidden' : ''}`}
        aria-label={translate('เปิดผู้ช่วย BGPU', 'Open BGPU Assistant')}
      >
        <MessageCircle className="chatbox-toggle-icon" />
        <span className="chatbox-pulse-dot"></span>
      </button>

      {/* Chat Window */}
      <div className={`chatbox-window ${isOpen ? 'chatbox-open' : 'chatbox-closed'}`}>
        <div className="chatbox-container">
          {/* Header */}
          <div className="chatbox-header">
            <div className="chatbox-header-content">
              <div className="chatbox-avatar">
                <Bot className="chatbox-avatar-icon" />
              </div>
              <div>
                <h3 className="chatbox-title">{translate('ผู้ช่วย BGPU', 'BGPU Assistant')}</h3>
                <p className="chatbox-subtitle">
                  • {translate('ขับเคลื่อนด้วย AI', 'AI Powered')}
                </p>
              </div>
            </div>
            <div className="chatbox-header-controls">
              <button
                onClick={resetSession}
                className="chatbox-reset-btn"
                title={translate('เริ่มการสนทนาใหม่', 'Start new conversation')}
                aria-label={translate('เริ่มการสนทนาใหม่', 'New conversation')}
              >
                <RefreshCw className="chatbox-reset-icon" />
              </button>
              <button
                onClick={toggleChat}
                className="chatbox-close-btn"
                aria-label={translate('ปิดแชท', 'Close chat')}
              >
                <X className="chatbox-close-icon" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chatbox-messages">
            <div className="chatbox-messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbox-message ${message.type === 'user' ? 'chatbox-message-user' : 'chatbox-message-bot'}`}
                >
                  <div className={`chatbox-message-content ${message.type === 'user' ? 'chatbox-message-user-content' : 'chatbox-message-bot-content'}`}>
                    <div className="chatbox-message-inner">
                      {message.type === 'bot' && (
                        <div className="chatbox-message-avatar chatbox-message-avatar-bot">
                          <Bot className="chatbox-message-avatar-icon" />
                        </div>
                      )}
                      <div>
                        <p className="chatbox-message-text">{message.text}</p>
                        <p className={`chatbox-message-time ${message.type === 'user' ? 'chatbox-message-time-user' : 'chatbox-message-time-bot'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="chatbox-message-avatar chatbox-message-avatar-user">
                          <User className="chatbox-message-avatar-icon" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isLoading && (
                <div className="chatbox-message chatbox-message-bot">
                  <div className="chatbox-message-content chatbox-message-bot-content">
                    <div className="chatbox-message-inner">
                      <div className="chatbox-message-avatar chatbox-message-avatar-bot">
                        <Bot className="chatbox-message-avatar-icon" />
                      </div>
                      <div className="chatbox-typing-indicator">
                        <span className="chatbox-typing-dot"></span>
                        <span className="chatbox-typing-dot"></span>
                        <span className="chatbox-typing-dot"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="chatbox-messages-end" />
            </div>
          </div>

          {/* Input Area */}
          <div className="chatbox-input-area">
            <div className="chatbox-input-wrapper">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={translate('สอบถามเกี่ยวกับทีมบีจีพียู, นัดแข่ง, ข่าวสาร...', 'Ask about BGPU team, matches, news...')}
                rows={1}
                disabled={isLoading}
                className="chatbox-textarea"
                aria-label={translate('พิมพ์ข้อความของคุณ', 'Type your message')}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label={translate('ส่งข้อความ', 'Send message')}
                className={`chatbox-send-btn ${input.trim() && !isLoading ? 'chatbox-send-btn-active' : 'chatbox-send-btn-disabled'}`}
              >
                <Send className="chatbox-send-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile - closes chat when clicked */}
      {isOpen && (
        <div
          className="chatbox-backdrop"
          onClick={toggleChat}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Chatbox;