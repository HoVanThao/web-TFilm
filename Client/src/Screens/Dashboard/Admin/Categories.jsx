import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { CategoriesData } from '../../../Data/CategoriesData'
import Table2 from '../../../Components/Table2'
import { HiPlusCircle } from 'react-icons/hi'
import CategoryModal from '../../../Components/Modals/CategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction, getAllCategoriesAction } from '../../../Redux/Actions/categoriesActions'
import Loader from '../../../Components/Notfications/Loader'
import Empty from '../../../Components/Notfications/Empty'
import toast from 'react-hot-toast'
import DeleteConfirmModal from '../../../Components/Modals/DeleteConfirmModal'

const Categories = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [category, setCategory] = useState();
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

    const dispatch = useDispatch();

    const { isLoading, categories } = useSelector(
        (state) => state.categoryGetAll,
    );

    // delete
    const { isSuccess, isError } = useSelector(
        (state) => state.categoryDelete,
    );

    // const adminDeleteCaterogy = (id) => {
    //     if (window.confirm("Bạn có muốn xóa?")) {
    //         dispatch(deleteCategoryAction(id));
    //     }
    // };

    // Hàm mở modal thay vì window.confirm
    const deleteCategoryHandler = (categoryId) => {
        setCategoryIdToDelete(categoryId);
        setModalDeleteOpen(true);
    };

    // Hàm xử lý xóa sau khi xác nhận trong modal
    const confirmDeleteHandler = () => {
        if (categoryIdToDelete) {
            dispatch(deleteCategoryAction(categoryIdToDelete));
        }
        setModalDeleteOpen(false);
        setCategoryIdToDelete(null);
    };





    const OnEditFunction = (dataCategory) => {
        setCategory(dataCategory);
        setModalDeleteOpen(!modalDeleteOpen);
    };

    useEffect(() => {
        dispatch(getAllCategoriesAction())

        if (isError) {
            toast.error(isError);
            dispatch({
                type: "DELETE_CATEGORY_RESET"
            });
        }

        if (isSuccess) {
            dispatch({
                type: "DELETE_CATEGORY_RESET"
            });
        }

        if (modalOpen === false) {
            setCategory();
        }
    }, [modalOpen, dispatch, isError, isSuccess, modalDeleteOpen]);

    return (
        <SideBar>
            <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} />
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Thể loại</h2>

                    <button
                        onClick={() => setModalOpen(true)}
                        className='bg-subMainn font-medium gap-2 flex flex-row items-center transitions hover:text-main border border-subMainn text-white py-2 px-4 rounded'>
                        <HiPlusCircle /> Thêm
                    </button>
                </div>
                {
                    isLoading ?
                        <Loader /> : categories?.length > 0 ?
                            <Table2
                                data={categories}
                                users={false}
                                onEditFunction={OnEditFunction}
                                onDeleteFunction={deleteCategoryHandler} /> :
                            <Empty message="không có thể loại nào!" />
                }
            </div>
            {/* Thêm modal xác nhận xóa */}
            <DeleteConfirmModal
                modalOpen={modalDeleteOpen}
                setModalOpen={setModalDeleteOpen}
                onConfirm={confirmDeleteHandler} // Truyền hàm xác nhận xóa vào modal
                title={" Bạn có muốn xóa thể loại này?"}
            />
        </SideBar >
    )
}

export default Categories