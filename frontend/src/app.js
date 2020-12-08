import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import { Button } from '@material-ui/core';
import { createBrowserHistory } from "history";

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "components/Login/Login.js";
import "assets/css/material-dashboard-react.css?v=1.9.0";

import { useDispatch, useSelector} from 'react-redux';
import { initLogin} from 'reducers/loginReducer.js';
import { initUsers} from 'reducers/userReducer';
import { Store } from '@material-ui/icons';

function App() {

  const hist = createBrowserHistory();
  const dispatch = useDispatch();


   React.useEffect( () => {
    dispatch(initUsers());
    dispatch(initLogin());
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