import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navbar";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/auth/Profile";
import UpdatePassword from "./pages/auth/UpdatePassword";
import DeleteAccount from "./pages/auth/DeleteAccount";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import CreateSnippet from "./pages/CreateSnippet";
import EditSnippet from "./pages/EditSnippet";
import ViewSnippet from "./pages/ViewSnippet";
import Favorites from "./pages/Favorites";
import SearchResults from "./pages/SearchResults";
import TaggedSnippets from "./pages/TaggedSnippets";
import TrashPage from "./pages/TrashPage";
import { getUserProfile, clearAuthErrors } from "./store/slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (authChecked && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return authChecked ? children : null;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (authChecked && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return authChecked ? children : null;
};

const VerificationRoute = ({ children }) => {
  const { emailForVerification, loading } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setChecked(true);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (checked && !emailForVerification) {
    return <Navigate to="/register" replace />;
  }

  return checked ? children : null;
};

const App = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      dispatch(getUserProfile());
      setInitialAuthCheckDone(true);
    };

    fetchUserProfile();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(clearAuthErrors());
    }
  }, [dispatch, error]);

  if (!initialAuthCheckDone && loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <VerificationRoute>
                  <VerifyEmail />
                </VerificationRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestRoute>
                  <ForgotPassword />
                </GuestRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <GuestRoute>
                  <ResetPassword />
                </GuestRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="create" element={<CreateSnippet />} />
              <Route path="edit/:id" element={<EditSnippet />} />
              <Route path="view/:id" element={<ViewSnippet />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="tag/:tag" element={<TaggedSnippets />} />
              <Route path="trash" element={<TrashPage />} />
            </Route>

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-account"
              element={
                <ProtectedRoute>
                  <DeleteAccount />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
};

export default App;
