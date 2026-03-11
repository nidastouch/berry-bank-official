"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  heading?: string;
}

const defaultFaqs: FAQItem[] = [
  { _id: "1", question: "Is my money safe?", answer: "We use AES-256 encryption and adhere to PCI-DSS compliance." },
  { _id: "2", question: "Physical cards?", answer: "No, we are a digital wallet to minimize plastic waste." },
  { _id: "3", question: "How do you make money?", answer: "Interchange fees and future premium features." },
];

export function FAQ({ faqs = defaultFaqs, heading = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <HelpCircle className="w-6 h-6 text-berry" />
        <h3 className="text-2xl font-bold text-mist">{heading}</h3>
      </div>

      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <motion.div
            key={faq._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-mist pr-4">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-mist/50 flex-shrink-0" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-mist/60 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
