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
    userId: '',
    username: '',
    habits: []
  }
  getUserId = (id, username) => {
    this.setState({ userId: id, username: username })
  }
  loggedInUser = () => {
    this.setState({ loggedIn: true })
  }

  render() {
    return (<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing Page</Link>
            </li>
            {this.state.loggedIn &&
              <div>
                <li>
                  <Link to="/dash">Dashboard</Link>
                </li>
                <li>
                  <Link to="/addHabit">Add Habit</Link>
                </li>
              </div>
            }
          </ul>
        </nav>
        <Switch>

          {this.state.loggedIn && <Route path="/dash" render={
            (props) => <Dashboard {...props} userId={this.state.userId} />
          } />}
          {this.state.loggedIn && <Route path="/addHabit" render={(props) => <AddHabit {...props} bigState={this.state} />}
          />}
          <Route path="/">
            {this.state.loggedIn ? <Redirect to="/dash" /> : <LandingPage setUserId={this.getUserId} loggedIn={this.loggedInUser} />}
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}


