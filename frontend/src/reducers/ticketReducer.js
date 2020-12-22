import axios from "axios";

const BASEURL = 'http://localhost:3001/bugs/';

const ticketReducer = (state = null, action) => {

    switch(action.type) {
        case 'INITTICKETS': 
            return action.data;
        default:
            return state;
    }
  }

export const initTickets = () => {
    return async dispatch => {
        let tickets = null;
        try {
            const res = await axios.get(BASEURL);
            tickets=res.data;
            dispatch({
                type: 'INITTICKETS',
                data: tickets,
              })
        } catch(e) {
            console.log(e);
        }
        
        
    }
}


export default ticketReducer;