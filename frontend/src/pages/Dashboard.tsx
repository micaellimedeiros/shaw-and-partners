import React, { useState } from "react";

import FileUpload from "../components/FileUpload";
import SearchBar from "../components/SearchBar";
import CardDisplay from "../components/CardDisplay";

interface DashboardProps {}

interface Card {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

interface ParsedCsv {
  headers: string[];
  data: Card[];
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = async (file: File) => {
    try {
      const content = await readUploadedFile(file);
      const parsedCards = parseCsvContent(content);

      setCards(parsedCards.data);

      console.log("File uploaded and processed successfully:", file.name);
    } catch (error: any) {
      console.error("Error uploading or processing file:", error.message);
      // Handle error, show user-friendly message
    }
  };

  const readUploadedFile = async (
    file: File,
    timeout = 5000
  ): Promise<string> => {
    try {
      return await readFileAsText(file, timeout);
    } catch (error: any) {
      throw new Error(
        `Failed to read the file "${file.name}". ${error.message}`
      );
    }
  };

  const readFileAsText = (file: File, timeout: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      const cleanup = () => {
        reader.onload = null;
        reader.onerror = null;
      };

      reader.onload = () => {
        cleanup();
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        cleanup();
        reject(new Error("Error reading the file."));
      };

      const timeoutId = setTimeout(() => {
        cleanup();
        reject(
          new Error(`File reading timed out after ${timeout} milliseconds.`)
        );
      }, timeout);

      reader.readAsText(file);

      reader.onloadend = () => clearTimeout(timeoutId);
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCards = cards.filter((card) =>
    Object.values(card).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const parseCsvContent = (content: string): ParsedCsv => {
    const lines = content.split("\n");

    if (lines.length < 2) {
      throw new Error("Invalid CSV content: Insufficient rows");
    }

    const headers = lines[0].split(",");
    const data = lines.slice(1).map((line, lineIndex) => {
      const values = line.split(",");

      if (values.length !== headers.length) {
        throw new Error(
          `Invalid CSV content: Row ${lineIndex + 2} has mismatched columns`
        );
      }

      return headers.reduce((acc, header, index) => {
        acc[header as keyof Card] = values[index];
        return acc;
      }, {} as Card);
    });

    return { headers, data };
  };

  return (
    <div>
      <header>
        <h1>CSV Dashboard</h1>
      </header>
      <main>
        <FileUpload onFileUpload={handleFileUpload} />
        <SearchBar onSearch={handleSearch} />
        <CardDisplay cards={filteredCards} />
      </main>
    </div>
  );
};

export default Dashboard;
