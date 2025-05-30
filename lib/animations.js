// Animation variants for Framer Motion components
export const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const backgroundVariants = {
  animate: {
    background: [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const cardHoverVariants = {
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    background: "rgba(255, 255, 255, 0.98)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const inputHoverVariants = {
  hover: {
    borderColor: "#667eea",
    boxShadow: "0 0 20px rgba(102, 126, 234, 0.3)",
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  focus: {
    borderColor: "#667eea",
    boxShadow: "0 0 0 0.2rem rgba(102, 126, 234, 0.25)",
    scale: 1.02,
  },
};

export const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)",
    background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)",
  },
};

export const labelHoverVariants = {
  hover: {
    color: "#667eea",
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export const modalItemHoverVariants = {
  hover: {
    scale: 1.02,
    x: 5,
    boxShadow: "0 8px 30px rgba(102, 126, 234, 0.15)",
    background: "rgba(255, 255, 255, 0.9)",
    borderColor: "#667eea",
    transition: { duration: 0.3 },
  },
};

export const badgeHoverVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    transition: { duration: 0.3 },
  },
};

export const modalVariants = {
  initial: { opacity: 0, scale: 0.1, rotate: -360, y: 50 },
  animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  exit: { opacity: 0, scale: 0.1, rotate: 360, y: 50 },
  transition: {
    duration: 0.6,
    ease: "easeOut",
    type: "spring",
    damping: 15,
    stiffness: 100,
  },
};

export const floatingElementVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 180, 360],
  },
  whileHover: {
    scale: 1.2,
    background: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
