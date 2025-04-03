import * as yup from 'yup'


const LoginValidation = yup.object().shape({
    email: yup.string().email().required("Email là trường bắt buộc").trim().max(50, "Email không được vượt quá 50 ký tự"),
    password: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(20, "Mật khẩu không được vượt quá 20 ký tự")
});


const RegisterValidation = yup.object().shape({
    email: yup.string().email().required("Email là trường bắt buộc").trim().max(50, "Email không được vượt quá 50 ký tự"),
    password: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(20, "Mật khẩu không được vượt quá 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số")
        .matches(/(?=.*[!@#$%^&*])/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)"),
    fullName: yup.string()
        .required("Họ và tên là bắt buộc")
        .max(20, "Mật khẩu không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ và tên phải là các kí tự chữ cái"),
    confirmPassword: yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref('password')], "Mật khẩu xác nhận không khớp")
});

const UpdateValidation = yup.object().shape({
    email: yup.string().email().required("Email là trường bắt buộc").trim().max(50, "Email không được vượt quá 50 ký tự"),
    fullName: yup.string()
        .required("Họ và tên là bắt buộc")
        .max(20, "Mật khẩu không được vượt quá 50 ký tự")
        .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ và tên phải là các kí tự chữ cái"),
});

const PasswordValidation = yup.object().shape({
    oldPassword: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(20, "Mật khẩu không được vượt quá 20 ký tự"),
    newPassword: yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(20, "Mật khẩu không được vượt quá 20 ký tự")
        .matches(/(?=.*[0-9])/, "Mật khẩu phải chứa một số")
        .matches(/(?=.*[!@#$%^&*])/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*)"),
    confirmPassword: yup.string()
        .required("Xác nhận mật khẩu là bắt buộc")
        .oneOf([yup.ref('newPassword')], "Mật khẩu xác nhận không khớp")
});


export {
    LoginValidation,
    RegisterValidation,
    UpdateValidation,
    PasswordValidation,
}