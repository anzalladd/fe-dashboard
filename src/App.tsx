import React, { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserProvider } from "./context/user-context";
import { StockProvider } from "./context/stock-context";

const App: React.FunctionComponent = (): ReactElement => {
  return (
    <UserProvider>
      <StockProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </StockProvider>
    </UserProvider>
  );
};

export default App;
