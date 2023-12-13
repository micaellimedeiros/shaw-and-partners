import { ChangeEvent } from "react";

import { useAppContext } from "../../context/AppContext";
import { FileInputLabel } from "./styles";

import { FileUploadContainer, FileInput } from "./styles";

const FileUpload = () => {
  const { loading, uploadFile } = useAppContext();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await uploadFile(file);
    }
  };

  return (
    <FileUploadContainer>
      <FileInputLabel htmlFor="fileUpload">Select CSV File:</FileInputLabel>
      <FileInput
        type="file"
        id="fileUpload"
        accept=".csv"
        title="Search"
        onChange={handleFileChange}
        disabled={loading}
      />
    </FileUploadContainer>
  );
};

export default FileUpload;
