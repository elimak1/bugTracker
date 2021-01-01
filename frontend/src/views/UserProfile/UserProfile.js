import React from "react";
import {useHistory} from "react-router-dom";
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

import {validateUsername,
validateEmail,
validatePassword,
validateLongString,
validateOther} from "../../utility/validate";

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

export default function UserProfile(props) {
  const editMode = props.editmode;

  let initValues = props.user;

  if(!initValues) {
    initValues = {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      about: "",
      password: ""
    }
  }


  const classes = useStyles();
  const history = useHistory();


  const [username, setUsername] = React.useState(initValues.username? initValues.username : "");
  const [email, setEmail] = React.useState(initValues.email? initValues.email : "");
  const [firstName, setfirstName] = React.useState(initValues.firstName? initValues.firstName : "");
  const [lastName, setLastName] = React.useState(initValues.lastName? initValues.lastName : "");
  const [company, setCompany] = React.useState(initValues.company? initValues.company : "");
  const [about, setAbout] = React.useState(initValues.company? initValues.company : "");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit= () => {
    if(!validate()) {
      setMessage("Fields missing or they don't meet requirements")
      return;
    }
    setMessage("Submitted");
    editMode? console.log("Submitting changes") : console.log("Submtting new profile");
    console.log(initValues);
  }

  const validate = () => {
    if(
      validateUsername(username) &&
      validateEmail(email) &&
      validateOther(firstName) &&
      validateOther(lastName) &&
      validateOther(company) && 
      validateLongString(about)) {
        if(password ) {
          console.log("here");
          return(validatePassword(password))
        }
        return true;
      }
  return false;
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{editMode?"Edit Profile": "Create a profile"}</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={editMode? "Username": "Username (Required)"}
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setUsername(event.target.value),
                    }}
                    inputProps={{
                        value: username
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText={editMode? "Email address": "Email address (Required)"}
                    id="email-address"
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
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setfirstName(event.target.value),
                    }}
                    inputProps={{
                        value: firstName
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setLastName(event.target.value),
                    }}
                    inputProps={{
                        value: lastName
                      }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company"
                    id="company"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setCompany(event.target.value),
                    }}
                    inputProps={{
                        value: company
                      }}
                  />
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="About me"
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setAbout(event.target.value),
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                      value: about
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
    
                  <CustomInput
                    labelText={editMode? "Password": "Password (Required)"}
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      onChange: (event) => setPassword(event.target.value),
                    }}
                    inputProps={{
                        value: password,
                        type:"password"
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <p>{editMode?"Type new password here if you wish to change it. Leave empty otherwise.": "Minimum password length 6 characters maximum 30"}</p>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}>{editMode?"Update Profile": "Create profile"}</Button>
              {editMode? "": <Button color="warning" onClick={() => history.push("/login")}>Back</Button>}
              <p>{message}</p>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
