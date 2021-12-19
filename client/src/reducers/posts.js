import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_PLAYLIST, FETCH_MOVIE, ADDTOPLAYLIST, CREATEPLAYLIST, DELETEPLAYLIST, REMOVEFROMPLAYLIST } from '../constants/actionTypes';

export default ( 
  state = { isLoading: true, movies: [], playlists: [] }, 
  action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        movies: action.payload.data
      };
    case FETCH_BY_SEARCH:
      return { ...state, movies: action.payload.data };
    case FETCH_BY_CREATOR:
      return { ...state, playlists: action.payload.data };
    case FETCH_MOVIE:
      return { ...state, movie: action.payload.movie };
    case FETCH_PLAYLIST:
      return { ...state, playlist: action.payload.playlist };
    case ADDTOPLAYLIST:
      case REMOVEFROMPLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist._id == +action.payload._id) {
            return action.payload;
          }
          return playlist;
        }),
      };
    case CREATEPLAYLIST:
      return { ...state, playlists: [...state.playlists, action.payload] };
    // case UPDATE:
    //   return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETEPLAYLIST:
      return { ...state, playlists: state.playlists.filter((playlist) => playlist._id !== action.payload) };
    default:
      return state;
  }
};

