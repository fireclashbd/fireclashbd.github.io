import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Zap,
  Coins,
  Award,
  Scale,
  Headphones,
  PlayCircle,
  Facebook,
  Youtube,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Clock,
  Smartphone,
  Share2,
  DollarSign,
  User,
  Wallet,
  AlertCircle,
  ArrowRight,
  Shield,
  Trophy,
  Target,
  QrCode,
  CheckCircle2,
  ListFilter
} from "lucide-react";

import appIcon from "./icon.png";

import {
  FeaturesList,
  PolicyList,
  SocialMediaList,
  AppMetaData
} from "./data";

// Type definitions & Icons mapping helper
function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const iconProps = { className: className || "w-6 h-6 text-orange-500" };
  switch (name) {
    case "ShieldCheck": return <ShieldCheck {...iconProps} />;
    case "Lock": return <Lock {...iconProps} />;
    case "Zap": return <Zap {...iconProps} />;
    case "Coins": return <Coins {...iconProps} />;
    case "Award": return <Award {...iconProps} />;
    case "Scale": return <Scale {...iconProps} />;
    case "Headphones": return <Headphones {...iconProps} />;
    case "PlayCircle": return <PlayCircle {...iconProps} />;
    default: return <ShieldCheck {...iconProps} />;
  }
}

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App initialization loader
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [loadText, setLoadText] = useState("Establishing secure channel...");

  // Simulated Phone Screen state: "tournaments" | "deposit" | "profile"
  const [phoneScreen, setPhoneScreen] = useState<"tournaments" | "deposit" | "profile">("tournaments");
  const [virtualWalletBalance, setVirtualWalletBalance] = useState(350);
  const [hasRegisteredMatch, setHasRegisteredMatch] = useState<number | null>(null);
  const [depositAmountInput, setDepositAmountInput] = useState("100");
  const [selectedGateway, setSelectedGateway] = useState<"bKash" | "Nagad" | "Rocket">("bKash");
  const [depositSuccessMsg, setDepositSuccessMsg] = useState(false);
  const [isProcessingDeposit, setIsProcessingDeposit] = useState(false);

  // Download Dialog & Step state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFinished, setDownloadFinished] = useState(false);

  // Policy Accordions expanded state
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>("user-data");

  // Load screen counter simulation
  useEffect(() => {
    const textIntervals = [
      { pct: 0, txt: "Initializing Fire Clash BD Engine..." },
      { pct: 15, txt: "Verifying hardware anti-cheat hooks..." },
      { pct: 35, txt: "Synchronizing secure server clusters..." },
      { pct: 55, txt: "Checking automated Nagad BDT gateways..." },
      { pct: 75, txt: "Retrieving official Free Fire tournament rooms..." },
      { pct: 90, txt: "Applying glowing neon shield..." },
      { pct: 100, txt: "Ready!" }
    ];

    const interval = setInterval(() => {
      setLoadPercentage((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }

        // Find current matching log text
        const matchedText = textIntervals.find(ti => next >= ti.pct && next < ti.pct + 15);
        if (matchedText) {
          setLoadText(matchedText.txt);
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Track scrolling to update sticky navbar focus
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ["hero", "features", "download", "about", "social", "policy"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Download simulation trigger
  const triggerDownloadSimulation = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadFinished(false);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isDownloading && downloadProgress < 100) {
      intervalId = setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 12) + 6;
          if (next >= 100) {
            clearInterval(intervalId);
            setDownloadFinished(true);
            return 100;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(intervalId);
  }, [isDownloading, downloadProgress]);

  // Handle actual download of the editable APK URL when simulation completes
  useEffect(() => {
    if (downloadFinished) {
      try {
        const link = document.createElement("a");
        link.href = AppMetaData.downloadUrl;
        link.setAttribute("download", "FireClashBD.apk");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Failed to trigger automatic download:", err);
      }
    }
  }, [downloadFinished]);

  // Handle virtual wallet refilling
  const handleSimulatedDeposit = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmountInput);
    if (isNaN(amount) || amount <= 0) return;

    setIsProcessingDeposit(true);
    setTimeout(() => {
      setVirtualWalletBalance(prev => prev + amount);
      setIsProcessingDeposit(false);
      setDepositSuccessMsg(true);
      setTimeout(() => {
        setDepositSuccessMsg(false);
        setPhoneScreen("tournaments");
      }, 2000);
    }, 1500);
  };

  // Handle virtual match registration
  const joinSimulatedMatch = (matchId: number, fee: number) => {
    if (virtualWalletBalance < fee) {
      // Alert/Switch to credit page
      setPhoneScreen("deposit");
      return;
    }
    setVirtualWalletBalance(prev => prev - fee);
    setHasRegisteredMatch(matchId);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 font-sans tracking-wide selection:bg-[#ff4e00] selection:text-white relative overflow-x-hidden">

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="loading-screen"
            className="fixed inset-0 bg-[#030305] z-50 flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Visual game background elements for loader */}
            <div className="absolute inset-0 bg-grid-pattern opacity-15" />
            <div className="absolute top-[30%] left-[20%] w-72 h-72 rounded-full bg-[#ff4e00]/10 blur-[120px]" />
            <div className="absolute bottom-[30%] right-[20%] w-72 h-72 rounded-full bg-[#ec1c24]/10 blur-[120px]" />

            <div className="relative text-center max-w-md w-full glass-panel p-8 rounded-3xl neon-border-orange">
              {/* Flame Logo Animated Container */}
              <motion.div
                className="w-24 h-24 mx-auto mb-6 flex items-center justify-center relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {/* Glowing Aura Ring */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#ff4e00] to-[#ec1c24] opacity-30 blur-md" />
                <span className="absolute inset-1 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={appIcon}
                    alt="Fire Clash BD"
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </motion.div>

              {/* Title representation */}
              <h1 className="text-2xl font-black font-display tracking-wider mb-2 bg-gradient-to-r from-[#ff4e00] via-[#ff6525] to-[#ec1c24] bg-clip-text text-transparent">
                FIRE CLASH BD
              </h1>
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-8">
                BANGLADESH'S PREMIER ESPORTS SYSTEM
              </p>

              {/* Loading progress bar */}
              <div className="h-[4px] bg-slate-900 border border-white/5 rounded-full w-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ff4e00] via-[#ec1c24] to-amber-500"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              {/* Counter progress */}
              <div className="flex justify-between items-center text-xs font-mono text-gray-450">
                <span>{loadText}</span>
                <span className="text-[#ff4e00] font-bold">{loadPercentage}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Layout */}
      {!loading && (
        <>
          {/* Neon Floating Particles Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Ambient Colors */}
            <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-[#ff4e00]/5 blur-[120px]" />
            <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#ec1c24]/5 blur-[150px]" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ff4e00]/5 blur-[150px]" />
            <div className="absolute bottom-0 right-[20%] w-96 h-96 rounded-full bg-[#ec1c24]/5 blur-[120px]" />

            {/* Animated Light Particles simulating floating laser sparks */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-tr from-[#ff4e00] to-[#ec1c24] opacity-25"
                style={{
                  top: `${Math.random() * 95}%`,
                  left: `${Math.ceil(Math.random() * 98)}%`,
                }}
                animate={{
                  y: [0, -100 - Math.random() * 150],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0, 0.5, 0.4, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 4
                }}
              />
            ))}
          </div>

          {/* Sticky Header Nav - Styled with sharp glass border */}
          <header className="sticky top-0 bg-[#030305]/80 backdrop-blur-md border-b border-white/5 z-40 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              {/* Brand Logo */}
              <a href="#hero" className="flex items-center space-x-3 group">
                <img
                  src={appIcon}
                  alt="Fire Clash BD Icon"
                  className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#ff4e00]/10 group-hover:shadow-[#ff4e00]/30 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-black font-display tracking-wider bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-400 transition-all">
                    FIRE CLASH BD
                  </h2>
                  <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">ESPORTS PLATFORM</p>
                </div>
              </a>

              {/* Desktop Menu links */}
              <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
                {[
                  { id: "hero", label: "Home" },
                  { id: "features", label: "Features" },
                  { id: "download", label: "Download APK" },
                  { id: "about", label: "About" },
                  { id: "social", label: "Socials" },
                  { id: "policy", label: "Rules & Policy" }
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`hover:text-[#ff4e00] transition-colors uppercase tracking-wider text-xs font-display relative py-2 ${activeSection === item.id ? "text-orange-400 font-bold" : "text-gray-400"
                      }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] rounded-full"
                      />
                    )}
                  </a>
                ))}
              </nav>

              {/* Sticky Action CTA */}
              <div className="hidden md:flex items-center space-x-4">
                <a
                  href="#download"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] hover:from-[#ff621e] hover:to-[#f03138] text-white font-display text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg shadow-[#ff4e00]/15 hover:shadow-[#ff4e00]/30 transition-all duration-300 border border-white/5"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download APK</span>
                </a>
              </div>

              {/* Mobile hamburger click */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-orange-500" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Dropdown Overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#030305]/95 border-b border-white/5 md:hidden"
                >
                  <div className="px-5 py-6 space-y-4 font-display">
                    {[
                      { id: "hero", label: "Home" },
                      { id: "features", label: "Features" },
                      { id: "download", label: "Download APK" },
                      { id: "about", label: "About" },
                      { id: "social", label: "Socials" },
                      { id: "policy", label: "Rules & Policy" }
                    ].map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-sm uppercase tracking-widest py-2 transition-colors ${activeSection === item.id ? "text-[#ff4e00] font-bold" : "text-gray-300 hover:text-[#ff4e00]"
                          }`}
                      >
                        {item.label}
                      </a>
                    ))}
                    <div className="pt-4 border-t border-white/5">
                      <a
                        href="#download"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] hover:from-[#ff621e] hover:to-[#f03138] text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl shadow-md border border-white/5"
                      >
                        <Download className="w-4 h-4 text-white" />
                        <span>Download APK</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>


          {/* Section 1: Hero Section */}
          <section id="hero" className="relative pt-6 md:pt-16 pb-16 md:pb-28 bg-grid-pattern overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="space-y-8">
                {/* Bangladesh Pride Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#ec1c24]/10 via-slate-950/40 to-[#ff4e00]/10 border border-white/5 text-orange-400 text-[10px] md:text-xs font-bold uppercase py-1.5 px-4 rounded-full tracking-wider">
                  <span className="w-2.5 h-2.5 bg-red-650 rounded-full border border-[#006a4e]" />
                  <span>#1 Free Fire esports app in Bangladesh</span>
                </div>

                {/* Main Header */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight uppercase max-w-3xl mx-auto">
                  Bangladesh’s Ultimate{" "}
                  <span className="bg-gradient-to-r from-[#ff4e00] via-[#ff6525] to-[#ec1c24] bg-clip-text text-transparent block md:inline animate-glow">
                    Free Fire
                  </span>{" "}
                  Tournament Platform
                </h1>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed font-sans">
                  Join professional matches, defeat top-tier rooms, secure instant rewards, and transfer your winnings directly into cash. Your raw combat skill is the only key to gaming fortune.
                </p>

                {/* Statistics block showing scale of operations */}
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto border-t border-b border-white/5 py-4 font-display">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-[#ff4e00]">{AppMetaData.activeGamers}</h4>
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider">Active Gamers</p>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-[#ff6525]">{AppMetaData.totalPricePaid}</h4>
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider">Total Prize Paid</p>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-[#ec1c24]">{AppMetaData.tournamentsDone}</h4>
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider">Tournaments Done</p>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  {/* Glowing Android APK Download */}
                  <a
                    href="#download"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#ff4e00] via-[#ff6525] to-[#ec1c24] hover:from-[#ff621e] hover:to-[#f03138] text-white font-display text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#ff4e00]/15 hover:shadow-[#ff4e00]/30 transition-all duration-300 border border-white/5 text-center flex items-center justify-center gap-2 group"
                  >
                    <Download className="w-5 h-5 text-white active:scale-90 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Latest APK</span>
                  </a>

                  {/* Discord / Facebook communities buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                    <a
                      href="https://www.tiktok.com/@fire_clash_bd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-orange-500/35 bg-white/5 hover:bg-orange-500/5 rounded-xl transition-all font-semibold"
                      title="Follow us on Tiktok"
                    >
                      <svg
                        className="w-5 h-5 fill-current text-gray-300 hover:text-orange-500 transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.94.12 1.88.22 2.82.35v3.83c-1.63-.04-3.23-.46-4.66-1.25-.04 1.77-.02 3.55-.02 5.32 0 3.16-.94 6.36-3.86 7.82-3.14 1.74-7.46.99-9.69-1.85-2.28-2.67-1.85-7.1 1.02-9.21 2.37-1.86 5.86-1.74 8.08.33.02 1.34.01 2.68.01 4.02-1.57-1.16-3.87-1.1-5.26.25-1.46 1.32-1.56 3.79-.23 5.23 1.34 1.53 3.93 1.63 5.37.23.86-.77 1.25-1.95 1.22-3.11V.02z" />
                      </svg>                    </a>
                    <a
                      href="https://www.youtube.com/@fire_clash_bd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-orange-500/35 bg-white/5 hover:bg-orange-500/5 rounded-xl transition-all font-semibold"
                      title="Subcribe our YouTube channel"
                    >
                      <svg className="w-5 h-5 fill-current text-gray-300 hover:text-orange-500 transition-colors" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.386.507 9.386.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Features Section */}
          <section id="features" className="py-20 md:py-28 bg-[#06060c] relative">
            {/* Visual Divider / Section Separator */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#030308] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header block for section */}
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-400 text-[10px] md:text-xs font-bold uppercase py-1 px-3 rounded-full tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>PREMIUM GAMERS ENGINE</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight uppercase">
                  Why Pick{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Fire Clash BD?
                  </span>
                </h2>
                <div className="h-[2px] w-20 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" />
                <p className="text-sm text-gray-500 font-sans">
                  We engineered our application from the grounds up to prioritize fair rules, rapid payments, and transparent results. Discover what makes us Bangladesh's trusted lobby provider.
                </p>
              </div>

              {/* Feature Cards Grid (8 custom cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FeaturesList.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    id={`feature-card-${feature.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6, borderColor: "rgba(255, 78, 0, 0.35)", boxShadow: "0 10px 25px -5px rgba(255, 78, 0, 0.08)" }}
                    className="bg-[#08080a]/90 border border-white/5 p-6 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Glowing effect inside the card */}
                    <span className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#ff4e00] to-[#ec1c24] opacity-[0.02] group-hover:opacity-10 blur-xl rounded-tr-2xl transition-all" />

                    <div className="space-y-4 text-left">
                      {/* Icon wrapper */}
                      <div className="w-12 h-12 rounded-xl bg-[#ff4e00]/10 border border-[#ff4e00]/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff4e00]/20 transition-all duration-300 shadow-sm">
                        <FeatureIcon name={feature.iconName} className="w-6 h-6 text-[#ff4e00] group-hover:text-amber-400 transition-colors" />
                      </div>

                      {/* Main Title */}
                      <h3 className="text-base font-bold font-display tracking-wide uppercase text-gray-100 group-hover:text-orange-400 transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description content */}
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>

                    {/* Simple aesthetic indicator corner */}
                    <div className="pt-4 flex items-center justify-start text-[10px] text-gray-600 font-mono tracking-wider font-extrabold uppercase pointer-events-none group-hover:text-orange-500/40 transition-colors">
                      VERIFIED SYSTEM
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Download APK Section */}
          <section id="download" className="py-20 md:py-28 bg-[#030305] relative overflow-hidden">
            {/* Visual background decorations */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-[#ff4e00]/10 blur-[130px]" />
            <div className="absolute bottom-[2%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#ec1c24]/10 blur-[130px]" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Download Info details left columns */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-1.5 bg-[#ff4e00]/10 border border-white/5 text-orange-400 text-xs font-bold uppercase py-1 px-3.5 rounded-full tracking-wider font-mono">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Get APK Installer</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
                    Download Latest{" "}
                    <span className="bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent block md:inline">
                      Fire Clash BD
                    </span>{" "}
                    APK
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-lg">
                    Access Bangladesh's fastest growing esports lobby room system instantly on your Android phone frame. Compete, monitor secure payouts, and join rooms directly with simple key triggers.
                  </p>

                  {/* Warning Statement box */}
                  <div className="bg-[#120707]/90 border border-red-500/10 p-4 rounded-xl flex items-start gap-3 max-w-lg">
                    <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-green-400 font-display">
                        Official Release Security check
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-mono mt-1">
                        Only download APK files from the official <strong>Fire Clash BD</strong> website (this web platform). Standard copycats may distribute files containing dangerous adware frameworks.
                      </p>
                    </div>
                  </div>

                  {/* Android technical specs cards */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg font-mono">
                    <div className="bg-slate-950/70 border border-white/5 p-3 rounded-xl text-center">
                      <p className="text-[8px] uppercase text-gray-500 tracking-wider">APK Version</p>
                      <p className="text-xs font-bold text-orange-400 mt-1">{AppMetaData.apkVersion}</p>
                    </div>
                    <div className="bg-slate-950/70 border border-white/5 p-3 rounded-xl text-center">
                      <p className="text-[8px] uppercase text-gray-500 tracking-wider font-sans">File Size</p>
                      <p className="text-xs font-bold text-orange-400 mt-1">{AppMetaData.fileSize}</p>
                    </div>
                    <div className="bg-slate-950/70 border border-white/5 p-3 rounded-xl text-center">
                      <p className="text-[8px] uppercase text-gray-500 tracking-wider">Android OS</p>
                      <p className="text-xs font-bold text-orange-400 mt-1">{AppMetaData.androidOs}</p>
                    </div>
                  </div>
                </div>

                {/* Right Interactive download triggers column */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-md bg-[#08080a] border border-white/5 p-6 md:p-8 rounded-2xl relative shadow-xl shadow-orange-600/5 hover:border-[#ff4e00]/15 transition-all duration-300">
                    <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] rounded-t-2xl" />

                    {!isDownloading ? (
                      <div className="space-y-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#ff4e00]/10 border border-[#ff4e00]/25 flex items-center justify-center mx-auto shadow-inner">
                          <Download className="w-8 h-8 text-[#ff4e00]" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-bold font-display uppercase tracking-wide">Production Installer Pack</h3>
                          <p className="text-xs text-gray-400 font-sans">
                            Clean package architecture. Fully compliant with Google Play Protect guidelines.
                          </p>
                        </div>

                        <button
                          onClick={triggerDownloadSimulation}
                          className="w-full py-4 bg-gradient-to-r from-[#ff4e00] via-[#ff6525] to-[#ec1c24] hover:from-[#ff621e] hover:to-[#f03138] text-white font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#ff4e00]/15 hover:shadow-[#ff4e00]/30 border border-white/5 transition-all duration-300 cursor-pointer active:scale-95"
                        >
                          Download Fire Clash BD APK
                        </button>

                        <div className="pt-2 flex justify-center items-center gap-4 text-[10px] text-gray-500 font-mono">
                          <span className="flex items-center gap-1">✔ Safe Certificate</span>
                          <span className="text-gray-700">|</span>
                          <span className="flex items-center gap-1">✔ SHA256 Checked</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 text-left">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-gray-400 font-semibold">{downloadFinished ? "File ready to install!" : "Transferring official download parcel..."}</span>
                          <span className="text-[#ff4e00] font-bold">{downloadProgress}%</span>
                        </div>

                        {/* Animated slider status */}
                        <div className="h-[6px] bg-[#030305] border border-white/5 rounded-full w-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#ff4e00] via-[#ff6525] to-[#ec1c24]"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>

                        {/* Installation tutorial guide cards */}
                        <AnimatePresence mode="wait">
                          {downloadFinished ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-[#030305]/80 border border-[#ff4e00]/25 p-4 rounded-xl space-y-3 font-sans"
                            >
                              <div className="flex items-center space-x-2 text-green-400 text-xs font-bold uppercase tracking-wider font-mono">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Download Complete!</span>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                                <strong>How to install on Android manually:</strong>
                              </p>

                              <ol className="text-[11px] text-gray-400 space-y-2 font-sans list-decimal list-inside pl-1">
                                <li>Open your device's <strong>File Manager</strong> or Downloads directory.</li>
                                <li>Tap on <code>fire_clash_bd.apk</code>.</li>
                                <li>If prompted, verify that <strong>“Install from Unknown Sources”</strong> is enabled in your browser settings.</li>
                                <li>Tap Install, open the icon, and register in 2 minutes!</li>
                              </ol>

                              <div className="pt-2">
                                <a
                                  href={AppMetaData.downloadUrl}
                                  download="FireClashBD.apk"
                                  className="w-full py-3 bg-[#ff4e00] hover:bg-[#ff621e] text-white font-display text-xs font-bold uppercase tracking-widest rounded-lg text-center transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#ff4e00]/10"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Download APK Directly</span>
                                </a>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="bg-[#030305]/40 border border-white/5 p-4 rounded-xl flex items-center gap-3 animate-pulse"
                            >
                              <QrCode className="w-10 h-10 text-orange-500/60 shrink-0" />
                              <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Security bypass protocol active</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed font-mono">
                                  Secure SSL pipeline established. Speed optimized for 3G/4G/WiFi setups in Bangladesh.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: About Section */}
          <section id="about" className="py-20 md:py-28 bg-[#030305] relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-1.5 bg-[#ff4e00]/10 border border-white/5 text-[#ff4e00] text-xs font-bold uppercase py-1 px-3.5 rounded-full tracking-wider font-mono">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Who We Are</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
                  ABOUT{" "}
                  <span className="bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent">
                    FIRE CLASH BD
                  </span>
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto">
                  Fire Clash BD is a skill-based, high-fidelity Free Fire esports tournament platform custom engineered specifically for Bangladeshi gamers. We offer the chance for players to gather in structured lobbies, test their strategic mechanics, and win real rewards through completely fair gameplay.
                </p>

                {/* Bullet points detailing standard esports mandate */}
                <div className="space-y-4 font-sans text-left max-w-xl mx-auto pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white">Not a gambling application</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-sans">
                        We do not support predictions, luck games, or casino elements. Rewards are won strictly based on your physical placement rank and direct kills.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ff4e00]/10 border border-[#ff4e00]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white font-sans">Hardware Lock Anti-cheat</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-sans">
                        Advanced monitor routines prevent emulator scripts, external plugins, or client files tampering, insuring an absolutely fair room.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ec1c24]/10 border border-[#ec1c24]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-white font-sans">Nagad Instancy</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-sans">
                        We integrate secure, direct mobile banking transfers. Instantly deposit manually via auto processing, and receive manual payouts in under 30 minutes!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Social Media Section */}
          <section id="social" className="py-20 md:py-28 bg-[#030305] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

              {/* Header section blocks */}
              <div className="max-w-2xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-[#ff4e00]/10 border border-white/5 text-orange-400 text-[10px] md:text-xs font-bold uppercase py-1 px-3 rounded-full tracking-wider font-mono">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Esports communities</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight">
                  JOIN OUR{" "}
                  <span className="bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent">
                    GAMING WORLD
                  </span>
                </h2>
                <div className="h-[2px] w-20 bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] mx-auto rounded-full" />
                <p className="text-sm text-gray-500 font-sans">
                  Keep in touch with official room hosts, participate in seasonal giveaways, and communicate directly with active squads via social structures.
                </p>
              </div>

              {/* Social Channels Flex/Grid layout with custom identities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto gap-6 text-left">
                {SocialMediaList.map((social) => {
                  let SocialIcon = ({ className }: { className?: string }) => <div className={className} />;
                  if (social.platform === "Facebook") SocialIcon = ({ className }) => <Facebook className={className} />;
                  else if (social.platform === "YouTube") SocialIcon = ({ className }) => <Youtube className={className} />;
                  else if (social.platform === "TikTok") SocialIcon = ({ className }) => (
                    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.19 1.11 1.25 2.63 2.05 4.25 2.37v3.83c-1.39-.07-2.76-.55-3.92-1.34-.84-.58-1.53-1.37-2.02-2.27V15c.03 1.9-.53 3.79-1.63 5.31C13.53 22.01 11.53 23 9.4 23c-2.48.06-4.9-1.07-6.3-3.11-1.35-1.95-1.6-4.52-.67-6.72 1-2.33 3.25-3.97 5.79-4.14V13c-1.29.13-2.46.91-2.99 2.09-.59 1.29-.39 2.87.52 3.97C6.72 20.25 8 20.85 9.4 20.8c1.35.05 2.66-.67 3.29-1.87.35-.7.49-1.49.46-2.28V.02h-.63z" />
                    </svg>
                  );
                  else if (social.platform === "Discord") SocialIcon = ({ className }) => (
                    <svg className={`${className} fill-current`} viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.4-5c.87-.64,1.72-1.31,2.53-2a75.1,75.1,0,0,0,72.6,0c.81.69,1.66,1.36,2.53,2a68.43,68.43,0,0,1-10.4,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06-18.83C129.87,48.12,123.63,25.37,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.14-12.64,11.41-12.64S53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53s5.14-12.64,11.45-12.64S96.14,46,96.14,53,91,65.69,84.69,65.69Z" />
                    </svg>
                  );

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.03 }}
                      className={`block bg-gradient-to-tr border border-white/5 p-6 rounded-2xl shadow-md transition-all duration-300 group hover:border-[#ff4e00]/25 hover:shadow-lg ${social.color} ${social.glowColor} cursor-pointer`}
                    >
                      <div className="flex flex-col h-full justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center transition-all group-hover:scale-110">
                          <SocialIcon className="w-5 h-5 text-gray-300 group-hover:text-amber-400 transition-colors" />
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-[#ff4e00] uppercase font-black">{social.platform}</h4>
                          <h3 className="text-sm font-bold font-display uppercase text-white mt-1 group-hover:text-white transition-colors">{social.label}</h3>
                          <p className="text-[10px] text-gray-400 mt-1 font-sans leading-relaxed">{social.sub}</p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] text-[#ff4e00] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Join Hub</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 6: Privacy Policy with expandable accordion */}
          <section id="policy" className="py-20 md:py-28 bg-[#030305] relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

              {/* Header layout */}
              <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center space-x-1.5 bg-[#ff4e00]/10 border border-white/5 text-orange-400 text-xs font-bold uppercase py-1 px-3.5 rounded-full tracking-wider font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Fair Play Commitment</span>
                </div>
                <h2 className="text-3xl font-black font-display uppercase">
                  POLICIES &{" "}
                  <span className="bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent">
                    RULES FOR GAMEPLAY
                  </span>
                </h2>
                <p className="text-sm text-gray-500 font-sans max-w-xl mx-auto">
                  Every participant is bound by legal policies ensuring honesty, data protection, and anti-fraud systems. Expand to review fully.
                </p>
              </div>

              {/* Accordion List */}
              <div className="border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 bg-[#08080a] shadow-xl">
                {PolicyList.map((policy) => {
                  const isExpanded = expandedPolicyId === policy.id;
                  return (
                    <div key={policy.id} className="transition-all">
                      <button
                        onClick={() => setExpandedPolicyId(isExpanded ? null : policy.id)}
                        className="w-full flex justify-between items-center px-6 py-5 hover:bg-white/[0.01] transition-all text-left font-display uppercase text-xs tracking-wider font-extrabold text-gray-200 hover:text-[#ff4e00] cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-[#ff4e00]" : "bg-gray-655"}`} />
                          {policy.title}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#ff4e00] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-1 text-slate-400 leading-relaxed font-sans text-xs bg-[#050508]">
                              <div className="border-l border-[#ff4e00]/25 pl-4 py-2 mt-1 italic">
                                {policy.content}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Read Full policy Expandable Footer notice */}
              <div className="mt-8 text-center bg-[#08080a] border border-white/5 p-4 rounded-xl">
                <p className="text-[11px] text-gray-400 font-mono">
                  By registering or downloading the Fire Clash BD APK package manually, you immediately signify that you have fully agreed to hold compliance with our
                  <strong className="text-[#ff4e00] hover:underline cursor-pointer ml-1">Terms of Service</strong> &amp;
                  <strong className="text-[#ff4e00] hover:underline cursor-pointer ml-1">User Privacy System</strong>.
                </p>
              </div>

            </div>
          </section>

          {/* Page Footer */}
          <footer className="bg-[#030305] border-t border-white/5 relative z-10 py-12 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand description footer */}
                <div className="space-y-4 text-center md:text-left">
                  <a href="#hero" className="flex items-center space-x-2 justify-center md:justify-start">
                    <img
                      src={appIcon}
                      alt="Fire Clash BD Logo"
                      className="w-8 h-8 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-base font-black font-display tracking-widest bg-gradient-to-r from-[#ff4e00] to-[#ec1c24] bg-clip-text text-transparent">FIRE CLASH BD</span>
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto md:mx-0">
                    Bangladesh's premier skill-based esports app, designed natively for Android and built for professional Free Fire fighters ready to compete safely.
                  </p>
                  <p className="text-[10px] text-slate-600 font-mono">
                    Official Contact Email: <br />
                    <span className="text-slate-400">fireclashbd@gmail.com</span>
                  </p>
                </div>

                {/* Quick Navigation footer */}
                <div className="text-center md:text-left">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#ff4e00] mb-4">Quick Navigation</h4>
                  <ul className="text-xs text-slate-400 space-y-2.5 font-semibold">
                    <li><a href="#hero" className="hover:text-[#ff4e00] transition-colors">Home Landing</a></li>
                    <li><a href="#features" className="hover:text-[#ff4e00] transition-colors">Core Features</a></li>
                    <li><a href="#download" className="hover:text-[#ff4e00] transition-colors">Download Installer</a></li>
                    <li><a href="#about" className="hover:text-[#ff4e00] transition-colors">About esports platform</a></li>
                  </ul>
                </div>

                {/* Rules & legal footer links */}
                <div className="text-center md:text-left">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#ff4e00] mb-4">Legal & Rules</h4>
                  <ul className="text-xs text-slate-400 space-y-2.5 font-semibold">
                    <li><a href="#policy" className="hover:text-[#ff4e00] transition-colors">Privacy and data</a></li>
                    <li><a href="#policy" className="hover:text-[#ff4e00] transition-colors">Fair play rules</a></li>
                    <li><a href="#policy" className="hover:text-[#ff4e00] transition-colors">No gambling mandate</a></li>
                    <li><a href="#policy" className="hover:text-[#ff4e00] transition-colors">Account ban guidelines</a></li>
                  </ul>
                </div>

                {/* Social media links summary footers */}
                <div className="text-center md:text-left space-y-4">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#ff4e00] mb-4">Official Channels</h4>
                  <div className="flex justify-center md:justify-start items-center gap-3">
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 flex items-center justify-center border border-white/5 hover:border-[#ff4e00]/30 bg-white/[0.02] hover:bg-[#ff4e00]/5 rounded-lg transition-all cursor-pointer"
                      title="YouTube"
                    >
                      <Youtube className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </a>
                  </div>
                  <p className="text-[10px] text-gray-600">
                    Not affiliated with or endorsed by Garena Free Fire. All intellectual trademarks belong properties to respective official firms.
                  </p>
                </div>
              </div>

              {/* Horizontal line divider */}
              <div className="border-t border-white/5 my-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] uppercase font-mono tracking-wider">
                <p>&copy; {new Date().getFullYear()} Fire Clash BD. All Rights Reserved.</p>
                <div className="flex gap-4">
                  <span className="hover:text-[#ff4e00] cursor-pointer">Terms</span>
                  <span>&bull;</span>
                  <span className="hover:text-[#ff4e00] cursor-pointer">Security Certs</span>
                  <span>&bull;</span>
                  <span className="hover:text-[#ff4e00] cursor-pointer">Sitemap</span>
                </div>
              </div>

            </div>
          </footer>
        </>
      )}

    </div>
  );
}
