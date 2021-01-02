const notificationReducer = (state = null, action) => {

    switch(action.type) {
        case 'SETNOTIFICATION': 
            return action.data;
        case 'CLEARNOTIFICATION':
            return null;
        default:
            return state;
    }
  }

export const closeNotification = () => {
    return {
    type: 'CLEARNOTIFICATION'
    }

}

export const customNotification = (message,color) => {
    return  dispatch => {
    
        dispatch( {
        type: 'SETNOTIFICATION',
        data: {message,color}
        })
        setTimeout(function(){dispatch( {
            type: 'CLEARNOTIFICATION'
            })}, 5000);
    }
    

}

export default notificationReducer;