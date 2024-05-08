import React from "react";

const Spinners = () => {
  return <div className="fixed inset-0 bg-black opacity-70 z-50 flex items-center justify-center" >
    <div className="border-4 w-8 h-8 border-white border-solid border-t-transparent rounded-full animate-spin"></div>
  </div>;
};

export default Spinners;
