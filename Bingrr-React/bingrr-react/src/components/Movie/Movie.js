import React, { Component } from "react";
import { Trending } from "../../requests";
import "./Movie.css";
import CastList from "../CastList/CastList";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movieResult: null };
  }

  componentDidMount() {
    console.log("movie mounted: ", this.props);
    console.log("id param? : ", this.props.match.params.id);
    const id = this.props.match.params.id;
    Trending.getMovie(id).then(result => {
      this.setState({
        movieResult: result.singleData,
        credits: result.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    console.log("movie updated: ", this.props);
    const id = this.props.match.params.id;
    if (this.props.location.pathname !== previousProps.location.pathname) {
      Trending.getMovie(id).then(result => {
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
    // console.log(credits);
    console.log(movieResult);
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
          <CastList id={movieResult.id} credits={credits} mediaType={"movie"} />
        </div>

        <div id="movie-details" />
      </div>
    );
  }
}

export default Movie;
