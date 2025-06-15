
import React from "react";
import { Link } from "react-router-dom";

// Lucide icon for simplicity, you can replace with an SVG or image if you have one
import { ArrowRight } from "lucide-react";

const Logo = ({ size = 44 }: { size?: number }) => (
  <Link to="/" tabIndex={-1} className="group outline-none select-none flex items-center gap-2 w-fit mx-auto mb-6">
    {/* Simple green circle with S for 'Smart Money' as placeholder */}
    <span
      className="rounded-full bg-primary text-primary-foreground font-extrabold flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.65 }}
      aria-label="Home"
    >
      S
    </span>
    <span className="font-extrabold text-lg text-primary group-hover:underline transition-all">
      Smart Money
    </span>
    <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
  </Link>
);

export default Logo;
