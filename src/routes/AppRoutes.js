import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../views/Home";
import AddClient from "../views/AddClient";
import Login from "../views/LogIn";
import SignUp from "../views/SignUp";
import SingleClient from "../views/SingleClient";

const ProtectedRoute = (props) => {
  if (!props.user) {
    return <Navigate to="/users/login" replace />;
  }

  return props.children;
};

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute user={props.user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/page/:pageNumber"
        element={
          <ProtectedRoute user={props.user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/login"
        element={<Login user={props.user} setUser={props.setUser} />}
      />
      <Route path="/users/signup" element={<SignUp />} />
      <Route
        path="/clients/add"
        element={
          <ProtectedRoute user={props.user}>
            <AddClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/edit/:id"
        element={
          <ProtectedRoute user={props.user}>
            <AddClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/:id"
        element={
          <ProtectedRoute user={props.user}>
            <SingleClient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
