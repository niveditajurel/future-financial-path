
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
import { FadeIn, PopIn, Wiggle, Flicker, HeroGlow } from "@/components/ui/animations";

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

// --- HERO SECTION ---
const HeroSection = () => (
  <section className="relative py-20 px-4 text-center bg-gradient-to-br from-black to-[#16181A] min-h-[70vh] flex flex-col justify-center items-center overflow-hidden">
    <HeroGlow />
    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <PopIn delay={50}>
        <h1 className="text-[2.9rem] md:text-6xl font-extrabold mb-5 leading-snug tracking-tight text-white drop-shadow-sm bg-gradient-to-r from-white via-green-400 to-primary bg-clip-text text-transparent animate-fade-in transition-all duration-700">
          <Flicker>
            Unlock Your <span className="text-primary">Financial Future</span>
          </Flicker>
          <br />
          <Wiggle>
            <span className="inline-block">
              with <span className="text-primary">Smart Advice</span>
            </span>
          </Wiggle>
        </h1>
      </PopIn>
      <FadeIn delay={170}>
        <p className="text-xl md:text-2xl text-white/70 mb-9 animate-fade-in">
          Your <span className="text-primary font-semibold">AI Coach</span> for Money Confidence—No Experience Needed
        </p>
      </FadeIn>
      <PopIn delay={380}>
        <Button className="px-9 py-4 text-lg shadow-xl bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl font-bold ring-2 ring-primary/30 border-2 border-white/10 transition-all scale-105 hover:scale-110 animate-wiggle">
          Start Your Wealth Journey
        </Button>
      </PopIn>
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <PopIn delay={520}>
          <span className="rounded-full bg-accent/90 px-5 py-2 text-sm font-semibold text-foreground shadow ring-1 ring-primary/20 animate-heroGlow">
            New! <span className="text-primary">Built for Gen Z &amp; Millennials</span>
          </span>
        </PopIn>
        <FadeIn delay={610}>
          <span className="rounded-full bg-primary/25 px-5 py-2 text-sm font-semibold text-primary-foreground shadow hover-scale ring-1 ring-primary/30">
            Try in dark mode!
          </span>
        </FadeIn>
      </div>
    </div>
    {/* Decorative animated lines/circles for visual interest */}
    <div className="absolute pointer-events-none left-1/3 top-12 w-[32vw] h-[32vw] rounded-full animate-heroGlow bg-primary/10 blur-2xl" />
    <div className="absolute pointer-events-none right-10 bottom-0 w-36 h-36 rounded-full bg-primary/40 blur-2xl opacity-30 animate-fade-in" style={{animationDelay:'900ms'}} />
    <div className="absolute pointer-events-none left-0 top-[9rem] w-[10vw] h-[10vw] rounded-full bg-cta/60 blur-2xl opacity-10 animate-fade-in" style={{animationDelay:'1100ms'}} />
  </section>
);

const FeaturesSection = () => (
  <section className="py-16 bg-muted">
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
      <FadeIn>
        <h2 className="text-3xl font-bold text-center mb-10 text-primary drop-shadow animate-fade-in">
          Why You'll Love Our App
        </h2>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <PopIn
            key={feature.title}
            delay={i * 110}
          >
            <div className="flex flex-col items-center rounded-xl bg-background dark:bg-muted shadow-xl hover:shadow-2xl border border-border p-6 space-y-3 hover-scale transition-all animate-scale-in">
              <div className="flex-shrink-0 drop-shadow-lg">
                <feature.icon className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-xl mb-1 text-primary">{feature.title}</h3>
              <p className="text-base text-muted-foreground text-center">{feature.description}</p>
            </div>
          </PopIn>
        ))}
      </div>
    </div>
  </section>
);

const TimelineAndChatbotSection = () => (
  <section className="bg-background py-16">
    <div className="max-w-5xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="md:col-span-2 w-full">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-4 text-primary text-center md:text-left animate-fade-in">
            Your Goal Progress
          </h2>
        </FadeIn>
        {/* Animate timeline appearance */}
        <FadeIn delay={100}>
          <GoalTimeline goalSteps={goalSteps} />
        </FadeIn>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-secondary dark:bg-muted">
    <div className="max-w-3xl mx-auto px-2 sm:px-4 text-center">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-8 text-primary animate-fade-in">
          What Our Users Say
        </h2>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <PopIn
            key={idx}
            delay={idx * 120 + 70}
          >
            <div className="bg-background dark:bg-muted border rounded-lg shadow-xl p-6 flex flex-col h-full justify-between hover:scale-105 hover:shadow-2xl transition-transform animate-scale-in">
              <blockquote className="text-lg italic mb-4 text-muted-foreground">&quot;{t.quote}&quot;</blockquote>
              <span className="text-primary font-medium">{t.author}</span>
            </div>
          </PopIn>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4 text-center bg-gradient-to-tr from-primary to-cta relative overflow-hidden">
    {/* Animated circles */}
    <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-full flex justify-center z-0">
      <div className="w-32 h-32 rounded-full bg-primary/60 blur-2xl animate-pulse scale-75" />
      <div className="w-24 h-24 rounded-full bg-cta/30 blur-xl animate-pulse ml-[-40px] scale-150" />
    </div>
    <div className="relative z-10">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow animate-fade-in">
          Take the Guesswork Out of Money
        </h2>
      </FadeIn>
      <FadeIn delay={100}>
        <p className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in">
          Join thousands of people starting their path to financial freedom.
        </p>
      </FadeIn>
      <PopIn delay={200}>
        <Button className="px-8 py-4 text-lg bg-white text-primary font-bold border border-primary shadow-md hover:bg-blue-50 animate-scale-in hover:scale-110 transition-transform scale-105 rounded-xl">
          Get Started Now
        </Button>
      </PopIn>
    </div>
  </section>
);

const Index = () => (
  <main className="min-h-screen bg-background relative">
    <HeroSection />
    <FeaturesSection />
    <TimelineAndChatbotSection />
    <TestimonialsSection />
    <CTASection />
    <AiChatBubble
      userId="user-001"
      chatSessionId="session-abc"
      userProfile={sampleUserProfile}
      supabaseContext={sampleSupabaseContext}
    />
  </main>
);

export default Index;
