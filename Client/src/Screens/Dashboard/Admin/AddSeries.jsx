import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { CheckboxGroup, Input, Message } from '../../../Components/UsedInputs';
import Uploder from '../../../Components/Uploder';
import { MdDelete, MdAdd } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ImUpload } from 'react-icons/im';
import CastModal from '../../../Components/Modals/CastModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createSeriesAction, removeCastAction } from '../../../Redux/Actions/moviesActions';
import { InlineError } from '../../../Components/Notfications/Error';
import { ImagePreview } from '../../../Components/ImagePreview';
import { seriesMovieValidation } from '../../../Components/Validation/movieValidation';
import EpisodeFields from '../../../Components/EpisodeFields';

const AddSeries = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.createSeries
    );
    const { casts } = useSelector((state) => state.casts);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(seriesMovieValidation),
    });

    const { fields: filmParts, append: appendPart, remove: removePart } = useFieldArray({
        control,
        name: "filmParts",
    });

    const onSubmit = (data) => {
        if (!imageWithoutTitle || !imageTitle) {
            toast.error("Vui lòng tải lên đầy đủ ảnh poster");
            return;
        }
        dispatch(createSeriesAction({
            ...data,
            image: imageWithoutTitle,
            titleImage: imageTitle,
            casts,
            typeFilm: "series",
        }));
    };

    const deleteCastHandler = (id) => {
        dispatch(removeCastAction(id));
        toast.success("Xóa thành công");
    };

    useEffect(() => {
        if (modalOpen === false) {
            setCast(null);
        }
        if (isSuccess) {
            reset({
                name: "",
                nameVn: "",
                time: 0,
                language: "",
                year: 0,
                category: [],
                desc: "",
                imdbRating: "",
                filmParts: [],
            });
            setImageTitle("");
            setImageWithoutTitle("");
            dispatch({ type: "CREATE_SERIES_RESET" });
            navigate("/addseries");
        }
        if (isError) {
            toast.error("Something went wrong");
            dispatch({ type: "CREATE_SERIES_RESET" });
        }
    }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

    return (
        <SideBar>
            <CastModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Thêm phim bộ</h2>
                <div className="w-full grid md:grid-cols-3 gap-6">
                    <div className='w-full'>
                        <Input
                            label="Tiêu đề phim bản Việt"
                            placeholder="Nhập tên phim bản Việt"
                            type="text"
                            name='nameVn'
                            register={register("nameVn")}
                            bg={true}
                        />
                        {errors.nameVn && <InlineError text={errors.nameVn.message} />}
                    </div>
                    <div className='w-full'>
                        <Input
                            label="Tiêu đề phim gốc"
                            placeholder="Nhập tên phim gốc"
                            type="text"
                            name='name'
                            register={register("name")}
                            bg={true}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>
                    <div className='w-full'>
                        <Input
                            label="Ngôn ngữ"
                            placeholder="Nhập ngôn ngữ"
                            type="text"
                            name='language'
                            register={register("language")}
                            bg={true}
                        />
                        {errors.language && <InlineError text={errors.language.message} />}
                    </div>
                </div>
                <div className="w-full grid md:grid-cols-3 gap-6">
                    <div className='w-full'>
                        <Input
                            label="Năm"
                            placeholder="Năm xuất bản"
                            type="number"
                            name='year'
                            register={register("year")}
                            bg={true}
                        />
                        {errors.year && <InlineError text={errors.year.message} />}
                    </div>
                    <div className="w-full">
                        <Input
                            label="Điểm IMDb"
                            placeholder="Nhập điểm IMDb từ 0 đến 10"
                            type="number"
                            name="imdbRating"
                            register={register("imdbRating")}
                            bg={true}
                        />
                        {errors.imdbRating && <InlineError text={errors.imdbRating.message} />}
                    </div>
                    <div className='w-full'>
                        <Input
                            label="Thời lượng mỗi tập"
                            placeholder="Số phút"
                            type="number"
                            name='time'
                            register={register("time")}
                            bg={true}
                        />
                        {errors.time && <InlineError text={errors.time.message} />}
                    </div>
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Ảnh poster lớn 16:9
                        </p>
                        <Uploder setImageUrl={setImageWithoutTitle} />
                        <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Ảnh poster nhỏ 9:16
                        </p>
                        <Uploder setImageUrl={setImageTitle} />
                        <ImagePreview image={imageTitle} name="imageTitle" />
                    </div>
                </div>
                <div className='w-full'>
                    <Message
                        label="Mô tả phim"
                        placeholder="Giới thiệu ngắn gọn"
                        name="desc"
                        register={{ ...register("desc") }}
                    />
                    {errors.desc && <InlineError text={errors.desc.message} />}
                </div>
                <div className="text-sm w-full">
                    <CheckboxGroup
                        label="Thể loại"
                        options={categories}
                        name="category"
                        register={register}
                    />
                    {errors.category && <InlineError text={errors.category.message} />}
                </div>

                {/* quan ly phan phim */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4">Phần phim</h3>
                    {filmParts.map((part, index) => (
                        <div key={part.id} className="border border-border p-4 rounded mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-md font-medium">Phần {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => removePart(index)}
                                    className="text-subMainn hover:text-dryGray"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>
                            <Input
                                label="Tên phần"
                                placeholder="Ví dụ: Phần 1: Hoa sơn luận kiếm"
                                type="text"
                                name={`filmParts[${index}].title`}
                                register={register(`filmParts[${index}].title`)}
                                bg={true}
                            />
                            {errors.filmParts?.[index]?.title && (
                                <InlineError text={errors.filmParts[index].title.message} />
                            )}
                            <Input
                                label="Số tập của phần này"
                                placeholder="Số lượng tập"
                                type="number"
                                name={`filmParts[${index}].numberOfEpisodes`}
                                register={register(`filmParts[${index}].numberOfEpisodes`)}
                                bg={true}
                            />
                            {errors.filmParts?.[index]?.numberOfEpisodes && (
                                <InlineError text={errors.filmParts[index].numberOfEpisodes.message} />
                            )}
                            <div className="mt-4">
                                <h5 className="text-sm font-semibold mb-2">Tập phim</h5>
                                <EpisodeFields
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    partIndex={index}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            appendPart({
                                partNumber: filmParts.length + 1,
                                title: `Phần ${filmParts.length + 1}`,
                                numberOfEpisodes: 1,
                                episodes: [{ episodeNumber: 1, title: "", videoUrl: "", duration: 0 }],
                            })
                        }
                        className="flex items-center gap-2 py-2 px-4 bg-main hover:text-green-500 text-dryGray rounded border-2 border-border"
                    >
                        <MdAdd /> Thêm phần mới
                    </button>
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-4 bg-main border border-subMainn border-dashed text-white rounded"
                    >
                        Thêm diễn viên
                    </button>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {casts?.length > 0 &&
                            casts.map((user) => (
                                <div
                                    key={user?.id}
                                    className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                                >
                                    <img
                                        src={user?.image ? user?.image : "/images/user.png"}
                                        alt={user?.name}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <p>{user?.name}</p>
                                    <div className="flex-rows mt-2 w-full gap-2">
                                        <button
                                            onClick={() => deleteCastHandler(user?.id)}
                                            className="w-6 h-6 flex-colo bg-subMainn text-white hover:bg-main transitions border border-subMainn rounded"
                                        >
                                            <MdDelete />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCast(user);
                                                setModalOpen(true);
                                            }}
                                            className="w-6 h-6 flex-colo bg-green-500 text-white hover:bg-main transitions border border-green-600 rounded"
                                        >
                                            <FaEdit />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <button
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="bg-subMainn w-full flex-rows gap-6 transitions hover:bg-dry font-medium border-2 border-subMainn text-white py-4 px-6 rounded sm:w-auto cursor-pointer"
                >
                    {isLoading ? (
                        "Please Wait..."
                    ) : (
                        <>
                            <ImUpload /> Thêm phim bộ mới
                        </>
                    )}
                </button>
            </div>
        </SideBar>
    );
};



export default AddSeries;
