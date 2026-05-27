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
  MessageCircle,
  Video
} from "lucide-react";

export interface Feature {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export const FeaturesList = [
  {
    id: "trusted",
    iconName: "ShieldCheck",
    title: "Trusted Platform",
    description: "Bangladesh's most transparent and verified Free Fire tournament provider, securing player scores & results matches objectively."
  },
  {
    id: "payments",
    iconName: "Lock",
    title: "Secure Payments",
    description: "Your funds are absolutely safe. We utilize top enterprise payment models with double verification security on every single transaction."
  },
  {
    id: "payout",
    iconName: "Zap",
    title: "Fastest Payout",
    description: "Submit a withdrawal request and receive your hard-earned winnings into Nagad within 30 minutes, guaranteed! No Questions Ask!"
  },
  {
    id: "deposit",
    iconName: "Coins",
    title: "Auto Deposit System",
    description: "No manual admin checking delays. Instantly load money into your in-app wallet anytime with automatic instant BDT gateway."
  },
  // {
  //   id: "rewards",
  //   iconName: "Award",
  //   title: "Real Prize Money",
  //   description: "Compete with Bangladeshi esports stars and transform your gaming skills into actual cash prizes, paid out on standard mobile bank methods."
  // },
  // {
  //   id: "fairplay",
  //   iconName: "Scale",
  //   title: "Fair Play System",
  //   description: "Advanced match room observation, anti-colleague system, and hardware tracking guarantees a level playing field for standard gamers."
  // },
  // {
  //   id: "support",
  //   iconName: "Headphones",
  //   title: "24/7 Dedicated Support",
  //   description: "Have any questions or match disputes? Reach out to our specialized support staff instantly via active in-app chat or Messenger support."
  // },
  // {
  //   id: "instant",
  //   iconName: "PlayCircle",
  //   title: "Instant Match Joining",
  //   description: "Receive match room IDs and passwords automatically in the app precisely 10 minutes prior to match schedule. Click & join."
  // }
];

export interface PolicyItem {
  id: string;
  title: string;
  content: string;
}

export const PolicyList: PolicyItem[] = [
  {
    id: "about-clash",
    title: "1. About Fire Clash BD",
    content: "Fire Clash BD is an esports tournament platform where players can participate in skill-based Free Fire tournaments and competitions.\n\nFire Clash BD is NOT a gambling application. Winning depends entirely on player skill, performance, teamwork, and in-game results. We do not provide casino games, betting systems, or luck-based gambling activities."
  },
  {
    id: "user-info",
    title: "2. User Information",
    content: "When creating an account, we may collect the following information:\n• Name\n• Email Address\n• Phone Number\n• Game UID\n• Payment Information\n\nThis information is used for account verification, tournament participation, prize payout processing, security monitoring, and customer support. We do not sell user data to third parties."
  },
  {
    id: "ac-security",
    title: "3. Account Security",
    content: "Users are responsible for keeping their account credentials secure.\n\nYou must:\n• Keep your password private\n• Use valid personal information\n• Avoid sharing accounts with others\n\nFire Clash BD is not responsible for losses caused by account sharing or weak passwords."
  },
  {
    id: "fair-play",
    title: "4. Fair Play Policy",
    content: "Fair gameplay is strictly enforced. The following activities are strictly prohibited: hacking, cheats, scripts, Mod APK usage, emulator abuse, exploiting bugs, fake results or edited screenshots, teaming unfairly, and any suspicious gameplay activity.\n\nIf cheating or suspicious activity is detected:\n• Your account may be permanently banned\n• Your tournament access may be removed\n• Your wallet balance may be frozen\n• You may lose withdrawal access permanently\n\nA banned account cannot log in, join tournaments, withdraw money, or recover rewards. All admin decisions regarding cheating investigations are final."
  },
  {
    id: "payments-wd",
    title: "5. Deposits & Withdrawals",
    content: "Users are responsible for entering correct payment information. Deposits are verified manually or automatically. Wrong transaction IDs may cause delays. Withdrawal processing time may vary. Fraudulent payment activity will result in account suspension. Fire Clash BD reserves the right to hold transactions for security verification."
  },
  {
    id: "rules",
    title: "6. Tournament Rules",
    content: "Each tournament may have its own rules and requirements. Users must: join matches on time, follow room rules, respect admins and other players, and avoid toxic behavior. Failure to follow tournament rules may result in disqualification."
  },
  {
    id: "age-limit",
    title: "7. Age Requirement",
    content: "Users should be at least 13 years old to use the platform. Users under local legal age should use the app with guardian permission."
  },
  {
    id: "changes",
    title: "8. Changes to Policy",
    content: "Fire Clash BD may update these policies at any time without prior notice. Continued use of the app means you accept the updated terms."
  },
  {
    id: "support",
    title: "9. Contact & Support",
    content: "For support or account-related issues, contact the Fire Clash BD support team through the official app or official social platforms.\n\nThank you for using Fire Clash BD. Play fair. Compete hard. Win with skill."
  }
];

export const SocialMediaList = [
  {
    name: "YouTube Channel",
    platform: "YouTube",
    url: "https://www.youtube.com/@fire_clash_bd",
    color: "from-[#000000]/40 to-[#991b1b]/20 hover:from-[#000000] hover:to-[#991b1b]/40",
    glowColor: "shadow-[#991b1b]/10 hover:shadow-[#991b1b]/40",
    label: "@fire_clash_bd",
    sub: "Watch match highlights, top plays, and daily streams"
  },
  {
    name: "TikTok Account",
    platform: "TikTok",
    url: "https://www.tiktok.com/@fireclashbd",
    color: "from-[#000000]/40 to-[#00f2fe]/20 hover:from-[#000000] hover:to-[#00f2fe]/40",
    glowColor: "shadow-[#00f2fe]/20 hover:shadow-[#00f2fe]/50",
    label: "@fire_clash_bd",
    sub: "Trendy shorts, competitive updates, and funny clips"
  },
  {
    name: "Discord Channel",
    platform: "Discord",
    url: "https://discord.gg/VbUvRgE8",
    color: "from-[#000000]/40 to-[#229ED9]/20 hover:from-[#000000] hover:to-[#229ED9]/40",
    glowColor: "shadow-[#229ED9]/20 hover:shadow-[#229ED9]/50",
    label: "fire_clash_bd",
    sub: "Join the community for instant announcements, news, and discussion"
  }
];

export interface AppSpecs {
  apkVersion: string;
  fileSize: string;
  androidOs: string;
  activeGamers: string;
  totalPricePaid: string;
  tournamentsDone: string;
  downloadUrl: string;
}

// EDITABLE SPECIFICATIONS FOR THE MOBILE APP
export const AppMetaData: AppSpecs = {
  apkVersion: "v1.0.4",
  fileSize: "77.2 MB",
  androidOs: "8.0+",
  activeGamers: "20+",
  totalPricePaid: "৳1000+",
  tournamentsDone: "10+",
  downloadUrl: "https://github.com/fireclashbd/fireclashbd.github.io/releases/latest/download/fire_clash_bd.apk"
};
