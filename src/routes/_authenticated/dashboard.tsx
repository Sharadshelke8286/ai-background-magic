import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";
import logo from "@/assets/snapcut-logo.png";
import { toast } from "sonner";

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setEmail(u.user.email ?? "");
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", u.user.id)
        .maybeSingle();
      setProfile(data);
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  const name = profile?.full_name || email.split("@")[0] || "there";
  const initial = (profile?.full_name || email || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card/40 backdrop-blur-xl">
        <Link to="/" className="h-16 px-6 flex items-center border-b border-border">
          <img src={logo} alt="SnapCut AI" className="h-8" />
        </Link>
        <nav className="flex-1 p-4 space-y-1 text-sm">
          <SideItem icon={<Sparkles className="h-4 w-4" />} label="Studio" active />
          <SideItem icon={<ImageIcon className="h-4 w-4" />} label="My images" />
          <SideItem icon={<Zap className="h-4 w-4" />} label="API keys" />
          <SideItem icon={<CreditCard className="h-4 w-4" />} label="Billing" />
          <SideItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </nav>
        <button
          onClick={signOut}
          className="m-4 h-10 rounded-lg border border-border flex items-center justify-center gap-2 text-sm hover:bg-accent/10 transition"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 flex items-center justify-between border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground">Workspace</p>
            <h1 className="text-sm font-semibold">{name}'s Studio</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-muted-foreground">{email}</span>
            <div className="h-9 w-9 rounded-full bg-gradient-brand grid place-items-center text-sm font-bold text-primary-foreground shadow-glow">
              {initial}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, {name}.</h2>
            <p className="mt-2 text-muted-foreground">
              Drop an image to remove its background in seconds.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-2xl p-10 border-dashed border-2 border-border/60 flex flex-col items-center justify-center text-center min-h-[320px]">
              <div className="h-14 w-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow mb-4">
                <Upload className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Drop an image here</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                PNG, JPG, or WebP up to 25 MB. Your file is processed privately and never shared.
              </p>
              <button className="mt-6 h-11 px-6 rounded-full bg-gradient-brand text-primary-foreground font-medium text-sm shadow-glow hover:opacity-95 transition">
                Upload image
              </button>
            </div>

            <div className="space-y-4">
              <StatCard label="Images this month" value="0" hint="Free plan • 10 included" />
              <StatCard label="Credits remaining" value="10" hint="Resets monthly" />
              <StatCard label="API calls" value="0" hint="Generate a key to start" />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Recent images
            </h3>
            <div className="glass-card rounded-2xl p-10 text-center text-sm text-muted-foreground">
              No images yet. Your processed cutouts will appear here.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SideItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 h-10 rounded-lg transition ${
        active
          ? "bg-primary/10 text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
