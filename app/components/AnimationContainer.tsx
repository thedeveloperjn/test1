import React, { ReactNode } from "react";
import { Variants, motion } from "framer-motion";
type Props = { children: ReactNode; id?: string };
const cardVariants: Variants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      // type: 'spring',
      // bounce: 0.4,
      duration: 0.5,
    },
  },
};
function AnimationContainer({ children, id }: Props) {
  return (
    <motion.div
      id={id}
      // initial="offscreen"
      // whileInView="onscreen"
      // viewport={{ once: true, amount: 0.4 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div variants={cardVariants}> {children}</motion.div>
    </motion.div>
  );
}

export default AnimationContainer;
