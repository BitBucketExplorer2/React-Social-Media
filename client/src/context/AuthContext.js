import { useReducer } from "react";
import { createContext } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "62e56bfd311878c528b054db",
    username: "vivek",
    email: "vivek@gmail.com",
    password: "$2b$10$skNnvTQ5ugYpFlcIh.ttyev7CIB4aPDjw4U3xvjAufbZcJ/XvE72m",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    followers: [],
    following: [],
    isAdmin: false,
  },
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
