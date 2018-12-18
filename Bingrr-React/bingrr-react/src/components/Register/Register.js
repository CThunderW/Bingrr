import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  newUser = async event => {
    event.preventDefault();
    const {
      userName: { value: userName },
      email: { value: email },
      firstName: { value: firstName },
      lastName: { value: lastName },
      password: { value: password },
      passwordConfirm: { value: passwordConfirm }
    } = event.currentTarget.elements;
    const user = await fetch("/users", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        userName,
        email,
        firstName,
        lastName,
        password,
        passwordConfirm
      })
    }).then(res => res.json());
    if (typeof this.props.newUserCreated === "function") {
      this.props.newUserCreated();
    }
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h3>Register Today!</h3>
        <br />
        <form onSubmit={this.newUser}>
          <label htmlFor="userName">Pick a Username:</label>
          <input type="text" name="userName" />
          <br />
          <br />
          <label htmlFor="email">What is your Email?</label>
          <input type="text" name="email" />
          <br />
          <br />
          <label htmlFor="firstName">What's your First Name?</label>
          <input type="text" name="firstName" />
          <br />
          <br />
          <label htmlFor="lastName">And Last Name?</label>
          <input type="text" name="lastName" />
          <br />
          <br />
          <label htmlFor="password">Please choose a Password:</label>
          <input type="password" name="password" />
          <br />
          <br />
          <label htmlFor="passwordConfirm">Confirm your Password</label>
          <input type="password" name="passwordConfirm" />
          <br />
          <br />

          <button>Get Started!</button>
        </form>
      </div>
    );
  }
}
