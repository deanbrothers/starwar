import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  colorAlert: {
      color:'Red'
  }
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, seterrorMsg] = useState('');
  let itList=[];
  useEffect(() => {
  
  });

  const handleLogin = event => {
    event.preventDefault();
    var passmatch=  /^[0-9A-Za-z]\w{4}$/;
    var updateIndex=0;
    axios.get('https://swapi.co/api/people/').then(res => {
      for(let i=0;i<res.data.results.length;i++){
	  let item=res.data.results[i];
	  console.log(item);
          if(item.name === username && item.birth_year === password && password.match(passmatch)){
            window.location.href='/home';
            updateIndex=1;
          }
      }
      if(updateIndex===0){
         seterrorMsg('Invalid Data');
      }
      
    });

  }

  const handleChange = event => {
    event.preventDefault();
    if(event.target.name === 'username'){
        setUsername(event.target.value);
    }
    else if(event.target.name === 'password'){
        setPassword(event.target.value);
    }
  }

  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
              value={username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={password}
            />
            <div className={classes.colorAlert}>{errorMsg}
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
