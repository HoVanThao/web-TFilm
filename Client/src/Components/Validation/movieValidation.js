import * as yup from "yup";


const ReviewValidation = yup.object().shape({
    comment: yup
        .string()
        .required("Vui lòng nhập bình luận")
        .max(150, "Bình luận phải vượt quá 150 ký tự"),
    rating: yup.number().required("Vui lòng chọn đánh giá"),
});

const movieValidation = yup.object().shape({
    nameVn: yup.string().required("Vui lòng nhập tên phim")
        .max(50, "Tên phim phải ít hơn 50 ký tự"),
    name: yup.string().required("Vui lòng nhập tên phim")
        .max(50, "Tên phim phải ít hơn 50 ký tự"),
    time: yup.number().required("Vui lòng nhập thời lượng phim"),
    language: yup.string().required("Vui lòng nhập ngôn ngữ phim"),
    year: yup.number().required("Vui lòng nhập năm phát hành"),
    category: yup
        .array()
        .of(yup.string())
        .min(1, 'Phải chọn ít nhất 1 thể loại')
        .required('Thể loại là bắt buộc'),
    desc: yup.string().required("Vui lòng nhập mô tả phim")
        .max(300, "Mô tả phim phải ít hơn 300 ký tự"),
    video: yup.string().required("Video URL không được để trống").url("Không đúng định dạng url"),
    imdbRating: yup
        .number()
        .required('Vui lòng nhập điểm imdb')
        .typeError('Điểm IMDb phải là số')
        .min(0, 'Điểm IMDb không được nhỏ hơn 0')
        .max(10, 'Điểm IMDb không được lớn hơn 10'),
});


const seriesMovieValidation = yup.object().shape({
    nameVn: yup.string().required("Vui lòng nhập tên phim")
        .max(50, "Tên phim phải ít hơn 50 ký tự"),
    name: yup.string().required("Vui lòng nhập tên phim")
        .max(50, "Tên phim phải ít hơn 50 ký tự"),
    time: yup.number().required("Vui lòng nhập thời lượng tổng"),
    language: yup.string().required("Vui lòng nhập ngôn ngữ phim"),
    year: yup.number().required("Vui lòng nhập năm phát hành"),
    category: yup
        .array()
        .of(yup.string())
        .min(1, 'Phải chọn ít nhất 1 thể loại')
        .required('Thể loại là bắt buộc'),
    desc: yup.string().required("Vui lòng nhập mô tả phim")
        .max(300, "Mô tả phim phải ít hơn 300 ký tự"),
    imdbRating: yup
        .number()
        .required('Vui lòng nhập điểm imdb')
        .typeError('Điểm IMDb phải là số')
        .min(0, 'Điểm IMDb không được nhỏ hơn 0')
        .max(10, 'Điểm IMDb không được lớn hơn 10'),
    filmParts: yup
        .array()
        .of(
            yup.object().shape({
                partNumber: yup.number().required("Số phần là bắt buộc"),
                title: yup.string().required("Tên phần là bắt buộc"),
                numberOfEpisodes: yup.number().required("Số tập là bắt buộc").min(1, "Phải có ít nhất 1 tập"),
                episodes: yup
                    .array()
                    .of(
                        yup.object().shape({
                            episodeNumber: yup.number().required("Số tập là bắt buộc"),
                            title: yup.string().required("Tên tập là bắt buộc"),
                            videoUrl: yup.string().url("URL video không hợp lệ").required("URL video là bắt buộc"),
                            duration: yup.number().required("Thời lượng là bắt buộc").min(1, "Thời lượng phải lớn hơn 0"),
                            desc: yup.string().max(300, "Mô tả tập phải ít hơn 300 ký tự"),
                        })
                    )
                    .min(1, "Phải có ít nhất 1 tập"),
            })
        )
        .min(1, "Phải có ít nhất 1 phần"),
});

export { ReviewValidation, movieValidation, seriesMovieValidation }
