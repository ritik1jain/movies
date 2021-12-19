import React, { useState } from 'react';
import { MenuItem, Menu, Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';
import { addToPlaylist } from '../../../actions/posts';

const Post = ({ post, playlists }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  // const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  // const [list, setList] = useState('');

  const userId = user?.result.googleId || user?.result?._id;
 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    const { myValue } = e.currentTarget.dataset;
    // setList(myValue);
    console.log(myValue);
    dispatch(addToPlaylist(post,myValue));
    setAnchorEl(null);
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post.imdbID}`);
  };

  const renderList = () => {
    let tempArray = [];
    for(var i=0; i<playlists.length; i++){
      // console.log(playlists[i]._id);
      tempArray.push(<MenuItem data-my-value={playlists[i]._id} onClick={handleClose} >{playlists[i].title}</MenuItem>)
    }
    return tempArray;
  }

  // const handleChange = e => {
  //   setList(e.target.value);
  //   console.log(list);
  //   dispatch(addToPlaylist(post,list));
  // }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
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
        {/* <Button size="small" color="secondary" onClick={() => dispatch(addToPlaylist(post._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Add To Playlist
        </Button> */}
      <Button
        // size="small" color="secondary"
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add To Playlist
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderList()}
      </Menu>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    playlists: state.posts.playlists
  }
}

export default connect(mapStateToProps)(Post);
