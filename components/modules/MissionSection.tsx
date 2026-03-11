"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

interface MissionSectionProps {
  mission?: string;
  vision?: string;
  coreValues?: string[];
  sectionTitle?: string;
  sectionSubline?: string;
  missionLabel?: string;
  visionLabel?: string;
  coreValuesLabel?: string;
}

const defaultMission = "To be the leading green digital bank in Latin America, empowering individuals to align their finances with their values.";
const defaultVision = "To empower individuals to positively impact the world through sustainable neobanking.";
const defaultValues = ["Sustainability", "Transparency", "Customer-centricity", "Innovation", "Social Responsibility"];

export function MissionSection({
  mission = defaultMission,
  vision = defaultVision,
  coreValues = defaultValues,
  sectionTitle = "Our Purpose",
  sectionSubline = "More than a bank. A movement for a greener future.",
  missionLabel = "Our Mission",
  visionLabel = "Our Vision",
  coreValuesLabel = "Core Values",
}: MissionSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-mist mb-4">{sectionTitle}</h2>
        <p className="text-mist/60 max-w-2xl mx-auto">{sectionSubline}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-berry/20 to-berry/5 backdrop-blur-sm border border-berry/20 rounded-2xl p-8"
        >
          <div className="w-12 h-12 rounded-xl bg-berry/30 flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-berry" />
          </div>
          <h3 className="text-xl font-bold text-mist mb-4">{missionLabel}</h3>
          <p className="text-mist/70 leading-relaxed">{mission}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-growth/20 to-growth/5 backdrop-blur-sm border border-growth/20 rounded-2xl p-8"
        >
          <div className="w-12 h-12 rounded-xl bg-growth/30 flex items-center justify-center mb-6">
            <Eye className="w-6 h-6 text-growth" />
          </div>
          <h3 className="text-xl font-bold text-mist mb-4">{visionLabel}</h3>
          <p className="text-mist/70 leading-relaxed">{vision}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Heart className="w-4 h-4 text-berry" />
          <span className="text-sm font-medium text-mist/70">{coreValuesLabel}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {coreValues?.map((value, index) => (
            <motion.span
              key={value}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-mist/80 font-medium hover:bg-white/10 transition-colors"
            >
              {value}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
