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


// get random movies function
export const getRandomMoviesService = async () => {
    const { data } = await Axios.get(`/movies/random/all`);
    return data;
}

// get movies by id function

export const getMovieByIdService = async (id) => {
    const { data } = await Axios.get(`/movies/${id}`);
    return data;
}

// get top 10 rated movie function

export const getTopRatedMoviesService = async () => {
    const { data } = await Axios.get(`/movies/rated/top`);
    return data;
}