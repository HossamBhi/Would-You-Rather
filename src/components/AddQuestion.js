import React, { Component, Fragment } from "react";
import "../css/addQuestion.css";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { withRouter } from "react-router-dom";

class AddQuestion extends Component {
  state = {
    option1: "",
    option2: "",
  };

  handleOption1Change = (e) => {
    this.setState({
      option1: e.target.value,
    });
  };

  handleOption2Change = (e) => {
    this.setState({
      option2: e.target.value,
    });
  };

  submitQuestion = (e) => {
    e.preventDefault();
    const { option1, option2 } = this.state;
    const { authedUser, handleAddQuestion, history } = this.props;

    if (option1 === "") {
      alert("Enter option 1");
      return;
    }
    if (option2 === "") {
      alert("Enter option 2");
      return;
    }

    const question = {
      optionOneText: option1,
      optionTwoText: option2,
      author: authedUser,
    };
    history.push("/questions");

    handleAddQuestion(question);
  };

  render() {
    return (
      <Fragment>
        <div className="header-container">
          <h3>Create New Question</h3>
        </div>
        <div className="question-container">
          <p>Wolud You rather...</p>
          <form onSubmit={this.submitQuestion}>
            <input
              onChange={this.handleOption1Change}
              type="text"
              className="input"
              value={this.state.option1}
              placeholder="Enter Option 1 text."
            />
            <h4>OR</h4>
            <input
              onChange={this.handleOption2Change}
              type="text"
              className="input"
              value={this.state.option2}
              placeholder="Enter Option 2 text."
            />
            <button className="btn">Add Question</button>
          </form>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(
  connect(mapStateToProps, { handleAddQuestion })(AddQuestion)
);
