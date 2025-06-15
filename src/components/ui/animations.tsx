
import React from "react";

// Fade up with scale in & optional delay
export const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`opacity-0 animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    {children}
  </div>
);

// "Pop" springy entrance
export const PopIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`opacity-0 animate-scale-in ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    {children}
  </div>
);

// Subtle wiggle for attention
export const Wiggle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`inline-block animate-wiggle ${className}`}>{children}</span>
);

// Subtle flicker, useful for glowy text
export const Flicker = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span className={`inline-block animate-flicker ${className}`}>{children}</span>
);

// Persistent hero glow animation for backgrounds
export const HeroGlow = ({
  className = "",
}: {
  className?: string;
}) => (
  <div
    className={`absolute left-1/2 top-0 -translate-x-1/2 w-[110vw] h-[48vw] max-w-none pointer-events-none blur-3xl z-0 bg-primary/20 opacity-60 animate-heroGlow ${className}`}
  />
);

