import React from "react";
import {useHistory} from "react-router-dom";
import { useDispatch} from 'react-redux';
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

import {validateEmail} from "../../utility/validate";
import axios from "axios";
import {customNotification} from "../../reducers/notificationReducer";

const BASEURL = 'http://localhost:3001/login/';
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

export default function RequestPasswordPage() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit= async () => {
    if(!validateEmail(email)) {
      setMessage("Email is not valid")
      return;
    }
    try {
        await axios.post(BASEURL +"passwordChange", {email});
        dispatch(customNotification("Link to change your password has been sent to your email","info"));
        history.push("/login")
        
    } catch(e) {
        dispatch(customNotification("Email address not found","danger"));
    }
    
  }

  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Type your email address</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
    
                  <CustomInput
                    labelText="Email Address"
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setEmail(event.target.value),
                    }}
                    inputProps={{
                        value: email
                      }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}>SUBMIT</Button>
              <span>{message}</span>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
