import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Button, Link} from "@material-ui/core"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector} from 'react-redux';
import { TableSortLabel, TextField, Grid } from '@material-ui/core';
import { FormatAlignRight, VerticalAlignCenter } from "@material-ui/icons";

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

export default function TableList() {
  const classes = useStyles();
  const users = useSelector(state => state.users);

  const [entAmount, setEntAmout] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortUp, setSortUp] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("name");
  const [filter, setFilter] = React.useState("");

  React.useEffect( () => {
    if(users) {
      sortByName();
    }
    
  }, []);

  const getUserList = () => {
    if(users) {
      const filtered = users.filter(user => user.username.includes(filter) ||user.role.includes(filter) ||user.email.includes(filter));
      const pageOfUsers= filtered.slice((page-1)*entAmount,page*entAmount);
      return pageOfUsers.map(user => 
        [user.username, user.role? user.role: "N/A",
      user.email? user.email: "Not found"]);
    }
    else {
      return [["User list could not be fetched"]];
    }
  }

  const nextHandler = (event) => {
    event.preventDefault();
    if(users &&  users.length> page*entAmount) {
      setPage(page+ 1);
    }
  }

  const previousHandler = (event) => {
    event.preventDefault();
    if(users && users.length > entAmount&& users.length< page*entAmount) {
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
    if(sortUp) {
      users.sort((a,b) => a.username.localeCompare(b.username));
      setSortUp(!sortUp);
    } else{
      users.sort((a,b) => b.username.localeCompare(a.username));
      setSortUp(!sortUp);
    }
  }
  const sortByRole = () => {
    setSortBy("role");
    try {
      if(sortUp) {
        users.sort((a,b) => a.role.localeCompare(b.role));
        setSortUp(!sortUp);
      } else{
        users.sort((a,b) => b.role.localeCompare(a.role));
        setSortUp(!sortUp);
      }
    } catch(e) {
      console.log("Error handling roles")
    }    
  }

  const sortByEmail = () => {
    setSortBy("email");
    try {
      if(sortUp) {
        users.sort((a,b) => a.email.localeCompare(b.email));
        setSortUp(!sortUp);
      } else{
        users.sort((a,b) => b.email.localeCompare(a.email));
        setSortUp(!sortUp);
      }
    } catch(e) {
      console.log("Error handling emails")
    }    
  }


  const tableHeaderLinks = () =>{
    return(
      [<p
      onClick={sortByName}>
      Name
      <TableSortLabel
      active = {sortBy == "name"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByRole}>
      Role
      <TableSortLabel
      active = {sortBy == "role"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByEmail}>
      Email
      <TableSortLabel
      active = {sortBy == "email"}
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
            <h4 className={classes.cardTitleWhite}>List of personnel</h4>
          </CardHeader>
          <CardBody>
          <Grid container direction="row" item xs={12} justify="space-between" alignItems="center">
            <span>Show  <Button onClick={changeEnt10}>10</Button>
             <Button onClick={changeEnt25}>25</Button></span>
              
            
              <TextField id="standard-basic" label="Search" onChange={(e) => setFilter(e.target.value)} />
          </Grid>
            
             
             
             
            <Table
              tableHeaderColor="primary"
              tableHead={tableHeaderLinks()}
              tableData={getUserList()}
            />
            <p>
            <Button onClick= {previousHandler}>Previous</Button>
            <Button onClick= {nextHandler}>Next</Button>
              Showing {getUserList().length} of {users? users.length: 0} users.
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
