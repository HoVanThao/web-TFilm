import Axios from "./Axios"

// *********************** PUBLIC APIs *********************

//get all movies function

export const getAllMoviesService = async (
    category,
    language,
    rate,
    year,
    typeFilm,
    search,
    pageNumber,

) => {
    const { data } = await Axios.get(`/movies?category=${category}&language=${language}&rate=${rate}&year=${year}&typeFilm=${typeFilm}&search=${search}&pageNumber=${pageNumber}`);
    return data;
}