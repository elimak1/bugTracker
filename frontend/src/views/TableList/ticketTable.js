import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Button} from "@material-ui/core"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { TableSortLabel, TextField, Grid} from '@material-ui/core';
import { Link} from "react-router-dom";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TicketTable(props) {
  let tickets = props.tickets;
  let header = props.header;
  const classes = useStyles();

  const [entAmount, setEntAmout] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortUp, setSortUp] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("name");
  const [filter, setFilter] = React.useState("");


  React.useEffect( () => {
    if(tickets) {
      sortByName();
    }
    
  }, []);

  const getUserList = () => {
    if(tickets) {
      const filtered = tickets.filter(ticket => ticket.title.includes(filter) ||
      ticket.user.username.includes(filter) ||
      ticket.assignedTo.username.includes(filter) ||
      ticket.open.toString().includes(filter) ||
      ticket.created.includes(filter));
      const pageOfUsers= filtered.slice((page-1)*entAmount,page*entAmount);
      return pageOfUsers.map(ticket => 
      [<Link to= {"/admin/tickets/" + ticket.id} >{ticket.title} </Link>, ticket.user.username, ticket.assignedTo.username, ticket.open? "Open": "Closed", ticket.created]);
    }
    else {
      return [["Ticket list could not be fetched"]];
    }
  }

  const nextHandler = (event) => {
    event.preventDefault();
    if(tickets &&  tickets.length> page*entAmount) {
      setPage(page+ 1);
    }
  }

  const previousHandler = (event) => {
    event.preventDefault();
    if(tickets && tickets.length > entAmount&& tickets.length<= page*entAmount) {
      setPage(page- 1);
    }
  }

  const changeEnt10 = () => {
    setPage(1);
    setEntAmout(10);
  }

  const changeEnt25 = () => {
    setPage(1);
    setEntAmout(25);
  }

  const sortByName = () => {
    setSortBy("name");
    try {
        if(sortUp) {
            tickets.sort((a,b) => a.title.localeCompare(b.title));
          setSortUp(!sortUp);
        } else{
            tickets.sort((a,b) => b.title.localeCompare(a.title));
          setSortUp(!sortUp);
        }
    } catch(e){
        console.log("Error handling titles")
    }
  }
  const sortBySubmitter = () => {
    setSortBy("submitter");
    try {
        if(sortUp) {
            tickets.sort((a,b) => a.user.username.localeCompare(b.user.username));
          setSortUp(!sortUp);
        } else{
            tickets.sort((a,b) => b.user.username.localeCompare(a.user.username));
          setSortUp(!sortUp);
        }
    } catch(e){
        console.log("Error handling submitters")
    }
  }

  const sortByAssignee = () => {
    setSortBy("assignee");
    try {
        if(sortUp) {
            tickets.sort((a,b) => a.assignedTo.username.localeCompare(b.assignedTo.username));
          setSortUp(!sortUp);
        } else{
            tickets.sort((a,b) => b.assignedTo.username.localeCompare(a.assignedTo.username));
          setSortUp(!sortUp);
        }
    } catch(e){
        console.log("Error handling assignees")
    }
  }
  const sortByStatus = () => {
    setSortBy("status");
    try {
        if(sortUp) {
            tickets.sort((a,b) => a.open.toString().localeCompare(b.open.toString()));
          setSortUp(!sortUp);
        } else{
            tickets.sort((a,b) => b.open.toString().localeCompare(a.open.toString()));
          setSortUp(!sortUp);
        }
    } catch(e){
        console.log("Error handling ticket statuses")
    }
  }
  const sortByCreated = () => {
    setSortBy("created");
    try {
        if(sortUp) {
            tickets.sort((a,b) => a.created.localeCompare(b.created));
          setSortUp(!sortUp);
        } else{
            tickets.sort((a,b) => b.created.localeCompare(a.created));
          setSortUp(!sortUp);
        }
    } catch(e){
        console.log("Error handling created dates")
    }
  }



  const tableHeaderLinks = () =>{
    return(
      [<p
      onClick={sortByName}>
      Title
      <TableSortLabel
      active = {sortBy === "name"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortBySubmitter}>
      Submitter
      <TableSortLabel
      active = {sortBy === "submitter"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByAssignee}>
      Assignee
      <TableSortLabel
      active = {sortBy === "assignee"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByStatus}>
      Status
      <TableSortLabel
      active = {sortBy === "status"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByCreated}>
      Created
      <TableSortLabel
      active = {sortBy === "created"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>]
    )
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{header? header:"List of tickets"}</h4>
          </CardHeader>
          <CardBody>
          <Grid container direction="row" item xs={12} justify="space-between" alignItems="center">
            <span>Show  <Button onClick={changeEnt10}>10</Button>
             <Button onClick={changeEnt25}>25</Button></span>
              
            
              <TextField label="Search" onChange={(e) => setFilter(e.target.value)} />
          </Grid>                                                
            <Table
              tableHeaderColor="primary"
              tableHead={tableHeaderLinks()}
              tableData={getUserList()}
            />
            <p>
            <Button onClick= {previousHandler}>Previous</Button>
            <Button onClick= {nextHandler}>Next</Button>
              Showing {getUserList().length} of {tickets? tickets.length: 0} users.
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
