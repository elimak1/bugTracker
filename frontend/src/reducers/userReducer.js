import axios from "axios";

const BASEURL = 'http://localhost:3001/users/';

const userReducer = (state = null, action) => {

    switch(action.type) {
        case 'INIT': 
            return action.data;
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

export default userReducer;