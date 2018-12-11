import React, { Component } from "react";
import { Trending } from "../../requests";
import "./Show.css";
import CastList from "../CastList/CastList";
import SocketChat from "../SocketChat/SocketChat";

class Show extends Component {
  state = {};
  componentDidMount() {
    Trending.getShow(this.props.id).then(result => {
      this.setState({
        tvResult: result.singleData,
        credits: result.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    if (this.props.location.href !== previousProps.location.href) {
      Trending.getShow(this.props.id).then(result => {
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
          <CastList id={tvResult.id} credits={credits} />
        </div>

        <div id="show-details" />
        {/* <SocketChat /> */}
      </div>
    );
  }
}

export default Show;
