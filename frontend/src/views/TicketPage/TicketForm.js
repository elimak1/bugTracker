import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import {newTicket} from "../../reducers/ticketReducer"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {Menu, MenuItem} from '@material-ui/core';


const styles = {
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



export default function TicketForm({project}) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("Bugs/Errors");
  const login = useSelector(state => state.login);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    try{
      const userId = project.personnel.find(person => person.username === assignedTo).id;

      dispatch(newTicket(title,description,selectedType,
         project.id, userId, login.token));
      setMessage("submitted");
    } catch(e) {
      console.log("problem with selected fields")
      setMessage("something went wrong");
    }    
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setSelectedType("Bugs/Errors");
  }

    const ticketType = () => {

      const types = ["Bugs/Errors", "Feature request", "Document request", "Other"]
  
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = (type=null) => {
        setSelectedType(type);
        setAnchorEl(null);
      };
    
      return (
        <span>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Choose a type
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            {types.map(type => <MenuItem onClick={() =>handleClose(type)}
            key={type}
            >{type}</MenuItem> )}
          </Menu>
          <p>{selectedType}</p>        
        </span>
      );
    }

    const assignDropdown = () => {

      let types = project.personnel.map(user => user.username);
      if (!types) {
        types = ["xd"]
      }
  
      const handleClick = (event) => {
        setAnchorUser(event.currentTarget);
      };
    
      const handleClose = (type=null) => {
        setAssignedTo(type);
        setAnchorUser(null);
      };
    
      return (
        <span>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Assign to a developer
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorUser}
            keepMounted
            open={Boolean(anchorUser)}
            onClose={() => handleClose()}
          >
            {types.map(type => <MenuItem onClick={() =>handleClose(type)}
            key={type}
            >{type}</MenuItem> )}
          </Menu>
          <p>{assignedTo}</p>        
        </span>
      );
    }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create a new ticket</h4>
              <p className={classes.cardCategoryWhite}>fill fields below before submitting</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setTitle(event.target.value),
                    }}
                    inputProps={{
                        value: title
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  <CustomInput
                    labelText="Description"
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setDescription(event.target.value),
                    }}
                    inputProps={{
                        value: description
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                    {assignDropdown()}
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  {ticketType()}
                </GridItem>
                
            
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}
              disabled={(title && description && assignedTo && selectedType)? false:true}
              >Submit</Button>
              <span>{message}</span>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
