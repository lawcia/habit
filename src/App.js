import React, { Component } from "react";
import LandingPage from './containers/LandingPage';
import Dashboard from './containers/Dashboard';
import AddHabit from './containers/AddHabit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
export default class App extends Component {
  state = {
    loggedIn: false,
  }

  loggedInUser = () => {
    this.setState({loggedIn:true})
  }

  render() {
    return (<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing Page</Link>
            </li>
            <li>
              <Link to="/dash">Dashboard</Link>
            </li>
            <li>
              <Link to="/addHabit">Add Habit</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/dash">
            <Dashboard />
          </Route>
          <Route path="/addHabit">
            <AddHabit />
          </Route>
          <Route path="/">
            {this.state.loggedIn ? <Redirect to="/dash" /> : <LandingPage loggedIn={this.loggedInUser}/>}
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}


