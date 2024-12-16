import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Header from "./components/header";
import ProtectedContainer from "./components/protected";
import { AuthProvider } from "./context/authContext";
import { MediaProvider } from "./context/mediaContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <MediaProvider>
          <Routes>
            {routes.map((route, index) => {
              if (route.protected) {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <>
                        <Header />
                        <ProtectedContainer element={<route.component />} />
                      </>
                    }
                  />
                );
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Routes>
        </MediaProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
