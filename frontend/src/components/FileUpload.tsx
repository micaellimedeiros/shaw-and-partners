import React, { ChangeEvent, useState } from "react";

import api from "../services/api";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        setError(null);
        setLoading(true);

        await api.post("/api/files", file);

        onFileUpload(file);
      } catch (error: any) {
        setError(`Error uploading file. "${error.message}"`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <label htmlFor="fileUpload">Select CSV File:</label>
      <input
        type="file"
        id="fileUpload"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />

      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
