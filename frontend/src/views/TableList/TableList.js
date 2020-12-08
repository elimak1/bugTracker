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
import { useSelector} from 'react-redux';

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

  const getUserList = () => {
    if(users) {
      const pageOfUsers= users.slice((page-1)*entAmount,page*entAmount);
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
    if(users &&  users.length< page*entAmount) {
      setPage(page- 1);
    }
  }

  const entryHandler = (event) => {
    const max=users? users.length: 0;
    if(event.value <=10) {
      setEntAmout(10);
    } else if(event.value >= max) {
      setEntAmout(max);
    } else {
      setEntAmout(event.value);
    }
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of personnel</h4>
          </CardHeader>
          <CardBody>
            <p>Show  <input type="number"
            min="10"
            max={users? users.length: 0}
            value={entAmount}
     onChange={entryHandler}/>entries</p>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Role", "Email"]}
              tableData={getUserList()}
            />
            <p>
            <Button onClick= {previousHandler}>Previous</Button>
            <Button onClick= {nextHandler}>Next</Button>
              Showing {entAmount} of {users? users.length: 0} users.
            </p>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
