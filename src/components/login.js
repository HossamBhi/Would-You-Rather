import React, { Component } from "react";
import "../css/login.css";
import logo from "../imgs/logo.png";
import { connect } from "react-redux";
import Select from "react-select";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    option: false,
  };

  handleLoginSubmit = (e) => {
    this.props.dispatch(setAuthedUser(this.state.option));
    this.props.history.push(`/questions`);
    
  };

  handleChange = (value) => {
    this.setState({
      option: value.value,
    });
  };

  render() {
    const { users } = this.props;

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

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
