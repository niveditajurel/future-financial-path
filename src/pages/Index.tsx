import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  FileText,
  Shield,
  Star,
} from "lucide-react";
import { AiChatbot } from "@/components/AiChatbot";
import { GoalTimeline } from "@/components/GoalTimeline";
import React from "react";
import { AiChatBubble } from "@/components/AiChatBubble";

const features = [
  {
    icon: CircleDollarSign,
    title: "Accessible Expertise",
    description:
      "Get expert-level advice, 24/7, without high fees or jargon—designed for people just starting their wealth journey.",
  },
  {
    icon: FileText,
    title: "Personalized Guidance",
    description:
      "Smart AI tailors coaching and step-by-step money plans to your unique goals, lifestyle, and experience.",
  },
  {
    icon: Shield,
    title: "Trust & Privacy First",
    description:
      "Your data stays secure, private, and never influences your plan—your success is our only goal.",
  },
  {
    icon: Star,
    title: "Grow with Confidence",
    description:
      "Learn money skills as you go, build positive habits, and celebrate every financial win with encouragement from your AI coach.",
  },
];

const testimonials = [
  {
    quote:
      "I was always intimidated by money, but this app made it easy. Now I actually feel confident about my finances and have a clear plan for my future.",
    author: "Jamie T., First-time Investor",
  },
  {
    quote:
      "Finally, advice that makes sense and doesn't break the bank. The AI coach is patient, practical, and always available.",
    author: "Alex R., Young Professional",
  },
];

// --- MOCK DATA for GoalTimeline ---
const goalSteps = [
  {
    label: "Start Emergency Fund",
    tip: "Begin with $500 for unplanned expenses.",
    date: "2024-07-01",
    progress: 30,
  },
  {
    label: "Reach $2,000",
    tip: "Automate $200 per month from your paycheck.",
    date: "2024-12-01",
    progress: 60,
  },
  {
    label: "Buy a House",
    tip: "Research loan options at least 6 months beforehand.",
    date: "2026-08-15",
    progress: 90,
  },
];

// --- MOCK PROPS for AiChatbot ---
const sampleUserProfile = {
  name: "Jane Doe",
  email: "jane@example.com",
  // Any additional user fields
};
const sampleSupabaseContext = { lastLogin: "2025-06-14" };

const HeroSection = () => (
  <section className="py-16 px-4 text-center bg-gradient-to-b from-white to-blue-50">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
      Unlock Your Financial Future with Smart, Personalized Advice
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-8">
      Your AI Coach for Money Confidence—No Experience Needed
    </p>
    <Button className="px-8 py-4 text-lg shadow-lg">Start Your Wealth Journey Today</Button>
  </section>
);

const FeaturesSection = () => (
  <section className="py-16 bg-background">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Why You'll Love Our App
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start rounded-lg bg-white shadow p-6 space-x-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex-shrink-0">
              <feature.icon className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-1 text-primary">{feature.title}</h3>
              <p className="text-base text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TimelineAndChatbotSection = () => (
  <section className="bg-background py-16">
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Goal Timeline ONLY */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center md:text-left">
          Your Goal Progress
        </h2>
        <GoalTimeline goalSteps={goalSteps} />
      </div>
      {/* The chatbot is now launched by the bubble, not in-page. */}
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <h2 className="text-2xl font-bold mb-8 text-primary">What Our Users Say</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white border rounded-lg shadow p-6 flex flex-col h-full justify-between">
            <blockquote className="text-lg italic mb-4 text-muted-foreground">&quot;{t.quote}&quot;</blockquote>
            <span className="text-primary font-medium">{t.author}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4 text-center bg-gradient-to-tr from-primary to-blue-400">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow">
      Take the Guesswork Out of Money
    </h2>
    <p className="text-lg md:text-xl mb-8 text-white/90">
      Join thousands of people starting their path to financial freedom.
    </p>
    <Button className="px-8 py-4 text-lg bg-white text-primary font-bold border border-primary shadow-md hover:bg-blue-50">
      Get Started Now
    </Button>
  </section>
);

const Index = () => (
  <main className="min-h-screen bg-background relative">
    {/* Hero Section */}
    <HeroSection />

    {/* Features Section */}
    <FeaturesSection />

    {/* Timeline & Chatbot Section */}
    <TimelineAndChatbotSection />

    {/* Testimonials Section */}
    <TestimonialsSection />

    {/* Call to Action Section */}
    <CTASection />

    {/* AI Chat Bubble */}
    <AiChatBubble
      userId="user-001"
      chatSessionId="session-abc"
      userProfile={sampleUserProfile}
      supabaseContext={sampleSupabaseContext}
    />
  </main>
);

export default Index;
