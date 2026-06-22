import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { removeBackground } from "@imgly/background-removal";
import {
  Upload,
  Sparkles,
  Zap,
  Shield,
  ImageIcon,
  Wand2,
  ArrowRight,
  Check,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import logo from "@/assets/snapcut-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import demoBefore from "@/assets/demo-before.jpg";
import demoAfter from "@/assets/demo-after.png";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <LogoStrip />
      <Features />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SnapCut AI" className="h-9 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#api" className="hover:text-foreground transition">API</a>
        </nav>
        <div className="flex items-center gap-2">
          {authed ? (
            <Link
              to="/dashboard"
              className="inline-flex h-9 px-4 items-center rounded-full text-sm font-medium bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95 transition"
            >
              Open Studio
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex h-9 px-4 items-center text-sm text-muted-foreground hover:text-foreground transition"
              >
                Sign in
              </Link>
              <Link
                to="/login"
                className="inline-flex h-9 px-4 items-center rounded-full text-sm font-medium bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95 transition"
              >
                Try free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-28 lg:pt-28 lg:pb-36 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border glass-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            AI background removal — under 5 seconds
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Cut backgrounds.
            <br />
            <span className="text-gradient-brand">Keep the magic.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            SnapCut AI removes image backgrounds with studio-grade precision.
            Drop a photo, get a clean transparent cutout — ready for stores,
            decks, and ads.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#try"
              className="inline-flex h-12 px-6 items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition"
            >
              Remove a background <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#api"
              className="inline-flex h-12 px-6 items-center gap-2 rounded-full glass-card text-foreground font-medium hover:border-primary/40 transition"
            >
              For developers
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-secondary" /> 5 free per day</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-secondary" /> No credit card</div>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-secondary" /> Auto-deleted in 24h</div>
          </div>
        </div>

        <BeforeAfter />
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  return (
    <div className="relative animate-float-slow">
      <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full -z-10" />
      <div
        onMouseMove={onMove}
        className="relative aspect-square w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden glass-card shadow-glow cursor-ew-resize select-none"
        style={{
          backgroundImage:
            "linear-gradient(45deg,#1e293b 25%,transparent 25%),linear-gradient(-45deg,#1e293b 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1e293b 75%),linear-gradient(-45deg,transparent 75%,#1e293b 75%)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
        }}
      >
        <img
          src={demoAfter}
          alt="After background removal"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={demoBefore}
            alt="Before background removal"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-brand shadow-glow"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground shadow-glow">
            <ArrowRight className="h-4 w-4 -rotate-180" />
            <ArrowRight className="h-4 w-4 absolute" />
          </div>
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider px-2 py-1 rounded-full bg-background/80 text-muted-foreground">
          BEFORE
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-semibold tracking-wider px-2 py-1 rounded-full bg-gradient-brand text-primary-foreground">
          AFTER
        </span>
      </div>
    </div>
  );
}

function LogoStrip() {
  const items = ["SHOPLINE", "PIXELHAUS", "STUDIO 88", "NORTHWAVE", "MERCATO", "FRAMECO"];
  return (
    <div className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Trusted by teams shipping fast</span>
        {items.map((i) => (
          <span key={i} className="text-sm font-bold tracking-widest text-muted-foreground/60">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    { icon: Zap, title: "Sub-5s processing", desc: "Optimized inference pipelines deliver crisp cutouts in under five seconds — at any resolution up to 5000×5000." },
    { icon: Wand2, title: "Edge-perfect mattes", desc: "Hair, fur, glass, and motion blur — handled by a model trained on millions of real product and portrait photos." },
    { icon: Shield, title: "Privacy first", desc: "End-to-end HTTPS, encrypted storage, and automatic deletion after 24 hours. Your images stay yours." },
    { icon: ImageIcon, title: "JPG · PNG · WEBP", desc: "Drag, drop, done. Outputs come back as transparent PNG ready for any canvas, marketplace, or deck." },
    { icon: Sparkles, title: "Batch & API", desc: "Process hundreds of images via the dashboard, or wire SnapCut into your stack with our REST API." },
    { icon: Upload, title: "Cloud workspace", desc: "Your last 7 days of cutouts, downloads, and credits — all in one tidy dashboard." },
  ];
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-secondary font-semibold">Features</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Built for creators who ship daily.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Studio-grade quality, developer-grade speed. Everything you need to go from raw upload to publish-ready asset.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-2xl glass-card p-6 hover:border-primary/40 hover:shadow-glow transition"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center text-primary-foreground shadow-glow">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Upload", d: "Drag any JPG, PNG, or WEBP up to 10 MB into the workspace." },
    { n: "02", t: "AI cuts", d: "Our model isolates the subject and extracts a pixel-perfect alpha." },
    { n: "03", t: "Download", d: "Grab your transparent PNG — or push it straight to your CDN via API." },
  ];
  return (
    <section id="how" className="relative py-24 lg:py-32 border-y border-border bg-card/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">How it works</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Three steps. Zero friction.</h2>
          </div>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl glass-card p-8">
              <span className="text-5xl font-extrabold text-gradient-brand">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "₹0",
      sub: "forever",
      perks: ["5 images / day", "Up to 5000×5000", "Auto-delete in 24h", "Web workspace"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹499",
      sub: "/month",
      perks: ["Unlimited images", "Priority processing", "Batch uploads", "7-day history", "Email support"],
      cta: "Go Pro",
      highlight: true,
    },
    {
      name: "API",
      price: "₹0.40",
      sub: "/image",
      perks: ["REST API access", "API keys & rate limits", "Usage analytics", "Webhooks", "Volume discounts"],
      cta: "Get API key",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-secondary font-semibold">Pricing</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Simple plans. Honest pricing.</h2>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade when you scale. Every plan ships with the same model — no quality tax.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-2xl p-8 glass-card transition ${
                t.highlight ? "border-primary/50 shadow-glow" : "hover:border-primary/30"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold tracking-tight">{t.price}</span>
                <span className="text-muted-foreground">{t.sub}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full h-11 rounded-full font-semibold transition ${
                  t.highlight
                    ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                    : "border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type HistoryItem = {
  id: string;
  originalUrl: string;
  processedUrl: string;
  timestamp: Date;
};

function CTA() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"main" | "history">("main");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImage = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setSelectedFile(file);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      // First try n8n webhook
      const webhookResponse = await fetch("https://sharadshelke.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      let processedUrl;
      if (webhookResponse.ok) {
        const contentType = webhookResponse.headers.get("content-type");
        // Read response as array buffer first to avoid stream exhaustion
        const responseArrayBuffer = await webhookResponse.arrayBuffer();
        
        if (contentType && contentType.includes("application/json")) {
          try {
            const responseText = new TextDecoder().decode(responseArrayBuffer);
            console.log("Webhook response text:", responseText);
            if (!responseText.trim()) {
              console.warn("Empty JSON response from webhook, falling back to local processing");
              const blob = await removeBackground(selectedFile);
              processedUrl = URL.createObjectURL(blob);
            } else {
              const jsonData = JSON.parse(responseText);
              processedUrl = jsonData.url;
              processedUrl = processedUrl.replace(/^`|`$/g, "");
            }
          } catch (jsonError) {
            console.error("Error parsing JSON response:", jsonError);
            console.warn("Falling back to local processing");
            const blob = await removeBackground(selectedFile);
            processedUrl = URL.createObjectURL(blob);
          }
        } else if (contentType && contentType.includes("image")) {
          const blob = new Blob([responseArrayBuffer]);
          processedUrl = URL.createObjectURL(blob);
        } else {
          console.warn("Unrecognized webhook response type, falling back to local processing");
          const blob = await removeBackground(selectedFile);
          processedUrl = URL.createObjectURL(blob);
        }
      } else {
        // Webhook failed, fall back to local processing
        const errorText = await webhookResponse.text();
        console.error("Webhook error:", webhookResponse.status, webhookResponse.statusText, errorText);
        console.warn("Falling back to local processing");
        const blob = await removeBackground(selectedFile);
        processedUrl = URL.createObjectURL(blob);
      }

      setProcessedImage(processedUrl);
      
      if (selectedImage) {
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          originalUrl: selectedImage,
          processedUrl: processedUrl,
          timestamp: new Date(),
        };
        setHistory((prev) => [newHistoryItem, ...prev]);
      }
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error(`Failed to remove background: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!processedImage) return;
    try {
      if (processedImage.startsWith("http://") || processedImage.startsWith("https://")) {
        const response = await fetch(processedImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "removed-background.png";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const a = document.createElement("a");
        a.href = processedImage;
        a.download = "removed-background.png";
        a.click();
      }
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Failed to download image");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImage(file);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) handleImage(file);
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <section 
      id="try" 
      className="py-24 lg:py-32"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div 
          className={`relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center shadow-glow transition-all duration-200 ${
            isDragging 
              ? "glass-card border-2 border-primary/70 scale-[1.02]" 
              : "glass-card"
          }`}
        >
          <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "var(--gradient-radial-glow)" }} />
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveTab("main")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "main"
                  ? "bg-gradient-brand text-primary-foreground shadow-glow"
                  : "glass-card hover:border-primary/40"
              }`}
            >
              Remove Background
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "history"
                  ? "bg-gradient-brand text-primary-foreground shadow-glow"
                  : "glass-card hover:border-primary/40"
              }`}
            >
              History ({history.length})
            </button>
          </div>
          
          {activeTab === "history" ? (
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No history yet. Process some images first!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {history.map((item) => (
                    <div key={item.id} className="glass-card rounded-2xl p-4 space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-2">Before</p>
                          <img
                            src={item.originalUrl}
                            alt="Before"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-2">After</p>
                          <img
                            src={item.processedUrl}
                            alt="After"
                            className="w-full h-32 object-cover rounded-lg"
                            style={{
                              backgroundImage: "linear-gradient(45deg,#1e293b 25%,transparent 25%),linear-gradient(-45deg,#1e293b 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1e293b 75%),linear-gradient(-45deg,transparent 75%,#1e293b 75%)",
                              backgroundSize: "24px 24px",
                              backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleString()}
                        </span>
                        <button
                          onClick={async () => {
                            try {
                              if (item.processedUrl.startsWith("http://") || item.processedUrl.startsWith("https://")) {
                                const response = await fetch(item.processedUrl);
                                const blob = await response.blob();
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `removed-background-${item.id}.png`;
                                a.click();
                                URL.revokeObjectURL(url);
                              } else {
                                const a = document.createElement("a");
                                a.href = item.processedUrl;
                                a.download = `removed-background-${item.id}.png`;
                                a.click();
                              }
                            } catch (error) {
                              console.error("Error downloading:", error);
                              toast.error("Failed to download image");
                            }
                          }}
                          className="text-sm text-primary hover:underline"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : processedImage ? (
            <div className="space-y-6">
              <div className="relative inline-block">
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="max-h-[400px] rounded-2xl shadow-glow"
                  style={{
                    backgroundImage: "linear-gradient(45deg,#1e293b 25%,transparent 25%),linear-gradient(-45deg,#1e293b 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1e293b 75%),linear-gradient(-45deg,transparent 75%,#1e293b 75%)",
                    backgroundSize: "24px 24px",
                    backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
                  }}
                />
                <button
                  onClick={() => {
                    setProcessedImage(null);
                    setSelectedImage(null);
                    setSelectedFile(null);
                  }}
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={handleDownload}
                  className="inline-flex h-12 px-6 items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition"
                >
                  <Sparkles className="h-4 w-4" /> Download Image
                </button>
                <button 
                  onClick={() => {
                    setProcessedImage(null);
                    setSelectedImage(null);
                    setSelectedFile(null);
                  }}
                  className="inline-flex h-12 px-6 items-center gap-2 rounded-full glass-card font-medium hover:border-primary/40 transition"
                >
                  Choose Another
                </button>
              </div>
            </div>
          ) : selectedImage ? (
            <div className="space-y-6">
              <div className="relative inline-block">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="max-h-[400px] rounded-2xl shadow-glow"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedFile(null);
                  }}
                  className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition"
                >
                  ×
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={handleRemoveBackground}
                  disabled={isLoading}
                  className="inline-flex h-12 px-6 items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isLoading ? "Processing..." : "Remove Background"}
                </button>
                <button 
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedFile(null);
                  }}
                  className="inline-flex h-12 px-6 items-center gap-2 rounded-full glass-card font-medium hover:border-primary/40 transition"
                >
                  Choose Another
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Ready to <span className="text-gradient-brand">SnapCut</span> something?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Drop your first image and watch the background vanish in seconds. Five free cutouts, every day.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex h-12 px-6 items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-95 transition"
                >
                  <Upload className="h-4 w-4" /> Upload an image
                </button>
                <a className="inline-flex h-12 px-6 items-center gap-2 rounded-full glass-card font-medium hover:border-primary/40 transition">
                  View pricing
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <img src={logo} alt="SnapCut AI" className="h-9 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            AI background removal for creators, sellers, and teams. Fast, private, and built to scale.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Github, Linkedin].map((I, i) => (
              <a key={i} className="h-9 w-9 rounded-full glass-card grid place-items-center hover:border-primary/40 transition">
                <I className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#api" className="hover:text-foreground">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground">About</a></li>
            <li><a className="hover:text-foreground">Privacy</a></li>
            <li><a className="hover:text-foreground">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} SnapCut AI. All rights reserved.</span>
          <span>Made for creators who move fast.</span>
        </div>
      </div>
    </footer>
  );
}
