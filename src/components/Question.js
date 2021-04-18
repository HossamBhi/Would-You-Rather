import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

function Question(props) {
  const { question, user, showQuestion, id } = props;
  const match = useRouteMatch();

  if (!showQuestion) {
    return null;
  }

  return (
    <Fragment>
      <div className="header-container">
        <h3>{user.name} asks:</h3>
      </div>
      <div className="question-container">
        <div className="avatar-container">
          <img
            src={user.avatarURL}
            className="avatar"
            alt={`${user.name} avatar`}
          />
        </div>
        <div className="poll-container">
          <h5>Would You Rather</h5>
          <p>...{question.optionOne.text}</p>
          <button className="btn">
            <Link to={`${match.url}/${id}`}>View poll</Link>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

function mapStateToProps({ authedUser, questions, users }, { id, unanswered }) {
  const question = questions[id];
  const user = users[question.author];
  const logedUser = users[authedUser];

  return {
    question,
    user,
    showQuestion: (logedUser.answers[id] === undefined) === unanswered,
    // toVote: logedUser.answers[id] === undefined,
  };
}

export default connect(mapStateToProps)(Question);
