import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorNotificationProps {
  error: null | string | { message?: string };
  setError: (data: any) => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error, setError }) => {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    setVisible(true);
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVisible(false);
          setTimeout(() => setError(null), 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [error]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setError(null), 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="error-alert"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute right-5 top-4 z-50 flex min-w-[400px] justify-around space-x-2 rounded-lg border border-rose-300 bg-rose-100 px-3 py-2 text-xs text-rose-700 shadow-sm"
        >
          <svg
            className="w-4 h-4 text-rose-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <strong>Error:</strong>{" "}
            {typeof error === "object" && "message" in error
              ? error.message
              : "Fail upload. Unexpected file type"}
          </span>

          <span className="text-rose-500 ml-1">Auto close<span className="text-rose-700 font-semibold px-2">{countdown}</span></span>

          <button
            onClick={handleClose}
            className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white text-[10px] leading-none"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorNotification;
