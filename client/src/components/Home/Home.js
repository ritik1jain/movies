import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, connect } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';

import { getPlaylistsByCreator, getMoviesBySearch } from '../../actions/posts';

import Playlists from '../Playlists/Playlists';

import Form from '../Form/Form';
// import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = (props) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;

  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  
  
  useEffect(() => {
    dispatch(getPlaylistsByCreator(`${userId.toString()}User`));
  });
  
  // const playlist = () => {
  //   if (search.trim()) {
  //     dispatch(getPlaylistsByCreator(search));
  //     history.push(`/posts/search?searchQuery=${search || 'none'}}`);
  //   } else {
  //     history.push('/');
  //   } 
  // };

  const searchMovies = () => {
    if (search.trim()) {
      dispatch(getMoviesBySearch(search));
      history.push(`/posts/search`, {query: search});
      
    } else {
      history.push('/');
    } 
  };


  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchMovies();
    }
  };

  
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Playlists setCurrentId={setCurrentId} /> 
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Movies" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={searchMovies} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            
            <Form currentId={currentId} setCurrentId={setCurrentId} />

          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

const mapStateToProps = state => {
  return {
    isLoading : state.isLoading,
    movies: state.movies
  };
};

export default connect(mapStateToProps)(Home);
