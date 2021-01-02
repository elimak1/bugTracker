import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import {
  Redirect,
  useParams
} from "react-router-dom";

import {addUserToProject} from "../../reducers/projectReducer";

import {Button} from '@material-ui/core';
import TableList from "views/TableList/TableList";
import TicketTable from "views/TableList/ticketTable";
import TicketForm from "views/TicketPage/TicketForm";
import {Menu, MenuItem} from '@material-ui/core';

export default function ProjectPage() {

  let { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);
  const users = useSelector(state => state.users);
  const login = useSelector(state => state.login);

  const [openForm, setOpenForm] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  let project = null;
  if(projects) {
    project = projects.find(proj => proj.id === id);
    if(!project) {
      return(<Redirect to="/admin/projects"/>);
    }
  } else{
    return(<Redirect to="/admin/projects"/>)
  }

  let filteredUsers;
  if(users) {
    
    filteredUsers = users.filter(user => !project.personnel.find(p => p.id===user.id));
  }

  const handleSubmit = () =>{
    try{
        const userId = filteredUsers.find(person => person.username === selectedUser).id;
        dispatch(addUserToProject(id, userId, login.token));
        setSelectedUser(null);
    } catch(e) {
      console.log("problem with selected fields")
    }    
  }

  const userDropdown = () => {

    const types = filteredUsers.map(user => user.username);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (type=null) => {
      if(!type) {
          setSelectedUser(type);
      } else {
          setSelectedUser(type);
      }
      setAnchorEl(null);
    };
  
    return (
      <span>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Assign user to the project
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
        >
          {types.map(type => <MenuItem onClick={() =>handleClose(type)}
          key={type}
          >{type}</MenuItem> )}
        </Menu>
        <span>{selectedUser}{selectedUser?<Button color="primary" onClick={handleSubmit}>SUBMIT</Button>: ""} </span>        
      </span>
    );
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <h4>{project.description}</h4>
      <Button onClick={()=>setOpenForm(!openForm)}>{openForm? "Close form": "Create a new ticket"}</Button>
      {openForm? <TicketForm project={project}/>: ""}
      {userDropdown()}
      <TicketTable tickets = {project.tickets} />
      <TableList users = {project.personnel} />

    </div>
    
  );
}

