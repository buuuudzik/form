import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { fetchingSelector } from '../../store/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    position: 'fixed',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%,-50%)',
    color: 'grey',
    backgroundColor: '#00000038',
    boxShadow: '10px 5px 40px 2px #00000050',
    borderRadius: '50%',
    zIndex: '1000',
  },
}));

function Spinner(props) {
  const classes = useStyles();

  if (!props.fetching) return null;

  return (
    <div className={classes.root} data-testid="spinner">
      <CircularProgress size={70} />
    </div>
  );
}

export default connect(fetchingSelector, null)(Spinner);
