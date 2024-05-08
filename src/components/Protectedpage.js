import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { setLoading } from "../redux/LoaderSlice";

function Protectedpage({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetCurrentUser();
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(setCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    currentUser && (
      <div>
          {/* Header */}
        <div className=" flex justify-between items-center bg-primary text-white px-5 py-3" >
          <div>
          <h1 className="text-2xl cursor-pointer" onClick={ ()=> navigate("/")}>
            YASHODA BLOOD-BANK
          </h1>
          <span className="text-xs">{currentUser.userType.toUpperCase()}</span>
          </div>
        
        <div className="flex items-center gap-1">
        <i className="ri-shield-user-line"></i>
        <div className= "flex flex-col">
            <span className="mr-5 uppercase text-md cursor-pointer" onClick={ ()=> navigate("/profile")}>
              {getLoggedInUserName(currentUser)}</span>
        </div>
        <i className="ri-logout-circle-r-line ml-5 cursor-pointer"
          onClick = {()=> {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        ></i>
        </div>
        </div>

          {/* Body */}
        <div className= "px-5 py-2">{children}</div>
      </div>
    )
  );
}

export default Protectedpage;
