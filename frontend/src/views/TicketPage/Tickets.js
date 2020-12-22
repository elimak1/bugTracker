import React from "react";
import { Switch, Route} from "react-router-dom";
import TicketPage from "./TicketPage";

export default function Projects() {
  
    return (
      <div>
          
        <Switch>
            <Route exact path="/admin/tickets">
                <p>nothing here ZULUL</p>
            </Route>
            <Route path="/admin/tickets/:id">
                <TicketPage/>
            </Route>

        </Switch>
        
      </div>
      
    );
  }