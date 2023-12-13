import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAppContext } from "../../src/context/AppContext";
import FileUpload from "../../src/components/FileUpload";

jest.mock("../../src/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("FileUpload Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      loading: false,
      uploadFile: jest.fn(),
    });
  });

  it("renders FileUpload component", () => {
    render(<FileUpload />);

    const fileUploadLabel = screen.getByLabelText(/Select CSV File/i);
    const fileInput = screen.getByLabelText(/Select CSV File/i);

    expect(fileUploadLabel).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
  });

  it("calls uploadFile function when a file is selected", async () => {
    const mockUploadFile = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      loading: false,
      uploadFile: mockUploadFile,
    });

    render(<FileUpload />);

    const fileInput = screen.getByLabelText(/Select CSV File/i);

    const file = new File(["file content"], "test.csv", { type: "text/csv" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockUploadFile).toHaveBeenCalledWith(file);
  });

  it('displays "Uploading..." message when loading', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      loading: true,
      uploadFile: jest.fn(),
    });

    render(<FileUpload />);

    const uploadingMessage = screen.getByText(/Uploading.../i);
    expect(uploadingMessage).toBeInTheDocument();
  });
});
