import * as yup from 'yup'


const loginValidation = yup.object().shape({
    email: yup.string().emai().required("Email là trường bắt buộc").trim(),
    password: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/( ?=.* [0-9])/, "Mật khẩu phải chứa một số")
});


const registerValidation = yup.object().shape({
    email: yup.string().emai().required("Email là trường bắt buộc").trim(),
    password: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(20, "Mật khẩu phải ít hơn 20 ký tự")
        .matches(/( ?=.* [0-9])/, "Mật khẩu phải chứa một số"),
    fullName: yup.string()
        .required("Họ và tên là bắt buộc")
        .max(20, "Họ và tên phải ít hơn 20 ký tự")
        .matches(/^[a-zA-Z]*$/, "Họ và tên phải là các kí tự chữ cái"),
});

export {
    loginValidation,
    registerValidation,
}