import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getMovie, getMoviesBySearch} from '../../actions/posts';
// import CommentSection from './CommentSection';
import useStyles from './styles';

const Playlist = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
// console.log(id);

  useEffect(() => {
    // console.log(id);
    dispatch(getMovie(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getMoviesBySearch('none'));
    }
  }, [post]);

  // console.log(post);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // 9990978107


  const recommendedPosts = posts.filter(({ imdbID }) => imdbID !== post.imdbID);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.Title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.Type}
          </Typography>
          <Typography variant="body1">{`Released: ${post.Released}`}</Typography>
          <Typography gutterBottom variant="body1" component="p">{`Plot: ${post.Plot}`}</Typography>
          <Typography variant="h6">
            {`Directed by: ${post.Director}`}
          </Typography>
          <Typography variant="h6">
            {`Language: ${post.Language}`}
          </Typography>
          <Typography variant="h6">
            {`Rated: ${post.Rated}`}
          </Typography>
          <Typography variant="h6">
            {`Runtime: ${post.Runtime}`}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} /> */}
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.Poster || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ Title, Type, Poster, imdbID, Year }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(imdbID)} key={imdbID}>
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

export default Playlist;
