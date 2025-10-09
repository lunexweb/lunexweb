import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  distance = 50
}: AnimatedSectionProps) => {
  const directionVariants = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionVariants[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedText = ({ 
  children, 
  className = "",
  delay = 0,
  stagger = 0.1
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
