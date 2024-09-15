import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import System from "./pages/System/System";
import AllCourses from "./pages/System/All-courses/AllCourses";
import AddCourses from "./pages/System/Add-courses/AddCourses";
import FilterDifficulty from "./pages/System/All-courses/Filter-difficulty/FilterDifficulty";
import TableData from "./pages/System/All-courses/Table-Data/TableData";
import GetByLevel from "./pages/System/All-courses/Filter-difficulty/Get-by-level/GetByLevel";
import NotFound from './Shared/Not-found/NotFound';
import CourseDetails from './pages/System/All-courses/Course-details/CourseDetails';

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
            <Route path="courses" element={<AllCourses />}>
              <Route path=":CourseID" element={<CourseDetails />} />
              <Route index element={<TableData />} />
              <Route path="table-data" element={<TableData />} />
              <Route path="difficult" element={<FilterDifficulty />}>
                <Route path=":level" element={<GetByLevel />} />
              </Route>
            </Route>
            <Route path="add" element={<AddCourses />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
