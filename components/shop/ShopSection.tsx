"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { urlFor } from "@/lib/sanity";

interface Product {
  _id: string;
  title: string;
  price: number;
  description?: string;
  image?: any;
  stripePriceId?: string;
}

interface ShopSectionProps {
  products?: Product[];
  badge?: string;
  heading?: string;
  subline?: string;
  comingSoonText?: string;
}

const defaultProducts: Product[] = [
  { _id: "1", title: "Berry Bank T-Shirt", price: 29.99, description: "Organic cotton tee with the Berry Bank logo" },
  { _id: "2", title: "Eco Water Bottle", price: 24.99, description: "Reusable stainless steel bottle" },
  { _id: "3", title: "Berry Tote Bag", price: 19.99, description: "Sustainable canvas tote bag" },
];

export function ShopSection({
  products = defaultProducts,
  badge = "Merch Store",
  heading = "Shop Berry",
  subline = "Support sustainable banking with eco-friendly merchandise. All products are made with environmentally conscious materials.",
  comingSoonText = "More products coming soon. Join the waitlist to be notified!",
}: ShopSectionProps) {
  return (
    <div className="relative w-full h-full bg-void flex items-center justify-center p-6 md:p-12 overflow-y-auto">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-growth/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-berry/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-growth/10 border border-growth/20 mb-4">
            <ShoppingBag className="w-4 h-4 text-growth" />
            <span className="text-sm font-medium text-growth">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-mist mb-4">{heading}</h2>
          <p className="text-mist/60 max-w-xl mx-auto">{subline}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                id={product._id}
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.image ? urlFor(product.image).width(400).height(400).url() : undefined}
                stripePriceId={product.stripePriceId}
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-mist/40 text-sm mt-8"
        >
          {comingSoonText}
        </motion.p>
      </div>
    </div>
  );
}
