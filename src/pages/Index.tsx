
import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, Shield, Star, LayoutDashboard, Users, Award, Zap } from "lucide-react";
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
  <section className="relative py-20 px-4 bg-gradient-to-b from-background to-transparent overflow-hidden md:py-[108px] my-[7px]">
    {/* Enhanced animated floating glowy rings */}
    <div className="absolute left-1/2 top-0 md:top-0 -translate-x-1/2 z-0 pointer-events-none w-full flex justify-center">
      <div className="w-96 h-96 md:w-[40rem] md:h-[40rem] rounded-full opacity-70 blur-3xl animate-pulse-slow" style={{
        background: "radial-gradient(circle at 50% 55%, rgba(33,199,104,0.25) 0%, rgba(166,215,179,0.15) 40%, transparent 90%)"
      }} />
    </div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Main Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        <FadeIn>
          <PopIn>
            <h1 className="text-5xl md:text-6xl xl:text-7xl leading-tight font-extrabold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent animate-gradient-x">
                Unlock Your Wealth Potential,&nbsp;
              </span>
              <span className="ml-2">
                <PulseGlow>
                  <span style={{
                    color: "hsl(var(--primary))",
                    background: "white",
                    boxShadow: "0 4px 24px 0 rgba(33,199,104,0.2)",
                    border: "2px solid hsl(var(--primary))"
                  }} className="inline-block rounded-lg py-2 font-bold text-lg mx-0 md:text-4xl px-[86px] text-left">Affordably</span>
                </PulseGlow>
              </span>
            </h1>
          </PopIn>
          
          <FadeIn delay={120}>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8 max-w-2xl">
              Your Personal AI Financial Coach builds wealth, confidence, and financial peace of mind—one smart decision at a time.
            </p>
          </FadeIn>
          
          {/* Enhanced Social Proof */}
          <FadeIn delay={180}>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent animate-float" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent animate-float" style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-muted-foreground text-sm">Join 12,000+ people building wealth</p>
            </div>
          </FadeIn>
          
          {/* Enhanced CTA Buttons */}
          <FadeIn delay={220}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/auth" className="group px-0 py-[22px]">
                <button className="relative px-8 font-bold text-lg rounded-xl bg-primary hover:bg-accent text-primary-foreground shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ring-2 ring-accent/30 ring-offset-2 ring-offset-background focus:outline-none focus:ring-4 focus:ring-primary/50 py-[12px] animate-button-glow">
                  Start Building Wealth - Free
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-xl my-[10px] py-[20px] mx-[35px]" />
                </button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-500 gap-3 rounded-none mx-[4px] px-[10px] text-lg py-[26px] my-[22px] hover:scale-105 transform">
                  <LayoutDashboard className="w-6 h-6" />
                  View Dashboard Demo
                </Button>
              </Link>
            </div>
          </FadeIn>
          
          {/* Trust Indicators */}
          <FadeIn delay={280}>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary animate-pulse" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary animate-pulse" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </FadeIn>
        </FadeIn>
      </div>
      
      {/* Right Column - Financial Growth Animation */}
      <div className="relative z-10">
        <FadeIn delay={300}>
          <div className="bg-gradient-to-br from-muted/50 to-secondary/30 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/20 hover:shadow-3xl transition-all duration-500 animate-float">
            <FinancialGrowthAnimation />
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-primary mb-2 animate-fade-in">Your Financial Growth Journey</h3>
              <p className="text-muted-foreground">Watch your wealth grow with AI-powered guidance</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-16 bg-background">
    <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary animate-fade-in">
        Why You'll Love Our App
      </h2>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        Everything you need to build wealth, all in one simple app
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <div key={feature.title} className="flex flex-col items-center rounded-xl bg-white dark:bg-muted shadow hover:shadow-xl p-6 space-y-3 hover:scale-105 transition-all duration-500 animate-scale-in group" style={{
            animationDelay: `${i * 80}ms`
          }}>
            <div className="flex-shrink-0 drop-shadow-lg animate-float group-hover:animate-bounce">
              <feature.icon className="h-12 w-12 text-primary transition-all duration-300 group-hover:scale-110" />
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
    <div className="max-w-5xl mx-auto px-2 sm:px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary animate-fade-in">
        Your Personalized Goal Progress
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Track your journey from first dollar to financial freedom
      </p>
      <div className="animate-fade-in" style={{ animationDelay: "120ms" }}>
        <GoalTimeline goalSteps={goalSteps} />
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 bg-blue-50 dark:bg-muted">
    <div className="max-w-4xl mx-auto px-2 sm:px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary animate-fade-in">
        What Our Users Say
      </h2>
      <p className="text-lg text-muted-foreground mb-12">
        Real stories from people building their financial future
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white dark:bg-background border rounded-xl shadow-lg p-8 flex flex-col h-full justify-between hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-scale-in" style={{
            animationDelay: `${idx * 90 + 70}ms`
          }}>
            <blockquote className="text-lg italic mb-6 text-muted-foreground leading-relaxed">
              &quot;{t.quote}&quot;
            </blockquote>
            <span className="text-primary font-semibold text-sm">{t.author}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-20 px-4 text-center bg-gradient-to-tr from-primary to-blue-400 relative overflow-hidden">
    <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-full flex justify-center z-0">
      <div className="w-32 h-32 rounded-full bg-accent/40 blur-2xl animate-pulse-slow scale-75" />
      <div className="w-24 h-24 rounded-full bg-cta/30 blur-xl animate-pulse-slow ml-[-40px] scale-150" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
        Join 12,000+ People Building Their Financial Future
      </h2>
      <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
        Don't let another year pass without taking control of your finances. Start your wealth-building journey today—completely free.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link to="/auth">
          <Button className="px-10 py-6 text-xl bg-white text-primary font-bold border-2 border-white shadow-2xl hover:bg-blue-50 hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 animate-button-glow">
            Get Your Free AI Financial Coach
          </Button>
        </Link>
        <p className="text-white/80 text-sm animate-fade-in">✓ No credit card required ✓ Setup in 2 minutes</p>
      </div>
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
    <AiChatBubble userId="user-001" chatSessionId="session-abc" userProfile={sampleUserProfile} supabaseContext={sampleSupabaseContext} />
  </main>
);

export default Index;
