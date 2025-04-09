import Axios from "./Axios"

// *********************** PUBLIC APIs *********************

//get all movies function

export const getAllMoviesService = async ({
    category,
    time,
    rate,
    year,
    search,
    language,
    pageNumber,

}) => {
    const { data } = await Axios.get(`/movies?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`);
    return data;
}