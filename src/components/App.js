import React, { Component } from "react";
import "../css/App.css";
import { connect } from "react-redux";
import handleInitialData from "../actions/shared";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Nav from "./Nav";
import Login from "./login";
import Questions from "./Questions";
import AddQuestion from "./AddQuestion";
import QuestionAnswer from "./QuestionAnswer";
import Loadboard from "./Loadboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    const { authedUser } = this.props;
    if (authedUser === null) {
      console.log("back");
    }
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Router>
        <Nav />
        <div className="App">
          <div className="app-content">
            <Route exact path="/" component={Login} />

            {!authedUser ? (
              <Redirect to="/" />
            ) : (
              <Switch>
                <Route path="/add" component={AddQuestion} />
                <Route exact path="/questions" component={Questions} />
                <Route path="/questions/:id" component={QuestionAnswer} />
                <Route path="/leaderboard" component={Loadboard} />
              </Switch>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
