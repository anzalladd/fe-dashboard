import * as React from "react";

type Action = { type: "getStock", stock: {}, isLoading: boolean };
type Dispatch = (action: Action) => void;
type State = { stock: any, isLoading: boolean };
type UserProviderProps = { children: React.ReactNode };

const UserContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function stockReducer(state: State, action: Action) {
  switch (action.type) {
    case "getStock": {
      return { ...state, stock: action.stock, isLoading: action.isLoading} ;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function StockProvider({ children }: UserProviderProps) {
  const [state, dispatch] = React.useReducer(stockReducer, { stock: {}, isLoading: true });
  const value = { state, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useStock() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a UserProvider");
  }
  return context;
}

export { StockProvider, useStock };
