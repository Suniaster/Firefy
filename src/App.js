import React from 'react';
import 'video-react/dist/video-react.css'
import {
  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'
import PageDontExist from './pages/PageDontExist';
import LoadRoom from './pages/LoadRoom';
import RoomTest from './pages/RoomTest';
import RoomIndex from './pages/RoomsIndex';
import Home from './pages/Home';

export default function App() {
  
  return(
  <Router>
    
    <Switch>

      <Route exact path="/room/*">
        <LoadRoom />
      </Route>
      <Route exact path="/rooms">
        <RoomIndex />
      </Route>
      <Route exact path="/teste">
        <RoomTest />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <PageDontExist />
      </Route>
    </Switch>

  </Router>
  )
}

