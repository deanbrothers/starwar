import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import Login from './components/login/Login';
import Home from './components/contents/Home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
