import React, { Component } from "react";
import LandingPage from './containers/LandingPage';
import Dashboard from './containers/Dashboard';
import AddHabit from './containers/AddHabit';
import './App.css'
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

  refreshPage(){ 
    window.location.reload(); 
}

  render() {
    return (<Router>
      <body>
      <div>
        <nav>
          <ul>
            {this.state.loggedIn &&
              <div className="nav">
                <li>
                  <Link to="/dash">Dashboard</Link>
                </li>
                <li>
                  <Link to="/addHabit">Add Habit</Link>
                </li>
                <li>
                  <Link onClick={()=>this.refreshPage()} to="/">Logout</Link>
                </li>
              </div>
            }
          </ul>
        </nav>
        <h1>Habit</h1>
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
      </body>
    </Router>
    )
  }
}


