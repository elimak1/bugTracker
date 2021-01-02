import axios from "axios";

const BASEURL = 'http://localhost:3001/projects/';

const projectReducer = (state = null, action) => {

    switch(action.type) {
        case 'INITPROJECTS': 
            return action.data;
        case 'ADDPROJECT':
            return state.concat(action.data);
        case 'ADDPROJECTTICKET':
            let project = state.find(p => p.id === action.data.id);
            project.tickets = project.tickets.concat(action.data.ticket)
            return state.map(pr => pr.id === action.data.id? project: pr);
        case 'EDITPROJECTTICKET':
            let thisProject = state.find(p => p.id === action.data.projectId);
            thisProject.tickets = thisProject.tickets.map(tic => tic.id === action.data.id? action.data.ticket: tic);
            return state.map(pr => pr.id === action.data.projectId? thisProject: pr);
        case 'UPDATEPROJECT':
            return state.map(pr => pr.id === action.data.id? action.data: pr);
        default:
            return state;
    }
  }

export const initProjects = () => {
    return async dispatch => {
        let projects = null;
        try {
            const res = await axios.get(BASEURL);
            projects=res.data;
            dispatch({
                type: 'INITPROJECTS',
                data: projects,
              })
        } catch(e) {
            console.log(e);
        }
        
        
    }
}


export const newProject = (title, description, token) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL, {title, description},
                {
                    headers: {
                      'Authorization': `BEARER ${token}` 
                    }}
                );
            const project=res.data;
            dispatch({
                type: 'ADDPROJECT',
                data: project,
              })
        } catch(e) {
            console.log(e);
        }   
    }
}
export const addUserToProject = (projectId, userId, token) => {
    return async dispatch => {
        try {
            const res = await axios.post(BASEURL + projectId, {id : userId},
                {
                    headers: {
                      'Authorization': `BEARER ${token}` 
                    }}
                );
            const project=res.data;
            dispatch({
                type: 'UPDATEPROJECT',
                data: project,
              })
        } catch(e) {
            console.log(e);
        }   
    }
}


export default projectReducer;