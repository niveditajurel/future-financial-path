
import React from "react";
import { TrendingUp, DollarSign, PiggyBank, Zap } from "lucide-react";

export const FinancialGrowthAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-72 flex items-center justify-center">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/25 to-success/20 rounded-full blur-2xl opacity-60" />
      
      {/* Main growth chart visual with elegant bars */}
      <div className="relative z-10 flex items-end space-x-4 h-40">
        {/* Smooth animated bars representing growth */}
        <div 
          className="bg-gradient-to-t from-primary/80 via-primary to-primary/90 rounded-t-md w-8 shadow-sm"
          style={{ 
            height: '40%',
            animation: 'gentle-grow 3s ease-out forwards',
            animationDelay: '0ms'
          }}
        />
        <div 
          className="bg-gradient-to-t from-accent/80 via-accent to-accent/90 rounded-t-md w-8 shadow-sm"
          style={{ 
            height: '65%',
            animation: 'gentle-grow 3s ease-out forwards',
            animationDelay: '400ms'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary/80 via-primary to-primary/90 rounded-t-md w-8 shadow-sm"
          style={{ 
            height: '85%',
            animation: 'gentle-grow 3s ease-out forwards',
            animationDelay: '800ms'
          }}
        />
        <div 
          className="bg-gradient-to-t from-success/80 via-success to-success/90 rounded-t-md w-8 shadow-sm"
          style={{ 
            height: '100%',
            animation: 'gentle-grow 3s ease-out forwards',
            animationDelay: '1200ms'
          }}
        />
      </div>
      
      {/* Elegant floating icons with subtle movement */}
      <div className="absolute top-8 left-12" style={{ animation: 'gentle-float 6s ease-in-out infinite' }}>
        <div className="bg-success/20 backdrop-blur-sm rounded-full p-2.5 shadow-sm border border-success/30">
          <DollarSign className="w-5 h-5 text-success" />
        </div>
      </div>
      
      <div className="absolute top-16 right-12" style={{ animation: 'gentle-float 6s ease-in-out infinite', animationDelay: '2s' }}>
        <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2.5 shadow-sm border border-primary/30">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2" style={{ animation: 'gentle-float 6s ease-in-out infinite', animationDelay: '4s' }}>
        <div className="bg-accent/20 backdrop-blur-sm rounded-full p-2.5 shadow-sm border border-accent/30">
          <PiggyBank className="w-5 h-5 text-accent" />
        </div>
      </div>
      
      {/* Refined growth indicator */}
      <div className="absolute -top-4 right-8 bg-gradient-to-r from-success/90 to-primary/90 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-white/20">
        <span>+247%</span>
      </div>
    </div>
  );
};
