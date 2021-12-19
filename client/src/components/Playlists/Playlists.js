import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import Playlist from './Playlist/Playlist';
import useStyles from './styles';

const Playlists = (props) => {
const classes = useStyles();
    
console.log(props.playlists);

if (!props.playlists.length && !props.isLoading) return 'No Playlists';

  return (
    props.isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {props.playlists?.map((list) => (
          <Grid key={list._id} item xs={12} sm={12} md={6} lg={3}>
            <Playlist post={list} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.posts.isLoading,
    playlists: state.posts.playlists
  };
};

export default connect(mapStateToProps)(Playlists);
