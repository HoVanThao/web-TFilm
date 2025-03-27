// import cloudinary from 'cloudinary';
// import { formatImage } from '../middlewares/multerMiddleware.js';
// import asyncHandler from 'express-async-handler'

// export const updateFileController = asyncHandler(async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "file upload không tồn tại" });
//         }

//         // const allowedFormats = ['image/jpeg', 'image/png', 'image/webp'];
//         // if (!allowedFormats.includes(req.file.mimetype)) {
//         //     return res.status(400).json({ message: "Định dạng file không hợp lệ" });
//         // }

//         const file = formatImage(req.file);
//         const response = await cloudinary.v2.uploader.upload(file);
//         res.status(200).json({
//             fileName: req.file.originalname,
//             fileUrl: response.secure_url,
//             idFile: response.public_id
//         });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });




import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multerMiddleware.js';
import asyncHandler from 'express-async-handler';

export const updateFilesController = asyncHandler(async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Không có file nào được upload" });
        }

        const allowedFormats = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/mkv'];

        // Upload từng file lên Cloudinary
        const uploadResults = await Promise.all(req.files.map(async (file) => {
            if (!allowedFormats.includes(file.mimetype)) {
                throw new Error(`File ${file.originalname} có định dạng không hợp lệ.`);
            }
            const formattedFile = formatImage(file);
            const response = await cloudinary.v2.uploader.upload(formattedFile, {
                resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
            });

            return {
                fileName: file.originalname,
                fileUrl: response.secure_url,
                idFile: response.public_id
            };
        }));

        res.status(200).json({ files: uploadResults });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
