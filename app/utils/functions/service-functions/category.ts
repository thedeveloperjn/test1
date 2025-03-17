import { Category, CategoryResponse } from "../../../interfaces/categories/caegory";
import { axiosInstance } from "../../../lib/axios";
import { CATEGORY_API } from "../../constants/apiEndpoints";

export const getAllCategories = async () => {
    const response = await axiosInstance.get<CategoryResponse>(
        CATEGORY_API.URL
    );
    if (response) return response.data.categorys as Category[];
    else {
        throw Error("Try Again Later");
    }
}