import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import "./App.css";
import Movie from "../Movie/Movie";
import Show from "../Show/Show";
// import { Router, navigate } from "@reach/router";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Landing from "../Landing/Landing";
import CastList from "../CastList/CastList";
import SearchIndex from "../SearchIndex/SearchIndex";
// import $ from "jquery";
import SignInPage from "../SignInPage/SignInPage";
import Register from "../Register/Register";
import { User, Session } from "../../requests";
import Person from "../Person/Person";
import PropTypes from "prop-types";

// import { navigate } from "@reach/router/lib/history";

// add function to fetch to search component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: "", currentUser: null };
    this.getUser = this.getUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }

  destroySession() {
    Session.destroy().then(() => this.setState({ currentUser: null }));
  }
  searchChangeHandler(event) {
    console.log("event: " + event);
    event.preventDefault();
    // const boundObject = this;
    const searchTerm = event.currentTarget.elements.search_query.value;
    console.log(searchTerm);
    this.setState({ searchTerm });
    // navigate(`/search/`);
    // boundObject.performSearch(searchTerm);
  }
  async getUser() {
    const currentUser = await fetch("http://localhost:4321/users/current", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(res => res.json());
    console.log("app.js 48: ", currentUser);
    if (currentUser.id) {
      this.setState({ currentUser });
    }
  }
  async componentDidMount() {
    await this.getUser();
    console.log("line 61: ", this.state.currentUser);
  }
  componentDidUpdate() {}
  render() {
    const { currentUser } = this.state;
    return (
      <BrowserRouter>
        <div className="grid-container">
          <div className="app1">
            <NavBar
              currentUser={currentUser}
              searchChangeHandler={this.searchChangeHandler.bind(this)}
              onSignOut={this.destroySession}
            />
          </div>
          <div className="app2">
            <SideBar />
          </div>
          <div className="app3">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/search" component={SearchIndex} />
              <Route
                exact
                path="/session"
                render={routeProps => (
                  <SignInPage {...routeProps} onSignIn={this.getUser} />
                )}
              />
              <Route exact path="/register" component={Register} />
              <Route
                exact
                path="/movie/:id"
                render={routeProps => (
                  <Movie {...routeProps} currentUser={currentUser} />
                )}
              />
              {/* // <Route path="/movie/:id" exact={true} component={Movie} /> */}
              <Route
                exact
                path="/tv/:id"
                render={routeProps => (
                  <Show {...routeProps} currentUser={currentUser} />
                )}
              />
              <Route exact path="/person/:id" component={Person} />
              <Route path="/search" searchTerm={this.state.searchTerm} />
            </Switch>
          </div>
          <div className="app4">
            <SideBar />
          </div>
          <div className="app5">Footer</div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

NavBar.propTypes = {
  currentUser: PropTypes.object,
  username: PropTypes.string,
  destroySession: PropTypes.func
};
