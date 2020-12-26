import React from "react";
import { useSelector} from 'react-redux';
import {
  Redirect,
  useParams
} from "react-router-dom";
import {Button} from '@material-ui/core';
import TableList from "views/TableList/TableList";
import TicketTable from "views/TableList/ticketTable";
import TicketForm from "views/TicketPage/TicketForm";

export default function ProjectPage() {

  let { id } = useParams();
  const projects = useSelector(state => state.projects);

  const [openForm, setOpenForm] = React.useState(false)

  let project = null;
  if(projects) {
    project = projects.find(proj => proj.id === id);
    if(!project) {
      return(<Redirect to="/admin/projects"/>);
    }
  } else{
    return(<Redirect to="/admin/projects"/>)
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <h4>{project.description}</h4>
      <Button onClick={()=>setOpenForm(!openForm)}>{openForm? "Close form": "Create a new ticket"}</Button>
      {openForm? <TicketForm project={project}/>: ""}
      <TicketTable tickets = {project.tickets} />
      <TableList users = {project.personnel} />

    </div>
    
  );
}

