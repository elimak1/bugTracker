import React from "react";
import {useHistory, useParams} from "react-router-dom";
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

import {validatePassword} from "../../utility/validate";
import axios from "axios";
import {customNotification} from "../../reducers/notificationReducer";

const BASEURL = 'https://elimaksbugtracker.herokuapp.com/api/login/';

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

export default function SetPasswordPage() {

  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  let { id} = useParams();

  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit= async () => {
    if(password1===password2 && !validatePassword(password1)) {
      setMessage("Passwords don't match or are not valid")
      return;
    }
    try {
        await axios.post(BASEURL +"setPassword", {password:password1, token:id});
        dispatch(customNotification("Password has been set","success"));
        history.push("/login")
        
    } catch(e) {
        dispatch(customNotification("Link is incorrect","danger"));
    }
    
  }

  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Enter new password</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
    
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setPassword1(event.target.value),
                    }}
                    inputProps={{
                        value: password1,
                        type: "password"
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
    
                  <CustomInput
                    labelText="Confirm password"
                    id="passwordConfirm"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setPassword2(event.target.value),
                    }}
                    inputProps={{
                        value: password2,
                        type: "password"
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
