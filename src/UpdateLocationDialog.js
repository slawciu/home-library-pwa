import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { red } from '@material-ui/core/colors';

const locations = ['Kraków', 'Gliwice', 'Imielin'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: red[500],
  },
});

UpdateLocationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function UpdateLocationDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Zmień lokalizację</DialogTitle>
      <List>
        {locations.map((location) => (
          <ListItem button onClick={() => handleListItemClick(location)} key={location}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {location[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={location} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default UpdateLocationDialog;