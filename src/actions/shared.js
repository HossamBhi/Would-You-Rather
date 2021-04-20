import { recieveUser } from "../actions/users";
import { recieveQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";
import { getInitialData } from "../utils/api";
import { getDataFromLocaleStorage, STORE_STATE } from "../utils/storage";

export default function handleInitialData() {
  return (dispatch) => {
    const { users, questions, authedUser } = getDataFromLocaleStorage(
      STORE_STATE
    );
    
    // if (authedUser) {
    //   // save data from storage
    //   dispatch(setAuthedUser(authedUser));
    //   dispatch(recieveUser(users));
    //   dispatch(recieveQuestions(questions));
    // } else {
    // get data from database
    return getInitialData().then(({ users, questions }) => {
      dispatch(recieveUser(users));
      dispatch(recieveQuestions(questions));
      dispatch(setAuthedUser(authedUser || null));
    });
    // }
  };
}
