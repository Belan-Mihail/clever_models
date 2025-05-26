import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setXFeatures, setCurrentStep } from "../../../store/slices/modelSlice";

const SelectXFeatures: React.FC = () => {
  const dispatch = useAppDispatch();

  const xFeatures = useAppSelector((state) => state.model.xFeatures);
  const firstStepGeneralAnalyse = useAppSelector(
    (state) => state.model.firstStepGeneralAnalyse
  );

  const toggleXFeatures = (feature: string) => {
    const newFeatures = xFeatures.includes(feature)
      ? xFeatures.filter((f) => f !== feature)
      : [...xFeatures, feature];
    dispatch(setXFeatures(newFeatures));
  };

  if (
    !firstStepGeneralAnalyse ||
    !Array.isArray(firstStepGeneralAnalyse.columns) ||
    !Array.isArray(firstStepGeneralAnalyse.columns_type)
  ) {
    return (
      <div className="text-center text-sm text-gray-500 p-4">Loading data...</div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-center">Select X features</h2>

      <AnimatePresence mode="wait">
        {firstStepGeneralAnalyse.columns.length > 0 && (
          <motion.div
            key="feature-table"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-[90%] mx-auto overflow-x-auto"
          >
            <div className="w-full overflow-x-auto p-2">
              <div className="min-w-full inline-flex gap-4">
                {firstStepGeneralAnalyse.columns.map((col: string, index: number) => (
                  <div
                    key={col}
                    className="flex flex-col items-center justify-start min-w-[140px] max-w-[200px] border border-gray-200 rounded-md p-2 bg-gray-50"
                  >
                    <div className="text-xs text-gray-500 mb-1">#{index + 1}</div>
                    <div className="text-sm font-semibold text-center break-words">
                      {col}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {firstStepGeneralAnalyse.columns_type[index]}
                    </div>
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        onChange={() => toggleXFeatures(col)}
                        checked={xFeatures.includes(col)}
                        className="form-checkbox h-4 w-4 text-amber-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => dispatch(setCurrentStep(1))}
                className="p-2 bg-green-500 hover:bg-green-600 rounded-xl text-white text-[10px]"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectXFeatures;
