import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useAppContext } from "../../src/context/AppContext";
import CardDisplay from "../../src/components/CardDisplay";

jest.mock("../../src/context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("CardDisplay Component", () => {
  it("renders CardDisplay component with matching results", () => {
    const mockCards = [
      {
        name: "John Doe",
        city: "New York",
        country: "USA",
        favorite_sport: "Basketball",
      },
      {
        name: "Jane Smith",
        city: "London",
        country: "UK",
        favorite_sport: "Football",
      },
    ];

    (useAppContext as jest.Mock).mockReturnValue({
      cards: mockCards,
    });

    render(<CardDisplay />);

    const johnDoeElement = screen.getByText(/Name: John Doe/i);
    const janeSmithElement = screen.getByText(/Name: Jane Smith/i);

    expect(johnDoeElement).toBeInTheDocument();
    expect(janeSmithElement).toBeInTheDocument();
  });

  it("renders CardDisplay component with no matching results", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      cards: [],
    });

    render(<CardDisplay />);

    const noResultsElement = screen.getByText(/No matching results found/i);
    expect(noResultsElement).toBeInTheDocument();
  });
});
