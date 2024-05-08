import React from 'react'
import { GetInventoryWithFilters } from '../apicalls/inventory';
import { setLoading } from '../redux/LoaderSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { getDateFormat } from '../utils/helpers';

function InventoryTable({ filters , userType }) {
    const [ data , setData ] =  React.useState([]);
    const [ open , setOpen ] = React.useState(false);
    const dispatch = useDispatch();
    const columns= [
      {
        title: "Inventory Type",
        dataIndex:  "inventoryType",
        render  : (text) => text.toUpperCase()
      },
      {
        title: "Blood Group",
        dataIndex:  "bloodGroup",
        render  : (text) => text.toUpperCase()
      },
      {
        title: "Quantity",
        dataIndex:  "quantity",
        render  : (text) => text + " ML"
      },
      {
        title: "Reference",
        dataIndex:  "reference",
        render  : (text , record) => record.organization.organizationname
      },
      {
        title: "Date",
        dataIndex:  "createdAt",
        render : (text ) => getDateFormat(text)
      },
    ]

    const getData = async ()=>{
      try {
        dispatch(setLoading(true));
        const response = await GetInventoryWithFilters(filters);
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

    React.useEffect(()=>{
      getData();
    }, [])

  return (
    <div>
      <Table className='mt-3' columns={columns} dataSource={data} />
    </div>
  )
}

export default InventoryTable
