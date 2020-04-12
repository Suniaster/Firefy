import React from 'react';
import 'video-react/dist/video-react.css'
import {
  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom";

import Room from './pages/Room'
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'

export default function App() {
  return(
  <Router>
    
    <Switch>

      <Route path="/">
        <Room />
      </Route>
      
    </Switch>

  </Router>
  )
}

