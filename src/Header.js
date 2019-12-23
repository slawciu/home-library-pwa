import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import { withFirebase } from 'react-redux-firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {setFilter} from './actions/display';
import { connect } from 'react-redux';
import { addBookStates } from './actions/books'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    color: 'white',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Header(props) {
  const classes = useStyles();
  const {isSignedIn, setFilter, addBookState} = props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {(!isSignedIn || addBookState !== addBookStates.NONE) && <Link href={'/'} color="inherit">
              Biblioteka Morisków
            </Link>}
            {isSignedIn && addBookState === addBookStates.NONE && 
              <div className={classes.search}>
                <InputBase
                  placeholder="Szukaj..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setFilter(e.target.value)}
                />
            </div>}
          </Typography>
          {isSignedIn && 
            <IconButton edge="end" color="inherit" onClick={() => props.firebase.auth().signOut()}>
              <ExitToAppIcon/>
            </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withFirebase(connect(state => ({
  addBookState: state.app.books.addBookState
}), dispatch => ({
  setFilter: filter => dispatch(setFilter(filter))
}))(Header))