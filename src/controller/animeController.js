import axios from "axios";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

export const getAllAnime = AsyncHandler(async (req, res, next) => {
  const {
    page = 1,
    limit = 24,
    type,
    status,
    rating,
    genres,
    order_by = "popularity",
    sort = "desc",
    sfw = true,
    q,
  } = req.query;

  let url = `https://api.jikan.moe/v4/anime?limit=${limit}&page=${page}&order_by=${order_by}&sort=${sort}&sfw=${sfw}`;

  if (type) url += `&type=${type}`;
  if (status) url += `&status=${status}`;
  if (rating) url += `&rating=${rating}`;
  if (genres) url += `&genres=${genres}`;
  if (q) url += `&q=${q}`;

  const response = await axios.get(url);

  return res.status(200).json(new ApiResponse(200, [response.data.data,response.data.pagination], "success"));
});


export const getAnimeById = AsyncHandler(async (req, res, next) => {
    const {id} = req.params
    if(!id){
        throw new ApiError(400,"id is required")
    }
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
    if(!response.data){
        throw new ApiError(404,"anime not found")
    }
    return res.status(200).json(new ApiResponse(200,response.data,"success"))
})

export const getTopAnime = async (req, res, next) => {
    try {
        const { page = 1, limit = 24, type = "tv" } = req.query;
        const url = `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}&type=${type}`;
        const response = await axios.get(url);   
        if (!response.data) {
            throw new ApiError(404, "anime not found");
        }

        return res.status(200).json(new ApiResponse(200, [response.data.data, response.data.pagination], "success"));
    } catch (error) {
        console.error("Error in getTopAnime:", error.message);
        next(error); // send it to the global error handler
    }
};

export const getSeasonalAnime = AsyncHandler(async (req, res, next) => {
    const now =  new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let season;
    if(month >= 1 && month <= 3){
        season = "winter"
    }else if(month >= 4 && month <= 6){
        season = "spring"
    }else if(month >= 7 && month <= 9){
        season = "summer"
    }
    else season = 'fall'


    const url = `https://api.jikan.moe/v4/seasons/${year}/${season}`
    const response = await axios.get(url);

    if(!response){
        throw new ApiError(404,"seasonal anime not found")
    }

    return res.status(200).json(new ApiResponse(200,{response:response.data.data,season:season,year:year},"success"))

})


export const getTrendingAnime = AsyncHandler(async (req, res, next) => {
    const {page=1,limit=24} = req.query
    const url = `https://api.jikan.moe/v4/anime?status=airing&order_by=popularity&sort=desc&page=${page}&limit=${limit}`

    const response = await axios.get(url)
    if(!response){
        throw new ApiError(404,"trending anime not found")  
    }

    return res.status(200).json(new ApiResponse(200,response.data.data,"success"))
})

export const getAnimeRecommendations = AsyncHandler(async (req, res, next) => {
    const {id}  = req.params
    const url = `https://api.jikan.moe/v4/anime/${id}/recommendations`
    const response = await axios.get(url)

    if(!response){
        throw new ApiError(404,"recommendations not found")
    }
    return res.status(200).json(new ApiResponse(200,response.data.data,"recommendations"))
});

export const getAnimeReview = AsyncHandler(async (req, res, next) => {
    const {id} = req.params
    const {page=1,limit=10} = req.query

    const url = `https://api.jikan.moe/v4/anime/${id}/reviews?page=${page}&limit=${limit}`;
    const response = await axios.get(url);

    if(!response){
        throw new ApiError(404,"reviews not found")
    }

    return res.status(200).json(new ApiResponse(200,response.data.data,"success"))
})

export const getAnimeCharacters = AsyncHandler(async (req, res, next) => {
    const {id}  = req.params
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`)
    if(!response){
        throw new ApiError(404,"characters not found")
    }

    return res.status(200).json(new ApiResponse(200,response.data.data,"success"))
})

export const getAnimeStaff = AsyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const url =`https://api.jikan.moe/v4/anime/${id}/staff`;
    const reponse = await axios.get(url)
    if(!reponse){
        throw new ApiError(404,"staff not found")
    }
    return res.status(200).json(new ApiResponse(200,reponse.data.data,"success"))
})

export const personDetails = AsyncHandler(async (req, res, next) => {
    const {id} = req.params
    const response = await axios.get(`https://api.jikan.moe/v4/people/${id}`)
    if(!response){
        throw new ApiError(404,"person not found")
    }
    return res.status(200).json(new ApiResponse(200,response.data.data,"success"))
    })