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
import { FadeIn, PopIn, PulseGlow, Flicker } from "@/components/ui/animations";

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
  <section className="relative py-20 md:py-32 px-4 bg-gradient-to-b from-background to-transparent overflow-hidden text-center">
    {/* Animated floating glowy rings */}
    <div className="absolute left-1/2 top-0 md:top-0 -translate-x-1/2 z-0 pointer-events-none w-full flex justify-center">
      <div className="w-96 h-96 md:w-[34rem] md:h-[34rem] rounded-full opacity-60 blur-3xl" style={{
        background: "radial-gradient(circle at 50% 55%, rgba(33,199,104,0.22) 0%, transparent 90%)",
      }} />
    </div>
    <FadeIn>
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-1">
        <PopIn>
          <h1 className="text-5xl md:text-6xl leading-tight font-extrabold mb-5 tracking-tight drop-shadow max-w-xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent inline-block">
            <span className="inline-block">
              Unlock&nbsp;
              <span
                style={{
                  color: "hsl(var(--primary))",
                  textShadow: "0 0 4px hsl(var(--primary)), 0 0 8px #21c768, 0 0 2px #fff",
                  fontWeight: 900,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Flicker>your future</Flicker>
              </span>
              &nbsp;with
              <span className="ml-2">
                <PulseGlow>
                  <span
                    className="inline-block rounded px-2 py-1 font-bold"
                    style={{
                      color: "hsl(var(--primary))",
                      background: "white",
                      boxShadow: "0 2px 18px 0 rgba(33,199,104,0.18)",
                      border: "2px solid hsl(var(--primary))",
                    }}
                  >
                    Smart Money Advice
                  </span>
                </PulseGlow>
              </span>
            </span>
          </h1>
        </PopIn>
        <FadeIn delay={120}>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-6 md:mb-8 max-w-lg animate-fade-in" style={{animationDelay: "120ms"}}>
            Your AI coach for building wealth, confidence, and financial peace of mind—one step at a time.
          </p>
        </FadeIn>
        <FadeIn delay={220}>
          <button className="relative px-10 py-4 font-bold text-lg rounded-lg bg-primary hover:bg-accent text-primary-foreground shadow-xl active:scale-98 transition transform animate-pop-in ring-2 ring-accent/20 ring-offset-2 ring-offset-background focus:outline-none focus:ring-4 focus:ring-cta/50 duration-150">
            Get Started—It's Free
            <span className="absolute top-0 right-0 z-[-1]">
              <PulseGlow size={42} color="rgba(33,199,104,0.23)" />
            </span>
          </button>
        </FadeIn>
        <FadeIn delay={340}>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <span className="rounded-full bg-muted/80 px-5 py-2 text-sm font-semibold text-accent-foreground shadow hover-scale">
              For Gen Z &amp; Millennials
            </span>
            <span className="rounded-full bg-success/80 px-5 py-2 text-sm font-semibold text-success-foreground shadow hover-scale">
              Try in Dark Mode!
            </span>
            <span className="rounded-full border border-highlight px-5 py-2 text-sm font-semibold text-highlight shadow hover-scale">
              No Experience Needed
            </span>
          </div>
        </FadeIn>
      </div>
    </FadeIn>
  </section>
);

const FeaturesSection = () => (
  <section className="py-16 bg-background">
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary animate-fade-in">
        Why You'll Love Our App
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="flex flex-col items-center rounded-xl bg-white dark:bg-muted shadow hover:shadow-lg p-6 space-y-3 hover-scale animate-scale-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex-shrink-0 drop-shadow-lg animate-bounce">
              <feature.icon className="h-12 w-12 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="font-semibold text-xl mb-1 text-primary">{feature.title}</h3>
            <p className="text-base text-muted-foreground text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TimelineAndChatbotSection = () => (
  <section className="bg-background py-16">
    <div className="max-w-5xl mx-auto px-2 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="md:col-span-2 w-full">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center md:text-left animate-fade-in">
          Your Goal Progress
        </h2>
        {/* Animate timeline appearance */}
        <div className="animate-fade-in" style={{animationDelay:"120ms"}}>
          <GoalTimeline goalSteps={goalSteps} />
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-blue-50 dark:bg-muted">
    <div className="max-w-3xl mx-auto px-2 sm:px-4 text-center">
      <h2 className="text-2xl font-bold mb-8 text-primary animate-fade-in">
        What Our Users Say
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-background border rounded-lg shadow p-6 flex flex-col h-full justify-between hover:scale-105 hover:shadow-lg transition-transform animate-scale-in"
            style={{ animationDelay: `${idx * 90 + 70}ms` }}
          >
            <blockquote className="text-lg italic mb-4 text-muted-foreground">&quot;{t.quote}&quot;</blockquote>
            <span className="text-primary font-medium">{t.author}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4 text-center bg-gradient-to-tr from-primary to-blue-400 relative overflow-hidden">
    {/* Animated circles */}
    <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-full flex justify-center z-0">
      <div className="w-32 h-32 rounded-full bg-accent/40 blur-2xl animate-pulse scale-75" />
      <div className="w-24 h-24 rounded-full bg-cta/30 blur-xl animate-pulse ml-[-40px] scale-150" />
    </div>
    <div className="relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow animate-fade-in">
        Take the Guesswork Out of Money
      </h2>
      <p className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in">
        Join thousands of people starting their path to financial freedom.
      </p>
      <Button className="px-8 py-4 text-lg bg-white text-primary font-bold border border-primary shadow-md hover:bg-blue-50 animate-scale-in hover:scale-105 transition-transform">
        Get Started Now
      </Button>
    </div>
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
