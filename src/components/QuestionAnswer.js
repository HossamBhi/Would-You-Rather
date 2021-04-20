import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";
import error404 from "../imgs/404.jpg";
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
    const { handleAddQuestionAnswer, authedUser, id } = this.props;
    const { voteSelected } = this.state;

    handleAddQuestionAnswer({
      authedUser,
      qid: id,
      answer: voteSelected,
    });
  };

  render() {
    const { user, question, isAnswered } = this.props;

    if (!question) {
      return (
        <>
          <p className="error-msg">Question Not Found</p>
          <img src={error404} alt="Erorr 404 not found" />
        </>
      );
    }

    if (isAnswered) {
      const optionOne = question.optionOne;
      const optionOneLen = optionOne.votes.length;
      const optionTwo = question.optionTwo;
      const optionTwoLen = optionTwo.votes.length;
      const votedNum = optionOneLen + optionTwoLen;

      return (
        <>
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
                    {Math.floor((optionOneLen / votedNum) * 100)}%
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
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  const question = questions[id];
  if (!question) {
    return {
      question,
    };
  }
  const user = users[question.author];
  const logedUser = users[authedUser];

  return {
    user,
    question,
    isAnswered: logedUser.answers[id],
    authedUser,
    id,
  };
}

export default connect(mapStateToProps, { handleAddQuestionAnswer })(
  NewQuestion
);
