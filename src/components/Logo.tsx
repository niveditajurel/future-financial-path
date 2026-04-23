
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Logo = ({ size = 44 }: { size?: number }) => (
  <Link to="/" tabIndex={-1} className="group outline-none select-none flex items-center gap-2 w-fit mx-auto mb-6">
    <span
      className="rounded-md bg-primary text-primary-foreground font-extrabold flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.65 }}
      aria-label="Home"
    >
      F
    </span>
    <span className="font-extrabold text-lg text-primary group-hover:underline transition-all">
      FinWise
    </span>
    <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
  </Link>
);

export default Logo;
