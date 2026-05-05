// utils/motionVariants.ts

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delays each child animation by 0.2s
      delayChildren: 0.1,
    },
  },
};

export const slideUpVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" }
  },
};