import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMoviesBySearch} from '../../actions/posts';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = (props) => {
const classes = useStyles();
    
console.log(props.movies);

if (props.movies && props.movies.length<1 && !props.isLoading) return 'No movies';

  return (
    props.isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {props.movies?.map((movie) => (
          <Grid key={movie.imdbID} item xs={12} sm={12} md={6} lg={3}>
            <Post post={movie} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.posts.isLoading,
    movies: state.posts.movies
  };
};

export default connect(mapStateToProps)(Posts);
