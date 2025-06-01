import React, { useEffect, useState } from "react";

const ModelTree: React.FC = () => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/list_models");
        const data = await res.json();
        if (data.status === "ok") {
          setModels(data.models);
        } else {
          console.error("Failed to fetch models:", data.message);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="w-[15%] h-full bg-gray-100 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Saved Models</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : models.length === 0 ? (
        <p className="text-sm text-gray-500">No models found</p>
      ) : (
        <ul className="text-sm space-y-1">
          {models.map((model) => (
            <li key={model} className="text-gray-800 hover:underline cursor-pointer">
              {model}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModelTree;
