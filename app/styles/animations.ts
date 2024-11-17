import { Variants } from "framer-motion"; // Import the Variants type

// Navbar variants
export const navVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      stiffness: 200,
      damping: 40,
    },
  },
  show: {
    opacity: 1,
    y: 10,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 1,
    },
  },
};

// Slide-in animation with direction and custom timing
export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: string,
  delay: number,
  duration: number
): Variants => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

// Stagger container for staggering children animations
export const staggerContainer = (
  staggerChildren: number,
  delayChildren: number
): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Text animation with delay
export const textVariant = (delay: number): Variants => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.6,
      delay,
    },
  },
});

// Text container with staggered children animation
export const textContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

// Second text variant
export const textVariant2: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};

// Define fadeIn animation function (in your animations file)
export const fadeIn = (direction = 'up', type = 'spring', delay = 0, duration = 0.75) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};


// Planet animation with direction
export const planetVariants = (direction: "left" | "right"): Variants => ({
  hidden: {
    x: direction === "left" ? "-100%" : "100%",
    rotate: 120,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      duration: 1.8,
      delay: 0.5,
    },
  },
});

// Zoom-in effect with delay and duration
export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

// Footer animation
export const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.5,
    },
  },
};
