import React, { Component } from "react";
import "../css/login.css";
import logo from "../imgs/logo.png";
import { connect } from "react-redux";
import Select from "react-select";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect, withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    option: false,
  };

  handleLoginSubmit = (e) => {
    const { setAuthedUser, history, location } = this.props;
    setAuthedUser(this.state.option);
    if (location.state && location.state.referre === "/") {
      history.push(`/questions`);
    } else {
      history.push(location.state.referre);
    }
  };

  handleChange = (value) => {
    this.setState({
      option: value.value,
    });
  };

  render() {
    const { users, authedUser, location } = this.props;
    if (authedUser !== null && location.state) {
      return <Redirect to={location.state.referre} />;
    }

    let userOptions = [];

    if (users !== {}) {
      const ids = Object.keys(users);
      ids.map((id) => {
        return userOptions.push({
          value: users[id].id,
          label: users[id].name,
        });
      });
    }

    return (
      <div className="login-container">
        <div className="header-container">
          <h3>Welcome to the Would You Rather App.</h3>
          <p>Pass sign in to continue</p>
        </div>
        <div className="content-body">
          <img src={logo} alt="Logo" />
          <h4>Sign in</h4>
          <Select
            options={userOptions}
            onChange={(value) => this.handleChange(value)}
          />
          <button
            disabled={this.state.option ? false : true}
            onClick={this.handleLoginSubmit}
            className={`btn ${this.state.option ? "btn-active" : ""}`}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps, { setAuthedUser })(Login));
