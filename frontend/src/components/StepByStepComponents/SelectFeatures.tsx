import React from "react";
import { motion, AnimatePresence } from "framer-motion";


interface FirstStepAnalyse {
  columns: string[];
  columns_type: string[];
  rows_count: number;
}

interface SelectFeaturesProps {
  firstStepGeneralAnalyse: FirstStepAnalyse;
  setError: (data: any) => void;
  setActiveComponent: (componentName: string) => void;
  handleXFeatures: (features: string[]) => void;
  handleYFeatures: (features: string[]) => void;
  xFeatures: string[];
  yFeatures: string[];
}

const SelectFeatures: React.FC<SelectFeaturesProps> = ({
  firstStepGeneralAnalyse,
  setError,
  setActiveComponent,
  handleXFeatures,
  handleYFeatures,
  xFeatures,
  yFeatures,
}) => {
  const toggleXFeatures = (feature: string) => {
    const newFeatures = xFeatures.includes(feature)
      ? xFeatures.filter((f) => f !== feature)
      : [...xFeatures, feature];
    handleXFeatures(newFeatures);
  };

  if (
  !firstStepGeneralAnalyse ||
  !Array.isArray(firstStepGeneralAnalyse.columns) ||
  !Array.isArray(firstStepGeneralAnalyse.columns_type)
) {
  return (
    <div className="text-center text-sm text-gray-500 p-4">
      Loading data...
    </div>
  );
}

  return (
  <div>
    <h2 className="text-lg font-semibold mb-2 text-center">
      Select X features
    </h2>

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
                      checked={Array.isArray(xFeatures) && xFeatures.includes(col)}
                      onChange={() => toggleXFeatures(col)}
                      className="form-checkbox h-4 w-4 text-amber-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

};

export default SelectFeatures;
