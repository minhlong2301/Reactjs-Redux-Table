export const getUser = (data) => {
  return {
    type: "GET_USERS",
    payload: data,
  };
};

export const addUser = (value) => {
  return {
    type: "ADD_USERS",
    payload: value,
  };
};

export const deleteUser = (id) => {
  return {
    type: "DELETE_USERS",
    payload: id,
  };
};

export const updateUser = (id) => {
  return {
    type: "UPDATE_USER",
    payload: id,
  };
};

export const searchUser = (keyword) => {
  return {
    type: "SEARCH_USER",
    payload: keyword,
  };
};
