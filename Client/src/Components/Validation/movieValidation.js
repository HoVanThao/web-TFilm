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
        .typeError('Điểm IMDb phải là số')
        .min(0, 'Điểm IMDb không được nhỏ hơn 0')
        .max(10, 'Điểm IMDb không được lớn hơn 10')
        .nullable()
        .transform((value, originalValue) =>
            originalValue === '' ? null : value
        ),
});

export { ReviewValidation, movieValidation }
