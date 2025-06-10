import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  setCurrentStep,
  resetModelState,
} from "../../../store/slices/modelSlice";
import type { RootState } from "../../../store/store";
import { toast } from "sonner";
import { fetchModels } from "../../../store/slices/TreeModelsSlice";
import { useAppDispatch } from "../../../store/hooks";
import Modal from "../../Modal";

const ModelReview: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedModel,
    xFeatures,
    yFeatures,
    testSize,
    metrics,
    modelId,
    sessionId,
  } = useSelector((state: RootState) => state.model);

  const [showModal, setShowModal] = React.useState(false);

  const [modalMode, setModalMode] = React.useState<"delete" | "edit" | null>(
    null
  );
  const [modalText, setModalText] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");

  const openDeleteModal = () => {
    setModalMode("delete");
    setModalText(
      "Are you sure you want to delete this model? This action cannot be undone."
    );
    setShowModal(true);
  };

  const openEditModal = () => {
    setModalMode("edit");
    setModalText("Are you sure you want to go back and edit this model?");
    setShowModal(true);
  };

  const handleBack = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/edit_model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: modelId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Server error: ${response.status} - ${errorText}`);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      dispatch(setCurrentStep(2));
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.error("Delete model failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!modelId) {
      toast.error("Session ID not found. Cannot delete model.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/delete_model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: modelId, session_id: sessionId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Server error: ${response.status} - ${errorText}`);
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
    if (!modelId || !metrics || !nameInput.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/save_model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_id: modelId,
          name: modelId + "_" + nameInput.trim(),
          session_id: sessionId,
        }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        toast.success(`Model "${nameInput}" was saved successfully`);
        dispatch(resetModelState());
        setShowModal(false);
        dispatch(fetchModels());
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 relative"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Review Your Trained Model
        </h2>

        <div className="mb-4 text-sm text-gray-800 space-y-1">
          <p>
            <strong>Model:</strong> {selectedModel}
          </p>
          <p>
            <strong>X Features:</strong> {xFeatures.join(", ")}
          </p>
          <p>
            <strong>Y Feature:</strong> {yFeatures}
          </p>
          <p>
            <strong>Test Size:</strong> {testSize * 100}%
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-4 text-sm font-mono text-gray-700">
          {metrics ? (
            <>
              <p>
                <strong>MSE:</strong> {metrics.mse.toFixed(2)}
              </p>
              <p>
                <strong>MAE:</strong> {metrics.mae.toFixed(2)}
              </p>
              <p>
                <strong>R²:</strong> {metrics.r2.toFixed(2)}
              </p>
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
              onClick={openEditModal}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm"
            >
              Back to Edit
            </button>
            <button
              onClick={openDeleteModal}
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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMode === "delete" ? "Delete Model?" : "Edit Model?"}
        showActions
        confirmText={modalMode === "delete" ? "Delete" : "Edit"}
        cancelText="Cancel"
        isDanger={modalMode === "delete"}
        onConfirm={() => {
          setShowModal(false);
          if (modalMode === "delete") handleDelete();
          else if (modalMode === "edit") handleBack();
        }}
      >
        {modalText}
      </Modal>
    </>
  );
};

export default ModelReview;
