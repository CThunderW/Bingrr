import React, { Component } from "react";
import "./NavBar.css";
import $ from "jquery";
import SearchResult from "../SearchResult/SearchResult";
import Search from "../../requests";

const NavBar = props => {
  const { currentUser } = props;
  console.log("line 9: ", currentUser);
  // performSearch(searchTerm) {}
  // this.performSearch();
  const handleSignOutClick = event => {
    event.preventDefault();

    if (typeof props.onSignOut === "function") {
      props.onSignOut();
    }
  };

  return (
    <div id="navContainer">
      <nav className="navBar">
        <ul>
          <li className="navBar">
            <a href="/">Home</a>
          </li>
          <li className="navBar">
            <a href="/movie">Movies!</a>
          </li>
          <li className="navBar">
            <a href="/tv">TV Shows!</a>
          </li>
          {currentUser ? (
            <>
              <button color="link" onClick={handleSignOutClick}>
                Logout from {currentUser.userName}
              </button>
            </>
          ) : (
            <li>
              <a href="/session">Sign In!</a>
            </li>
          )}

          <li className="navBar">
            <form action="/search" onSubmit={props.searchChangeHandler}>
              <input
                name="search_query"
                action="/search"
                placeholder="Enter search term"
              />
              <button>Search!</button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
