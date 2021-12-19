import React, {useEffect} from 'react';
import {Paper, Grid, CircularProgress,  Typography, Divider } from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMoviesBySearch, getPlaylist, getPlaylistsByCreator} from '../../actions/posts';

import Post from '../Posts/Post/Post';
import useStyles from '../Posts/styles';

const Items = (props) => {

  const { playlist, playlists, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
console.log(id);

  useEffect(() => {
    // console.log(id);
    dispatch(getPlaylist(id));
  }, [id]);

  // useEffect(() => {
  //   if (playlist) {
  //     dispatch(getPlaylistsByCreator());
  //   }
  // }, [movie]);

  // console.log(movie);

  if (!playlist) return null;

  // const openPlaylist = (_id) => history.push(`/playlists/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // 9990978107


  // const recommendedlists = playlists.filter(({ _id }) => _id !== playlist._id);

    
// console.log(props.playlist);


  return (
    props.isLoading ? <CircularProgress /> : (
      <>
      <div className={classes.section}>
          <Typography gutterBottom variant="h5">{playlist.title.toUpperCase()}</Typography>
          <Divider />
        </div>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {playlist.items.length>0 ? playlist.items?.map((movie) => (
          <Grid key={movie.imdbID} item xs={12} sm={12} md={6} lg={3}>
            <Post post={movie} />
          </Grid>
        )) : <Typography variant="h6">
        {'No Movies'}
      </Typography>}
      </Grid>
      </>
    )
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.posts.isLoading,
    playlist: state.posts.playlist
  };
};

export default connect(mapStateToProps)(Items);
