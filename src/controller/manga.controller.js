import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

export const getAllManga = AsyncHandler(async (req, res, next) => {
  const url = `https://api.jikan.moe/v4/manga`;
  const response = await axios.get(url);
  if (!response) {
    throw new ApiError(404, "manga not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, response.data.data, "success"));
});

export const getMangaById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const url = `https://api.jikan.moe/v4/manga/${id}`;
  const response = await axios.get(url);
  if (!response) {
    throw new ApiError(404, "manga not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, response.data.data, "success"));
});

export const getMangaRecommendations = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const url = `https://api.jikan.moe/v4/manga/${id}/recommendations`;
  const response = await axios.get(url);
  if (!response) {
    throw new ApiError(404, "recommendations not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, response.data.data, "success"));
});

export const searchManga = AsyncHandler(async (req, res, next) => {
  const { title } = req.query;
  const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${title}&limit=10`)
  if(!response){
      throw new ApiError(404,"manga not found")
  }
  return res.status(200).json(new ApiResponse(200,response.data.data,"success"))
})
