import axios from "axios";
import { customNotification } from "./notificationReducer";

const BASEURL = 'https://elimaksbugtracker.herokuapp.com/api/bugs/';

const ticketReducer = (state = null, action) => {

    switch(action.type) {
        case 'INITTICKETS': 
            return action.data;
        case 'ADDTICKET':
            return state.concat(action.data);
        case 'EDITTICKET':
            return state.map(tic => tic.id === action.data.id? action.data.ticket: tic);
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
            dispatch(customNotification("Error when getting tickets from the server","danger"));
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
            dispatch({
                type: 'ADDTICKET',
                data: ticket,
              });
            dispatch({
                type: 'ADDPROJECTTICKET',
                data: {id: projectId, ticket: ticket},
              });
              dispatch(customNotification("Ticket: " + title+ " submitted","success"));
        } catch(e) {
            console.log(e);
            dispatch(customNotification("You don't have permssion submit tickets","warning"));
        }
    }
}

export const editTicket = (title, description, type, priority, open, assignedToId, projectId, id, token) => {
    return async dispatch => {
        try {
            console.log("sending request");
            const res = await axios.post(BASEURL + "/update/" + id, {title, description, assignedTo: assignedToId, type, priority, open},
                {
                    headers: {
                      'Authorization': `BEARER ${token}` 
                    }}
                );
            const ticket=res.data;
            dispatch({
                type: 'EDITTICKET',
                data: {id: id, ticket: ticket},
              }); 
            dispatch({
                type: 'EDITPROJECTTICKET',
                data: {projectId: projectId,id: id, ticket: ticket},
              });
              dispatch(customNotification("Edit for ticket" + title+ " submitted","success"));
        } catch(e) {
            console.log(e);
            dispatch(customNotification("You don't have permssion to edit tickets","warning"));
        }
    }
}


export default ticketReducer;