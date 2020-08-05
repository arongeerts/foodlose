import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import client from "../../api/client"
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { updateLoginState } from '../../util/login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Foodlose
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://foodlose-images.s3.eu-west-2.amazonaws.com/choco_mousse.jpeg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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
    backgroundColor: 'black'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    borderColor: 'red'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'black'
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const history = useHistory();


  function handleSubmit(event) {
    event.preventDefault();
    setWaiting(true)
    if (! waiting) {
      client.login(email, password).then((data) => handleSuccessfulAuth(data)).catch((data) => handleFailedAuth(data))
    }
  }

  function handleSuccessfulAuth(data) {
    setError('')
    setWaiting(false)
    history.push('/dashboard')
  }

  function handleFailedAuth(data) {
    setWaiting(false)
    if (data.status == 403) {
      setError('Gebruikersnaam of wachtwoord incorrect')
    } else {
      console.log(data)
      setError('Oeps! Er ging iets mis. Probeer het later nog eens')
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
            Inloggen
          </Typography>
          <form className={classes.form} noValidate>
            <span style={{color: 'red'}}>{error}</span>
            <TextField
              variant="outlined"
              margin="normal"
              // className={classes.input}
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              className={classes.input}
              required
              fullWidth
              name="password"
              label="Wachtwoord"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Inloggen
            </Button>
            <Spinner show={waiting} size="lg" />
            <Grid container>
              <Grid item>
                <Link href="../contact" variant="body2">
                  {"Geen account of wachtwoord vergeten? Neem contact op!"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
