import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { USER_LOGOUT } from './graphql/authQueries';
import { DngnCntxt } from './App';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  authButton: {
    marginLeft: 'auto',
  },
  homeButton: {
    textTransform: 'none',
    color: '#fff',
  },
}))

export default function TopBar(props: any): React.ReactElement {
  const classes = useStyles();
  const [ logout/*, { data } */ ] = useMutation(USER_LOGOUT);
  const { loggedIn, setLoggedIn, setCurrentUser } = useContext(DngnCntxt);

  const handleLogout = (): void => {
    logout();
    setLoggedIn(false);
    setCurrentUser({ username: '', _id: '' });
  }
  const logoutButton = loggedIn
    ? <Button
        onClick={ handleLogout }
        className={ classes.authButton } >
        Logout
      </Button>
    : null // don't show a button if not logged in

  return (
    <div className={ classes.root } >
      <AppBar position='static'>
        <Toolbar className={ classes.toolbar } >
          <Button children={
            <Typography
              variant='h4' >
              DngnBddy
            </Typography> }
            variant='outlined'
            href='/'
            className={ classes.homeButton } />
          { logoutButton }
        </Toolbar>
      </AppBar>
    </div>
  )
}