import { AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const SOSButton = () => {
  const [isActivating, setIsActivating] = useState(false);
  const { toast } = useToast();

  const handleSOSActivation = async () => {
    setIsActivating(true);
    
    try {
      // Get user's location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
              // Create emergency alert
              const { error } = await supabase
                .from("emergency_alerts")
                .insert({
                  patient_id: user.id,
                  location_lat: latitude,
                  location_lng: longitude,
                  status: "active",
                  severity: "critical",
                  description: "Emergency SOS activated"
                });

              if (error) throw error;

              toast({
                title: "🚨 SOS Activated!",
                description: "Emergency services have been notified. Help is on the way!",
                variant: "default",
              });
            } else {
              toast({
                title: "Authentication Required",
                description: "Please log in to use emergency services",
                variant: "destructive",
              });
            }
          },
          (error) => {
            console.error("Location error:", error);
            toast({
              title: "Location Access Required",
              description: "Please enable location services for emergency response",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Location Not Available",
          description: "Your device doesn't support location services",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("SOS error:", error);
      toast({
        title: "SOS Failed",
        description: "Unable to send emergency alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <Button
      onClick={handleSOSActivation}
      disabled={isActivating}
      className="relative overflow-hidden bg-gradient-emergency text-emergency-foreground hover:opacity-90 shadow-emergency animate-pulse-glow border-0"
      size="lg"
    >
      <AlertCircle className="mr-2 h-5 w-5" />
      {isActivating ? "ACTIVATING..." : "SOS EMERGENCY"}
      <Phone className="ml-2 h-5 w-5" />
    </Button>
  );
};
