import moment from 'moment';

export const getLoggedInUserName = (user) => {
  if (user.userType === "donar") {
    return user.name;
  } else if (user.userType === "hospital") {
    return user.hospitalname;
  } else if (user.userType === "organization") {
    return user.organizationname;
  }
};

export const getAntdInputValidation = () =>{
  return [{
    required: true,
    message: "Required",
  }]
};

export const getDateFormat = (date) =>{
  return moment(date).format("DD MMM YYYY hh:mm A");
}