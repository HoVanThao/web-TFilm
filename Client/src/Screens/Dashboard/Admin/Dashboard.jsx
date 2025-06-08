import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { FaFilm, FaLayerGroup, FaRegListAlt, FaUser, FaSync } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import TableDab from '../../../Components/TableDab'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../../../Redux/Actions/userActions'
import { adminUpdateFeaturesAction } from '../../../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notfications/Loader'
import Empty from '../../../Components/Notfications/Empty'
import ConfirmModal from '../../../Components/Modals/ConfirmModal'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { isLoading: cateLoading, isError: cateError, categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading: userLoading, isError: userError, users } = useSelector((state) => state.adminGetAllUsers);
    const { isLoading, isError, movies, totalMovies, typeFilmStats } = useSelector((state) => state.getAllMovies);
    const { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess } = useSelector((state) => state.adminUpdateFeatures);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllUsersAction());

        if (isError || cateError || userError) {
            toast.error("Đã có lỗi sảy ra HomeScreen!")
        }

        if (updateError) {
            toast.error(updateError);
            dispatch({ type: "ADMIN_UPDATE_FEATURES_RESET" });
        }

        if (updateSuccess) {
            toast.success("Cập nhật features thành công");
            dispatch({ type: "ADMIN_UPDATE_FEATURES_RESET" });
        }

    }, [dispatch, isError, cateError, userError, updateError, updateSuccess]);

    // Hàm xử lý khi click nút cập nhật features
    const handleUpdateFeatures = () => {
        setIsConfirmOpen(true);
    };

    const onConfirmUpdate = () => {
        dispatch(adminUpdateFeaturesAction());
        setIsConfirmOpen(false);
    };

    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: FaRegListAlt,
            title: "Tổng số phim",
            total: isLoading ? "Loading..." : totalMovies || 0,
        },
        {
            bg: "bg-red-600",
            icon: FaFilm,
            title: "Số phim lẻ",
            total: isLoading ? "Loading..." : typeFilmStats?.single || 0,
        },
        {
            bg: "bg-purple-600",
            icon: FaLayerGroup,
            title: "Số phim bộ",
            total: isLoading ? "Loading..." : typeFilmStats?.series || 0,
        },
        {
            bg: "bg-blue-700",
            icon: HiViewGridAdd,
            title: "Tổng số thể loại",
            total: cateLoading ? "Loading..." : categories?.length || 0,
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            title: "Tổng số người dùng",
            total: userLoading ? "Loading..." : users?.length || 0,
        }
    ]

    return (
        <SideBar>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Bảng điều khiển</h2>
                <button disabled={updateLoading} onClick={handleUpdateFeatures} className='flex-rows gap-2 bg-subMainn font-medium transitions hover:text-black border border-subMainn text-white py-3 px-6 rounded'>
                    <FaSync className={`${updateLoading ? 'animate-spin' : ''}`} />
                    {updateLoading ? 'Đang cập nhật...' : 'Cập nhật model gợi ý'}
                </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {
                    DashboardData.map((data, index) => (
                        <div key={index} className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
                            <div className={` col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg} `}>
                                <data.icon />
                            </div>
                            <div className="col-span-3">
                                <h2>{data.title}</h2>
                                <p className=" mt-2 font-bold">{data.total}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h3 className="text-md font-medium my-6 text-border">Phim mới cập nhật</h3>
            {
                isLoading ? <Loader /> : movies?.length > 0 ?
                    <TableDab data={movies.slice(0, 5)} />
                    : <Empty message="Bạn không có phim nào!" />
            }

            {/* Modal xác nhận cập nhật */}
            <ConfirmModal
                modalOpen={isConfirmOpen}
                setModalOpen={setIsConfirmOpen}
                onConfirm={onConfirmUpdate}
                title="Bạn muốn train lại model gợi ý cho tất cả người dùng?"
            />
        </SideBar>
    )
}

export default Dashboard
