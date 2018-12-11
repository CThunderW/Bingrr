import React, { Component } from "react";
import "./CastList.css";
import { Cast } from "../../requests";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CastMember from "../CastMember/CastMember";

class CastList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    // console.log("CastProps: " + JSON.stringify(this.props));
    console.log(this.props);
    Cast.getCast(this.props.id).then(cast => {
      //   console.log("castReults: " + JSON.stringify.cast);
      this.setState({
        cast: cast,
        credits: cast.credits
      });
    });
  }
  componentDidUpdate(previousProps) {
    if (this.props !== previousProps) {
      Cast.getCast(this.props.id).then(cast => {
        this.setState({
          cast: cast,
          credits: cast.credits
        });
      });
    }
  }
  componentWillUnmount() {
    this.setState({});
  }
  render() {
    let { cast, credits } = this.state;
    // let { toSlice = [] } = this.props.credits;
    let toSlice = JSON.stringify(this.props);
    // let slicy = JSON.stringify(this.state.credits);
    // console.log("props: " + JSON.stringify(this.props));
    let slicy = { ...JSON.stringify(this.state.credits) };
    // console.log("slicy: " + toSlice);
    let testo = this.props;
    console.log("testo", testo);
    // console.log("testo: " + testo);
    // console.log("2slice: " + slicy);
    // console.log("Credits: " + this.state.credits);
    // console.log("45: " + JSON.stringify(this.state.credits));
    return (
      <div className="castlist-container">
        {testo.credits &&
          testo.credits.map(person => (
            <CastMember
              id={person.id}
              key={person.id}
              name={person.name}
              character={person.character}
              pic={person.profile_path}
            />
            // {...this.state.credits.credits} />
          ))}
      </div>
    );
  }
}

export default CastList;
