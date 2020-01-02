import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withFirestore, withFirebase } from 'react-redux-firebase'
import { useFirebase } from 'react-redux-firebase'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: '2%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Book(props) {
  const {book} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [timer, setTimer] = useState(null);
  const [image, setImage] = useState('')
  const removeBook = bookId => {
    props.firestore.delete(`books/${bookId}`)
  }
  const firebase = useFirebase();
  const handleExpandClick = () => {
    setExpanded(!expanded); 
  };

  useEffect(() => {
    if (book.metadata && book.metadata.fileName) {
      const loadUrl = async () => {
        const url = await firebase.storage().ref(`bookCovers/${book.metadata.fileName}`).getDownloadURL();
        setImage(url)
      };
      loadUrl()
    }
  }, [book.metadata, firebase])

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="location" className={classes.avatar}>
            {book.location[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={book.title}
        subheader={book.author}
      />
      {book.picture && <CardMedia
        className={classes.media}
        image={book.picture}
        title={book.title}
      />}
      {book.description && <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              {book.description}
          </Typography> 
      </CardContent>}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onTouchStart={() => setTimer(setTimeout(() => {
          removeBook(book.id);
          navigator.vibrate([500])
        }, 3000))} onTouchEndCapture={() => {
          clearTimeout(timer)
        }} aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          ISBN: {book.isbn}
          {book.metadata && <div>
            <p>Dodane przez: {book.metadata.name}</p>
            <p>Dodane w dniu: {new Date(book.metadata.time).toDateString()}</p>
            <div>
              <img className='bookCover' alt={`${book.title} cover`} src={image} />
            </div>
          </div>
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default withFirebase(withFirestore(Book));
