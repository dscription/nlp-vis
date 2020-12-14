import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Chapter from './Chapter';

class App extends Component {
  render() {
    return (
      <>
        <Route exact path="/" render={() => <Home />} />
      </>
    );
  }
}

export default App;
