import { Router } from 'express';
import upload from '../middlewares/multerMiddleware.js';
import { updateFilesController } from '../Controllers/UploadFileController.js';

const router = Router();

// router.post("/", upload.single('file'), updateFileController);
// Cho phép upload tối đa 5 file một lần
router.post("/", upload.array('files', 5), updateFilesController);

export default router;


