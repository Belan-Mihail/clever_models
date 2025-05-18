import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectModelProps {
  yFeatures: string;
  xFeatures: string[];
  setCurrentStep: (current: number) => void;
}

const modelOptions = [
  "Linear Regression",
  "Random Forest",
  "Decision Tree",
  "KNN",
];

const modelSize = [
  0.1,
  0.2,
  0.3,
  0.4,
];

const SelectModel: React.FC<SelectModelProps> = ({
  setCurrentStep,
  yFeatures,
  xFeatures,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-center">
        Select Model Parameters
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key="feature-table"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-[90%] mx-auto overflow-x-auto"
        >
          <div className="w-full overflow-x-auto p-2">
            <p className="text-center m-1 text-sm">Select model type</p>
            <div className="flex flex-wrap gap-4 justify-center">
                
              {modelOptions.map((model) => (
                <button
                  key={model}
                  className={`px-4 py-2 text-xs rounded-lg border`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full overflow-x-auto p-2">
            <p className="text-center m-1 text-sm">Test data size</p>
            <div className="flex flex-wrap gap-4 justify-center">
                {modelSize.map((model) => (
                <button
                  key={model}
                  className={`px-4 py-2 text-xs rounded-lg border`}
                >
                  {model * 100}%
                </button>
              ))}
             
            </div>
          </div>

          <div className="mt-4 text-center flex gap-2 items-center justify-center">
            <motion.div
              key="feature-table"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => setCurrentStep(0)}
                className="p-2 bg-rose-500  hover:bg-rose-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                X features
              </button>
            </motion.div>

            <motion.div
              key="feature-table"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => setCurrentStep(1)}
                className="p-2 bg-orange-500  hover:bg-orange-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                Y features Step
              </button>
            </motion.div>

            <motion.div
              key="feature-table"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => setCurrentStep(3)}
                className="p-2 bg-green-500  hover:bg-green-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                Next Step
              </button>
            </motion.div>
          </div>

          <motion.div
            key="feature-table"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="mt-2 w-max text-black text-[10px]">
              <p>
                X features:{" "}
                {xFeatures.map((xFeature, index) => (
                  <span key={index} className="mr-2">
                    {xFeature}
                  </span>
                ))}
              </p>
              <p>Target Value: {yFeatures}</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectModel;
