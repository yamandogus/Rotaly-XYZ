"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget Container */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Rotaly Destek
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat Messages Area */}
          <div className="flex-1 p-4 h-64 overflow-y-auto">
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Merhaba! Size nasıl yardımcı olabilirim?
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="sm" className="px-4">
                Gönder
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}