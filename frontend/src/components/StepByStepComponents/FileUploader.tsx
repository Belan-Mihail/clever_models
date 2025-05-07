import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const FileUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  //Clicks on the hidden <input type="file">.
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResponse(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setResponse(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse("Fail upload");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`max-w-max max-h-max p-8 border-2 ${
          isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } rounded-2xl flex flex-col gap-4 transition-colors`}
      >
        {/* hidden input */}
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        {/* custom input */}
        <button
          onClick={handleFileClick}
          className="bg-rose-500 hover:bg-rose-600 rounded text-xs p-2 w-30 text-white"
        >
          {file ? file.name : "drop your file"}
        </button>

        {/* Плавное появление кнопки Start Processing с эффектом масштабирования */}
        {file && (
          <motion.button
            onClick={handleUpload}
            className="text-xs p-2 bg-amber-500 text-white hover:bg-white hover:text-amber-500 hover:border-1 hover:border-amber-500 rounded"
            initial={{ opacity: 0, scale: 0.5 }} // Начинаем с маленького размера и невидимой кнопки
            animate={{ opacity: 1, scale: 1 }} // Конечный размер и полная видимость
            transition={{
              duration: 0.5, // Длительность анимации
              ease: "easeOut", // Плавное завершение анимации
            }}
          >
            {loading ? "Loading..." : "Start Processing"}
          </motion.button>
        )}

        {response && (
          <pre className="mt-4 p-2 bg-gray-800 rounded whitespace-pre-wrap text-sm text-white">
            {response}
          </pre>
        )}
      </div>
    </>
  );
};

export default FileUploader;
