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

const Categories = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState();

    const dispatch = useDispatch();

    const { isLoading, categories } = useSelector(
        (state) => state.categoryGetAll,
    );

    // delete
    const { isSuccess, isError } = useSelector(
        (state) => state.categoryDelete,
    );

    const adminDeleteCaterogy = (id) => {
        if (window.confirm("Bạn có muốn xóa?")) {
            dispatch(deleteCategoryAction(id));
        }
    };

    // update


    // create



    const OnEditFunction = (id) => {
        setCategory(id);
        setModalOpen(!modalOpen);
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
    }, [modalOpen, dispatch, isError, isSuccess]);

    return (
        <SideBar>
            <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} />
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Thể loại</h2>

                    <button onClick={() => setModalOpen(true)} className='bg-subMainn font-medium gap-2 flex flex-row items-center transitions hover:text-main border border-subMainn text-white py-2 px-4 rounded'>
                        <HiPlusCircle /> Thêm
                    </button>
                </div>
                {
                    isLoading ?
                        <Loader /> : categories?.length > 0 ?
                            <Table2 data={categories} users={false} onEditFunction={OnEditFunction} onDeleteFunction={adminDeleteCaterogy} /> :
                            <Empty message="không có thể loại nào!" />
                }
            </div>
        </SideBar >
    )
}

export default Categories