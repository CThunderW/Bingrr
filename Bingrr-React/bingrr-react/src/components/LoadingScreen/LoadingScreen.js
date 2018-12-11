import React, { Component } from "react";

class LoadingScreen extends Component {
  state = { fast: true };
  componentDidMount() {
    this.timeOut = setTimeout(() => {
      this.setState({ fast: false });
    }, 500);
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  render() {
    const style = {
      width: "100vw",
      height: "100vh",
      backgroundColor: "beige",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    return this.state.fast ? (
      <div style={style} />
    ) : (
      <div style={style}>Loading...</div>
    );
  }
}

export default LoadingScreen;
