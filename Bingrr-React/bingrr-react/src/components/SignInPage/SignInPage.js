import React, { Component } from "react";
import { Session, User } from "../../requests";
import PropTypes from "prop-types";

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    // props.onSignIn -> undefined
    this.state = {
      errors: []
    };
    this.createSession = this.createSession.bind(this);
  }

  createSession = async event => {
    event.preventDefault();
    const {
      userName: { value: userName },
      password: { value: password }
    } = event.currentTarget.elements;
    console.log(event.currentTarget.elements);
    console.log("username: " + userName);
    console.log("password: " + password);
    const user = await fetch("http://localhost:4321/session", {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName,
        password
      })
    }).then(res => res.json());
    console.log("user: " + JSON.stringify(user));
    if (user.error) {
      this.setState({ errors: [user.error] });
      return;
    }
    if (typeof this.props.onSignIn === "function") {
      this.props.onSignIn();
    }
    // this.props.history.push("/");
  };
  render() {
    return (
      <main className="SignInPage">
        <h1>Sign In</h1>
        <form onSubmit={this.createSession}>
          <div>
            <label htmlFor="userName">Username</label>
            <br />
            <input type="text" name="userName" id="userName" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" id="password" />
          </div>

          <button>Sign In</button>
        </form>
      </main>
    );
  }
}
SignInPage.propTypes = {
  onSignIn: PropTypes.func,
  history: PropTypes.object
};

// export default SignInPage;
