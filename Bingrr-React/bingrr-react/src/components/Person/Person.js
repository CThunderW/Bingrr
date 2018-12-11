import React, { Component } from "react";
import { Cast } from "../../requests";
import "./Person.css";
import CastList from "../CastList/CastList";
import Credits from "../Credits/Credits";

class Person extends Component {
  state = {};
  componentDidMount() {
    Cast.getPerson(this.props.id).then(result => {
      this.setState({
        person: result.person,
        credits: result.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    if (this.props.location.href !== previousProps.location.href) {
      Cast.getPerson(this.props.id).then(result => {
        this.setState({
          person: result.person,
          credits: result.credits
        });
      });
    }
  }
  componentWillUnmount() {
    this.setState({});
  }
  render() {
    let { person, credits } = this.state;
    console.log("State line 30: " + this.state);
    return !person ? (
      <div>Loading...</div>
    ) : (
      <div id="personDisplayGrid">
        <div id="person-top">
          <h4>{person.name}</h4>
          <h5>{person.biography}</h5>
        </div>

        <div id="person-pic">
          <img
            src={"https://image.tmdb.org/t/p/w185/" + person.profile_path}
            alt=""
          />
        </div>

        <div id="credits">
          {console.log("Person50: " + credits)}
          <Credits credits={credits} />
        </div>

        <div id="person-details">
          <h3>{person.overview}</h3>
        </div>
      </div>
    );
  }
}

export default Person;
