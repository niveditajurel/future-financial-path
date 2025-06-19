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

const HeroSection = () => <section className="relative py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-background via-background/95 to-transparent overflow-hidden">
    {/* Sophisticated background layers */}
    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 pointer-events-none w-full flex justify-center">
      <div className="w-[40rem] h-[40rem] rounded-full opacity-20 blur-3xl animate-gradient-shift" style={{
      background: "radial-gradient(circle at 50% 50%, rgba(33,199,104,0.2) 0%, rgba(166,215,179,0.1) 40%, rgba(33,199,104,0.05) 80%, transparent 100%)"
    }} />
    </div>
    
    {/* Sign Up Button - Top Right */}
    <div className="absolute top-6 right-6 z-20">
      <Link to="/auth">
        <Button variant="outline" className="px-4 py-2 text-sm border-primary/30 hover:border-primary hover:bg-primary/10 rounded-lg">
          Sign Up
        </Button>
      </Link>
    </div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
      {/* Left Column - Enhanced with classy animations */}
      <div className="relative z-10 flex flex-col items-start text-left space-y-6 md:space-y-8 lg:space-y-10 animate-luxurious-fade-in">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-accent animate-text-reveal" style={{
            animationDelay: '0.2s'
          }}>
              Unlock Your Wealth Potential,&nbsp;
            </span>
            <span className="inline-block bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl lg:text-2xl xl:text-4xl shadow-2xl animate-premium-glow btn-classy-hover" style={{
            animationDelay: '0.8s'
          }}>
              Affordably
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed animate-text-reveal" style={{
          animationDelay: '1s'
        }}>
            Your Personal AI Financial Coach builds wealth, confidence, and financial peace of mind—one smart decision at a time.
          </p>
        </div>
        
        {/* Enhanced Social Proof with classy animations */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 animate-elegant-slide-up" style={{
        animationDelay: '1.2s'
      }}>
          <div className="flex -space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent border-2 md:border-3 border-white shadow-xl animate-sophisticated-float" style={{
            animationDelay: '0s'
          }} />
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent to-primary border-2 md:border-3 border-white shadow-xl animate-sophisticated-float" style={{
            animationDelay: '1s'
          }} />
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-success border-2 md:border-3 border-white shadow-xl animate-sophisticated-float" style={{
            animationDelay: '2s'
          }} />
          </div>
          <div>
            
            <p className="text-muted-foreground text-sm md:text-lg font-bold ">Building Wealth with AI</p>
          </div>
        </div>
        
        {/* Enhanced CTA Buttons with sophisticated hover effects */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full animate-elegant-slide-up" style={{
        animationDelay: '1.4s'
      }}>
          <Link to="/onboarding" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-6 md:px-10 py-6 md:py-8 text-lg md:text-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-3xl btn-classy-hover rounded-xl md:rounded-2xl border border-primary/20 hover-card-lift">
              Start Building Wealth - Free
            </Button>
          </Link>
          
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 md:px-8 py-6 md:py-8 text-lg md:text-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/10 btn-classy-hover rounded-xl md:rounded-2xl backdrop-blur-sm hover-card-lift">
              <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              View Dashboard Demo
            </Button>
          </Link>
        </div>
        
        {/* Enhanced Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 text-muted-foreground animate-text-reveal" style={{
        animationDelay: '1.6s'
      }}>
          <div className="flex items-center gap-2 md:gap-3 hover-card-lift">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary animate-elegant-pulse" />
            <span className="font-medium text-sm md:text-base">Bank-level Security</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 hover-card-lift">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-primary animate-elegant-pulse" style={{
            animationDelay: '0.5s'
          }} />
            <span className="font-medium text-sm md:text-base">4.9/5 Rating</span>
          </div>
        </div>
      </div>
      
      {/* Right Column - Enhanced animation container */}
      <div className="relative z-10 animate-luxurious-fade-in mt-8 lg:mt-0" style={{
      animationDelay: '0.6s'
    }}>
        <div className="bg-gradient-to-br from-white/8 to-white/12 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-white/20 hover-card-lift">
          <FinancialGrowthAnimation />
          <div className="text-center mt-6 md:mt-8 space-y-2 md:space-y-3 animate-text-reveal" style={{
          animationDelay: '2s'
        }}>
            <h3 className="text-xl md:text-2xl font-bold text-primary">Your Financial Growth Journey</h3>
            <p className="text-muted-foreground text-base md:text-lg">Watch your wealth grow with AI-powered guidance</p>
          </div>
        </div>
      </div>
    </div>
  </section>;

