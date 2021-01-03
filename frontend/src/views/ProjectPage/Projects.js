import React from "react";
import { Switch, Route} from "react-router-dom";
import ProjectPage from "./ProjectPage";
import ProjectTable from "../TableList/projectTable";
import CreateProject from "./CreateProject";

export default function Projects() {
  
    return (
      <div>
          
        <Switch>
            <Route exact path="/projects" component={ProjectTable} />
            <Route path="/projects/create" component={CreateProject}/>
            <Route path="/projects/:id" component={ProjectPage} />
            

        </Switch>
        
      </div>
      
    );
  }
  
