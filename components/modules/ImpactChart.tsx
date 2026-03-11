"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

interface ChartDataItem {
  label: string;
  value: number;
  color: string;
}

interface ImpactChartProps {
  data?: ChartDataItem[];
  description?: string;
  cmsData?: {
    description?: string;
    chartData?: ChartDataItem[];
  } | null;
  badge?: string;
  heading?: string;
  bottomStat?: string;
  bottomSubline?: string;
}

const defaultData: ChartDataItem[] = [
  { label: "Switching to Green Bank", value: 52.2, color: "#16A075" },
  { label: "Switching to EV", value: 25.1, color: "#555555" },
  { label: "Going Vegetarian", value: 6.9, color: "#555555" },
];

const defaultDescription = "More effective than an EV or a diet change. Your money has power.";

export function ImpactChart({
  data,
  description,
  cmsData,
  badge = "Environmental Impact",
  heading = "Your Impact",
  bottomStat = "52.2% less carbon footprint",
  bottomSubline = "Just by switching to a green bank",
}: ImpactChartProps) {
  const chartData = cmsData?.chartData || data || defaultData;
  const chartDescription = cmsData?.description || description || defaultDescription;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-growth/10 border border-growth/20 mb-4">
          <TrendingUp className="w-4 h-4 text-growth" />
          <span className="text-sm font-medium text-growth">{badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-mist mb-4">{heading}</h2>
        <p className="text-mist/60 max-w-xl mx-auto">{chartDescription}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
      >
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis type="number" domain={[0, 60]} tick={{ fill: "#FAFAFA", fontSize: 12, opacity: 0.6 }} axisLine={{ stroke: "#FAFAFA", strokeOpacity: 0.2 }} tickFormatter={(value) => value + "%"} />
              <YAxis type="category" dataKey="label" tick={{ fill: "#FAFAFA", fontSize: 12, opacity: 0.8 }} axisLine={{ stroke: "#FAFAFA", strokeOpacity: 0.2 }} width={150} />
              <Tooltip contentStyle={{ backgroundColor: "#0B0B0B", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FAFAFA" }} formatter={(value) => [value + "% reduction", "Carbon Footprint"]} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={1500} animationEasing="ease-out">
                {chartData?.map((entry, index) => (
                  <Cell key={"cell-" + index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {chartData?.map((item, index) => (
            <div key={"legend-" + index} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-mist/70">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-lg text-growth font-semibold">{bottomStat}</p>
        <p className="text-sm text-mist/50 mt-1">{bottomSubline}</p>
      </motion.div>
    </div>
  );
}
