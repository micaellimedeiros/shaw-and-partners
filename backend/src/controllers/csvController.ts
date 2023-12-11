import { Request, Response } from "express";
import { searchInCsv, processCsvFile } from "../utils/csvUtils";

export const uploadFile = (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    processCsvFile(file);

    res.status(200).json({ message: "The file was uploaded successfully." });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const searchUsers = (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query) {
      return res
        .status(400)
        .json({ message: 'Query parameter "q" is required.' });
    }

    const searchData = searchInCsv(query);

    res.status(200).json({ data: searchData });
  } catch (error) {
    console.error("Error handling user search:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
