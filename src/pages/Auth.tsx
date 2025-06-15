
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        toast({
          title: "Sign up email sent!",
          description: "Check your email to finish signing up.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast({
          title: "Login successful!",
          description: "Welcome back.",
        });
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-background via-accent/10 to-background">
      <form
        onSubmit={handleAuth}
        className="w-full max-w-sm bg-card rounded-lg shadow-md p-8 space-y-6 border"
      >
        {/* Logo component at top */}
        <Logo />
        <h1 className="text-2xl font-bold mb-2 text-center text-primary">{isSignUp ? "Sign Up" : "Sign In"}</h1>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
        </Button>
        {error && <div className="text-destructive text-sm text-center">{error}</div>}
        <div className="text-sm text-center mt-4">
          {isSignUp
            ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New here?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Create an account
                </button>
              </span>
            )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
