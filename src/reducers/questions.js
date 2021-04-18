import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION_ANSWER,
  SAVE_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      const question = action.question;
      return {
        ...state,
        [question.id]: question,
      };
    case SAVE_QUESTION_ANSWER:
      const { qid, authedUser, answer } = action.questionAnswer;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            [state[qid][answer].votes]: state[qid][answer].votes.push(
              authedUser
            ),
          },
        },
      };
    default:
      return state;
  }
}
