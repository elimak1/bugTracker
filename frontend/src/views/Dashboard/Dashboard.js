import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import {
  emailsSubscriptionChart,
} from "variables/charts.js";

import {getTicketTypeData, getTicketTypeOptions, getOpenTicketCount} from "variables/ticketCharts";
import {getRecentProject} from "utility/getRecentProject";
import {getDailyTicketsChart} from "variables/dailyTicketsChart";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(styles);

/*
Dashboard should have:
total projects | Recent project
open tickets | Tickets by type(Done)
 total users | daily posted tickets craph
*/ 

export default function Dashboard() {
  const classes = useStyles();
  const tickets = useSelector(state => state.tickets);
  const projects = useSelector(state => state.projects);
  const users = useSelector(state => state.users);
  const history = useHistory();

  const dailySalesChart = getDailyTicketsChart(tickets);

  const recentProject = getRecentProject(tickets);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Active projects</p>
              <h3 className={classes.cardTitle}>
                {projects?projects.length:0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Button onClick={e => {
                  e.preventDefault()
                  history.push("/projects/create")}}
                  color="default"
                  size="small">
                  Create a new
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card onClick={() => recentProject? history.push("/projects/"+recentProject.id): null}>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Recent project</p>
              <h3 className={classes.cardTitle}>{recentProject? recentProject.title: ""}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {recentProject? recentProject.days: "unkown amount of"} days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Open tickets</p>
              <h3 className={classes.cardTitle}>{tickets? getOpenTicketCount(tickets): 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={getTicketTypeData(tickets)}
                type="Bar"
                options={getTicketTypeOptions(tickets)}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Ticket types</h4>
              <p className={classes.cardCategory}>All tickets in system</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily new tickets</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Registered users</p>
              <h3 className={classes.cardTitle}>{users? users.length: 0}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    
    </div>
  );
}
