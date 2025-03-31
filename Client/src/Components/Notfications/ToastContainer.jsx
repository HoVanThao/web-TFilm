import { Toaster } from "react-hot-toast";

export const ToastContainer = () => {
    return (
        <Toaster
            position="bottom-left"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 2000,
            }}
        />
    );
}