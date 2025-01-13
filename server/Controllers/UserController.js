import asyncHandler from 'express-async-handler'
import User from '../Models/UserModels.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../middlewares/authMiddleware.js';

// guest
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("Email đã tồn tại!")
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user in DB
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // if user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });

        } else {
            res.status(400);
            throw new Error("Invalid user data")
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user in DB
        const user = await User.findOne({ email });
        // if user exists compare password with hashed password then send user data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            // if user not found or password not match send error message
        } else {
            res.status(401);
            throw new Error("Tài khoản không hợp lệ!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists update user data and save it in DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            // send updated user data and token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
            });

            // else send error message
        } else {
            res.status(404);
            throw new Error("Không tìm thấy tài khoản!");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists delete user from DB
        if (user) {
            // if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Errod("Can't delete admin user");
            }
            // else delete user from DB
            await User.deleteOne({ _id: req.user._id });
            res.json({ message: "Xóa user thành công" });

        }
        else {
            res.status(404);
            throw new Error("User không tồn tại");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists compare old password with hashed password then update user password and save it in DB
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed !! " });

        } else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        // if user exists send liked movies to client
        if (user) {
            res.json(user.likedMovies);
        }
        else {
            res.status(404);
            throw new Error("User not found");

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const addLikedMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findById(req.user._id);
        // Nếu người dùng tồn tại, thêm phim vào danh sách phim đã thích và lưu vào cơ sở dữ liệu
        if (user) {
            // Kiểm tra xem phim đã được thích hay chưa
            // Nếu phim đã được thích, gửi thông báo lỗi
            if (user.likedMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Phim đã được thích");
            }

            // Nếu chưa, thêm phim vào danh sách phim đã thích và lưu vào cơ sở dữ liệu
            user.likedMovies.push(movieId);
            await user.save();
            res.json({ message: "Phim đã được thêm vào danh sách yêu thích", data: user.likedMovies });

            // Nếu không tìm thấy người dùng, gửi thông báo lỗi
        } else {
            res.status(404);
            throw new Error("Không tìm thấy phim");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        //find user in DB
        const user = await User.findById(req.user._id);
        // if user exists delete all liked movies and save it in DB
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({ message: "All liked movies deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//admin
const getUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in DB
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if (user) {
            // if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Không thể xóa tài khoản admin");
            }
            // else delete user from DB
            await user.remove();
            res.json({ message: "Xóa tài khoản thành công" });
        }

        // else send error message
        else {
            res.status(404);
            throw new Error("Tài khoản không tồn tại");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

export {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getLikedMovies,
    addLikedMovie,
    deleteLikedMovies,
    getUsers,
    deleteUser
};