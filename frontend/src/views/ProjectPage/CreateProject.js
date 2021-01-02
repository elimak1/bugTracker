import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import {newProject} from '../../reducers/projectReducer';
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

import {validateTitle, validateDescription} from "../../utility/validate";


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



export default function CreateProject() {
  const history = useHistory();
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [message, setMessage] = React.useState("");
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newProject(title, description, login.token));
    setTitle("");
    setDescription("");
    setMessage("submitted");
    history.push("/admin/projects")

}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create a new Project</h4>
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
            
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleSubmit}
              disabled={(validateTitle(title) && validateDescription(description) )? false:true}
              >Submit</Button>
              <span>{message}</span>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
