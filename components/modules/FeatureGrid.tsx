"use client";

import { motion } from "framer-motion";
import {
  Gamepad2, Users, Smartphone, TreePine, Wallet, Shield,
} from "lucide-react";
import { TiltCard } from "@/components/core";

interface FeatureItem {
  _id: string;
  title: string;
  description: string;
  icon?: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface FeatureGridProps {
  features?: FeatureItem[];
  heading?: string;
  subline?: string;
  stats?: StatItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gamepad2, Users, Smartphone, TreePine, Wallet, Shield,
};

const defaultFeatures: FeatureItem[] = [
  { _id: "1", title: "The Green Hub", description: "Geofenced marketplace to fund local projects.", icon: "TreePine" },
  { _id: "2", title: "Digital Wallet", description: "Fee-free, virtual-only. No plastic waste.", icon: "Wallet" },
  { _id: "3", title: "Pooling", description: "Split bills and group gifts instantly.", icon: "Users" },
];

const defaultStats: StatItem[] = [
  { value: "52.2%", label: "Less Carbon" },
  { value: "100%", label: "Digital" },
  { value: "0", label: "Plastic Cards" },
  { value: "\u221E", label: "Growth Potential" },
];

export function FeatureGrid({
  features = defaultFeatures,
  heading = "Banking, Reimagined",
  subline = "Experience the future of sustainable finance with features designed for the eco-conscious generation.",
  stats,
}: FeatureGridProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="relative w-full h-full bg-void flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-berry/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-growth/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-mist mb-4">
            {heading}
          </h2>
          <p className="text-mist/60 max-w-2xl mx-auto text-lg">
            {subline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => {
            const Icon = iconMap[feature.icon || ""] || TreePine;
            return (
              <motion.div
                key={feature._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className="h-full" tiltAmount={8} glareEnabled={true}>
                  <div className="h-full p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-berry/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-berry" />
                    </div>
                    <h3 className="text-xl font-bold text-mist mb-3">{feature.title}</h3>
                    <p className="text-mist/60 leading-relaxed">{feature.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-growth mb-1">{stat.value}</div>
              <div className="text-sm text-mist/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
