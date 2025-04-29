import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGridAdd } from 'react-icons/hi'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notfications/Loader'
import Empty from '../../../Components/Notfications/Empty'

const Dashboard = () => {

    const dispatch = useDispatch();
    const { isLoading: cateLoading, isError: cateError, categories } = useSelector(
        (state) => state.categoryGetAll
    );

    const { isLoading: userLoading, isError: userError, users } = useSelector(
        (state) => state.adminGetAllUsers
    );

    const { isLoading, isError, movies, totalMovies } = useSelector(
        (state) => state.getAllMovies
    );

    useEffect(() => {
        dispatch(getAllUsersAction());

        if (isError || cateError || userError) {
            toast.error("Đã có lỗi sảy ra HomeScreen!")
        }

    }, [dispatch, isError, cateError, userError]);

    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: FaRegListAlt,
            title: "Tổng số phim",
            total: isLoading ? "Loading..." : totalMovies || 0,
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
            <h2 className="text-xl font-bold">Bảng điều khiển</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {
                    DashboardData.map((data, index) => (
                        <div
                            key={index}
                            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2">
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
                isLoading ? <Loader /> : movies?.length > 0 ? <Table data={movies.slice(0, 5)} admin={true}
                // onDelete={handleDeleteOne} 
                /> : <Empty message="Bạn không có phim nào!" />
            }
        </SideBar>
    )
}

export default Dashboard