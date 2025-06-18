
import React from "react";
import { TrendingUp, DollarSign, PiggyBank, Zap } from "lucide-react";

export const FinancialGrowthAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-80 flex items-center justify-center overflow-hidden">
      {/* Sophisticated background with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/15 to-success/10 rounded-3xl blur-3xl opacity-40 animate-elegant-pulse" />
      <div className="absolute inset-4 bg-gradient-to-tl from-primary/5 via-transparent to-accent/5 rounded-2xl blur-2xl opacity-60 animate-sophisticated-float" />
      
      {/* Elegant chart visualization */}
      <div className="relative z-10 flex items-end space-x-6 h-48">
        {/* Refined animated bars with sophisticated timing */}
        <div 
          className="bg-gradient-to-t from-primary/60 via-primary/80 to-primary rounded-t-lg w-10 shadow-xl border border-primary/20"
          style={{ 
            height: '35%',
            animation: 'smooth-grow 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            animationDelay: '0.2s',
            transformOrigin: 'bottom'
          }}
        />
        <div 
          className="bg-gradient-to-t from-accent/60 via-accent/80 to-accent rounded-t-lg w-10 shadow-xl border border-accent/20"
          style={{ 
            height: '58%',
            animation: 'smooth-grow 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            animationDelay: '0.6s',
            transformOrigin: 'bottom'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary/60 via-primary/80 to-primary rounded-t-lg w-10 shadow-xl border border-primary/20"
          style={{ 
            height: '78%',
            animation: 'smooth-grow 2.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            animationDelay: '1s',
            transformOrigin: 'bottom'
          }}
        />
        <div 
          className="bg-gradient-to-t from-success/60 via-success/80 to-success rounded-t-lg w-10 shadow-xl border border-success/20"
          style={{ 
            height: '95%',
            animation: 'smooth-grow 2.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            animationDelay: '1.4s',
            transformOrigin: 'bottom'
          }}
        />
      </div>
      
      {/* Sophisticated floating elements with refined timing */}
      <div 
        className="absolute top-12 left-16 animate-sophisticated-float"
        style={{ animationDelay: '0s' }}
      >
        <div className="bg-success/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-success/20 hover-card-lift">
          <DollarSign className="w-6 h-6 text-success animate-elegant-pulse" />
        </div>
      </div>
      
      <div 
        className="absolute top-20 right-16 animate-sophisticated-float"
        style={{ animationDelay: '2s' }}
      >
        <div className="bg-primary/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-primary/20 hover-card-lift">
          <TrendingUp className="w-6 h-6 text-primary animate-elegant-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      <div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-sophisticated-float"
        style={{ animationDelay: '4s' }}
      >
        <div className="bg-accent/15 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-accent/20 hover-card-lift">
          <PiggyBank className="w-6 h-6 text-accent animate-elegant-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
      
      {/* Premium growth indicator with shimmer effect */}
      <div className="absolute -top-6 right-12 bg-gradient-to-r from-success via-primary to-accent text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-2xl border border-white/20 animate-premium-glow">
        <span className="relative z-10">+247%</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-refined-shimmer rounded-2xl" />
      </div>
      
      {/* Subtle ambient particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-classy-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full animate-classy-bounce" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-success/40 rounded-full animate-classy-bounce" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};
