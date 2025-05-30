import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  setCurrentStep,
  resetModelState,
} from "../../../store/slices/modelSlice";
import type { RootState } from "../../../store/store";
import { toast } from "sonner";

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

  const [showModal, setShowModal] = React.useState(false);
  const [nameInput, setNameInput] = React.useState("");

  const handleBack = () => {
    dispatch(setCurrentStep(2));
  };

  const handleDelete = async () => {
  if (!sessionId) {
    
  toast.error("Session ID not found. Cannot delete model.");
  return
  } 

  try {
    const response = await fetch("http://127.0.0.1:5000/api/delete_model", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: sessionId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.status === "ok") {
      toast.success("Model was deleted successfully");
      dispatch(resetModelState());
    } else {
      toast.error(`Error: ${data.message}`);
    }
  } catch (error) {
    toast.error(`Error: ${error}`);
    console.error("Delete model failed:", error);
  }
};


  const confirmSaveModel = async () => {
    if (!sessionId || !metrics || !nameInput.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/save_model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_id: sessionId,
          name: sessionId + "_" + nameInput.trim(),
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        toast.success(`Model "${nameInput}" was saved successfully`);
        dispatch(resetModelState());
        setShowModal(false);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 relative"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Review Your Trained Model
      </h2>

      <div className="mb-4 text-sm text-gray-800 space-y-1">
        <p><strong>Model:</strong> {selectedModel}</p>
        <p><strong>X Features:</strong> {xFeatures.join(", ")}</p>
        <p><strong>Y Feature:</strong> {yFeatures}</p>
        <p><strong>Test Size:</strong> {testSize * 100}%</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm font-mono text-gray-700">
        {metrics ? (
          <>
            <p><strong>MSE:</strong> {metrics.mse.toFixed(2)}</p>
            <p><strong>MAE:</strong> {metrics.mae.toFixed(2)}</p>
            <p><strong>R²:</strong> {metrics.r2.toFixed(2)}</p>
          </>
        ) : (
          "No evaluation results available."
        )}
      </div>

      {showModal ? (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    className="flex flex-col sm:flex-row items-center gap-2 mt-4"
  >
    <input
      type="text"
      className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
      value={nameInput}
      onChange={(e) => setNameInput(e.target.value)}
      placeholder="Enter model name"
    />
    <div className="flex gap-2">
      <button
        onClick={() => setShowModal(false)}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-sm"
      >
        Cancel
      </button>
      <button
        onClick={confirmSaveModel}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
      >
        Save
      </button>
    </div>
  </motion.div>
) : (
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
      onClick={() => setShowModal(true)}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
      disabled={!metrics}
    >
      Save Model
    </button>
  </div>
)}

    </motion.div>
  );
};

export default ModelReview;
