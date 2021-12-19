import React, { useState } from 'react';
import { MenuItem, Menu, Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import {  removeFromPlaylist } from '../../../actions/posts';

const Post = ({ post, pid }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post.imdbID}`);
  };

 
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        // onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.Poster || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.Title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.Title}</Typography>
          <Typography variant="body2">{post.Year}</Typography>
          <Typography variant="body2">{moment(post.Year).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.Type}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{`IMDB: ${post.imdbID}`}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.Title}</Typography>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="secondary" onClick={() => dispatch(removeFromPlaylist(post.imdbID, pid))}>
          <DeleteIcon fontSize="small" /> &nbsp; Remove From Playlist
        </Button> */}
      </CardActions>
    </Card>
  );
};



export default Post;
