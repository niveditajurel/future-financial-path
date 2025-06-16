
import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Bot, X, MessageCircle } from "lucide-react";
import { AiChatbot } from "./AiChatbot";

type UserProfile = {
  name?: string;
  email?: string;
  [key: string]: any;
};

type AiChatBubbleProps = {
  userId: string;
  chatSessionId: string;
  userProfile?: UserProfile;
  supabaseContext?: any;
};

// Enhanced floating chat bubble with more engaging design
export const AiChatBubble: React.FC<AiChatBubbleProps> = ({
  userId,
  chatSessionId,
  userProfile,
  supabaseContext,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Enhanced BUBBLE with pulsing animation and better styling */}
      <div className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8">
        {/* Notification badge */}
        <div className="absolute -top-2 -left-2 bg-success text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce z-10">
          AI Coach
        </div>
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping scale-110" />
        
        {/* Main button */}
        <button
          type="button"
          aria-label="Chat with your AI Financial Coach"
          className="relative shadow-2xl rounded-full bg-gradient-to-br from-primary to-accent text-white w-16 h-16 flex items-center justify-center hover:scale-110 transition-all duration-300 outline-none focus:ring-4 focus:ring-primary/50 group"
          onClick={() => setOpen(true)}
          style={{ 
            boxShadow: '0 8px 32px 4px rgba(33, 199, 104, 0.3), 0 4px 16px 2px rgba(33, 199, 104, 0.2)' 
          }}
        >
          <MessageCircle className="w-8 h-8 transition-transform group-hover:scale-110" />
        </button>
        
        {/* Floating message tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-background text-foreground px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border border-primary/20">
            💬 Ask me anything about money!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background" />
          </div>
        </div>
      </div>
      
      {/* Enhanced DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full px-0 py-0 bg-background shadow-2xl overflow-hidden rounded-2xl border-2 border-primary/20">
          <div className="relative">
            <button
              aria-label="Close chat"
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition z-20 bg-background/80 backdrop-blur-sm rounded-full p-1"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <AiChatbot
              userId={userId}
              chatSessionId={chatSessionId}
              userProfile={userProfile}
              supabaseContext={supabaseContext}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
