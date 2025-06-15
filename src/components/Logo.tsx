
import React from "react";
import { Link } from "react-router-dom";

const LOGO_URL =
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=128&q=80";

interface LogoProps {
  size?: number; // px
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 48, className = "" }) => (
  <Link to="/" tabIndex={0} className="group inline-block focus:outline-none" aria-label="Back to home">
    <img
      src={LOGO_URL}
      alt="App Logo"
      width={size}
      height={size}
      className={`rounded-lg shadow-md transition-transform group-hover:scale-110 group-active:scale-95 ${className}`}
      style={{
        width: size,
        height: size,
        objectFit: "cover"
      }}
    />
  </Link>
);
