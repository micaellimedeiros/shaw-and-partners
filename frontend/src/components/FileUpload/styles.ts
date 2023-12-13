import styled from "styled-components";

export const FileUploadContainer = styled.div`
  margin-bottom: 20px;

  input[type="file"] {
    color: transparent;
    background-color: #fff;
  }
`;

export const FileInputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

export const FileInput = styled.input`
  font-size: 14px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;

  width: 80%;

  @media (max-width: 794px) {
    width: 60%;
  }
`;

export const UploadButton = styled.button`
  font-size: 14px;
  padding: 8px 12px;
  background-color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 0 4px 4px 0;
  color: #fff;

  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    border: 1px solid #ccc;
    cursor: not-allowed;
  }
`;
