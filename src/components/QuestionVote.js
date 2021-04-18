import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class QuestionVote extends Component {
  render() {
    const { user, question } = this.props;
    return (
      <Fragment>
        {/* <div className="header-container">
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
            <button className="btn" onClick={(e) => this.viewPoll(e)}>
              View poll
            </button>
          </div>
        </div> */}
      </Fragment>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  return {
    user: users[authedUser],
    question: questions[id],
  };
}
export default connect(mapStateToProps)(QuestionVote);
