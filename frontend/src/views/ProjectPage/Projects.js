import React from "react";
import {BrowserRouter as  Switch, Route, Redirect, Link, Router} from "react-router-dom";
import ProjectPage from "./ProjectPage";
import ProjectTable from "../TableList/projectTable";

export default function Projects() {
  
    return (
      <div>
          
        <Switch>
            <Route exact path="/admin/projects" component={ProjectTable} />
            <Route path="/admin/projects/:id" component={ProjectPage} />

        </Switch>
        
      </div>
      
    );
  }
  
