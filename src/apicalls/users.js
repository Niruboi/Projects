import { axiosInstance } from ".";

export const LoginUser = async (payload) =>{
    const response = await axiosInstance("post" , "/login" , payload);
    return response;
};

export const RegisterUser = async (payload) =>{
    const response = await axiosInstance("post" , "/register" , payload);
    return response;
};

export const GetCurrentUser = async () =>{
    const response = await axiosInstance( "get" , "/get-current-user" );
    return response;
};

export const GetAllDonorsOfOrg = async () =>{
    const response = await axiosInstance( "get" , "/get-all-donors" );
    return response;
};

export const GetAllHospitalOfOrg = async () =>{
    const response = await axiosInstance( "get" , "/get-all-hospitals" );
    return response;
};

export const GetAllOrganizationOfDonar= async () =>{
    const response = await axiosInstance( "get" , "/get-all-organization-of-donars" );
    return response;
};

export const GetAllOrganizationOfHospital= async () =>{
    const response = await axiosInstance( "get" , "/get-all-organization-of-hospitals" );
    return response;
};

