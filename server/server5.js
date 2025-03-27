import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import userRouter from './Routes/UserRouter.js'
import movieRouter from './Routes/MoviesRouter.js'
import categoryRouter from './Routes/CategoriesRouter.js'
import uploadFileRouter from './Routes/UploadFileRouter.js'
import { errorHandler } from './middlewares/errorMiddleware.js';
import cloudinary from 'cloudinary';


dotenv.config();

const app = express();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 20000,
});


app.use(cors());
app.use(express.json());
connectDB();

// main router
app.get('/', (req, res) => {
    res.send('API is running....');
});

// other routes
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/upload", uploadFileRouter);

// errorMiddlewares
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost/${PORT}`)
});


// taskkill /PID 21936 /F
// netstat -ano | findstr :5000
// npm cache clean --force