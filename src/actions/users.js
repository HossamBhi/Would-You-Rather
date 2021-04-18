export const RECIEVE_USERS = "RECIEVE_USERS";
export const ADD_USER = "ADD_USER";

export function recieveUser(users) {
  return {
    type: RECIEVE_USERS,
    users,
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}
