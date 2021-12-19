import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MOVIE, FETCH_BY_SEARCH, UPDATE, LIKE, FETCH_BY_CREATOR, REMOVEFROMPLAYLIST, ADDTOPLAYLIST, FETCH_PLAYLIST, DELETEPLAYLIST, CREATEPLAYLIST  } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.fetchMovie(id);
    console.log(response);
    dispatch({ type: FETCH_MOVIE, payload: {movie: response.data}  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPlaylist(id);
    console.log(data);
    dispatch({ type: FETCH_PLAYLIST, payload: {playlist: data}  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylistsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPlaylistsByCreator(name);

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.fetchMovieBySearch(searchQuery);
    const data = response.data.Search;
    console.log(data);
    dispatch({ type: FETCH_BY_SEARCH, payload:  { data }  });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPlaylist = (playlist, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPlaylist(playlist);

    dispatch({ type: CREATEPLAYLIST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const addToPlaylist = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.addToPlaylist(id, value);

    dispatch({ type: ADDTOPLAYLIST, payload: data });
    console.log(data);
    return data.items;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromPlaylist = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.removeFromPlaylist(id, value);

    dispatch({ type: REMOVEFROMPLAYLIST, payload: data });

    return data.items;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaylist = (id) => async (dispatch) => {
  try {
    await api.deletePlaylist(id);

    dispatch({ type: DELETEPLAYLIST, payload: id });
  } catch (error) {
    console.log(error);
  }
};


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
