import React, { Fragment } from "react";
import { connect } from "react-redux";

const Loadboard = (props) => {
  const { users, usersIds } = props;

  return (
    <ul>
      {usersIds.map((id) => (
        <User key={id} user={users[id]} />
      ))}
    </ul>
  );
};

function User(props) {
  const user = props.user;
  const answers = Object.keys(user.answers).length;
  const questions = user.questions.length;

  return (
    <Fragment>
      <div className="header-container">
        <h3>{user.name}</h3>
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
          <p>Answeres Question: {answers}</p>
          <p>Created Questions: {questions}</p>
          <p>Total Score: {answers + questions}</p>
        </div>
      </div>
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
    usersIds: Object.keys(users).sort((a, b) => {
      const answersb = Object.keys(users[b].answers).length;
      const answersa = Object.keys(users[a].answers).length;
      const questionsb = users[b].questions.length;
      const questionsa = users[a].questions.length;

      return answersb + questionsb - (answersa + questionsa);
    }),
  };
}

export default connect(mapStateToProps)(Loadboard);
