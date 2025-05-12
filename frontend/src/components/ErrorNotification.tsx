/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorNotificationProps {
  error: null | string | { message?: string };
  setError: (data: any) => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ error, setError }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
  }, [error]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setError(null), 400); 
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="error-alert"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto my-4 max-w-md w-full rounded-xl border border-rose-400 bg-rose-100 text-rose-800 p-4 text-sm shadow-lg relative"
        >
          <div className="flex items-start gap-2 pr-6">
            <svg
              className="w-5 h-5 text-rose-600 mt-[2px]"
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
            <span>
              <strong>Error:</strong>{" "}
              {typeof error === "string"
                ? error
                : error?.message || "Fail upload. Unexpected file type"}
            </span>
          </div>

          
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-green-700"
            aria-label="Close"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorNotification;
