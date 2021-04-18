import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from "../actions/questions";
import { ADD_USER, RECIEVE_USERS } from "../actions/users";

export default function user(state = {}, action) {
  switch (action.type) {
    case RECIEVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER:
      const user = action.user;
      return {
        ...state,
        [user.id]: user,
      };
    case SAVE_QUESTION:
      const { id, author } = action.question;
      return {
        ...state,
        [state[author].id]: {
          ...state[author],
          questions: [...state[author].questions, ...[id]],
        },
      };
    case SAVE_QUESTION_ANSWER:
      const { qid, authedUser, answer } = action.questionAnswer;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
}
