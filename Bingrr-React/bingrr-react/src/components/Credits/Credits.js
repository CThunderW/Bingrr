import React, { Component } from "react";
import "./Credits.css";
import { Cast } from "../../requests";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CastMember from "../CastMember/CastMember";
import TitleCard from "../TitleCard/TitleCard";

class Credits extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  //   componentDidMount() {rs
  //     // console.log("CastProps: " + JSON.stringify(this.props));
  //     Cast.getCast(this.props.id).then(cast => {
  //       //   console.log("castReults: " + JSON.stringify.cast);
  //       this.setState({
  //         cast: cast,
  //         credits: cast.credits
  //       });
  //     });
  //   }
  componentDidMount() {
    this.setState({
      credits: this.props.credits
    });
    console.log(this.state);
  }
  componentDidUpdate(previousProps) {
    if (this.props !== previousProps) {
      this.setState({
        credits: this.props.credits
      });
    }
  }
  //   componentDidUpdate(previousProps) {
  //     if (this.props !== previousProps) {
  //       Cast.getCast(this.props.id).then(cast => {
  //         this.setState({
  //           cast: cast,
  //           credits: cast.credits
  //         });
  //       });
  //     }
  //   }
  componentWillUnmount() {
    this.setState({});
  }
  render() {
    console.log(this.state);
    // let { credits } = this.state.credits;
    // let credits = this.state.credits;
    let testo = this.props.credits;
    // let testo = credits;
    console.log("testo: " + testo);
    // console.log("credits: " + credits);
    // console.log("2slice: " + slicy);
    // console.log("Credits: " + this.state.credits);
    // console.log("45: " + JSON.stringify(this.state.credits));
    return (
      <div id="credits-container">
        {testo &&
          testo.map(
            credit => (
              console.log(credit),
              (
                <TitleCard
                  id={credit.id}
                  key={credit.id}
                  title={credit.title}
                  type={credit.media_type}
                  character={credit.character}
                  pic={credit.poster_path}
                />
                // {...this.state.credits.credits} />
              )
            )
          )}
      </div>
    );
  }
}

export default Credits;
