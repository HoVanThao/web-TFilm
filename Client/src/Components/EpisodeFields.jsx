import { Input, Message } from '../Components/UsedInputs';
import { MdDelete, MdAdd } from 'react-icons/md';
import { useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { InlineError } from '../Components/Notfications/Error';



const EpisodeFields = ({ control, register, errors, partIndex }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `filmParts[${partIndex}].episodes`,
    });

    return (
        <div>
            {fields.map((episode, epIndex) => (
                <div key={episode.id} className="border border-border p-2 rounded mb-2">
                    <div className="flex justify-between items-center mb-2">
                        <h6 className="text-xs font-medium">Tập {epIndex + 1}</h6>
                        <button
                            type="button"
                            onClick={() => remove(epIndex)}
                            className="text-subMainn hover:text-dryGray"
                        >
                            <MdDelete size={16} />
                        </button>
                    </div>
                    <Input
                        label="Tiêu đề tập phim"
                        placeholder="Ví dụ: Vào ma đạo"
                        type="text"
                        name={`filmParts[${partIndex}].episodes[${epIndex}].title`}
                        register={register(`filmParts[${partIndex}].episodes[${epIndex}].title`)}
                        bg={true}
                    />
                    {errors.filmParts?.[partIndex]?.episodes?.[epIndex]?.title && (
                        <InlineError
                            text={errors.filmParts[partIndex].episodes[epIndex].title.message}
                        />
                    )}
                    <Input
                        label="Tập số"
                        placeholder="Số thứ tự tập"
                        type="number"
                        name={`filmParts[${partIndex}].episodes[${epIndex}].episodeNumber`}
                        register={register(`filmParts[${partIndex}].episodes[${epIndex}].episodeNumber`)}
                        bg={true}
                    />
                    {errors.filmParts?.[partIndex]?.episodes?.[epIndex]?.episodeNumber && (
                        <InlineError
                            text={errors.filmParts[partIndex].episodes[epIndex].episodeNumber.message}
                        />
                    )}
                    <Input
                        label="URL Video"
                        placeholder="https://example.com/video.mp4"
                        type="text"
                        name={`filmParts[${partIndex}].episodes[${epIndex}].videoUrl`}
                        register={register(`filmParts[${partIndex}].episodes[${epIndex}].videoUrl`)}
                        bg={true}
                    />
                    {errors.filmParts?.[partIndex]?.episodes?.[epIndex]?.videoUrl && (
                        <InlineError
                            text={errors.filmParts[partIndex].episodes[epIndex].videoUrl.message}
                        />
                    )}
                    <Input
                        label="Thời lượng"
                        placeholder="Số phút"
                        type="number"
                        name={`filmParts[${partIndex}].episodes[${epIndex}].duration`}
                        register={register(`filmParts[${partIndex}].episodes[${epIndex}].duration`)}
                        bg={true}
                    />
                    {errors.filmParts?.[partIndex]?.episodes?.[epIndex]?.duration && (
                        <InlineError
                            text={errors.filmParts[partIndex].episodes[epIndex].duration.message}
                        />
                    )}
                    <Message
                        label="Mô tả tập phim"
                        placeholder="Mô tả ngắn gọn"
                        name={`filmParts[${partIndex}].episodes[${epIndex}].desc`}
                        register={register(`filmParts[${partIndex}].episodes[${epIndex}].desc`)}
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    append({
                        episodeNumber: fields.length + 1,
                        title: "",
                        videoUrl: "",
                        duration: 0,
                        desc: "",
                    })
                }
                className="flex items-center gap-2 py-1 px-2 bg-main hover:text-green-500 text-dryGray rounded border-2 border-border text-sm"
            >
                <MdAdd /> Thêm tập mới
            </button>
        </div>
    );
};

export default EpisodeFields;