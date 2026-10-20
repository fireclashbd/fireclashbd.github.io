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
  const iconProps = { className: className || "w-6 h-6 text-[#FF5722]" };
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
  const [downloadButtonHighlight, setDownloadButtonHighlight] = useState(false);

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

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Helper to handle smooth scrolling (with #download pointing directly to the download button itself)
  const scrollToSection = (e?: React.MouseEvent | React.TouchEvent, id?: string) => {
    if (e) {
      e.preventDefault();
    }
    if (!id) return;

    setMobileMenuOpen(false);

    if (id === "hero") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      window.history.pushState(null, "", "#hero");
      setActiveSection("hero");
      return;
    }

    let element = document.getElementById(id);
    if (!element && id === "download") {
      element = document.getElementById("download-direct-btn") || document.getElementById("download-section");
    }

    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 68;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;

      let targetScrollTop = Math.max(0, Math.round(elementTop - headerHeight));

      if (id === "download") {
        // Highlight download button so the user immediately spots it
        setDownloadButtonHighlight(true);
        setTimeout(() => setDownloadButtonHighlight(false), 2400);

        // Bring download button into comfortable, prime view
        const viewportHeight = window.innerHeight;
        const offset = viewportHeight > 700 ? Math.round(viewportHeight * 0.32) : headerHeight + 20;
        targetScrollTop = Math.max(0, Math.round(elementTop - offset));
      }

      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth"
      });

      window.history.pushState(null, "", `#${id}`);
      setActiveSection("download");
    }
  };

  // Handle auto-scroll on mount if hash is present in URL, after loader finishes
  useEffect(() => {
    if (!loading) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        setTimeout(() => {
          scrollToSection(undefined, id);
        }, 300);
      }
    }
  }, [loading]);

  // Track scrolling to update sticky navbar focus
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 68;
      const scrollPosition = window.scrollY + headerHeight + 60;
      const sectionConfigs = [
        { spyId: "hero", navId: "hero" },
        { spyId: "features", navId: "features" },
        { spyId: "download-section", navId: "download" },
        { spyId: "about", navId: "about" },
        { spyId: "social", navId: "social" },
        { spyId: "policy", navId: "policy" }
      ];

      if (window.scrollY < 80) {
        setActiveSection("hero");
        return;
      }

      for (let i = sectionConfigs.length - 1; i >= 0; i--) {
        const item = sectionConfigs[i];
        const el = document.getElementById(item.spyId);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(item.navId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans tracking-wide selection:bg-[#FF5722] selection:text-white relative overflow-x-hidden">

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="loading-screen"
            className="fixed inset-0 bg-[#0B0F17] z-50 flex flex-col items-center justify-center p-6"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Visual game background elements for loader */}
            <div className="absolute inset-0 bg-grid-pattern opacity-15" />
            <div className="absolute top-[30%] left-[20%] w-72 h-72 rounded-full bg-[#FF5722]/10 blur-[120px]" />
            <div className="absolute bottom-[30%] right-[20%] w-72 h-72 rounded-full bg-[#22D3EE]/10 blur-[120px]" />

            <div className="relative text-center max-w-md w-full bg-[#111521] border border-white/10 p-8 rounded-3xl neon-border-orange shadow-2xl">
              {/* Flame Logo Animated Container */}
              <motion.div
                className="w-24 h-24 mx-auto mb-6 flex items-center justify-center relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                {/* Glowing Aura Ring */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FF5722] to-[#FFB300] opacity-30 blur-md" />
                <span className="absolute inset-1 rounded-xl bg-[#0B0F17] border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={appIcon}
                    alt="Fire Clash BD"
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </span>
              </motion.div>

              {/* Title representation */}
              <h1 className="text-2xl font-black font-display tracking-wider mb-2 bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFB300] bg-clip-text text-transparent">
                FIRE CLASH BD
              </h1>
              <p className="text-xs text-[#22D3EE] font-mono tracking-widest uppercase mb-8 font-semibold">
                Every Match Matters.
              </p>

              {/* Loading progress bar */}
              <div className="h-[4px] bg-[#151A29] border border-white/5 rounded-full w-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFB300]"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>

              {/* Counter progress */}
              <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                <span>{loadText}</span>
                <span className="text-[#FF5722] font-bold">{loadPercentage}%</span>
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
            <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-[#FF5722]/5 blur-[120px]" />
            <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#22D3EE]/5 blur-[150px]" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF5722]/5 blur-[150px]" />
            <div className="absolute bottom-0 right-[20%] w-96 h-96 rounded-full bg-[#FFB300]/5 blur-[120px]" />

            {/* Animated Light Particles simulating floating laser sparks */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gradient-to-tr from-[#FF5722] to-[#FFB300] opacity-25"
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

          {/* Sticky Header Nav */}
          <header className="sticky top-0 bg-[#111521]/95 backdrop-blur-md border-b border-white/10 z-40 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
              {/* Brand Logo */}
              <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center space-x-3 group cursor-pointer">
                <img
                  src={appIcon}
                  alt="Fire Clash BD Icon"
                  className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-[#FF5722]/15 group-hover:shadow-[#FF5722]/30 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-black font-display tracking-wider text-white group-hover:text-[#FF5722] transition-colors">
                    FIRE CLASH BD
                  </h2>
                  <p className="text-[9px] text-[#22D3EE] font-mono tracking-widest font-bold uppercase">
                    EVERY MATCH MATTERS.
                  </p>
                </div>
              </a>

              {/* Desktop Menu links */}
              <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold">
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
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`hover:text-[#FF5722] transition-colors uppercase tracking-wider text-xs font-display relative py-2 cursor-pointer ${
                      activeSection === item.id ? "text-[#FF5722] font-bold" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF5722] rounded-full"
                      />
                    )}
                  </a>
                ))}
              </nav>

              {/* Sticky Action CTA */}
              <div className="hidden md:flex items-center space-x-4">
                <a
                  href="#download"
                  onClick={(e) => scrollToSection(e, "download")}
                  className="flex items-center gap-2 bg-[#FF5722] hover:bg-[#F4511E] text-white font-display text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg shadow-[#FF5722]/20 hover:shadow-[#FF5722]/40 transition-all duration-300 border border-white/5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download APK</span>
                </a>
              </div>

              {/* Mobile hamburger menu button */}
              <button
                id="mobile-drawer-toggle"
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation drawer" : "Open navigation drawer"}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-[#151A29] text-white hover:text-[#FF5722] border border-white/10 active:scale-95 transition-all cursor-pointer relative z-50 shadow-md"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer (Right Side) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-nav-drawer-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 md:hidden"
              >
                {/* Backdrop Overlay */}
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm cursor-pointer"
                />

                {/* Drawer Panel Sliding in from Right */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
                  className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#111521] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto"
                >
                  {/* Drawer Header */}
                  <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#111521]">
                    <div className="flex items-center space-x-3">
                      <img
                        src={appIcon}
                        alt="Fire Clash BD"
                        className="w-9 h-9 rounded-xl object-cover shadow-md shadow-[#FF5722]/15"
                      />
                      <div>
                        <h3 className="font-display font-black text-sm text-white tracking-wider">
                          FIRE CLASH BD
                        </h3>
                        <p className="text-[10px] text-[#22D3EE] font-mono tracking-wider font-semibold uppercase">
                          Every Match Matters.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close navigation drawer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#151A29] text-gray-300 hover:text-white border border-white/10 active:scale-95 transition-all cursor-pointer"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Drawer Navigation Links */}
                  <div className="p-5 space-y-2 flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold">
                        Menu Navigation
                      </p>
                      <span className="text-[10px] text-[#22D3EE] font-mono bg-[#151A29] px-2 py-0.5 rounded-full border border-[#22D3EE]/20">
                        Esports BD
                      </span>
                    </div>

                    {[
                      { id: "hero", label: "Home", icon: PlayCircle },
                      { id: "features", label: "Features", icon: Sparkles },
                      { id: "download", label: "Download APK", icon: Download },
                      { id: "about", label: "About", icon: Shield },
                      { id: "social", label: "Socials", icon: Share2 },
                      { id: "policy", label: "Rules & Policy", icon: ShieldCheck }
                    ].map((item) => {
                      const isActive = activeSection === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            scrollToSection(undefined, item.id);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-display uppercase tracking-wider transition-all text-left cursor-pointer ${
                            isActive
                              ? "bg-[#151A29] text-[#FF5722] font-bold border-l-4 border-[#FF5722]"
                              : "text-gray-300 hover:text-white hover:bg-[#151A29]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? "text-[#FF5722]" : "text-gray-400"}`} />
                            <span>{item.label}</span>
                          </span>
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-gray-500 opacity-40" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Drawer Footer CTA & Key Specs */}
                  <div className="p-5 border-t border-white/10 bg-[#0B0F17]/90 space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToSection(undefined, "download");
                      }}
                      className="w-full py-3.5 px-4 bg-[#FF5722] hover:bg-[#F4511E] text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF5722]/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>Download APK ({AppMetaData.apkVersion})</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-[#151A29] p-2 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-400 font-mono uppercase">Prize Paid</p>
                        <p className="text-xs font-black font-display text-[#FFB300]">{AppMetaData.totalPricePaid}</p>
                      </div>
                      <div className="bg-[#151A29] p-2 rounded-lg border border-white/5">
                        <p className="text-[9px] text-gray-400 font-mono uppercase">Active Gamers</p>
                        <p className="text-xs font-black font-display text-[#22D3EE]">{AppMetaData.activeGamers}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* Section 1: Hero Section */}
          <section id="hero" className="relative pt-6 md:pt-14 pb-14 md:pb-20 bg-[#0B0F17] bg-grid-pattern overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="space-y-8">
                {/* Bangladesh Pride Badge with Tagline */}
                <div className="inline-flex items-center space-x-2 bg-[#151A29] border border-white/10 text-[#22D3EE] text-[10px] md:text-xs font-bold uppercase py-1.5 px-4 rounded-full tracking-wider font-mono shadow-sm">
                  <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full border border-black/40 animate-pulse" />
                  <span>#1 Free Fire esports app in Bangladesh • Every Match Matters.</span>
                </div>

                {/* Main Header */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight uppercase max-w-3xl mx-auto text-white">
                  Bangladesh’s Ultimate{" "}
                  <span className="bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FFB300] bg-clip-text text-transparent block md:inline animate-glow">
                    Free Fire
                  </span>{" "}
                  Tournament Platform
                </h1>

                {/* Description Paragraph */}
                <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-sans">
                  <strong className="text-[#22D3EE] font-semibold">Every Match Matters.</strong> Join professional scrims, compete in structured lobbies, secure instant rewards, and transfer your winnings directly into cash. Your raw combat skill is the only key to gaming fortune.
                </p>

                {/* Statistics block showing scale of operations */}
                <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto bg-[#111521] border border-white/10 p-3 rounded-2xl font-display shadow-xl">
                  <div className="bg-[#151A29] p-3 rounded-xl text-center border border-white/5">
                    <h4 className="text-xl md:text-2xl font-black text-[#22D3EE]">{AppMetaData.activeGamers}</h4>
                    <p className="text-[10px] uppercase text-gray-400 font-mono tracking-wider mt-0.5">Active Gamers</p>
                  </div>
                  <div className="bg-[#151A29] p-3 rounded-xl text-center border border-white/5">
                    <h4 className="text-xl md:text-2xl font-black text-[#FFB300]">{AppMetaData.totalPricePaid}</h4>
                    <p className="text-[10px] uppercase text-gray-400 font-mono tracking-wider mt-0.5">Prize Paid</p>
                  </div>
                  <div className="bg-[#151A29] p-3 rounded-xl text-center border border-white/5">
                    <h4 className="text-xl md:text-2xl font-black text-[#FF5722]">{AppMetaData.tournamentsDone}</h4>
                    <p className="text-[10px] uppercase text-gray-400 font-mono tracking-wider mt-0.5">Tournaments</p>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  {/* Glowing Android APK Download */}
                  <a
                    href="#download"
                    onClick={(e) => scrollToSection(e, "download")}
                    className="w-full sm:w-auto px-8 py-4 bg-[#FF5722] hover:bg-[#F4511E] text-white font-display text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF5722]/25 hover:shadow-[#FF5722]/40 transition-all duration-300 border border-white/10 text-center flex items-center justify-center gap-2 group cursor-pointer"
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
                      className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-[#FF5722]/50 bg-[#151A29] hover:bg-[#151A29]/80 rounded-xl transition-all font-semibold"
                      title="Follow us on Tiktok"
                    >
                      <svg
                        className="w-5 h-5 fill-current text-gray-300 hover:text-[#FF5722] transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.94.12 1.88.22 2.82.35v3.83c-1.63-.04-3.23-.46-4.66-1.25-.04 1.77-.02 3.55-.02 5.32 0 3.16-.94 6.36-3.86 7.82-3.14 1.74-7.46.99-9.69-1.85-2.28-2.67-1.85-7.1 1.02-9.21 2.37-1.86 5.86-1.74 8.08.33.02 1.34.01 2.68.01 4.02-1.57-1.16-3.87-1.1-5.26.25-1.46 1.32-1.56 3.79-.23 5.23 1.34 1.53 3.93 1.63 5.37.23.86-.77 1.25-1.95 1.22-3.11V.02z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@fire_clash_bd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-[#FF5722]/50 bg-[#151A29] hover:bg-[#151A29]/80 rounded-xl transition-all font-semibold"
                      title="Subscribe our YouTube channel"
                    >
                      <svg className="w-5 h-5 fill-current text-gray-300 hover:text-[#EF4444] transition-colors" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.386.507 9.386.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Features Section */}
          <section id="features" className="pt-12 md:pt-16 pb-16 md:pb-24 bg-[#0B0F17] relative">
            {/* Visual Divider / Section Separator */}
            <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#0B0F17] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header block for section */}
              <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-[#151A29] border border-white/10 text-[#22D3EE] text-[10px] md:text-xs font-bold uppercase py-1.5 px-4 rounded-full tracking-wider font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>PREMIUM GAMERS ENGINE • EVERY MATCH MATTERS</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black font-display tracking-tight uppercase text-white">
                  Why Pick{" "}
                  <span className="text-[#FF5722]">
                    Fire Clash BD?
                  </span>
                </h2>
                <div className="h-[2px] w-20 bg-[#FF5722] mx-auto rounded-full" />
                <p className="text-sm text-gray-300 font-sans">
                  We engineered our application from the grounds up to prioritize fair rules, rapid payouts, and transparent results. Discover what makes us Bangladesh's trusted lobby provider.
                </p>
              </div>

              {/* Feature Cards Grid (4 custom cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FeaturesList.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    id={`feature-card-${feature.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6, borderColor: "rgba(255, 87, 34, 0.4)", boxShadow: "0 10px 25px -5px rgba(255, 87, 34, 0.12)" }}
                    className="bg-[#111521] border border-white/10 p-6 rounded-2xl transition-all duration-300 relative group flex flex-col justify-between shadow-xl"
                  >
                    <div className="space-y-4 text-left">
                      {/* Icon wrapper */}
                      <div className="w-12 h-12 rounded-xl bg-[#151A29] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF5722]/40 transition-all duration-300 shadow-sm">
                        <FeatureIcon name={feature.iconName} className="w-6 h-6 text-[#FF5722]" />
                      </div>

                      {/* Main Title */}
                      <h3 className="text-base font-bold font-display tracking-wide uppercase text-white group-hover:text-[#FF5722] transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description content */}
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        {feature.description}
                      </p>
                    </div>

                    {/* Simple aesthetic indicator corner */}
                    <div className="pt-4 flex items-center justify-start text-[10px] text-[#22D3EE] font-mono tracking-wider font-extrabold uppercase pointer-events-none opacity-80">
                      VERIFIED SYSTEM
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: Download APK Section */}
          <section id="download-section" className="pt-12 md:pt-16 pb-16 md:pb-24 bg-[#0B0F17] relative overflow-hidden">
            {/* Visual background decorations */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-[#FF5722]/10 blur-[130px]" />
            <div className="absolute bottom-[2%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[#22D3EE]/10 blur-[130px]" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Download Info details left columns */}
                <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center space-x-1.5 bg-[#151A29] border border-white/10 text-[#22D3EE] text-xs font-bold uppercase py-1 px-3.5 rounded-full tracking-wider font-mono">
                    <Smartphone className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>Get APK Installer • Every Match Matters</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white">
                    Download Latest{" "}
                    <span className="text-[#FF5722]">
                      Fire Clash BD
                    </span>{" "}
                    APK
                  </h2>

                  <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-lg">
                    Access Bangladesh's fastest growing esports lobby room platform instantly on your Android phone. Compete, monitor verified payouts, and join matches with zero delays.
                  </p>

                  {/* Warning Statement box */}
                  <div className="bg-[#111521] border border-[#22C55E]/20 p-4 rounded-xl flex items-start gap-3 max-w-lg shadow-lg">
                    <Shield className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#22C55E] font-display">
                        Official Release Security check
                      </h4>
                      <p className="text-[11px] text-gray-300 leading-relaxed font-mono mt-1">
                        Only download APK files from the official <strong>Fire Clash BD</strong> platform. Standard copycats may distribute files containing dangerous adware frameworks.
                      </p>
                    </div>
                  </div>

                  {/* Android technical specs cards */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg font-mono">
                    <div className="bg-[#151A29] border border-white/5 p-3 rounded-xl text-center shadow-md">
                      <p className="text-[8px] uppercase text-gray-400 tracking-wider">APK Version</p>
                      <p className="text-xs font-bold text-[#22D3EE] mt-1">{AppMetaData.apkVersion}</p>
                    </div>
                    <div className="bg-[#151A29] border border-white/5 p-3 rounded-xl text-center shadow-md">
                      <p className="text-[8px] uppercase text-gray-400 tracking-wider font-sans">File Size</p>
                      <p className="text-xs font-bold text-[#22D3EE] mt-1">{AppMetaData.fileSize}</p>
                    </div>
                    <div className="bg-[#151A29] border border-white/5 p-3 rounded-xl text-center shadow-md">
                      <p className="text-[8px] uppercase text-gray-400 tracking-wider">Android OS</p>
                      <p className="text-xs font-bold text-[#22D3EE] mt-1">{AppMetaData.androidOs}</p>
                    </div>
                  </div>
                </div>

                {/* Right Interactive download triggers column */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-full max-w-md bg-[#111521] border border-white/10 p-6 md:p-8 rounded-2xl relative shadow-2xl hover:border-[#FF5722]/30 transition-all duration-300">
                    <span className="absolute top-0 inset-x-0 h-[2px] bg-[#FF5722] rounded-t-2xl" />

                    {!isDownloading ? (
                      <div className="space-y-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#151A29] border border-white/10 flex items-center justify-center mx-auto shadow-inner text-[#FF5722]">
                          <Download className="w-8 h-8 text-[#FF5722]" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg font-bold font-display uppercase tracking-wide text-white">Production Installer Pack</h3>
                          <p className="text-xs text-gray-300 font-sans">
                            Clean package architecture. Fully compliant with Google Play Protect guidelines.
                          </p>
                        </div>

                        <button
                          id="download"
                          type="button"
                          onClick={triggerDownloadSimulation}
                          className={`w-full py-4 bg-[#FF5722] hover:bg-[#F4511E] text-white font-display text-sm font-black uppercase tracking-wider rounded-xl shadow-lg shadow-[#FF5722]/25 hover:shadow-[#FF5722]/40 border border-white/10 transition-all duration-300 cursor-pointer active:scale-95 scroll-mt-32 ${
                            downloadButtonHighlight
                              ? "ring-4 ring-[#FF5722] ring-offset-2 ring-offset-[#111521] shadow-[#FF5722]/60 scale-[1.02]"
                              : ""
                          }`}
                        >
                          Download Fire Clash BD APK
                        </button>

                        <div className="pt-2 flex justify-center items-center gap-4 text-[10px] text-gray-400 font-mono">
                          <span className="flex items-center gap-1 text-[#22C55E]">✔ Safe Certificate</span>
                          <span className="text-gray-700">|</span>
                          <span className="flex items-center gap-1 text-[#22C55E]">✔ SHA256 Checked</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 text-left">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-gray-300 font-semibold">{downloadFinished ? "File ready to install!" : "Transferring official download parcel..."}</span>
                          <span className="text-[#FF5722] font-bold">{downloadProgress}%</span>
                        </div>

                        {/* Animated slider status */}
                        <div className="h-[6px] bg-[#151A29] border border-white/5 rounded-full w-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#FF5722]"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>

                        {/* Installation tutorial guide cards */}
                        <AnimatePresence mode="wait">
                          {downloadFinished ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-[#151A29] border border-[#22C55E]/30 p-4 rounded-xl space-y-3 font-sans"
                            >
                              <div className="flex items-center space-x-2 text-[#22C55E] text-xs font-bold uppercase tracking-wider font-mono">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Download Complete!</span>
                              </div>
                              <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                                <strong>How to install on Android manually:</strong>
                              </p>

                              <ol className="text-[11px] text-gray-300 space-y-2 font-sans list-decimal list-inside pl-1">
                                <li>Open your device's <strong>File Manager</strong> or Downloads directory.</li>
                                <li>Tap on <code>fire_clash_bd.apk</code>.</li>
                                <li>If prompted, verify that <strong>“Install from Unknown Sources”</strong> is enabled in your browser settings.</li>
                                <li>Tap Install, open the icon, and register in 2 minutes!</li>
                              </ol>

                              <div className="pt-2">
                                <a
                                  id="download-direct-btn"
                                  href={AppMetaData.downloadUrl}
                                  download="FireClashBD.apk"
                                  className={`w-full py-3 bg-[#FF5722] hover:bg-[#F4511E] text-white font-display text-xs font-bold uppercase tracking-widest rounded-lg text-center transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#FF5722]/20 scroll-mt-32 ${
                                    downloadButtonHighlight
                                      ? "ring-4 ring-[#FF5722] ring-offset-2 ring-offset-[#111521] shadow-[#FF5722]/60 scale-[1.02]"
                                      : ""
                                  }`}
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
                              className="bg-[#151A29] border border-white/5 p-4 rounded-xl flex items-center gap-3 animate-pulse"
                            >
                              <QrCode className="w-10 h-10 text-[#22D3EE] shrink-0" />
                              <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">Security pipeline active</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed font-mono">
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
          <section id="about" className="pt-12 md:pt-16 pb-16 md:pb-24 bg-[#0B0F17] relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-1.5 bg-[#151A29] border border-white/10 text-[#22D3EE] text-xs font-bold uppercase py-1.5 px-3.5 rounded-full tracking-wider font-mono">
                  <Shield className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Who We Are • Every Match Matters</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white">
                  ABOUT{" "}
                  <span className="text-[#FF5722]">
                    FIRE CLASH BD
                  </span>
                </h2>

                <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-2xl mx-auto">
                  <strong className="text-[#22D3EE] font-semibold">Every Match Matters.</strong> Fire Clash BD is a skill-based, high-fidelity Free Fire esports tournament platform custom engineered specifically for Bangladeshi gamers. We offer the chance for players to gather in structured lobbies, test their strategic mechanics, and win real rewards through completely fair gameplay.
                </p>

                {/* Bullet points detailing standard esports mandate */}
                <div className="space-y-4 font-sans text-left max-w-xl mx-auto pt-4">
                  <div className="flex items-start gap-3 bg-[#111521] border border-white/5 p-4 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#151A29] border border-[#22C55E]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#22C55E]">Not a gambling application</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed font-sans">
                        We do not support predictions, luck games, or casino elements. Rewards are won strictly based on your in-game placement and verified skill.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#111521] border border-white/5 p-4 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#151A29] border border-[#22D3EE]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#22D3EE]" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#22D3EE] font-sans">Hardware Lock Anti-cheat</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed font-sans">
                        Advanced monitor routines prevent emulator scripts, external plugins, or client files tampering, ensuring an absolutely fair room for all squads.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#111521] border border-white/5 p-4 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#151A29] border border-[#FFB300]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#FFB300]" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#FFB300] font-sans">Nagad &amp; bKash Instant Payouts</h4>
                      <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed font-sans">
                        We integrate secure, direct mobile banking transfers. Instantly deposit manually via auto processing, and receive manual payouts in under 30 minutes!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Social Media Section */}
          <section id="social" className="pt-12 md:pt-16 pb-16 md:pb-24 bg-[#0B0F17] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

              {/* Header section blocks */}
              <div className="max-w-2xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-[#151A29] border border-white/10 text-[#22D3EE] text-[10px] md:text-xs font-bold uppercase py-1.5 px-3.5 rounded-full tracking-wider font-mono">
                  <Share2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Esports communities • Every Match Matters</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-white">
                  JOIN OUR{" "}
                  <span className="text-[#FF5722]">
                    GAMING WORLD
                  </span>
                </h2>
                <div className="h-[2px] w-20 bg-[#FF5722] mx-auto rounded-full" />
                <p className="text-sm text-gray-300 font-sans">
                  Keep in touch with official room hosts, participate in seasonal scrims, and communicate directly with active squads.
                </p>
              </div>

              {/* Social Channels Flex/Grid layout with custom identities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-6 text-left">
                {SocialMediaList.map((social) => {
                  let SocialIcon = ({ className }: { className?: string }) => <div className={className} />;
                  if (social.platform === "Facebook") SocialIcon = ({ className }) => <Facebook className={className} />;
                  else if (social.platform === "YouTube") SocialIcon = ({ className }) => <Youtube className={className} />;
                  else if (social.platform === "TikTok") SocialIcon = ({ className }) => (
                    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.19 1.11 1.25 2.63 2.05 4.25 2.37v3.83c-1.39-.07-2.76-.55-3.92-1.34-.84-.58-1.53-1.37-2.02-2.27V15c.03 1.9-.53 3.79-1.63 5.31C13.53 22.01 11.53 23 9.4 23c-2.48.06-4.9-1.07-6.3-3.11-1.35-1.95-1.6-4.52-.67-6.72 1-2.33 3.25-3.97 5.79-4.14V13c-1.29.13-2.46.91-2.99 2.09-.59 1.29-.39 2.87.52 3.97C6.72 20.25 8 20.85 9.4 20.8c1.35.05 2.66-.67 3.29-1.87.35-.7.49-1.49.46-2.28V.02h-.63z" />
                    </svg>
                  );

                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="block bg-[#111521] border border-white/10 hover:border-[#FF5722]/50 p-6 rounded-2xl shadow-xl transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex flex-col h-full justify-between space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-[#151A29] border border-white/5 flex items-center justify-center transition-all group-hover:scale-110">
                          <SocialIcon className="w-5 h-5 text-[#FF5722] group-hover:text-white transition-colors" />
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-[#FF5722] uppercase font-black">{social.platform}</h4>
                          <h3 className="text-sm font-bold font-display uppercase text-white mt-1 group-hover:text-[#FF5722] transition-colors">{social.label}</h3>
                          <p className="text-[10px] text-gray-400 mt-1 font-sans leading-relaxed">{social.sub}</p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] text-[#22D3EE] font-mono tracking-widest uppercase font-semibold">
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
          <section id="policy" className="pt-12 md:pt-16 pb-16 md:pb-24 bg-[#0B0F17] relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

              {/* Header layout */}
              <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center space-x-1.5 bg-[#151A29] border border-white/10 text-[#22D3EE] text-xs font-bold uppercase py-1.5 px-3.5 rounded-full tracking-wider font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>Fair Play Commitment • Every Match Matters</span>
                </div>
                <h2 className="text-3xl font-black font-display uppercase text-white">
                  POLICIES &amp;{" "}
                  <span className="text-[#FF5722]">
                    RULES FOR GAMEPLAY
                  </span>
                </h2>
                <p className="text-sm text-gray-300 font-sans max-w-xl mx-auto">
                  Every participant is bound by legal policies ensuring honesty, data protection, and anti-fraud systems. Expand to review fully.
                </p>
              </div>

              {/* Accordion List */}
              <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 bg-[#111521] shadow-2xl">
                {PolicyList.map((policy) => {
                  const isExpanded = expandedPolicyId === policy.id;
                  return (
                    <div key={policy.id} className="transition-all">
                      <button
                        type="button"
                        onClick={() => setExpandedPolicyId(isExpanded ? null : policy.id)}
                        className="w-full flex justify-between items-center px-6 py-5 hover:bg-[#151A29]/50 transition-all text-left font-display uppercase text-xs tracking-wider font-extrabold text-gray-200 hover:text-[#FF5722] cursor-pointer"
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-[#FF5722]" : "bg-gray-600"}`} />
                          {policy.title}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-[#FF5722] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
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
                            <div className="px-6 pb-6 pt-1 text-gray-300 leading-relaxed font-sans text-xs bg-[#151A29]">
                              <div className="border-l-2 border-[#FF5722] pl-4 py-2 mt-1">
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
              <div className="mt-8 text-center bg-[#111521] border border-white/10 p-4 rounded-xl">
                <p className="text-[11px] text-gray-300 font-mono">
                  By registering or downloading the Fire Clash BD APK package manually, you immediately signify that you have fully agreed to hold compliance with our
                  <strong className="text-[#FF5722] hover:underline cursor-pointer ml-1">Terms of Service</strong> &amp;
                  <strong className="text-[#FF5722] hover:underline cursor-pointer ml-1">User Privacy System</strong>.
                </p>
              </div>

            </div>
          </section>

          {/* Page Footer */}
          <footer className="bg-[#0B0F17] border-t border-white/10 relative z-10 py-12 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand description footer */}
                <div className="space-y-4 text-center md:text-left">
                  <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center space-x-2 justify-center md:justify-start cursor-pointer">
                    <img
                      src={appIcon}
                      alt="Fire Clash BD Logo"
                      className="w-8 h-8 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-base font-black font-display tracking-widest text-white">FIRE CLASH BD</span>
                  </a>
                  <p className="text-xs text-[#22D3EE] font-mono font-bold tracking-wider">
                    Every Match Matters.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                    Bangladesh's premier skill-based esports app, designed natively for Android and built for competitive Free Fire warriors.
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    Official Contact Email: <br />
                    <span className="text-[#22D3EE]">fireclashbd@gmail.com</span>
                  </p>
                </div>

                {/* Quick Navigation footer */}
                <div className="text-center md:text-left">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#FF5722] mb-4">Quick Navigation</h4>
                  <ul className="text-xs text-gray-300 space-y-2.5 font-semibold">
                    <li><a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Home Landing</a></li>
                    <li><a href="#features" onClick={(e) => scrollToSection(e, "features")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Core Features</a></li>
                    <li><a href="#download" onClick={(e) => scrollToSection(e, "download")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Download Installer</a></li>
                    <li><a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-[#FF5722] transition-colors cursor-pointer">About esports platform</a></li>
                  </ul>
                </div>

                {/* Rules & legal footer links */}
                <div className="text-center md:text-left">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#FF5722] mb-4">Legal &amp; Rules</h4>
                  <ul className="text-xs text-gray-300 space-y-2.5 font-semibold">
                    <li><a href="#policy" onClick={(e) => scrollToSection(e, "policy")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Privacy and data</a></li>
                    <li><a href="#policy" onClick={(e) => scrollToSection(e, "policy")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Fair play rules</a></li>
                    <li><a href="#policy" onClick={(e) => scrollToSection(e, "policy")} className="hover:text-[#FF5722] transition-colors cursor-pointer">No gambling mandate</a></li>
                    <li><a href="#policy" onClick={(e) => scrollToSection(e, "policy")} className="hover:text-[#FF5722] transition-colors cursor-pointer">Account ban guidelines</a></li>
                  </ul>
                </div>

                {/* Social media links summary footers */}
                <div className="text-center md:text-left space-y-4">
                  <h4 className="text-xs font-display font-extrabold uppercase tracking-widest text-[#FF5722] mb-4">Official Channels</h4>
                  <div className="flex justify-center md:justify-start items-center gap-3">
                    <a
                      href="https://www.youtube.com/@fire_clash_bd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#FF5722]/50 bg-[#151A29] hover:bg-[#151A29]/80 rounded-xl transition-all cursor-pointer"
                      title="YouTube"
                    >
                      <Youtube className="w-5 h-5 text-[#EF4444]" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@fire_clash_bd"
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#FF5722]/50 bg-[#151A29] hover:bg-[#151A29]/80 rounded-xl transition-all cursor-pointer"
                      title="TikTok"
                    >
                      <svg
                        className="w-4 h-4 fill-current text-white hover:text-[#FF5722] transition-colors"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.19 1.11 1.25 2.63 2.05 4.25 2.37v3.83c-1.39-.07-2.76-.55-3.92-1.34-.84-.58-1.53-1.37-2.02-2.27V15c.03 1.9-.53 3.79-1.63 5.31C13.53 22.01 11.53 23 9.4 23c-2.48.06-4.9-1.07-6.3-3.11-1.35-1.95-1.6-4.52-.67-6.72 1-2.33 3.25-3.97 5.79-4.14V13c-1.29.13-2.46.91-2.99 2.09-.59 1.29-.39 2.87.52 3.97C6.72 20.25 8 20.85 9.4 20.8c1.35.05 2.66-.67 3.29-1.87.35-.7.49-1.49.46-2.28V.02h-.63z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Not affiliated with or endorsed by Garena Free Fire. All intellectual trademarks belong to their respective owners.
                  </p>
                </div>
              </div>

              {/* Horizontal line divider */}
              <div className="border-t border-white/10 my-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] uppercase font-mono tracking-wider">
                <p>&copy; {new Date().getFullYear()} Fire Clash BD. Every Match Matters. All Rights Reserved.</p>
                <div className="flex gap-4">
                  <span className="hover:text-[#FF5722] cursor-pointer">Terms</span>
                  <span>&bull;</span>
                  <span className="hover:text-[#FF5722] cursor-pointer">Security Certs</span>
                  <span>&bull;</span>
                  <span className="hover:text-[#FF5722] cursor-pointer">Sitemap</span>
                </div>
              </div>

            </div>
          </footer>
        </>
      )}

    </div>
  );
}
