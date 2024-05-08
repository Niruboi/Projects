import React, { useEffect } from 'react'
import { GetAllOrganizationOfDonar, GetAllOrganizationOfHospital } from '../../../apicalls/users';
import { setLoading } from '../../../redux/LoaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Table, message } from 'antd';
import { getDateFormat } from '../../../utils/helpers';
import InventoryTable from '../../../components/InventoryTable';

function Organizations({userType}) {
    const [ showHistoryModal , setShowHistoryModal ] = React.useState(false);
    const { currentUser } = useSelector (state => state.users)
    const [ selectedOrganization , setSelectedOrganization ]= React.useState(null);
    const [ data , setData ] =  React.useState([]);
    const dispatch = useDispatch();
  
    const getData = async ()=>{
      try {
        dispatch(setLoading(true));
        let response = null
        if ( userType === "hospital")
        {
            response = await GetAllOrganizationOfHospital();
        }else{
            response = await GetAllOrganizationOfDonar();
        }
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
          dataIndex:  "organizationname",
          
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
            title: "Adress",
            dataIndex:  "adress",
        },
        {
          title: "created At",
          dataIndex:  "createdAt",
          render : (text ) => getDateFormat(text)
        },
        {
          title: "Action",
          dataIndex:  "action",
          render : (text , record) => <span className="underline text-md cursor-pointer" 
          onClick={ ()=> {
            setSelectedOrganization(record);
            setShowHistoryModal(true);
          }}
          >History</span>,

        },
    ];
  
  
  
    useEffect(()=>{
      getData();
    }, []);
  
  
    return (
        <div>
          <Table columns={columns} dataSource={data} />

         { showHistoryModal && (
           <Modal title= { 
            `${
              userType === "donar" ? "Donation History" : "Consumption History" 
            } in ${selectedOrganization.organizationname}`
           }
            centered 
            open={ showHistoryModal } 
            onClose =  {()=>setShowHistoryModal(false)}
            width = {1000}
            onCancel={()=>setShowHistoryModal(false)}
            >
         
              <InventoryTable 
                filters= {{ 
                  organization: selectedOrganization._id,
                    [ userType ] : currentUser._id
                }}
              />
          </Modal>
         )}
        </div>
      );
}

export default Organizations
