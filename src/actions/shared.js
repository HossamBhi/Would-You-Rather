import { recieveUser } from "../actions/users";
import { recieveQuestions } from "../actions/questions";
import { getInitialData } from "../utils/api";

export default function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(recieveUser(users));
      dispatch(recieveQuestions(questions));
    });
  };
}
