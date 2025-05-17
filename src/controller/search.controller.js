import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import axios from "axios";

export const searchAnime = AsyncHandler(async(req , res , next)=>{
    const {
        q,type,status,genres,order_by="popularity",sort="desc",min_score,page=1
    } =req.query

    const params = new URLSearchParams();

if (q) params.append("q", q);
if (type) params.append("type", type);
if (status) params.append("status", status);
if (genres) params.append("genres", genres);
if (min_score) params.append("min_score", min_score);

params.append("order_by", order_by);
params.append("sort", sort);
params.append("page", page);

const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;

    const response = await axios.get(url);
    const results = response.data.data;

    res.status(200).json(new ApiResponse(200, results, "Filtered anime search results"));

})