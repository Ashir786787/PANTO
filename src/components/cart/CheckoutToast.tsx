"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CheckoutToast() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const show = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setVisible(true);
    timerRef.current = window.setTimeout(() => setVisible(false), 3000);
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return { show, toast: <Toast visible={visible} /> };
}

function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="pointer-events-none fixed left-1/2 top-28 z-[100] -translate-x-1/2 rounded-card bg-navy-button px-8 py-4 shadow-card-hover md:top-32"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <span className="text-[15px] font-semibold text-white">
              Coming Soon
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
