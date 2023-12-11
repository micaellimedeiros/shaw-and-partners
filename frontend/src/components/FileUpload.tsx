import React, { ChangeEvent } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileUpload(file);
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
      />
    </div>
  );
};

export default FileUpload;
