import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './pages/auth/Auth';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import System from './pages/System/System';
import AllCourses from './pages/System/All-courses/AllCourses';
import AddCourses from './pages/System/Add-courses/AddCourses';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        {/* Auth Component */}
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* System Components */}
        <Route path="system" element={<System />}>
          <Route index element={<AllCourses />} />
          <Route path="courses" element={<AllCourses />} />
          <Route path="add" element={<AddCourses />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
