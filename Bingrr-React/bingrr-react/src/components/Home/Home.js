/** @jsx jsx */

import { Component } from "react";
import { Trending } from "../../requests";
import { css, jsx } from "@emotion/core";
import ListItem from "../listItem/ListItem";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./Home.css";

class Home extends Component {
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
    return !movieResult.length ? (
      <LoadingScreen />
    ) : (
      <div className="container-single">
        <div className="row">
          <div
            className="col-1"
            css={css`
              border: 1px dotted purple;
              padding: 1px;
              margin: 1px;
            `}
          />

          <div
            className="col-10"
            css={css`
              background-color: beige;
            `}>
            <div className="row">
              <ul id="popularMovies" className="col-6 text-center">
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
              <ul id="popularTV" className="col-6 text-center">
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
            <hr />
            <h5>
              <span className="plot text-center">paragraph</span>
            </h5>
            <h3>
              <p className="plot text-center" />
            </h3>
            <h3>
              <p className="plot text-center" />
            </h3>
            <h3>
              <p className="plot text-center" />
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
