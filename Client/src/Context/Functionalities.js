import toast from "react-hot-toast";
import { likeMovieAction } from "../Redux/Actions/userActions";

// like movie functionalty
const LikeMovie = (movie, dispatch, userInfo) => {
    return !userInfo
        ? toast.error("Hãy đăng nhập để thêm vào danh sách yêu thích")
        : dispatch(
            likeMovieAction({
                movieId: movie._id,
            })

        );

};

export { LikeMovie }