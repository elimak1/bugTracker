import React from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";

import Admin from "layouts/Admin.js";
import Login from "components/Login/Login.js";
import UserProfile from "views/UserProfile/UserProfile"
import Confirmation from "views/Confirm";
import RequestPasswordPage from "views/ForgotPassword/RequestPasswordPage";
import SetPasswordPage from "views/ForgotPassword/SetPassword";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";

import { useDispatch, useSelector} from 'react-redux';
import { initLogin} from 'reducers/loginReducer.js';
import { initUsers} from 'reducers/userReducer';
import {initProjects} from 'reducers/projectReducer';
import {initTickets} from 'reducers/ticketReducer';
import {closeNotification} from 'reducers/notificationReducer';

function App() {

  const hist = createBrowserHistory();
  const dispatch = useDispatch();


   React.useEffect( () => {
    dispatch(initUsers());
    dispatch(initLogin());
    dispatch(initProjects());
    dispatch(initTickets());
  }, []);

  const notification = useSelector(state => state.notification);

  return (
    <div>
      {notification? <Snackbar
                  place="br"
                  color={notification.color}
                  icon={AddAlert}
                  message={notification.message}
                  open={true}
                  closeNotification={() => dispatch(closeNotification())}
                  close
                />: ""}
      

    <Router history={hist}>
    <Switch>
    <Route path="/confirmation/:id">
            <Confirmation />
    </Route>
    <Route path="/login/signup">
            {useSelector(state => state.login) ? <Redirect to="/" /> : <UserProfile editMode={false} />}
    </Route>
    <Route path="/login/forgotPassword">
            {useSelector(state => state.login) ? <Redirect to="/" /> : <RequestPasswordPage />}
    </Route>
    <Route path="/password/:id">
            {useSelector(state => state.login) ? <Redirect to="/" /> : <SetPasswordPage/>}
    </Route>
    <Route path="/login">
            {useSelector(state => state.login) ? <Redirect to="/" /> : <Login />}
    </Route>
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>
    </div>
    
  );
}

export default App;