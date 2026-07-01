import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import AddProblemPage from "./pages/AddProblemPage";
import MySubmissions from "./pages/MySubmissions";
import ProfilePage from "./pages/ProfilePage";
import ContestsPage from "./pages/ContestsPage";
import ContestDetailsPage from "./pages/ContestDetailsPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          }
        />

        <Route path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/problems" element={<ProblemsPage />} />

        <Route path="/my-submissions" element={<MySubmissions />} />

        <Route path="/contests" element={<ContestsPage />} />

        <Route path="/contests/:id" element={<ContestDetailsPage />} />

        <Route path="/problems/:id" element={<ProblemDetailsPage />} />

        <Route path="/add-problem"
          element={
            <ProtectedRoute>
              <AddProblemPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
