import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { useDispatch } from 'react-redux';
// import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { deletePlaylist, getPlaylist } from '../../../actions/posts';
import useStyles from './styles';

const Playlist = ({ post }) => {
  console.log(post);
  const user = JSON.parse(localStorage.getItem('profile'));
  // const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
 

  const openPost = (e) => {
    // dispatch(getPlaylist(post._id));
    history.push(`/playlists/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.items.length>0 ? post.items[0].Poster : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.Title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body2">{post.type}</Typography>
          <Typography variant="body2">{post.createdAt}</Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.private ? 'Private' : 'Not Private'}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deletePlaylist(post._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Playlist;
