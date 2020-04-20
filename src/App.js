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
import RoomIndex from './pages/RoomsIndex';
import Home from './pages/Home';
import Login from './pages/Login';
import {ProtectedUserRoute} from './utils/UserLoggedOnly';

export default function App() {

  return(
  <Router>
    
    <Switch>

      <ProtectedUserRoute
        component={LoadRoom}
        exact 
        path="/room/*" 
      />

      <ProtectedUserRoute 
        component={RoomIndex} 
        exact 
        path="/rooms"
      />

      <Route
        component={Login}
        exact 
        path="/login" />
    
      <Route exact component={Home} path="/"/>
      
      <Route path="*">
        <PageDontExist />
      </Route>
    </Switch>

  </Router>
  )
}

