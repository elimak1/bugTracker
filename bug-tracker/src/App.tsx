import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import LoginPage from './components/LoginPage';
import FrontPage from './components/FrontPage';
import SignUp from './components/SignUp'
import { Button } from '@material-ui/core';

function App() {
  const [user, setUser] = React.useState<JSON | null | string>(null);

  React.useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = (logUser: string) => {
    setUser(JSON.parse(logUser));
  }

  const handleLogOut = (event: any) => {
    setUser(null);
    window.localStorage.clear();
  }
  return (
    <div>
      <Router>
        

        <Switch>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginPage onLogin={handleLogin}/>}
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/">
          <div >
          <Link  to="/" >home</Link>
          <Link  to="/login" >LLLLLLLL</Link>
          <Button onClick={handleLogOut}>LOG OUT</Button>
        </div>
          {user ? <FrontPage /> : <Redirect to="/login" />}
          
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;