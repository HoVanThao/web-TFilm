import * as yup from "yup";


const ReviewValidation = yup.object().shape({
    comment: yup
        .string()
        .required("Vui lòng nhập bình luận")
        .max(150, "Bình luận phải vượt quá 150 ký tự"),
    rating: yup.number().required("Vui lòng chọn đánh giá"),
});

export { ReviewValidation }
