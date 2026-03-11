"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { urlFor } from "@/lib/sanity";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: any;
  bio?: string;
}

interface TeamProps {
  members?: TeamMember[];
  legalName?: string;
  legalType?: string;
  headquarters?: string;
  heading?: string;
  subline?: string;
}

const defaultMembers: TeamMember[] = [
  { _id: "1", name: "Enrique Gomez Jackson", role: "CEO & Co-Founder" },
  { _id: "2", name: "Don Vasser", role: "CTO & Co-Founder" },
  { _id: "3", name: "Leo Sanchez", role: "CFO/CMO & Co-Founder" },
];

export function Team({
  members = defaultMembers,
  legalName = "Berry Fintech, Inc.",
  legalType = "Delaware C Corp",
  headquarters = "Austin, TX",
  heading = "Meet Our Founders",
  subline = "The passionate team behind Latin America\u2019s first green digital bank.",
}: TeamProps) {
  return (
    <div className="relative w-full h-full bg-void flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-berry/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-mist mb-4">{heading}</h2>
          <p className="text-mist/60 max-w-xl mx-auto">{subline}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
          {members?.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-berry to-growth opacity-50 blur-lg group-hover:opacity-75 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-berry/30 to-growth/30 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <img
                      src={urlFor(member.image).width(256).height(256).url()}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 md:w-16 md:h-16 text-mist/50" />
                  )}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-mist mb-1">{member.name}</h3>
              <p className="text-sm text-berry">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-mist/40">
            <span>{legalName}</span>
            <span className="hidden md:inline">&bull;</span>
            <span>{legalType}</span>
            <span className="hidden md:inline">&bull;</span>
            <span>Headquarters: {headquarters}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
