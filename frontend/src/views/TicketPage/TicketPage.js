import React from "react";
import { useSelector} from 'react-redux';
import {
  useParams
} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {Grid} from "@material-ui/core"
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  typo: {
    paddingLeft: "40%",
    marginBottom: "-50px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "0px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const useStyles = makeStyles(styles);

export default function TicketPage() {
    
  const classes = useStyles();

  let { id } = useParams();
  const tickets = useSelector(state => state.tickets);
  let ticket = null;
  if(tickets) {
    ticket = tickets.find(proj => proj.id === id);
  } else{
    return(<div> tickets could not be fetched</div>)
  }


  // Grid item heights change depending on h4 text for some reason????
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Details for ticket: {id}</h4>
        <p className={classes.cardCategoryWhite}>
          Back | Edit
        </p>
      </CardHeader>
      <CardBody>
        <Grid container spacing={0} >
            <Grid container item xs={6} spacing={0} direction="column">
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Title</div>
                        <h4>{ticket.title}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Description</div>
                        <h4>{ticket.description}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Assigned developer</div>
                        <h4>{ticket.assignedTo.username}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Submitter</div>
                        <h4>{ticket.user.username}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Project</div>
                        <h4>{ticket.project.title}</h4>
                    </div>
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={0} direction="column">
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Priority</div>
                        <h4>{ticket.priority}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Status</div>
                        <h4>{ticket.open? "Open":"Closed"}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Type</div>
                        <h4>{ticket.type}</h4>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.typo}>
                        <div className={classes.note}>Created</div>
                        <h4>{ticket.created}</h4>
                    </div>
                </Grid>
                <Grid item>
                <div className={classes.typo}>
                    <div className={classes.note}>Updated</div>
                    <h4>{ticket.updated? ticket.updated: "no updates so far"}</h4>
                </div>
                </Grid>
            </Grid>
        </Grid>        
      </CardBody>
    </Card>
  );
}
