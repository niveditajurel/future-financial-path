
import React from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import type { UserFinancialProfile } from "@/types/finwise";

interface UserMenuProps {
  userProfile: UserFinancialProfile | null;
  isDemo?: boolean;
}

export const UserMenu = ({ userProfile, isDemo }: UserMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out error",
        description: "There was an issue signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = () => {
    navigate("/onboarding");
  };

  if (isDemo) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Demo Mode</span>
        <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <User size={16} />
          <span className="hidden sm:inline">
            {userProfile?.full_name || "User"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleUpdateProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Update Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
