import React from "react";
import TableList from "../TableList/TableList"
import { useSelector} from 'react-redux';

export default function Users() {
    
    const users = useSelector(state => state.users);
    return (
      <div>
          
        <TableList users={users}/>
        
      </div>
      
    );
  }
  
