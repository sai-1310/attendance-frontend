import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AttendanceForm from "./pages/AttendanceForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        }/>

        <Route path="/student" element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        }/>

        <Route path="/add" element={
          <PrivateRoute role="admin">
            <AttendanceForm />
          </PrivateRoute>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;