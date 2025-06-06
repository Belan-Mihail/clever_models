import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setActiveComponent,
  setError,
  setFirstStepGeneralAnalyse,
  setLoading,
  setResponse,
  setSessionId,
} from "../../store/slices/modelSlice";

const FileUploader: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, response } = useAppSelector((state) => state.model);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    dispatch(setResponse(null));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFile(droppedFile);
    dispatch(setResponse(null));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleUpload = async () => {
    if (!file) return;

    dispatch(setLoading(true));
    dispatch(setResponse(null));
    dispatch(setError(null));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status === "ok") {
        dispatch(setFirstStepGeneralAnalyse(data.result));
        dispatch(setActiveComponent("BuildModel"));
        dispatch(setSessionId(data.result.session_id));
      } else {
        dispatch(setResponse("Fail upload"));
        dispatch(setError("Unexpected file type"));
      }
    } catch (err: any) {
      dispatch(setResponse("Fail upload"));
      dispatch(setError(err.toString()));
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const clearInput = () => {
    setFile(null);
    dispatch(setError(null));
    dispatch(setResponse(null));
    dispatch(setLoading(false));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`max-w-max max-h-max relative ml-4 p-8 border-2 ${
        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } rounded-2xl flex flex-col gap-4 transition-colors`}
    >
      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      <AnimatePresence mode="wait">
        {file && !response && (
          <motion.button
            className="bg-rose-500 hover:bg-rose-600 rounded-2xl text-xs w-4 h-4 text-white absolute top-2 right-2"
            onClick={clearInput}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            X
          </motion.button>
        )}

        {response ? (
          <motion.div
            key="error-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <motion.button
              onClick={clearInput}
              className="bg-rose-500 hover:bg-rose-600 rounded text-xs p-2 w-30 text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="upload-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <button
              onClick={handleFileClick}
              className="bg-rose-500 hover:bg-rose-600 rounded text-xs p-2 w-30 text-white"
            >
              {file ? file.name : "drop your file"}
            </button>

            {file && (
              <motion.button
                onClick={handleUpload}
                className="text-xs p-2 bg-amber-500 text-white hover:bg-white hover:text-amber-500 hover:border hover:border-amber-500 rounded"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              >
                {loading ? "Loading..." : "Start Processing"}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;