const FeaturesSection = () => <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
    <div className="max-w-6xl mx-auto px-4 text-center space-y-12 md:space-y-16 lg:space-y-20">
      <div className="space-y-4 md:space-y-6 animate-luxurious-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Why You'll Love Our Platform
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to build wealth, elegantly designed for your success
        </p>
      </div>
      
      <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => <div key={feature.title} className="group animate-elegant-slide-up" style={{
        animationDelay: `${i * 0.2}s`
      }}>
            <div className="bg-white/90 dark:bg-muted/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl hover:shadow-3xl border border-white/20 hover:border-primary/30 space-y-4 md:space-y-6 h-full hover-card-lift">
              <div className="flex justify-center">
                <div className="p-3 md:p-4 bg-primary/10 rounded-xl md:rounded-2xl group-hover:bg-primary/20 transition-all duration-500 animate-sophisticated-float" style={{
              animationDelay: `${i * 0.5}s`
            }}>
                  <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{feature.description}</p>
            </div>
          </div>)}
      </div>
    </div>
  </section>;

const TimelineAndChatbotSection = () => <section className="py-16 md:py-20 bg-background">
    <div className="max-w-5xl mx-auto px-4 text-center space-y-8 md:space-y-12">
      <div className="space-y-3 md:space-y-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Your Personalized Goal Progress
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Track your journey from first dollar to financial freedom with clear milestones
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl border border-white/10">
        <GoalTimeline goalSteps={goalSteps} />
      </div>
    </div>
  </section>;

const TestimonialsSection = () => <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
    <div className="max-w-5xl mx-auto px-4 text-center space-y-12 md:space-y-16 lg:space-y-20">
      <div className="space-y-4 md:space-y-6 animate-luxurious-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          What Our Users Say
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          Real stories from people transforming their financial future
        </p>
      </div>
      
      <div className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2">
        {testimonials.map((t, idx) => <div key={idx} className="group animate-elegant-slide-up" style={{
        animationDelay: `${idx * 0.3}s`
      }}>
            <div className="bg-white/95 dark:bg-background/90 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl hover:shadow-3xl border border-white/20 hover:border-primary/20 space-y-6 md:space-y-8 h-full hover-card-lift">
              <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                &quot;{t.quote}&quot;
              </blockquote>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent animate-sophisticated-float" style={{
              animationDelay: `${idx * 2}s`
            }} />
                <div className="text-left">
                  <p className="text-primary font-bold text-base md:text-lg">{t.author.split(',')[0]}</p>
                  <p className="text-muted-foreground text-sm md:text-base">{t.author.split(', ')[1]}</p>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>
  </section>;

const CTASection = () => <section className="py-20 md:py-24 lg:py-32 px-4 text-center bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30 animate-gradient-shift" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-sophisticated-float" />
    
    <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-10 lg:space-y-12 animate-luxurious-fade-in">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white animate-text-reveal">
          Join 12,000+ People Building Their Financial Future
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-text-reveal" style={{
        animationDelay: '0.3s'
      }}>
          Don't let another year pass without taking control of your finances. Start your wealth-building journey today—completely free.
        </p>
      </div>
      
      <div className="space-y-6 md:space-y-8 animate-elegant-slide-up" style={{
      animationDelay: '0.6s'
    }}>
        <Link to="/onboarding">
          <Button className="px-8 md:px-12 lg:px-16 py-6 md:py-8 text-lg md:text-xl lg:text-2xl bg-white text-primary font-bold shadow-2xl hover:shadow-3xl hover:bg-white/95 btn-classy-hover rounded-xl md:rounded-2xl border-2 border-white/20">
            Get Your Free AI Financial Coach
          </Button>
        </Link>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 text-white/80 text-base md:text-lg">
          <div className="flex items-center gap-2 md:gap-3 hover-card-lift">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 animate-elegant-pulse" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 hover-card-lift">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 animate-elegant-pulse" style={{
            animationDelay: '0.5s'
          }} />
            <span>Setup in 2 minutes</span>
          </div>
        </div>
      </div>
    </div>
  </section>;

const Index = () => <main className="min-h-screen bg-background">
    <HeroSection />
    <FeaturesSection />
    <TimelineAndChatbotSection />
    <TestimonialsSection />
    <CTASection />
    <AiChatBubble userId="user-001" chatSessionId="session-abc" userProfile={sampleUserProfile} supabaseContext={sampleSupabaseContext} />
  </main>;

export default Index;
