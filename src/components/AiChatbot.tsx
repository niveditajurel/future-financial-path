
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { AssistantContext, AssistantUserProfile } from "@/types/finwise";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type AiChatbotProps = {
  userId: string;
  chatSessionId: string;
  userProfile?: AssistantUserProfile;
  supabaseContext?: AssistantContext;
};

const getGreetingContext = (
  userProfile?: AssistantUserProfile,
  supabaseContext?: AssistantContext
) => {
  let context =
    "You are a helpful and friendly assistant. Personalize your responses based on userProfile if provided.";
  if (userProfile?.name) {
    context += ` The user's name is ${userProfile.name}.`;
  }
  if (supabaseContext) {
    context += ` There is extra context: ${JSON.stringify(supabaseContext)}`;
  }
  return context;
};

const TypingDots = () => (
  <span className="ml-1 animate-pulse">...</span>
);

export const AiChatbot: React.FC<AiChatbotProps> = ({
  userId,
  chatSessionId,
  userProfile,
  supabaseContext,
}) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState("");
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [history, aiTyping]);

  const getAssistantErrorMessage = (error: unknown) => {
    const message = error instanceof Error ? error.message.toLowerCase() : "";

    if (
      message.includes("unauthorized") ||
      message.includes("jwt") ||
      message.includes("auth")
    ) {
      return "Your session has expired or chat access is restricted. Please sign in again to continue.";
    }

    return "Oops, something went wrong.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: `${Date.now()}`,
      role: "user",
      content: input,
    };
    setHistory((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate streaming response for typing animation
    setAiTyping(""); // Reset the typing
    const context = getGreetingContext(userProfile, supabaseContext);

    // Prepare messages for context
    const fullContext = [
      { role: "system", content: context },
      ...history.slice(-8).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input },
    ];
    try {
      // Call our Supabase edge function for chat completion
      const { data, error } = await supabase.functions.invoke('chat-completion', {
        body: {
          messages: fullContext,
          userProfile,
          supabaseContext
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response from AI');
      }

      const answer: string = data?.message || "Sorry, there was an error getting a response.";

      // Typing animation per character
      let displayed = "";
      for (const char of answer) {
        displayed += char;
        setAiTyping(displayed);
        await new Promise((r) => setTimeout(r, 12)); // Typing delay
      }

      setHistory((prev) => [
        ...prev,
        { id: `${Date.now()}-ai`, role: "assistant", content: answer },
      ]);
      setAiTyping("");
    } catch (err) {
      setAiTyping("");
      setHistory((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content: getAssistantErrorMessage(err),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) sendMessage();
    }
  };

  return (
    <div className="h-[520px] max-w-lg mx-auto flex flex-col border rounded-2xl bg-background shadow-lg overflow-hidden">
      <div className="flex flex-col px-4 py-3 border-b bg-muted">
        <h2 className="text-xl font-bold">
          <span role="img" aria-label="bot" className="mr-2">🤖</span>
          AI Assistant
        </h2>
        {userProfile?.name && (
          <span className="text-xs text-muted-foreground">
            Chatting as: <span className="font-semibold">{userProfile.name}</span>
          </span>
        )}
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-background"
        ref={chatWindowRef}
      >
        {history.length === 0 && (
          <div className="text-center text-muted-foreground text-sm mt-16">
            Say hello! The assistant will remember your conversation in this session.
          </div>
        )}
        {history.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[75%] px-4 py-2 rounded-lg shadow",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && aiTyping && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-4 py-2 rounded-lg bg-accent text-accent-foreground shadow">
              <span>{aiTyping}</span>
              <TypingDots />
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!isLoading) sendMessage();
        }}
        className="p-4 border-t bg-background"
        autoComplete="off"
      >
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            rows={2}
            placeholder="Type your message..."
            className="resize-none bg-muted flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-10"
          >
            {isLoading ? (
              <span className="animate-pulse">…</span>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
