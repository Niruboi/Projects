import React from 'react'
import { setLoading } from '../../../redux/LoaderSlice';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';
import { GetAllDonorsOfOrg } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helpers';

function Donors() {
  const [ data , setData ] =  React.useState([]);
  const dispatch = useDispatch();

  const getData = async ()=>{
    try {
      dispatch(setLoading(true));
      const response = await GetAllDonorsOfOrg();
      dispatch(setLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  }
  
  const columns = [
      {
        title: "Name",
        dataIndex:  "name",
        
      },
      {
        title: "Email",
        dataIndex:  "email",
        
      },
      {
        title: "Phone",
        dataIndex:  "phone",
      },
      {
        title: "created At",
        dataIndex:  "createdAt",
        render : (text ) => getDateFormat(text)
      },
  ];



  React.useEffect(()=>{
    getData();
  }, [])


  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Donors
