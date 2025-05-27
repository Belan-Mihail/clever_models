import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  setCurrentStep,
  resetModelState,
  saveTrainedModel,
} from "../../../store/slices/modelSlice";
import type { RootState } from "../../../store";

const ModelReview: React.FC = () => {
  const dispatch = useDispatch();
  const {
    selectedModel,
    xFeatures,
    yFeatures,
    testSize,
    metrics,
    sessionId,
  } = useSelector((state: RootState) => state.model);

  const handleSave = () => {
    if (!sessionId || !metrics) return;

    dispatch(
      saveTrainedModel({
        sessionId,
        model: selectedModel,
        xFeatures,
        yFeatures,
        testSize,
        metrics,
        savedAt: new Date().toISOString(),
      })
    );
    dispatch(setCurrentStep(0));
  };

  const handleDelete = () => {
    dispatch(resetModelState());
    dispatch(setCurrentStep(0));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Review Your Trained Model
      </h2>

      <div className="mb-4 text-sm text-gray-800 space-y-1">
        <p><strong>Model:</strong> {selectedModel}</p>
        <p><strong>X Features:</strong> {xFeatures.join(", ")}</p>
        <p><strong>Y Feature:</strong> {yFeatures}</p>
        <p><strong>Test Size:</strong> {testSize * 100}%</p>
        <p><strong>Session ID:</strong> {sessionId}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm font-mono text-gray-700">
        {metrics ? (
          <>
            <p><strong>MSE:</strong> {metrics.mse}</p>
            <p><strong>MAE:</strong> {metrics.mae}</p>
          </>
        ) : (
          "No evaluation results available."
        )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm"
        >
          Back to Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
        >
          Delete Model
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
          disabled={!metrics}
        >
          Save Model
        </button>
      </div>
    </motion.div>
  );
};

export default ModelReview;
