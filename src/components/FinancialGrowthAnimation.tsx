
import React from "react";
import { TrendingUp, DollarSign, PiggyBank } from "lucide-react";

export const FinancialGrowthAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto h-64 flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/30 to-success/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Main growth chart visual */}
      <div className="relative z-10 flex items-end space-x-2 h-32">
        {/* Animated bars representing growth */}
        <div 
          className="bg-gradient-to-t from-primary to-accent rounded-t w-8 animate-bounce"
          style={{ 
            height: '40%',
            animationDelay: '0ms',
            animationDuration: '2s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary to-accent rounded-t w-8 animate-bounce"
          style={{ 
            height: '60%',
            animationDelay: '200ms',
            animationDuration: '2s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary to-accent rounded-t w-8 animate-bounce"
          style={{ 
            height: '80%',
            animationDelay: '400ms',
            animationDuration: '2s'
          }}
        />
        <div 
          className="bg-gradient-to-t from-primary to-accent rounded-t w-8 animate-bounce"
          style={{ 
            height: '100%',
            animationDelay: '600ms',
            animationDuration: '2s'
          }}
        />
      </div>
      
      {/* Floating icons */}
      <div className="absolute top-4 left-8 animate-float">
        <div className="bg-success/20 backdrop-blur-sm rounded-full p-2">
          <DollarSign className="w-5 h-5 text-success animate-pulse" />
        </div>
      </div>
      
      <div className="absolute top-8 right-8 animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
          <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '2s' }}>
        <div className="bg-accent/20 backdrop-blur-sm rounded-full p-2">
          <PiggyBank className="w-5 h-5 text-accent animate-pulse" />
        </div>
      </div>
      
      {/* Growth percentage indicator */}
      <div className="absolute -top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
        +247%
      </div>
    </div>
  );
};
