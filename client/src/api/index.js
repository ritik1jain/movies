import axios from 'axios';

export const API_KEY = "a9118a3a";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/playlists/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const fetchPlaylists = (page) => API.get(`/playlists?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const fetchPlaylistsByCreator = (user) => API.get(`/playlists/creator?name=${user}`);
export const createPlaylist = (newPlaylist) => API.post('/playlists', newPlaylist);
export const addToPlaylist = (id, movie) => API.post(`/playlists/add/${id}`, movie);
export const removeFromPlaylist = (id, imdbID) => API.patch(`/playlists/add/${id}`, imdbID);
export const fetchPlaylist = (id) => API.get(`/playlists/${id}`);
export const deletePlaylist = (id) => API.delete(`/playlists/${id}`);


export const fetchMovie = (selectedMovie) => axios.get(
  `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`
);

export const fetchMovieBySearch = (searchString) => axios.get(
    `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);


