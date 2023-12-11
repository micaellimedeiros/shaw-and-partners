import { Request, Response } from "express";
import { uploadFile, searchUsers } from "./csvController";
import { processCsvFile, searchInCsv } from "./../utils/csvUtils";

jest.mock("./../utils/csvUtils", () => ({
  processCsvFile: jest.fn(),
  searchInCsv: jest.fn(),
}));

describe("CSV Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("uploadFile", () => {
    it("should return 400 if no file is uploaded", () => {
      uploadFile(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "No file uploaded." });
    });

    it("should return 200 if file is uploaded successfully", () => {
      const file = { buffer: "test" };
      req.file = file as unknown as Express.Multer.File;

      uploadFile(req as Request, res as Response);

      expect(processCsvFile).toHaveBeenCalledWith(file);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "The file was uploaded successfully.",
      });
    });

    it("should return 500 if an error occurs", () => {
      const file = { buffer: "test" };
      req.file = file as unknown as Express.Multer.File;

      (processCsvFile as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });

      uploadFile(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error.",
      });
    });
  });

  describe("searchUsers", () => {
    it("should return 200 if search is successful", () => {
      const query = "test";
      req.query = { q: query };

      searchUsers(req as Request, res as Response);

      expect(searchInCsv).toHaveBeenCalledWith(query);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: undefined });
    });

    it("should return 500 if an error occurs", () => {
      const query = "test";
      req.query = { q: query };
      (searchInCsv as jest.Mock).mockImplementationOnce(() => {
        throw new Error();
      });

      searchUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error.",
      });
    });
  });
});
