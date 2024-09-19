import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import System from "./pages/System/System";
import AllCourses from "./pages/System/courses/AllCourses";
import AddCourses from "./pages/System/courses/Add-courses/AddCourses";
import FilterDifficulty from "./pages/System/courses/Filter-difficulty/FilterDifficulty";
import TableData from "./pages/System/courses/Table-Data/TableData";
import GetByLevel from "./pages/System/courses/Filter-difficulty/Get-by-level/GetByLevel";
import NotFound from './Shared/Not-found/NotFound';
import CourseDetails from './pages/System/courses/Course-details/CourseDetails';
import UpdateCourses from './pages/System/courses/Update-courses/UpdateCourses';
import Users from './pages/System/Users/Users';
import UserDetails from './pages/System/Users/User-details/UserDetails';
import UpdateUser from './pages/System/Users/Update-user/UpdateUser';
import TableDataUsers from './pages/System/Users/Table-data-users/TableDataUsers';

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
            <Route index element={<Navigate to={"./courses"} />} />
            <Route path="courses" element={<AllCourses />}>
              <Route path="details/:CourseID" element={<CourseDetails />} />
              <Route index element={<TableData />} />
              <Route path="table-data" element={<TableData />} />
              <Route path="difficult" element={<FilterDifficulty />}>
                <Route path=":level" element={<GetByLevel />} />
              </Route>
              <Route path="update/:COURSEID" element={<UpdateCourses />} />
            </Route>
            <Route path="add" element={<AddCourses />} />
            <Route path="users" element={<Users />}>
              <Route index element={<TableDataUsers />} />
              <Route path="table-data-users" element={<TableDataUsers />} />
              <Route path="user-details/:USERID" element={<UserDetails />} />
              <Route path="update-user/:USERID" element={<UpdateUser />} />
            </Route>
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
