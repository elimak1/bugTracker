import axios from "axios";

const BASEURL = 'http://localhost:3001/login/';

const logReducer = (state = null, action) => {

    switch(action.type) {
        case 'LOGOUT': 
            return null;
        case 'LOGIN':
            return action.data;
        default:
            return state;
    }
  }

export const initLogin = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      return {
        type: 'LOGIN',
        data: JSON.parse(loggedUserJSON)
      }
    } else{
      return {
        type: 'LOGOUT'
      }
    }
}

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export const logIn = (creds) => {
  return async dispatch => {
    let user = null;
    try {
        const res = await axios.post(BASEURL, creds);
        user=res.data;
        
    } catch(e) {
        console.log(e);
    }
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    
    dispatch({
      type: 'LOGIN',
      data: user,
    })
}
  }

export default logReducer;