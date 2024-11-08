import React from 'react'
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const Uploder = () => {


    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 100000,
        onDrop: (acceptedFiles) => {
            alert(acceptedFiles[0].name);
        }
    })

    return (
        <div className="w-full text-center">
            <div
                {...getRootProps()}
                className="px-6 py-8 pt-5 pb-6 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
            >
                <input className='hidden' {...getRootProps()} />
                <span className="mx-auto flex-colo text-subMain text-3xl">
                    <FiUploadCloud />
                </span>
                <p className="text-sm mt-2">Thêm hình ảnh của bạn vào đây</p>
                <em className="text-xs text-border">
                    (Chỉ chấp nhận các tệp .jpg và .png)
                </em>
            </div>
        </div>
    )
}

export default Uploder