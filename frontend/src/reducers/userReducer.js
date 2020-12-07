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

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export const logIn = (user) => {
    return {
      type: 'LOGIN',
      data: user
    }
  }

export default logReducer;