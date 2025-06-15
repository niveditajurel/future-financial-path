
import React, { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Bot, X } from "lucide-react";
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

// Floating chat bubble that opens a dialog with the AI assistant
export const AiChatBubble: React.FC<AiChatBubbleProps> = ({
  userId,
  chatSessionId,
  userProfile,
  supabaseContext,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BUBBLE */}
      <button
        type="button"
        aria-label="Open AI Coach Assistant"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 shadow-lg rounded-full bg-primary text-white w-16 h-16 flex items-center justify-center hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-ring"
        onClick={() => setOpen(true)}
        style={{ boxShadow: '0 4px 24px 2px rgb(34 61 255 / 9%)' }}
      >
        <Bot className="w-8 h-8" />
      </button>
      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full px-0 py-0 bg-background shadow-2xl overflow-hidden rounded-2xl animate-fade-in">
          <div className="relative">
            <button
              aria-label="Close chat"
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition"
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

