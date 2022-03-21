const initalState = {
  filter: {
    title: "",
    body: "",
  },
  users: [],
  show: false,
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USERS":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "DELETE_USERS": {
      return {
        ...state,
        users: state.users.filter((todo) => todo.id !== action.payload),
      };
    }

    case "UPDATE_USER": {
      return {
        ...state,
      };
    }

    case "SEARCH_USER": {
      return {
        ...state,
        filter: {
          ...state.filter,
          title: action.payload,
          body: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
