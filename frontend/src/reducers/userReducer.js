import axios from "axios";
import { customNotification } from "./notificationReducer";

const BASEURL = 'http://localhost:3001/users/';

const userReducer = (state = null, action) => {

    switch(action.type) {
        case 'INIT': 
            return action.data;
        case 'UPDATEUSER':
            return state.map(user => user.id===action.data.id? action.data: user);
        case 'ADDUSER':
            return state.concat(action.data);
        default:
            return state;
    }
  }

export const initUsers = () => {
    return async dispatch => {
        let users = null;
        try {
            const res = await axios.get(BASEURL);
            users=res.data;
        } catch(e) {
            console.log(e);
            dispatch(customNotification("Error when getting users from the server","danger"));
        }
        
        dispatch({
          type: 'INIT',
          data: users,
        })
    }
}

export const updateRole = (id, role, token) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL + "update/role/"+id, {role}, {
                headers: {
                  'Authorization': `BEARER ${token}` 
                }});
            const user=res.data;
            dispatch({
                type: 'UPDATEUSER',
                data: user,
              })
              dispatch(customNotification("Role changed to " + role,"success"));
        } catch(e) {
            console.log(e);
            dispatch(customNotification("Only an admin can change roles","warning"));
        }     
    }
}

export const updateUser = (fields, token) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL + "update", fields, {
                headers: {
                  'Authorization': `BEARER ${token}` 
                }});
            const user=res.data;
            dispatch({
                type: 'UPDATEUSER',
                data: user,
              })
              dispatch(customNotification("Changes saved!","success"));
        } catch(e) {
            console.log(e);
            dispatch(customNotification(e.message,"danger"));
        }     
    }
}

export const addUser = (fields) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL, fields);
            const user=res.data;
            dispatch({
                type: 'UPDATEUSER',
                data: user,
              })
            dispatch(customNotification("Account verification link has been send to your email","info"));
        } catch(e) {
            console.log(e);
            dispatch(customNotification(e.message,"danger"));
        }     
    }
}

export default userReducer;