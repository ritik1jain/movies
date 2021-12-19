import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getMovie, getMoviesBySearch} from '../../actions/posts';
// import CommentSection from './CommentSection';
import useStyles from './styles';

const Post = () => {
  const { movie, movies, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
console.log(id);

  useEffect(() => {
    // console.log(id);
    dispatch(getMovie(id));
  }, [id]);

  useEffect(() => {
    if (movie) {
      dispatch(getMoviesBySearch(movie.Title.split(" ")[0] || 'none'));
    }
  }, [movie]);

  // console.log(movie);

  if (!movie) return null;

  const openMovie = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // 9990978107


  const recommendedmovies = movies ? movies.filter(({ imdbID }) => imdbID !== movie.imdbID) : '';

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{movie.Title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{movie.Type}
          </Typography>
          <Typography variant="body1">{`Released: ${movie.Released}`}</Typography>
          <Typography gutterBottom variant="body1" component="p">{`Plot: ${movie.Plot}`}</Typography>
          <Typography variant="h6">
            {`Directed by: ${movie.Director}`}
          </Typography>
          <Typography variant="h6">
            {`Language: ${movie.Language}`}
          </Typography>
          <Typography variant="h6">
            {`Rated: ${movie.Rated}`}
          </Typography>
          <Typography variant="h6">
            {`Runtime: ${movie.Runtime}`}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={movie.Poster || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={movie.title} />
        </div>
      </div>
      {!!recommendedmovies.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedmovies.map(({ Title, Type, Poster, imdbID, Year }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openMovie(imdbID)} key={imdbID}>
                <Typography gutterBottom variant="h6">{Title}</Typography>
                <Typography gutterBottom variant="subtitle2">{Type}</Typography>
                <Typography gutterBottom variant="subtitle2">{Year}</Typography>
                <Typography gutterBottom variant="subtitle1">{imdbID}</Typography>
                <img src={Poster} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
