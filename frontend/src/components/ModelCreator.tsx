import React, { useState } from "react";

const ModelCreator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResponse(null);
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
    <div className="w-[85%] h-full p-4 bg-white">
      <div className="max-w-max max-h-max p-4 border-2 border-amber-500 rounded-2xl">
        <input
          type="file"
          // accept='.xlsx'
          onChange={handleFileChange}
          className="block bg-rose-500 rounded text-sm p-1"
        />

        {file && (
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-amber-500 text-white hover:bg-white hover:text-amber-500 rounded"
          >
            {loading ? "Loading..." : "Start Processing"}
          </button>
        )}

        {response && (
          <pre className="mt-4 p-2 bg-gray-800 rounded whitespace-pre-wrap text-sm">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
};

export default ModelCreator;
