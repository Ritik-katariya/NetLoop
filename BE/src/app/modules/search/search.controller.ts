import { Request, Response } from "express";
import { searchService } from "./search.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const searchAll = catchAsync(async (req: Request, res: Response) => {
  const { query } = req.query;
  
  if (!query || typeof query !== 'string') {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Search query is required',
    });
  }

  const result = await searchService.searchAll(query);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Search results retrieved successfully",
    data: result,
  });
});

export const searchController = {
  searchAll,
}; 