import Axios from "./Axios";

const getCategorieService = async () => {
    const { data } = await Axios.get("/categories");
    return data;
}


const createCategorieService = async (title, token) => {
    const { data } = await Axios.post(`/categories`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

const deleteCategorieService = async (id, token) => {
    const { data } = await Axios.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

const updateCategorieService = async (id, title, token) => {
    const { data } = await Axios.put(`/categories/${id}`, title, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}

export {
    getCategorieService,
    createCategorieService,
    deleteCategorieService,
    updateCategorieService,
}
