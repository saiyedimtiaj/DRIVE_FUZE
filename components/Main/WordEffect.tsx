"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function WordEffect() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["flexible", "convenient", "affordable", "simple", "stress-free"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="relative h-10 md:h-12 overflow-hidden">
      {titles.map((title, index) => (
        <motion.span
          key={index}
          className="absolute"
          initial={{ opacity: 0, y: "-100%" }}
          animate={
            titleNumber === index
              ? { y: 0, opacity: 1 }
              : { y: titleNumber > index ? -150 : 150, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 50 }}
        >
          {title}
        </motion.span>
      ))}
    </div>
  );
}
