import React from "react";
import { Link, useHistory} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useSelector} from 'react-redux';
import { TableSortLabel, TextField, Grid, Button} from '@material-ui/core';




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

export default function ProjectTabale() {
  const classes = useStyles();
  const projects = useSelector(state => state.projects);
  let history = useHistory();

  const [entAmount, setEntAmout] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortUp, setSortUp] = React.useState(true);
  const [sortBy, setSortBy] = React.useState("Descrtiption");
  const [filter, setFilter] = React.useState("");


  React.useEffect( () => {
    if(projects) {
      sortByTitle();
    }
    
  }, []);

  const getUserList = () => {
    if(projects) {
      const filtered = projects.filter(project => project.title.includes(filter) || project.description.includes(filter));
      const pageOfUsers= filtered.slice((page-1)*entAmount,page*entAmount);
      return pageOfUsers.map(project => 
      [<Link to={"/admin/projects/"+ project.id}>{project.title}</Link>, project.description]);
    }
    else {
      return [["Project list could not be fetched"]];
    }
  }

  const nextHandler = (event) => {
    event.preventDefault();
    if(projects &&  projects.length> page*entAmount) {
      setPage(page+ 1);
    }
  }

  const previousHandler = (event) => {
    event.preventDefault();
    if(projects && projects.length > entAmount&& projects.length<= page*entAmount) {
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

  const sortByTitle = () => {
    setSortBy("Title");
    if(sortUp) {
      projects.sort((a,b) => a.title.localeCompare(b.title));
      setSortUp(!sortUp);
    } else{
      projects.sort((a,b) => b.title.localeCompare(a.title));
      setSortUp(!sortUp);
    }
  }

  const sortByDesc = () => {
    setSortBy("Description");
    if(sortUp) {
      projects.sort((a,b) => a.description.localeCompare(b.description));
      setSortUp(!sortUp);
    } else{
      projects.sort((a,b) => b.description.localeCompare(a.description));
      setSortUp(!sortUp);
    }
  }



  const tableHeaderLinks = () =>{
    return(
      [<p
      onClick={sortByTitle}>
      Project name
      <TableSortLabel
      active = {sortBy === "Title"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      <p
      onClick={sortByDesc}>
      Description
      <TableSortLabel
      active = {sortBy === "Descrtiption"}
      direction = {sortUp? "desc": "asc"}
      />
      </p>,
      ]
    )
  }
  return (
    <div>

      <Button color="primary" onClick={() =>history.push("/admin/projects/create")}>CREATE NEW PROJECT</Button>   
    <GridContainer>
      
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of projects </h4>
            
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
              Showing {getUserList().length} of {projects? projects.length: 0} projects.
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    </div>
  );
}
