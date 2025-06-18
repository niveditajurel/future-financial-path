
import React from "react";
import { TrendingUp, DollarSign, PiggyBank, Zap } from "lucide-react";

export const FinancialGrowthAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-72 flex items-center justify-center">
      {/* Enhanced background glow with smoother animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/40 to-success/30 rounded-full blur-3xl animate-pulse-glow opacity-80" />
      
      {/* Main growth chart visual with smoother bars */}
      <div className="relative z-10 flex items-end space-x-3 h-40">
        {/* Animated bars representing growth with staggered smooth animation */}
        <div 
          className="bg-gradient-to-t from-primary via-accent to-primary rounded-t-lg w-10 shadow-lg animate-grow-bar"
          style={{ 
            height: '40%',
            animationDelay: '0ms',
            animationDuration: '2.5s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-accent via-primary to-accent rounded-t-lg w-10 shadow-lg animate-grow-bar"
          style={{ 
            height: '65%',
            animationDelay: '300ms',
            animationDuration: '2.5s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary via-success to-primary rounded-t-lg w-10 shadow-lg animate-grow-bar"
          style={{ 
            height: '85%',
            animationDelay: '600ms',
            animationDuration: '2.5s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-success via-primary to-success rounded-t-lg w-10 shadow-lg animate-grow-bar"
          style={{ 
            height: '100%',
            animationDelay: '900ms',
            animationDuration: '2.5s'
          }}
        />
      </div>
      
      {/* Enhanced floating icons with smoother animations */}
      <div className="absolute top-6 left-10 animate-float-smooth">
        <div className="bg-success/30 backdrop-blur-md rounded-full p-3 shadow-lg border border-success/20">
          <DollarSign className="w-6 h-6 text-success animate-pulse-gentle" />
        </div>
      </div>
      
      <div className="absolute top-12 right-10 animate-float-smooth" style={{ animationDelay: '1.2s' }}>
        <div className="bg-primary/30 backdrop-blur-md rounded-full p-3 shadow-lg border border-primary/20">
          <TrendingUp className="w-6 h-6 text-primary animate-pulse-gentle" />
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float-smooth" style={{ animationDelay: '2.4s' }}>
        <div className="bg-accent/30 backdrop-blur-md rounded-full p-3 shadow-lg border border-accent/20">
          <PiggyBank className="w-6 h-6 text-accent animate-pulse-gentle" />
        </div>
      </div>
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-float-smooth" style={{ animationDelay: '1.8s' }}>
        <div className="bg-cta/30 backdrop-blur-md rounded-full p-2 shadow-lg border border-cta/20">
          <Zap className="w-5 h-5 text-cta animate-pulse-gentle" />
        </div>
      </div>
      
      {/* Enhanced growth percentage indicator with smooth animation */}
      <div className="absolute -top-6 right-6 bg-gradient-to-r from-success to-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce-gentle border border-white/20">
        <span className="animate-counter">+247%</span>
      </div>
      
      {/* Additional sparkle effects */}
      <div className="absolute top-8 left-1/3 w-2 h-2 bg-primary rounded-full animate-sparkle opacity-60" />
      <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-accent rounded-full animate-sparkle opacity-80" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-success rounded-full animate-sparkle opacity-70" style={{ animationDelay: '2s' }} />
    </div>
  );
};
