import React, {useState} from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import Fab from '@material-ui/core/Fab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import './App.css';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import TitleIcon from '@material-ui/icons/Title';
import PersonIcon from '@material-ui/icons/Person';
import _ from 'lodash';
import { TextField } from '@material-ui/core';

const sortBooks = (books, order) => {
  switch(order) {
    case 'author':
      return _.sortBy(books, b => _.last(b.author.split(' ')));
    default:
      return _.sortBy(books, [order])
  }
}

function Home(props) {
  useFirestoreConnect([
    { collection: 'books' }
  ])
  const [order, setOrder] = useState('title')
  const rawBooks = useSelector(state => state.firestore.ordered.books)
  const {filter} = props;
  const books = sortBooks(_.filter(rawBooks, x => {
    return Object.values({t: x.title, a: x.author, l: x.location}).some(x => x.toLowerCase().toString().indexOf(filter.toLowerCase()) > -1)
  }), order)
  
  return (
      <div className="homeScreen">
        <div className="actionButton">
          <Fab href="/add">
            <AddIcon color="primary"/>
          </Fab>
        </div>
        <div className="bookList">
          {rawBooks && books.map(item => (
          <Book key={item.id} book={item} />
          ))}
        </div>
        {/* <div className="bottomIcons">
          <BottomNavigation
            value={order}
            onChange={(event, newValue) => {
              setOrder(newValue);
            }}
            showLabels
            >
            <BottomNavigationAction label="Tytuł" value="title" icon={<TitleIcon />} />
            <BottomNavigationAction label="Autor" value="author" icon={<PersonIcon />} />
            <BottomNavigationAction label="Lokalizacja" value="location" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </div> */}
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
