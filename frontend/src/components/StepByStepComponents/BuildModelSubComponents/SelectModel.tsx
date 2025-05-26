import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  setCurrentStep,
  setSelectedModel,
  setTestSize,
} from "../../../store/slices/modelSlice";

const modelOptions = [
  "Linear Regression",
  "Random Forest",
  "Decision Tree",
  "KNN",
];

const modelSize = [0.1, 0.2, 0.3, 0.4];

const SelectModel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { yFeatures, xFeatures, selectedModel, testSize } = useAppSelector(
    (state) => state.model
  );

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
                  className={`px-4 py-2 text-xs rounded-lg border ${
                    selectedModel === model
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => dispatch(setSelectedModel(model))}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full overflow-x-auto p-2">
            <p className="text-center m-1 text-sm">Test data size</p>
            <div className="flex flex-wrap gap-4 justify-center">
              {modelSize.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 text-xs rounded-lg border ${
                    testSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => dispatch(setTestSize(size))}
                >
                  {size * 100}%
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center flex gap-2 items-center justify-center">
            <motion.div
              key="btn-x"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => dispatch(setCurrentStep(0))}
                className="p-2 bg-rose-500 hover:bg-rose-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                X features
              </button>
            </motion.div>

            <motion.div
              key="btn-y"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => dispatch(setCurrentStep(1))}
                className="p-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                Y feature
              </button>
            </motion.div>

            <motion.div
              key="btn-next"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => dispatch(setCurrentStep(3))}
                className="p-2 bg-green-500 hover:bg-green-600 rounded-xl text-white text-[10px] min-w-[80px]"
              >
                Next Step
              </button>
            </motion.div>
          </div>

          <motion.div
            key="summary"
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
              <p>Model: {selectedModel || "not selected"}</p>
              <p>Test size: {testSize * 100}%</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectModel;
