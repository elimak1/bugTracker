import React from "react";
import { Switch, Route} from "react-router-dom";
import ProjectPage from "./ProjectPage";
import ProjectTable from "../TableList/projectTable";
import CreateProject from "./CreateProject";

export default function Projects() {
  
    return (
      <div>
          
        <Switch>
            <Route exact path="/admin/projects" component={ProjectTable} />
            <Route path="/admin/projects/create" component={CreateProject}/>
            <Route path="/admin/projects/:id" component={ProjectPage} />
            

        </Switch>
        
      </div>
      
    );
  }
  
