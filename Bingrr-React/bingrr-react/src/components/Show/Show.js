import React, { Component } from "react";
import { Trending } from "../../requests";
import "./Show.css";
import CastList from "../CastList/CastList";
import SocketChat from "../SocketChat/SocketChat";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { tvResult: null };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Trending.getShow(id).then(result => {
      this.setState({
        tvResult: result.singleData,
        credits: result.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    const id = this.props.match.params.id;
    if (this.props.location.pathname !== previousProps.location.pathname) {
      Trending.getShow(id).then(result => {
        this.setState({
          tvResult: result.singleData,
          credits: result.credits
        });
      });
    }
  }
  componentWillUnmount() {
    this.setState({});
  }
  render() {
    let { tvResult, credits } = this.state;
    return !tvResult ? (
      <div>Loading...</div>
    ) : (
      <div id="showDisplayGrid">
        <div id="show-top">
          <h3>{tvResult.name}</h3>
          <h4>{tvResult.seasons.length} Seasons</h4>
          <h4>Network: {tvResult.networks[0].name}</h4>
          <h5>{tvResult.overview}</h5>
        </div>

        <div id="show-pic">
          <img
            src={"https://image.tmdb.org/t/p/w185/" + tvResult.poster_path}
            alt=""
          />
        </div>

        <div id="cast">
          <CastList id={tvResult.id} credits={credits} mediaType={"tv"} />
        </div>

        <div id="show-details" />
        {/* <SocketChat /> */}
      </div>
    );
  }
}

export default Show;
