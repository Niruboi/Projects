import { axiosInstance } from ".";

export const AddInventory = (data) =>{
    return axiosInstance("post","/add", data)
};

export const GetInventory = () =>{
    return axiosInstance("get","/get")
};

export const GetInventoryWithFilters = (data) =>{
    return axiosInstance("post","/filter", {filters: data})
};