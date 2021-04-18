import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authedUser";

function Nav(props) {
  const { authedUser, user, dispatch, history } = props;

  function handleLogoutUser() {
    dispatch(logoutUser());
  }
  function checkAuthedUser() {
    if (authedUser === null) {
      history.push("/");
    }
  }
  return (
    <nav className="nav">
      <ul onClick={checkAuthedUser}>
        <li>
          <NavLink to="/questions" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            loadboard
          </NavLink>
        </li>
        {authedUser && (
          <li className="logout">
            <p>
              <img
                src={user.avatarURL}
                className="avatar"
                alt={`${user.name} avatar`}
              />
              Hello {user.name}
            </p>
            <NavLink
              activeClassName="active"
              exact
              to="/"
              onClick={handleLogoutUser}
            >
              logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    user: users[authedUser],
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
