import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    voteSelected: "",
  };

  optionChange = (e) => {
    this.setState({
      voteSelected: e.target.value,
    });
  };

  voteQuestion = (e) => {
    const { dispatch, authedUser, id } = this.props;
    const { voteSelected } = this.state;

    dispatch(
      handleAddQuestionAnswer({
        authedUser,
        qid: id,
        answer: voteSelected,
      })
    );
  };

  render() {
    const { user, question, isAnswered } = this.props;
   
    if (isAnswered) {
      const optionOne = question.optionOne;
      const optionOneLen = optionOne.votes.length;
      const optionTwo = question.optionTwo;
      const optionTwoLen = optionTwo.votes.length;
      const votedNum = optionOneLen + optionTwoLen;

      return (
        <div>
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
                <div
                  className={`result ${
                    isAnswered === "optionOne" ? "selected-vote" : ""
                  }`}
                >
                  <label>Would You Rather {question.optionOne.text}</label>
                  <div className="result-perc">
                    <div
                      className="result-perc-show"
                      style={{
                        width: (optionOneLen / votedNum) * 100 * 1 + "%",
                      }}
                    >
                      {Math.floor((optionOneLen / votedNum)* 100)}%
                    </div>
                  </div>
                  <p>
                    {optionOneLen} of {votedNum}
                  </p>
                </div>
                <div
                  className={`result ${
                    isAnswered === "optionTwo" ? "selected-vote" : ""
                  }`}
                >
                  <label>Would You Rather {question.optionTwo.text}</label>
                  <div className="result-perc">
                    <div
                      className="result-perc-show"
                      style={{
                        width: (optionTwoLen / votedNum) * 100 * 1 + "%",
                      }}
                    >
                      {Math.floor((optionTwoLen / votedNum) * 100)}%
                    </div>
                  </div>
                  <p>
                    {optionTwoLen} of {votedNum}
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      );
    } else {
      return (
        <div>
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
                <div className="radio-container">
                  <input
                    type="radio"
                    name="option"
                    id="option1"
                    value="optionOne"
                    onChange={this.optionChange}
                  />
                  <label htmlFor="option1">{question.optionOne.text}</label>
                </div>
                <div className="radio-container">
                  <input
                    type="radio"
                    name="option"
                    id="option2"
                    value="optionTwo"
                    onChange={this.optionChange}
                  />
                  <label htmlFor="option2">{question.optionTwo.text}</label>
                </div>
                <button
                  className="btn"
                  disabled={this.state.voteSelected === "" ? true : false}
                  onClick={this.voteQuestion}
                >
                  Vote
                </button>
              </div>
            </div>
          </Fragment>
        </div>
      );
    }
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  const question = questions[id];
  const user = users[question.author];
  const logedUser = users[authedUser];

  return {
    user,
    question,
    // isAnswered: logedUser.answers[id] !== undefined,
    isAnswered: logedUser.answers[id],
    authedUser,
    id,
  };
}

export default connect(mapStateToProps)(NewQuestion);
