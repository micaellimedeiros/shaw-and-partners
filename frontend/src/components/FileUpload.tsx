import { ChangeEvent } from "react";

import { useAppContext } from "../context/AppContext";

const FileUpload = () => {
  const { loading, uploadFile } = useAppContext();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      await uploadFile(file);
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
    </div>
  );
};

export default FileUpload;
