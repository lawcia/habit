import React, { Component } from "react";
import LandingPage from './containers/LandingPage/LandingPage';
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
import Axios from "axios";
export default class App extends Component {
  state = {
    loggedIn: false,
    userId: '',
    username: ''
  }

  loggedInUser = (userId, username) => {
    this.setState({ loggedIn: true, userId: userId, username: username })
  }

  loggedOutUser = () => { 
    this.setState({ loggedIn: false, userId: '', username: ''}) 
}

logoutUser = () => {
  Axios.post("/api/v1/users/logout")
  .then(() => this.loggedOutUser())
}

getUserData = () => {
  Axios.get("/api/v1/users")
  .then((res) => res.data.userLoggedIn && this.loggedInUser(res.data._id, res.data.username))
  .catch((err) => console.error(err))
} 

componentDidMount = () => {
  this.getUserData()
}

  render() {
    return (<Router>
      <div className="App">
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
                  <Link onClick={()=>this.logoutUser()} to="/">Logout</Link>
                </li>
              </div>
            }
          </ul>
        </nav>
        
        <Switch>

          {this.state.loggedIn && <Route path="/dash" render={
            (props) => <Dashboard {...props} userId={this.state.userId} username={this.state.username} />
          } />}
          {this.state.loggedIn && <Route path="/addHabit" render={(props) => <AddHabit {...props} bigState={this.state} />}
          />}
          <Route path="/">
            {this.state.loggedIn ? <Redirect to="/dash" /> : <LandingPage getUserData={this.getUserData} />}
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}


