"use client";
import React from "react";
import { motion } from "motion/react";
import { GlowCard } from "@/components/ui/spotlight-card";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <GlowCard
                key={i}
                glowColor="gold"
                customSize
                className="w-full flex flex-col justify-between"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-gold text-xs">★</span>
                  ))}
                </div>

                <p className="text-cream/75 text-sm leading-relaxed font-body italic flex-1">
                  "{text}"
                </p>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gold/10">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-9 w-9 rounded-full object-cover grayscale"
                  />
                  <div className="flex flex-col">
                    <span className="text-cream text-sm font-body font-medium leading-5">{name}</span>
                    <span className="text-gold/50 text-xs tracking-[1px] leading-5 font-body">{role}</span>
                  </div>
                </div>
              </GlowCard>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
