import React, { useRef, useState } from "react";

const ModelCreator = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);


  const handleFileClick = () => {
    fileInputRef.current?.click();
  }

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
      <div className="max-w-max max-h-max p-8 border-2 border-gray-300  rounded-2xl flex flex-col gap-4">
        {/* hidden input */}
        <input
          type="file"
          // accept='.xlsx'
          onChange={handleFileChange}
          className="bg-rose-500 rounded text-sm p-1 hidden"
          ref={fileInputRef}
        />

        {/* custom input */}
        <button
          onClick={handleFileClick}
          // accept='.xlsx'
          
          className="bg-rose-500 hover:bg-rose-600 rounded text-xs p-2 w-30 text-white"
          
        >
            {file ? `${file.name}` : "Add file"}
        </button>


        {file && (
          <button
            onClick={handleUpload}
            className="text-xs p-2 bg-amber-500 text-white hover:bg-white hover:text-amber-500 hover:border-1 hover:border-amber-500 rounded"
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
