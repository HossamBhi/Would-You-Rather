import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

// get initial data from database then return object of users and questions
export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

// responsability is save question to database and return this saved question
// para question is object of {author ,option1, option2}
export function saveQuestion(question) {
  return _saveQuestion(question);
}

// take object of {authedUser, qid, answer}
export function saveQuestionAnswer(questionAnswer) {
  return _saveQuestionAnswer(questionAnswer);
}
