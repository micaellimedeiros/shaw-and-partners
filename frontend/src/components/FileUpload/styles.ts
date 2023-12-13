import styled from "styled-components";

export const FileUploadContainer = styled.div`
  margin-bottom: 20px;
`;

export const FileInputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

export const FileInput = styled.input`
  font-size: 14px;

  padding: 8px;
  margin-bottom: 8px;

  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 600px) {
    width: auto;
  }
`;
