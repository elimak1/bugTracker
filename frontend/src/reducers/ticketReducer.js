import axios from "axios";

const BASEURL = 'http://localhost:3001/bugs/';

const ticketReducer = (state = null, action) => {

    switch(action.type) {
        case 'INITTICKETS': 
            return action.data;
        case 'ADDTICKET':
            return state.concat(action.data);
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
export const newTicket = (title, description, type, projectId, assignedToId, token) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL, {title, description, project: projectId, assignedTo: assignedToId, type},
                {
                    headers: {
                      'Authorization': `BEARER ${token}` 
                    }}
                );
            const ticket=res.data;
            console.log(ticket);
            dispatch({
                type: 'ADDTICKET',
                data: ticket,
              });
            dispatch({
                type: 'ADDPROJECTTICKET',
                data: {id: projectId, ticket: ticket},
              });
        } catch(e) {
            console.log(e);
        }
    }
}


export default ticketReducer;