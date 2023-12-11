import { readFile, utils, WorkBook } from "xlsx";

let loadedCsvData: any[] = [];

export const processCsvFile = (file: Express.Multer.File): void => {
  try {
    const workbook: WorkBook = readFile(file.buffer.toString());
    const sheetName: string = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    loadedCsvData = utils.sheet_to_json(sheet, { header: 1 });
  } catch (error) {
    console.error("Error processing CSV file:", error);
    throw error;
  }
};

export const searchInCsv = (query: string): any[] => {
  try {
    const lowercaseQuery = query.toLowerCase();

    const filteredData = loadedCsvData.filter((row) =>
      row.some((cell: any) =>
        cell.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
    return filteredData;
  } catch (error) {
    console.error("Error searching in CSV data:", error);
    throw error;
  }
};
