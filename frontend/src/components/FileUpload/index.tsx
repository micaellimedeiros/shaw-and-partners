import React, { ChangeEvent, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FileInputLabel, UploadButton } from "./styles";

import { FileUploadContainer, FileInput } from "./styles";

const FileUpload = () => {
  const { loading, uploadFile } = useAppContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);

      setSelectedFile(null);
    }
  };

  return (
    <FileUploadContainer>
      <FileInputLabel htmlFor="fileUpload">File:</FileInputLabel>
      <FileInput
        type="file"
        id="fileUpload"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />

      <UploadButton onClick={handleUpload} disabled={loading || !selectedFile}>
        Upload
      </UploadButton>
    </FileUploadContainer>
  );
};

export default FileUpload;
