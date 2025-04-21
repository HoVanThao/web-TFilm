import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/categoriesActions';
import toast from 'react-hot-toast';

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {

    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess } = useSelector((state) => state.categoryCreate);
    const { isLoading: upLoading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.categoryUpdate);
    // create category handler

    const submitHandler = (e) => {
        e.preventDefault();
        if (title) {
            if (category) {
                dispatch(updateCategoryAction(category?._id, { title: title }));
                setModalOpen(!modalOpen);
            } else {
                dispatch(createCategoryAction({ title: title }));
                setTitle("");
            }
        } else {
            toast.error("Hãy nhập thể loại!")
        }
    }

    // useEffect
    useEffect(() => {
        if (upError || isError) {
            toast.error(upError || isError);
            dispatch({
                type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
            })
        }

        if (isSuccess || upSuccess) {
            dispatch({
                type: isSuccess ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
            })
        }

        if (category) {
            setTitle(category?.title);
        }

        if (modalOpen === false) {
            setTitle("");
        }
    }, [dispatch, isError, isSuccess, upSuccess, upError, category, modalOpen]);

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-lg font-bold">{category ? "Chỉnh sửa thể loại" : "Thêm thể loại"}</h2>
            <form className="flex flex-col gap-6 text-left mt-6"
                onSubmit={submitHandler}
            >
                <Input
                    label="Thể loại"
                    placeholder={"Thể loại"}
                    type="text"
                    bg={false}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    disabled={isLoading || upLoading}
                    type='submit'
                    className="w-full flex-colo py-4 rounded bg-subMainn transitions text-white hover:bg-main transitions border-2 border-subMainn"
                >
                    {
                        isLoading || upLoading ? "Loading..." : category ? "Chỉnh sửa" : "Thêm mới"
                    }
                </button>
            </form>
        </MainModal>
    )
}

export default CategoryModal