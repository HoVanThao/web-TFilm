import * as categoriesConstants from '../Constants/categoriesConstants';
import * as categoriesApi from '../APIs/categorieService';
import toast from 'react-hot-toast';
import { ErrorsAction, tokenProtection } from '../protection';

const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST });
        const response = await categoriesApi.getCategorieService();
        dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, categoriesConstants.GET_ALL_CATEGORIES_FAIL);
    }
};

const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoriesConstants.CREATE_CATEGORY_REQUEST });
        await categoriesApi.createCategorieService(title, tokenProtection(getState));
        dispatch({ type: categoriesConstants.CREATE_CATEGORY_SUCCESS });
        toast.success("Tạo mới thành công");
    } catch (error) {
        ErrorsAction(error, dispatch, categoriesConstants.CREATE_CATEGORY_FAIL);
    }
};

const updateCategoryAction = (id, title) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoriesConstants.UPDATE_CATEGORY_REQUEST });
        await categoriesApi.updateCategorieService(id, title, tokenProtection(getState));
        dispatch({ type: categoriesConstants.UPDATE_CATEGORY_SUCCESS });
        toast.success("Cập nhật thành công");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, categoriesConstants.UPDATE_CATEGORY_FAIL);
    }
};

const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoriesConstants.DELETE_CATEGORY_REQUEST });
        await categoriesApi.deleteCategorieService(id, tokenProtection(getState));
        dispatch({ type: categoriesConstants.DELETE_CATEGORY_SUCCESS });
        toast.success("Xóa thành công");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, categoriesConstants.DELETE_CATEGORY_FAIL);
    }
};

export {
    getAllCategoriesAction,
    createCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,

}