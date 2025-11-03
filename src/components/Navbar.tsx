import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, User, LogOut } from "lucide-react";
import { SOSButton } from "./SOSButton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-glow group-hover:scale-110 transition-transform">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Medico Helping Hands
              </h1>
              <p className="text-xs text-muted-foreground">Near To Me</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {user && <SOSButton />}
            
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow"
              >
                <User className="mr-2 h-4 w-4" />
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
