import React from 'react';
import {TextField, Button, Grid, Card, CardContent, Avatar, Typography, makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useHistory} from "react-router-dom";
import {BrowserRouter as   Link} from "react-router-dom";
import Background from '../../images/buground.jpg';

import { useDispatch } from 'react-redux';
import { logIn} from '../../reducers/loginReducer.js';


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const LoginPage=  () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    
    
    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(logIn({username, password}));
        setUsername('');
        setPassword('');
      
      }

    const classes = useStyles();
    return (
      <div 
      style={{ 
      height: "100vh",
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'}}
      >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '90vh' }}
        >

            <Grid item xs={3}>
                 <Card
                 variant="outlined"
                 className={classes.paper}
                 >
                <CardContent>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography component="h1" variant="h5" align="center">
                        
                        Login
                        </Typography>
                    </Grid>
                </Grid>   
                
                    <form  noValidate autoComplete="off"
                    className={classes.form}
                    onSubmit = {handleLogin}
                    >
                        <TextField label="username" variant="filled" type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}/>
                        <div>
                        </div>
                        <TextField label="password" variant="filled" type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}/>
                        <div></div>
                        <Button variant="contained" color="primary" fullWidth type="submit" className={classes.submit}>
                            LOGIN
                        </Button>
                        <div>
                            <p>forgot <Link to="/">password</Link></p>
                            <p><Link to="/signup">create account</Link></p>
                        </div>
                    </form>
                </CardContent>
                 
                </Card>
            </Grid>   
        </Grid>   
      </div>             
    );
};

export default LoginPage;