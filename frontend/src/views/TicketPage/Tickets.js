import React from "react";
import { Switch, Route} from "react-router-dom";
import TicketPage from "./TicketPage";
import TicketTable from "../TableList/ticketTable";
import { useSelector} from 'react-redux';

export default function Projects() {
    const tickets = useSelector(state => state.tickets);
    const login = useSelector(state => state.login);

    if(!login || !tickets) {
      return(<div>
          
        <Switch>
            <Route exact path="/admin/tickets">
                <p>error finding tickets for current user</p>
            </Route>
            <Route path="/admin/tickets/:id">
                <TicketPage/>
            </Route>

        </Switch>
        
      </div>)
    }
    const username = login.username;

    let submitted=tickets.filter((tick) => tick.user.username === username );
    let assigned=tickets.filter((tick) => tick.assignedTo.username === username );

    return (
      <div>
          
        <Switch>
            <Route exact path="/admin/tickets">
                <TicketTable id="submittedTicketsTable" tickets={submitted} header="Submitted tickets"/>
                <TicketTable id="assignedTicketsTable" tickets={assigned} header="Assigned tickets"/>

            </Route>
            <Route path="/admin/tickets/:id">
                <TicketPage/>
            </Route>

        </Switch>
        
      </div>
      
    );
  }