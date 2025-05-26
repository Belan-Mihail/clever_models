import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { trainModelAsync, setCurrentStep } from "../../../store/slices/modelSlice";

const FinalCheck: React.FC = () => {
  const dispatch = useDispatch();

  const {
    xFeatures,
    yFeatures,
    selectedModel,
    testSize,
    loading,
    onTrainModelResult,
    error,
    sessionId,
  } = useSelector((state: any) => state.model);

  const handleTrain = () => {
    dispatch(
      trainModelAsync({
        xFeatures,
        yFeature: yFeatures,
        selectedModel,
        testSize,
        sessionId,
      })
    );
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Final Check</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key="final-check"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-gray-50 rounded-md p-4 shadow-md"
        >
          <div className="mb-4 text-sm text-gray-800">
            <p>
              <strong>X Features:</strong>{" "}
              {xFeatures.length > 0
                ? xFeatures.join(", ")
                : "No features selected"}
            </p>
            <p>
              <strong>Target (Y) Feature:</strong> {yFeatures || "Not selected"}
            </p>
            <p>
              <strong>Selected Model:</strong> {selectedModel || "Not selected"}
            </p>
            <p>
              <strong>Test Size:</strong> {testSize * 100}%
            </p>
          </div>

          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}

          {onTrainModelResult && (
            <div className="mb-4 text-green-700 text-center whitespace-pre-wrap">
              {typeof onTrainModelResult === "string"
                ? onTrainModelResult
                : JSON.stringify(onTrainModelResult, null, 2)}
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={() => dispatch(setCurrentStep(2))} 
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm"
            >
              Back
            </button>

            <button
              onClick={handleTrain}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white text-sm ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Training..." : "Train Model"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FinalCheck;
