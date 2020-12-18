import axios from "axios";

const BASEURL = 'http://localhost:3001/projects/';

const projectReducer = (state = null, action) => {

    switch(action.type) {
        case 'INITPROJECTS': 
            return action.data;
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


export default projectReducer;