import React from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "components/Login/Login.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

import { useDispatch, useSelector} from 'react-redux';
import { initLogin} from 'reducers/loginReducer.js';
import { initUsers} from 'reducers/userReducer';
import {initProjects} from 'reducers/projectReducer';
import {initTickets} from 'reducers/ticketReducer';

function App() {

  const hist = createBrowserHistory();
  const dispatch = useDispatch();


   React.useEffect( () => {
    dispatch(initUsers());
    dispatch(initLogin());
    dispatch(initProjects());
    dispatch(initTickets());
  }, []);

  return (
    <div>

    <Router history={hist}>
    <Switch>
    <Route path="/login">
            {useSelector(state => state.login) ? <Redirect to="/" /> : <Login />}
    </Route>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
    </div>
    
  );
}

export default App;