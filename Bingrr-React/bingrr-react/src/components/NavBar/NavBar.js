import React, { Component } from "react";
import "./NavBar.css";
import $ from "jquery";
import SearchResult from "../SearchResult/SearchResult";
import Search from "../../requests";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch();
  }
  state = {};
  performSearch(searchTerm) {}
  render() {
    let currentUserName = this.props.currentUser;
    return (
      <div id="navContainer">
        <nav className="navBar">
          <ul>
            <li>{currentUserName && currentUserName.userName}</li>
            <li className="navBar">
              <a href="/">Home</a>
            </li>
            <li className="navBar">
              <a href="/movie">Movies!</a>
            </li>
            <li className="navBar">
              <a href="/tv">TV Shows!</a>
            </li>
            <li className="navBar">
              <a href="/session">Sign In!</a>
            </li>
            <li className="navBar">
              <form action="/search" onSubmit={this.props.searchChangeHandler}>
                <input
                  name="search_query"
                  action="/search"
                  placeholder="Enter search term"
                />
                <button>hello</button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
