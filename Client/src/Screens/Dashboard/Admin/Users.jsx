import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import Table2 from '../../../Components/Table2'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsersAction, getAllUsersAction } from '../../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notfications/Loader'
import Empty from '../../../Components/Notfications/Empty'
import DeleteConfirmModal from '../../../Components/Modals/DeleteConfirmModal'

const Users = () => {

    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const { isLoading, isError, users } = useSelector(
        (state) => state.adminGetAllUsers,
    )

    const { isError: deleteAllError, isSuccess } = useSelector(
        (state) => state.adminDeleteUser,
    )

    // const deleteUserHandler = (userId) => {
    //     if (window.confirm("Bạn có chắc muốn xóa?")) {
    //         dispatch(deleteUsersAction(userId));
    //     }
    // };


    // Hàm mở modal thay vì window.confirm
    const deleteUserHandler = (userId) => {
        setUserIdToDelete(userId);
        setModalOpen(true);
    };

    // Hàm xử lý xóa sau khi xác nhận trong modal
    const confirmDeleteHandler = () => {
        if (userIdToDelete) {
            dispatch(deleteUsersAction(userIdToDelete));
        }
        setModalOpen(false);
        setUserIdToDelete(null);
    };


    useEffect(() => {
        dispatch(getAllUsersAction());
        if (isError || deleteAllError) {
            toast.error(isError || deleteAllError);
            dispatch({ type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" })
        }
    }, [dispatch, isError, deleteAllError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Người dùng</h2>
                {
                    isLoading ? <Loader /> : users?.length > 0 ? <Table2 data={users} users={true} onDeleteFunction={deleteUserHandler} /> : <Empty message="không có người dùng nào!" />
                }

            </div>
            {/* Thêm modal xác nhận xóa */}
            <DeleteConfirmModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onConfirm={confirmDeleteHandler} // Truyền hàm xác nhận xóa vào modal
                title={" Bạn có muốn xóa User này?"}
            />
        </SideBar >
    )
}

export default Users