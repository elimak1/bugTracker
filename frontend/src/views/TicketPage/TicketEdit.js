import React from "react";
import { useSelector, useDispatch} from 'react-redux';

import {editTicket} from '../../reducers/ticketReducer';
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



export default function TicketEdit({ticket, close}) {

  const classes = useStyles();
  const [title, setTitle] = React.useState(ticket.title);
  const [description, setDescription] = React.useState(ticket.description);
  const [assignedTo, setAssignedTo] = React.useState(ticket.assignedTo.username);
  const [message, setMessage] = React.useState("");
  const [selectedType, setSelectedType] = React.useState(ticket.type);
  const [priority, setPriority] = React.useState(ticket.priority);
  const [open, setOpen] = React.useState(ticket.open);
  const login = useSelector(state => state.login);
  const users = useSelector(state=> state.users);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorUser, setAnchorUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    try{
        const assignedId = users.find(person => person.username === assignedTo).id;

      dispatch(editTicket(title,description,selectedType,
        priority, open, assignedId, ticket.project.id, ticket.id, login.token ));
      close();
    } catch(e) {
      console.log("problem with selected fields")
      setMessage("something went wrong, make sure to choose verified user");
    }    
  }

    const ticketType = () => {

      const types = ["Bugs/Errors", "Feature request", "Document request", "Other"]
  
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = (type=null) => {
        if(!type) {
            setSelectedType(ticket.type);
        } else {
            setSelectedType(type);
        }
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

    const changePriority = () => {

      let types = ["High", "Medium", "Low", "None"];
  
      const handleClick = (event) => {
        setAnchorUser(event.currentTarget);
      };
    
      const handleClose = (type=null) => {
        if(!type) {
            setPriority(ticket.priority);
        } else {
            setPriority(type);
        }
        setAnchorUser(null);
      };
    
      return (
        <span>
          <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Select ticket priority
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
          <p>{priority}</p>        
        </span>
      );
    }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit ticket</h4>
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
                    {changePriority()}
                </GridItem>
                <GridItem xs={12} sm={12} md={7}>
                  {ticketType()}
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  
                  <CustomInput
                    labelText="Assign ticket to"
                    id="assignedTo"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setAssignedTo(event.target.value),
                    }}
                    inputProps={{
                        value: assignedTo
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <div>
                        {open? 
                        <Button color="danger" onClick={() => setOpen(false)}>Close ticket</Button>:
                        <Button color="success" onClick={() => setOpen(true)}>Open ticket</Button>
                        }
                    </div>
                  
                </GridItem>
                
            
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}
              disabled={(title && description && assignedTo)? false:true}
              >Submit</Button>
              <Button color="warning" onClick={close}
              >Cancel</Button>
              <span>{message}</span>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
