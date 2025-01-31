import React, { useState } from 'react';
import { Smile, Send } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emojis = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '💘', '💝', '💖', '💗', '💓'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍍', '🥝', '🍅']
};

const EmojiChatPicker = () => {
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setMessage(prev => prev + emoji);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Implement your send message logic here
      console.log('Sending message:', message);
      setMessage('');
      setSelectedEmoji('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Chat Display Area */}
      <div className="p-4 h-64 overflow-y-auto bg-gray-50">
        {/* Placeholder for chat messages */}
        <div className="text-center text-gray-500">No messages yet</div>
      </div>

      {/* Message Input Area */}
      <div className="flex items-center p-4 border-t border-gray-200">
        {/* Emoji Picker Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="mr-2 hover:bg-gray-100 p-2 rounded-full transition-colors">
              <Smile className="text-gray-600" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Select an Emoji</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="smileys" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {Object.keys(emojis).map(category => (
                  <TabsTrigger key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(emojis).map(([category, categoryEmojis]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-7 gap-2 p-4">
                    {categoryEmojis.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Message Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Button */}
        <button 
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default EmojiChatPicker;