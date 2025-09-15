"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, Bot, User, Mic, MicOff, Volume2, VolumeX, Play, Pause, Settings } from "lucide-react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [ttsSupported, setTtsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [autoReadAloud, setAutoReadAloud] = useState(false);
  const [ttsSettings, setTtsSettings] = useState({
    volume: 0.8,
    rate: 1.0,
    pitch: 1.0
  });
  const [showTtsSettings, setShowTtsSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsRecording(true);
        };
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsRecording(false);
          setAutoReadAloud(true); // Enable auto read-aloud for voice input
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
          
          let errorMessage = 'Voice input failed. ';
          switch (event.error) {
            case 'not-allowed':
              errorMessage += 'Please allow microphone access.';
              break;
            case 'no-speech':
              errorMessage += 'No speech detected. Please try again.';
              break;
            case 'network':
              errorMessage += 'Network error occurred.';
              break;
            default:
              errorMessage += 'Please try again.';
          }
          
          // Show error message in chat
          const errorResponse = {
            id: Date.now(),
            text: errorMessage,
            sender: "ai",
            timestamp: new Date(),
            isError: true,
          };
          setMessages((prev) => [...prev, errorResponse]);
        };
        
        recognition.onend = () => {
          setIsRecording(false);
        };
        
        recognitionRef.current = recognition;
      }
      
      // Speech Synthesis
      if ('speechSynthesis' in window) {
        setTtsSupported(true);
        speechSynthesisRef.current = window.speechSynthesis;
      }
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const currentInput = inputValue;
    const shouldAutoRead = autoReadAloud;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setAutoReadAloud(false); // Reset auto read-aloud after use

    try {
      // Call the API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          chatHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }

      const data = await response.json();
      
      const aiResponse = {
        id: Date.now() + 1,
        text: data.message,
        sender: "ai",
        timestamp: new Date(),
        autoRead: shouldAutoRead,
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      
      // Auto read-aloud if enabled
      if (shouldAutoRead && ttsSupported) {
        setTimeout(() => handleReadAloud(aiResponse.text, aiResponse.id), 500);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: `I apologize, but I'm having trouble responding right now. ${error.message}. Please try again in a moment.`,
        sender: "ai",
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };



  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReadAloud = (text, messageId) => {
    if (!ttsSupported) {
      const errorResponse = {
        id: Date.now(),
        text: "Text-to-speech is not supported in your browser. Please use a modern browser for this feature.",
        sender: "ai",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorResponse]);
      return;
    }

    // Stop any current speech
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
      setIsPlaying(false);
      setCurrentPlayingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = ttsSettings.volume;
    utterance.rate = ttsSettings.rate;
    utterance.pitch = ttsSettings.pitch;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentPlayingId(messageId);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentPlayingId(null);
    };

    speechSynthesisRef.current.speak(utterance);
  };

  const handleTtsSettingChange = (setting, value) => {
    setTtsSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleVoiceInput = () => {
    if (!speechSupported) {
      const errorResponse = {
        id: Date.now(),
        text: "Voice input is not supported in your browser. Please use Chrome, Safari, or Edge for voice functionality.",
        sender: "ai",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorResponse]);
      return;
    }

    if (isRecording) {
      // Stop recording
      recognitionRef.current?.stop();
    } else {
      // Start recording
      try {
        recognitionRef.current?.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        const errorResponse = {
          id: Date.now(),
          text: "Failed to start voice input. Please check your microphone permissions and try again.",
          sender: "ai",
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96">
          <Card className="shadow-2xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Container */}
              <div className="h-80 overflow-y-auto px-6 pb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.sender === "ai" && (
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <div
                            className={cn(
                              "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : message.isError
                                ? "bg-destructive/10 text-destructive border border-destructive/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <p className="whitespace-pre-wrap">{message.text}</p>
                          </div>
                          {message.sender === "ai" && ttsSupported && (
                            <Button
                              onClick={() => handleReadAloud(message.text, message.id)}
                              size="sm"
                              variant="ghost"
                              className={cn(
                                "h-8 w-8 p-0 opacity-60 hover:opacity-100 transition-opacity",
                                currentPlayingId === message.id && isPlaying && "text-blue-500"
                              )}
                              title={currentPlayingId === message.id && isPlaying ? "Stop reading" : "Read aloud"}
                            >
                              {currentPlayingId === message.id && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-xs mt-1 opacity-70",
                            message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                          )}>
                            {formatTime(message.timestamp)}
                          </p>
                          {message.autoRead && (
                            <span className="text-xs text-blue-500 mt-1">Auto-read enabled</span>
                          )}
                        </div>
                      </div>
                      
                      {message.sender === "user" && (
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* TTS Settings Panel */}
              {showTtsSettings && ttsSupported && (
                <div className="border-t px-6 py-4 bg-gray-50 dark:bg-gray-900">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Speech Settings</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">Volume: {Math.round(ttsSettings.volume * 100)}%</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={ttsSettings.volume}
                          onChange={(e) => handleTtsSettingChange('volume', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">Speed: {ttsSettings.rate}x</label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={ttsSettings.rate}
                          onChange={(e) => handleTtsSettingChange('rate', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">Pitch: {ttsSettings.pitch}x</label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={ttsSettings.pitch}
                          onChange={(e) => handleTtsSettingChange('pitch', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t px-6 py-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isRecording ? "Listening..." : "Type your message..."}
                    className={cn(
                      "flex-1 transition-all duration-200",
                      isRecording && "border-red-500 bg-red-50 dark:bg-red-950/20"
                    )}
                    disabled={isTyping || isRecording}
                  />
                  {ttsSupported && (
                    <Button
                      onClick={() => setShowTtsSettings(!showTtsSettings)}
                      size="icon"
                      variant="outline"
                      disabled={isTyping}
                      className={cn(
                        "shrink-0",
                        showTtsSettings && "bg-blue-50 dark:bg-blue-950/20 border-blue-300"
                      )}
                      title="Speech settings"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                  {speechSupported && (
                    <Button
                      onClick={handleVoiceInput}
                      size="icon"
                      variant={isRecording ? "destructive" : "outline"}
                      disabled={isTyping}
                      className={cn(
                        "shrink-0 transition-all duration-200",
                        isRecording && "animate-pulse"
                      )}
                      title={isRecording ? "Stop recording" : "Start voice input"}
                    >
                      {isRecording ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!inputValue.trim() || isTyping || isRecording}
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {isRecording && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span>Listening... Speak now</span>
                  </div>
                )}
                {isPlaying && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <Volume2 className="h-4 w-4 animate-pulse" />
                    <span>Reading message aloud...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatBox;