import React, {useEffect} from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as actionType from './constants/actionTypes';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Posts from './components/Posts/Posts';
import Items from './components/PlaylistDetails/Items';
import Auth from './components/Auth/Auth';
import PrivateRoute from './routers/PrivateRoute';

// import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import { reducers } from './reducers';

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => (!JSON.parse(localStorage.getItem('profile')) ? <Auth /> : <Redirect to="/posts" />)} />

          <PrivateRoute path="/posts" exact component={Home} isAuthenticated={user ? true : false}/>
          <PrivateRoute path="/posts/search" exact component={Posts} isAuthenticated={user ? true : false}/>
          <PrivateRoute path="/posts/:id" exact component={PostDetails} isAuthenticated={user ? true : false}/>
          <PrivateRoute path="/playlists/:id" exact component={Items} isAuthenticated={user ? true : false}/>
          {/* <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
          {/* <Route path="/" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> */}
        </Switch>
      </Container>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
