import * as React from "react";

type Action = { type: "getUser", user: {}, isLoading: boolean };
type Dispatch = (action: Action) => void;
type State = { user: any, isLoading: boolean };
type UserProviderProps = { children: React.ReactNode };

const UserContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function userReducer(state: State, action: Action) {
  switch (action.type) {
    case "getUser": {
      return { ...state, user: action.user, isLoading: action.isLoading} ;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(userReducer, { user: {}, isLoading: true });
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };
