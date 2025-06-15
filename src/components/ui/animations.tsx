
import React from "react";

// Fade in animation wrapper
export const FadeIn: React.FC<{ delay?: number; children: React.ReactNode }> = ({
  delay = 0,
  children,
}) => (
  <div
    style={{
      animation: `fade-in 0.6s cubic-bezier(0.16,1,0.3,1) both`,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

// Pop with slight scale effect
export const PopIn: React.FC<{ delay?: number; children: React.ReactNode }> = ({
  delay = 0,
  children,
}) => (
  <div
    style={{
      animation: `pop-in 0.7s cubic-bezier(0.16,1,0.3,1) both`,
      animationDelay: `${delay}ms`,
    }}
  >
    {children}
  </div>
);

// Pulse Glow Animation (e.g., for icons, or button glow ring)
export const PulseGlow: React.FC<{
  color?: string;
  size?: number;
  children?: React.ReactNode;
}> = ({ color = "rgba(33, 199, 104, 0.6)", size = 72, children }) => (
  <div className="relative flex items-center justify-center">
    <span
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(8px)",
        animation: "pulse-glow 2.2s infinite cubic-bezier(.4,0,.6,1)",
        zIndex: 0,
      }}
    />
    <span className="relative z-10">{children}</span>
  </div>
);

// Flicker/Neon effect for a word/emoji
export const Flicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flicker-text">{children}</span>
);

// Custom keyframes/animations
// Add this CSS to the project's global stylesheet (index.css)
