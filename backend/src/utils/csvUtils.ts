import { read, utils, WorkBook } from "xlsx";

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

let loadedCsvData: any[] = [];

export const processCsvFile = (file: Express.Multer.File): ParsedCsv => {
  try {
    const workbook: WorkBook = read(file.buffer, { type: "buffer" });
    const sheetName: string = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawCsvData: any[][] = utils.sheet_to_json(sheet, { header: 1 });

    const headers: string[] = rawCsvData[0];

    loadedCsvData = rawCsvData.slice(1).map((row: any[]) =>
      headers.reduce((acc, header, index) => {
        acc[header as keyof Card] = row[index];
        return acc;
      }, {} as Card)
    );

    return { headers, data: loadedCsvData };
  } catch (error) {
    throw error;
  }
};

export const searchInCsv = (query: string): any[] => {
  try {
    const lowercaseQuery = query.toLowerCase();

    return loadedCsvData.filter((card) =>
      Object.values(card).some((value: any) =>
        value.toLowerCase().includes(lowercaseQuery)
      )
    );
  } catch (error) {
    throw error;
  }
};
