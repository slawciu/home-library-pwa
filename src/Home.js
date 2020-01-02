import React, {useState} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Book from './Book';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/LibraryAdd';
import './App.css';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import _ from 'lodash';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const useStyles = makeStyles(theme => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const sortBooks = (books, order) => {
  switch(order) {
    case 'author':
      return _.sortBy(books, b => _.last(b.author.split(' ')));
    default:
      return _.sortBy(books, [order])
  }
};

const actions = [
  { 
    icon: <AddIcon />, 
    name: 'Nowa książka',
    onClick: props => props.history.push('/add')
  },
  { 
    icon: <PersonIcon />, 
    name: 'Wypożycz' ,
    onClick: props => props.history.push('/lend')
  },
  { 
    icon: <LocalLibraryIcon />, 
    name: 'Oddaj',
    onClick: props => props.history.push('/return')
  }
];

function Home(props) {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('up');
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  useFirestoreConnect([
    { collection: 'books' }
  ])
  const [order] = useState('title')
  const rawBooks = useSelector(state => state.firestore.ordered.books)
  const {filter} = props;
  const books = sortBooks(_.filter(rawBooks, x => {
    return Object.values({t: x.title, a: x.author, l: x.location}).some(x => x.toLowerCase().toString().indexOf(filter.toLowerCase()) > -1)
  }), order)
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  console.log(props)
  return (
      <div className="homeScreen">
        <div className="actionButton">
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => action.onClick(props)}
            />
          ))}
        </SpeedDial>
        </div>
        <div className="bookList">
          {rawBooks && books.map(item => (
          <Book key={item.id} book={item} />
          ))}
        </div>
    </div>
  );
}

export default connect(
  state => {
    return {
      filter: state.app.display.filter
    }
  }, dispatch => ({})
)(Home);
