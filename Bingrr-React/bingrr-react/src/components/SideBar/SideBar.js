/** @jsx jsx */

import { Component } from "react";
import { Trending } from "../../requests";
import { css, jsx } from "@emotion/core";
import ListItem from "../listItem/ListItem";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./SideBar.css";

class SideBar extends Component {
  state = {};
  componentDidMount() {
    Trending.getAll().then(trendingResults => {
      this.setState({
        movieResult: trendingResults.movieResult,
        tvResult: trendingResults.tvResult
      });
    });
  }
  render() {
    let { movieResult = [], tvResult = [] } = this.state;

    var navWidth = {
      width: "(rating * 10)%;"
    };
    return !movieResult.length ? (
      <LoadingScreen />
    ) : (
      <div className="container-single">
        <ul id="popularMovies">
          {movieResult.slice(0, 10).map(movie => (
            <ListItem
              id={movie.id}
              key={movie.id}
              type="movie"
              title={movie.title}
              rating={movie.vote_average}
            />
          ))}
        </ul>

        <ul id="popularTV">
          {tvResult.slice(0, 10).map(tvShow => (
            <ListItem
              id={tvShow.id}
              key={tvShow.id}
              type="tv"
              title={tvShow.name}
              rating={tvShow.vote_average}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default SideBar;
