import React from "react";
import { useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function ProjectPage() {

  let { id } = useParams();
  const projects = useSelector(state => state.projects);
  let project = null;
  if(projects) {
    project = projects.find(proj => proj.id === id);
  } else{
    return(<div> project could not be fetched</div>)
  }
  console.log(project);

  return (
    <div>
      <h2>{project.title}</h2>
      <h4>{project.description}</h4>

    </div>
    
  );
}

