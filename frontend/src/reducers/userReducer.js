import axios from "axios";

const BASEURL = 'http://localhost:3001/users/';

const userReducer = (state = null, action) => {

    switch(action.type) {
        case 'INIT': 
            return action.data;
        case 'UPDATEUSER':
            return state.map(user => user.id===action.data.id? action.data: user);
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
        } catch(e) {
            console.log(e);
        }     
    }
}

export default userReducer;