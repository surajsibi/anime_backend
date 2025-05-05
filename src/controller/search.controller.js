import { AsyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import axios from "axios";

const searchAnime = AsyncHandler(async(req , res , next)=>{
    const {
        q,type,status,genres,order_by="popularity",sort="desc",min_score,page=1
    } =req.query

    const params = new  URLSearchParams({
        q: q || '',
        type: type || '',
        status: status || '',
        genres: genres || '',
        order_by,
        sort,
        min_score: min_score || '',
        page
    });
    const url = `https://api.jikan.moe/v4/anime?${params.toString()}`;

    const response = await axios.get(url);
    const results = response.data.data;

    res.status(200).json(new ApiResponse(200, results, "Filtered anime search results"));

})