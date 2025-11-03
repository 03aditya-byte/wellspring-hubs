import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Activity, Calendar, Shield, Zap, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-healthcare.jpg";
import emergencyIcon from "@/assets/emergency-icon.jpg";
import appointmentIcon from "@/assets/appointment-icon.jpg";
import aiChatIcon from "@/assets/ai-chat-icon.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="h-10 w-10" />,
      title: "Emergency SOS",
      description: "One-tap emergency response with real-time ambulance tracking and volunteer network support.",
      image: emergencyIcon,
      gradient: "bg-gradient-emergency",
    },
    {
      icon: <Calendar className="h-10 w-10" />,
      title: "Smart Appointments",
      description: "Book consultations with verified doctors, manage schedules, and receive AI-assisted recommendations.",
      image: appointmentIcon,
      gradient: "bg-gradient-hero",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "AI Health Assistant",
      description: "24/7 AI-powered symptom checker, medication reminders, and personalized health guidance.",
      image: aiChatIcon,
      gradient: "bg-gradient-success",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure Records",
      description: "Cloud-based health records with bank-level encryption and instant access from anywhere.",
      gradient: "bg-gradient-hero",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Volunteer Network",
      description: "Community volunteers trained to provide immediate assistance during emergencies.",
      gradient: "bg-gradient-success",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Government Schemes",
      description: "Easy access to ABHA and government healthcare benefits with automatic verification.",
      gradient: "bg-gradient-emergency",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "500+", label: "Verified Doctors" },
    { value: "24/7", label: "Emergency Support" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-secondary-light/10 to-background -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                <p className="text-sm font-semibold text-primary">Smart Healthcare, Human Touch</p>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Healthcare
                </span>{" "}
                <br />
                Near To You
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                AI-powered healthcare companion connecting patients, doctors, and hospitals. 
                Emergency response, smart appointments, and digital health records — all in one platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-hero text-primary-foreground hover:opacity-90 shadow-glow group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  View Demo
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Healthcare professionals"
                className="relative rounded-2xl shadow-strong w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="text-4xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">
              Complete Healthcare <span className="bg-gradient-hero bg-clip-text text-transparent">Ecosystem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for modern, connected healthcare in one intelligent platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-strong transition-all duration-300 border-border/50 bg-card/95 backdrop-blur-sm hover:scale-105 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${feature.gradient} text-white mb-3 group-hover:scale-110 transition-transform w-fit`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCAzOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Join thousands of users who trust Medico Helping Hands for their healthcare needs
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-background text-primary hover:bg-background/90 shadow-strong group animate-scale-in"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-hero rounded-lg">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-bold">Medico Helping Hands</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart Healthcare, Human Touch — All Near To You
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>For Patients</li>
                <li>For Doctors</li>
                <li>For Hospitals</li>
                <li>Volunteers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Health Articles</li>
                <li>Emergency Guide</li>
                <li>FAQs</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>HIPAA Compliance</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Medico Helping Hands. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
