import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Questions extends Component {
  state = {
    unanswerActive: true,
  };

  showAnswered = (e) => {
    this.setState({
      unanswerActive: false,
    });
  };

  showUnanswered = () => {
    this.setState({
      unanswerActive: true,
    });
  };

  render() {
    const { qids } = this.props;

    return (
      <Fragment>
        <div className="tabs">
          <button
            className={`tab ${this.state.unanswerActive ? "tab-active" : ""}`}
            onClick={this.showUnanswered}
          >
            Unanswered Questions
          </button>
          <button
            className={`tab ${this.state.unanswerActive ? "" : "tab-active"}`}
            onClick={this.showAnswered}
          >
            Answered Questions
          </button>
        </div>
        <div className="questions">
          {qids.map((id) => {
            return (
              <div className="question" key={id}>
                <Question id={id} unanswered={this.state.unanswerActive} />
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    qids: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Questions);
