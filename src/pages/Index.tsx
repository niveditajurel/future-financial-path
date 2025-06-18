
import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, Shield, Star, LayoutDashboard, Users, Award, Zap, CheckCircle } from "lucide-react";
import { AiChatbot } from "@/components/AiChatbot";
import { GoalTimeline } from "@/components/GoalTimeline";
import React from "react";
import { AiChatBubble } from "@/components/AiChatBubble";
import { FadeIn, PopIn, PulseGlow, Flicker } from "@/components/ui/animations";
import { FinancialGrowthAnimation } from "@/components/FinancialGrowthAnimation";
import { Link } from "react-router-dom";

const features = [{
  icon: CircleDollarSign,
  title: "Accessible Expertise",
  description: "Get expert-level advice, 24/7, without high fees or jargon—designed for people just starting their wealth journey."
}, {
  icon: FileText,
  title: "Personalized Guidance",
  description: "Smart AI tailors coaching and step-by-step money plans to your unique goals, lifestyle, and experience."
}, {
  icon: Shield,
  title: "Trust & Privacy First",
  description: "Your data stays secure, private, and never influences your plan—your success is our only goal."
}, {
  icon: Star,
  title: "Grow with Confidence",
  description: "Learn money skills as you go, build positive habits, and celebrate every financial win with encouragement from your AI coach."
}];

const testimonials = [{
  quote: "I was always intimidated by money, but this app made it easy. Now I actually feel confident about my finances and have a clear plan.",
  author: "Jamie T., First-time Investor"
}, {
  quote: "Finally, advice that makes sense and doesn't break the bank. The AI coach is patient, practical, and always available.",
  author: "Alex R., Young Professional"
}];

const goalSteps = [{
  label: "Start Emergency Fund",
  tip: "Begin with $500 for unplanned expenses.",
  date: "2024-07-01",
  progress: 30
}, {
  label: "Reach $2,000",
  tip: "Automate $200 per month from your paycheck.",
  date: "2024-12-01",
  progress: 60
}, {
  label: "Buy a House",
  tip: "Research loan options at least 6 months beforehand.",
  date: "2026-08-15",
  progress: 90
}];

const sampleUserProfile = {
  name: "Jane Doe",
  email: "jane@example.com"
};

const sampleSupabaseContext = {
  lastLogin: "2025-06-14"
};

const HeroSection = () => (
  <section className="relative py-24 px-4 bg-gradient-to-b from-background via-background/95 to-transparent overflow-hidden">
    {/* Elegant background gradient */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 pointer-events-none w-full flex justify-center">
      <div className="w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full opacity-40 blur-3xl" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(33,199,104,0.15) 0%, rgba(166,215,179,0.08) 50%, transparent 100%)"
      }} />
    </div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Left Column - Main Content */}
      <div className="relative z-10 flex flex-col items-start text-left space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl xl:text-7xl leading-tight font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent">
              Unlock Your Wealth Potential,&nbsp;
            </span>
            <span className="inline-block bg-primary text-white px-4 py-2 rounded-lg font-bold text-xl md:text-4xl shadow-lg">
              Affordably
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
            Your Personal AI Financial Coach builds wealth, confidence, and financial peace of mind—one smart decision at a time.
          </p>
        </div>
        
        {/* Refined Social Proof */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white shadow-sm" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white shadow-sm" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success border-2 border-white shadow-sm" />
          </div>
          <div>
            <p className="text-foreground font-semibold">12,000+ people</p>
            <p className="text-muted-foreground text-sm">building wealth with AI</p>
          </div>
        </div>
        
        {/* Elegant CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/auth">
            <Button className="px-8 py-6 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
              Start Building Wealth - Free
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-6 py-6 text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 rounded-xl">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              View Dashboard Demo
            </Button>
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Bank-level Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span>4.9/5 Rating</span>
          </div>
        </div>
      </div>
      
      {/* Right Column - Financial Growth Animation */}
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
          <FinancialGrowthAnimation />
          <div className="text-center mt-6 space-y-2">
            <h3 className="text-xl font-semibold text-primary">Your Financial Growth Journey</h3>
            <p className="text-muted-foreground">Watch your wealth grow with AI-powered guidance</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-20 bg-gradient-to-b from-background to-muted/30">
    <div className="max-w-6xl mx-auto px-4 text-center space-y-16">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary">
          Why You'll Love Our Platform
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build wealth, elegantly designed for your success
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <div key={feature.title} className="group">
            <div className="bg-white/80 dark:bg-muted/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 hover:border-primary/20 space-y-4 h-full">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TimelineAndChatbotSection = () => (
  <section className="py-20 bg-background">
    <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary">
          Your Personalized Goal Progress
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Track your journey from first dollar to financial freedom with clear milestones
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
        <GoalTimeline goalSteps={goalSteps} />
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
    <div className="max-w-5xl mx-auto px-4 text-center space-y-16">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary">
          What Our Users Say
        </h2>
        <p className="text-xl text-muted-foreground">
          Real stories from people transforming their financial future
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div key={idx} className="group">
            <div className="bg-white/90 dark:bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 hover:border-primary/20 space-y-6 h-full">
              <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                &quot;{t.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div className="text-left">
                  <p className="text-primary font-semibold">{t.author.split(',')[0]}</p>
                  <p className="text-muted-foreground text-sm">{t.author.split(', ')[1]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 px-4 text-center bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
    
    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
      <div className="space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white">
          Join 12,000+ People Building Their Financial Future
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Don't let another year pass without taking control of your finances. Start your wealth-building journey today—completely free.
        </p>
      </div>
      
      <div className="space-y-6">
        <Link to="/auth">
          <Button className="px-12 py-6 text-xl bg-white text-primary font-bold shadow-2xl hover:shadow-3xl hover:bg-white/95 transition-all duration-300 rounded-xl">
            Get Your Free AI Financial Coach
          </Button>
        </Link>
        
        <div className="flex items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => (
  <main className="min-h-screen bg-background">
    <HeroSection />
    <FeaturesSection />
    <TimelineAndChatbotSection />
    <TestimonialsSection />
    <CTASection />
    <AiChatBubble userId="user-001" chatSessionId="session-abc" userProfile={sampleUserProfile} supabaseContext={sampleSupabaseContext} />
  </main>
);

export default Index;
