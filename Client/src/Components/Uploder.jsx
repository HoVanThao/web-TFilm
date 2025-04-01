import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import Loader from './Notfications/Loader';
import { uploadImageService } from '../Redux/APIs/imageUploadService';

const Uploder = ({ setImageUrl }) => {

    const [loading, setLoading] = useState(false);


    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = new FormData();
            file.append("files", acceptedFiles[0]);
            const data = await uploadImageService(file, setLoading);
            setImageUrl(data.files[0].fileUrl);
            //console.log(data.files[0].fileUrl);
        }, [setImageUrl]
    )

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            multiple: false,
            onDrop,
        });

    return (
        <div className="w-full text-center flex-colo gap-6">
            {
                loading ? (
                    <div className='px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md '>
                        <Loader />
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className="px-6 w-full py-8 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
                    >
                        <input className='hidden' {...getInputProps()} />
                        <span className="mx-auto flex-colo text-subMainn text-3xl">
                            <FiUploadCloud />
                        </span>
                        <p className="text-sm mt-2">Thêm file của bạn vào đây</p>
                        <em className="text-xs text-border">
                            {isDragActive
                                ? "Thả tệp của bạn vào đây!"
                                : isDragReject
                                    ? "Loại tệp không được hỗ trợ ... "
                                    : "chỉ chấp nhận các tệp .jpg và .png"}
                        </em>
                    </div>
                )
            }

        </div>
    )
}

export default Uploder