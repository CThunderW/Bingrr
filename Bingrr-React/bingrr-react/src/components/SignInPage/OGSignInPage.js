import React, { Component } from "react";
import { Session, User } from "../../requests";
import PropTypes from "prop-types";

const fromFormData = formData => {
  const newObj = {};

  for (let [name, value] of formData) {
    newObj[name] = value;
  }
  return newObj;
};

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    // props.onSignIn -> undefined
    this.state = {
      errors: []
    };
    this.createSession = this.createSession.bind(this);
  }
  // getUser() {
  //   return;
  //   User.current().then(currentUser => {
  //     if (currentUser.id) {
  //       this.setState({ currentUser });
  //     }
  //   });
  // }
  createSession = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("form: " + form);
    const formData = new FormData(form);
    const {
      userName: { value: userName },
      password: { value: password }
    } = event.currentTarget.elements;
    console.log("---->", formData.get("userName"));
    console.log(event.currentTarget.elements);
    console.log("username: " + userName);
    console.log("password: " + password);
    const user = await fetch("http://localhost:4321/session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: {
        userName,
        password
      }
    }).then(res => res.json());
    console.log("user: " + user);
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
    const { errors } = this.state;

    return (
      //   createSession(event) {
      //     event.preventDefault();
      //     const { currentTarget } = event;
      //     const formData = new FormData(currentTarget);

      //     Session.create(fromFormData(formData)).then(data => {
      //       if (data.status === "error") {
      //         // this.state <-- Never mutate this!

      //         // this.state.errors.push(data.message) // BAD!
      //         // `push` will mutate the errors in the state. Use
      //         // `concat` instead.

      //         this.setState({
      //           errors: [data.message]
      //         });

      //         return;
      //       }

      //       if (typeof this.props.onSignIn === "function") {
      //         this.props.onSignIn();
      //       }
      //       // The `history` prop is passed to components rendered by
      //       // the <Route> component. This `history` allows us to manipulate
      //       // the history browser including redirecting the user to another
      //       // page.
      //       this.props.history.push("/");
      //     });
      //   }

      //   render() {

      <main className="SignInPage">
        <h1>Sign In</h1>
        <form onSubmit={this.createSession}>
          {errors.length > 0 ? (
            <p className="FormErrors">{errors.join(", ")}</p>
          ) : null}
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
