"use client";

import { motion } from "framer-motion";
import { Leaf, ExternalLink } from "lucide-react";

interface GreenHubEmbedProps {
  embedUrl?: string;
  title?: string;
  description?: string;
  badge?: string;
  embedUrlBarText?: string;
}

const DEFAULT_URL = "https://greeninitiatives-client-prod-608881704830.us-central1.run.app/";

export function GreenHubEmbed({
  embedUrl = DEFAULT_URL,
  title = "Green Hub",
  description = "Track your environmental impact and see how your banking choices contribute to a greener planet.",
  badge = "Environmental Impact",
  embedUrlBarText = "greeninitiatives.berrybank.app",
}: GreenHubEmbedProps) {
  return (
    <div className="relative w-full h-full bg-mist flex items-center justify-center p-6 md:p-12">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316A075' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-growth/10 border border-growth/20 mb-4">
            <Leaf className="w-4 h-4 text-growth" />
            <span className="text-sm font-medium text-growth">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-void mb-4">{title}</h2>
          <p className="text-void/60 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-growth/20"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-growth/30 via-transparent to-berry/20 p-[1px]">
            <div className="w-full h-full rounded-3xl bg-white" />
          </div>

          <div className="relative bg-white rounded-t-3xl border-b border-gray-100">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-100 rounded-lg px-4 py-1.5 text-center">
                  <span className="text-xs text-gray-500 truncate">{embedUrlBarText}</span>
                </div>
              </div>
              <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Open in new tab">
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          <div className="relative bg-white rounded-b-3xl">
            <iframe
              src={embedUrl}
              title={"Berry Bank " + title}
              className="w-full aspect-[9/16] md:aspect-video border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
