import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageService = async (files, setLoading) => {
    try {
        setLoading(true);
        const { data } = await Axios.post("/upload", files);
        setLoading(false);
        toast.success("Upload file thành công");
        return data;
    } catch (error) {
        setLoading(false);
        toast.error("Có lỗi khi upload file");
    }
};

export { uploadImageService }