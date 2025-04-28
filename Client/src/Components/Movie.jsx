import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { LikeMovie } from '../Context/Functionalities';

const Movie = ({ movie }) => {
    const dispatch = useDispatch();
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie._id);
    }

    return (
        <>
            <div className='border-border h-64 p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
                <Link to={`/movie/${movie?._id}`} className='w-full'>
                    <img src={movie?.image ? `/images/movies/${movie?.image}` : '/images/user.png'} alt={movie?.name} className='w-full h-full rounded-lg object-cover' />
                </Link>
                <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
                    <h3 className="font-semibold truncate">{movie?.name} </h3>
                    <button onClick={() => LikeMovie(movie, dispatch, userInfo)} disabled={isLiked(movie) || likeLoading} className={`h-8 w-8 text-sm flex-colo transitions hover:text-subMainn rounded bg-white ${isLiked(movie) ? 'text-subMainn' : 'text-white'} bg-opacity-30`}>
                        <FaHeart />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Movie