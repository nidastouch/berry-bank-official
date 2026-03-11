"use client";

import { motion } from "framer-motion";
import { Leaf, Mail, MapPin } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionProps {
  companyName?: string;
  tagline?: string;
  contactEmail?: string;
  legalName?: string;
  legalType?: string;
  headquarters?: string;
  quote?: string;
  quickLinks?: FooterLink[];
}

const defaultLinks: FooterLink[] = [
  { label: "Mission", href: "/mission" },
  { label: "Impact", href: "/impact" },
  { label: "Green Hub", href: "/green-hub" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function FooterSection({
  companyName = "Berry Bank",
  tagline = "Where Your Money Grows Green",
  contactEmail = "contact@berrybank.app",
  legalName = "Berry Fintech, Inc.",
  legalType = "Delaware C Corp",
  headquarters = "Austin, TX",
  quote = "Cherries are Berries.",
  quickLinks,
}: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  const links = quickLinks && quickLinks.length > 0 ? quickLinks : defaultLinks;

  return (
    <footer className="w-full bg-void border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-berry flex items-center justify-center">
                <Leaf className="w-5 h-5 text-mist" />
              </div>
              <span className="text-xl font-bold text-mist">{companyName}</span>
            </div>
            <p className="text-mist/60 mb-4">{tagline}</p>
            <p className="text-sm text-growth italic">&quot;{quote}&quot;</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h4 className="font-semibold text-mist mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={"mailto:" + contactEmail} className="flex items-center gap-2 text-mist/60 hover:text-mist transition-colors">
                <Mail className="w-4 h-4" /> {contactEmail}
              </a>
              <div className="flex items-center gap-2 text-mist/60">
                <MapPin className="w-4 h-4" /> {headquarters}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className="font-semibold text-mist mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block text-mist/60 hover:text-mist transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-mist/40"
        >
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>{legalName}</span>
            <span className="hidden md:inline">&bull;</span>
            <span>{legalType}</span>
          </div>
          <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
