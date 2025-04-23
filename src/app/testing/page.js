"use client";

import { useState } from "react";

export default function Download3DModel() {
  const [loading, setLoading] = useState(false);

  const downloadModel = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/convertImageTo3D", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: "https://replicate.delivery/pbxt/JsjxC7Lc2J1G4fE4nP84HflbG4gdlfQ1TbVpRjkz90Wdz7EQ/sample2.png",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch model");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "model.glb";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={downloadModel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download 3D Model"}
      </button>
    </div>
  );
}
