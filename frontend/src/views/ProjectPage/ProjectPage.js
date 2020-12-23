import React from "react";
import { useSelector} from 'react-redux';
import {
  Redirect,
  useParams
} from "react-router-dom";
import TableList from "views/TableList/TableList";
import TicketTable from "views/TableList/ticketTable"

export default function ProjectPage() {

  let { id } = useParams();
  const projects = useSelector(state => state.projects);
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
      <TicketTable tickets = {project.tickets} />
      <TableList users = {project.personnel} />

    </div>
    
  );
}

