import React, { Component } from "react";
import { Trending } from "../../requests";
import "./Movie.css";
import CastList from "../CastList/CastList";

class Movie extends Component {
  state = {};
  componentDidMount() {
    Trending.getMovie(this.props.id).then(result => {
      this.setState({
        movieResult: result.singleData,
        credits: result.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    if (this.props.location.href !== previousProps.location.href) {
      Trending.getMovie(this.props.id).then(result => {
        this.setState({
          movieResult: result.singleData,
          credits: result.credits
        });
      });
    }
  }
  componentWillUnmount() {
    this.setState({});
  }
  render() {
    let { movieResult, credits } = this.state;
    console.log(credits);
    return !movieResult ? (
      <div>Loading...</div>
    ) : (
      <div id="movieDisplayGrid">
        <div id="movie-top">
          <h3>{movieResult.title}</h3>
          <h5>{movieResult.tagline}</h5>
          <h5>Released: {movieResult.release_date}</h5>
          <h6>{movieResult.overview}</h6>
        </div>

        <div id="movie-pic">
          <img
            src={"https://image.tmdb.org/t/p/w185/" + movieResult.poster_path}
            alt=""
          />
        </div>

        <div id="cast">
          <CastList id={movieResult.id} credits={credits} />
        </div>

        <div id="movie-details" />
      </div>
    );
  }
}

export default Movie;
