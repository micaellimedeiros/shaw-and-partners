import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAppContext } from "../../src/context/AppContext";
import SearchBar from "../../src/components/SearchBar";

jest.mock("../../src/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("SearchBar Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      loading: false,
      search: jest.fn(),
      error: null,
    });
  });

  it("renders SearchBar component", () => {
    render(<SearchBar />);

    const filterLabel = screen.getByLabelText(/Filter/i);
    const searchButton = screen.getByText(/Search/i);

    expect(filterLabel).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("calls search function when the search button is clicked", async () => {
    const mockSearch = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      loading: false,
      search: mockSearch,
      error: null,
    });

    render(<SearchBar />);

    const filterInput = screen.getByLabelText(/Filter/i);
    const searchButton = screen.getByText(/Search/i);

    fireEvent.change(filterInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith("test");
    });
  });

  it('displays "Searching..." message when loading', () => {
    (useAppContext as jest.Mock).mockReturnValue({
      loading: true,
      search: jest.fn(),
      error: null,
    });

    render(<SearchBar />);

    const searchingMessage = screen.getByText(/Searching.../i);
    expect(searchingMessage).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      loading: false,
      search: jest.fn(),
      error: "Error message",
    });

    render(<SearchBar />);

    const errorMessage = screen.getByText(/Error message/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
