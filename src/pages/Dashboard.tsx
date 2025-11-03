import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, MessageSquare, Activity, Clock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Get user role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roleData) {
        setUserRole(roleData.role);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const dashboardCards = [
    {
      title: "Book Appointment",
      description: "Schedule a consultation with verified doctors",
      icon: <Calendar className="h-6 w-6" />,
      action: () => navigate("/appointments"),
      color: "primary",
    },
    {
      title: "Health Records",
      description: "View your medical history and reports",
      icon: <FileText className="h-6 w-6" />,
      action: () => navigate("/health-records"),
      color: "secondary",
    },
    {
      title: "AI Health Assistant",
      description: "Get instant health guidance from AI",
      icon: <MessageSquare className="h-6 w-6" />,
      action: () => navigate("/ai-chat"),
      color: "accent",
    },
    {
      title: "Emergency Alerts",
      description: "View and manage your emergency requests",
      icon: <Activity className="h-6 w-6" />,
      action: () => navigate("/emergencies"),
      color: "emergency",
    },
  ];

  const getRoleDisplay = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/5 to-secondary-light/5">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="animate-fade-in-up">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-hero rounded-xl shadow-glow">
                <UserIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back!
                </h1>
                <p className="text-muted-foreground">
                  Role: <span className="font-semibold text-primary">{userRole ? getRoleDisplay(userRole) : "Loading..."}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardCards.map((card, index) => (
              <Card
                key={index}
                className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-border/50 bg-card/95 backdrop-blur-sm hover:scale-105"
                onClick={card.action}
              >
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-${card.color}/10 text-${card.color} mb-2 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-medium border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Your recent appointments and interactions will appear here.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-border/50 bg-card/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-secondary" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  AI-powered health insights and recommendations will appear here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
