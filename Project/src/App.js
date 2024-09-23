import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import System from "./pages/System/System";
import AllCourses from "./pages/System/courses/AllCourses";
import AddCourses from "./pages/System/courses/Add-courses/AddCourses";
import FilterDifficulty from "./pages/System/Filters/Filter-difficulty/FilterDifficulty";
import TableData from "./pages/System/courses/Table-Data/TableData";
import GetByLevel from "./pages/System/Filters/Filter-difficulty/Get-by-level/GetByLevel";
import NotFound from './Shared/Not-found/NotFound';
import CourseDetails from './pages/System/courses/Course-details/CourseDetails';
import UpdateCourses from './pages/System/courses/Update-courses/UpdateCourses';
import Users from './pages/System/Users/Users';
import UserDetails from './pages/System/Users/User-details/UserDetails';
import UpdateUser from './pages/System/Users/Update-user/UpdateUser';
import TableDataUsers from './pages/System/Users/Table-data-users/TableDataUsers';
import CreateUser from './pages/System/Users/Create-user/CreateUser';
import Students from './pages/System/Students/Students';
import TableDataStudents from './pages/System/Students/Table-data-students/TableDataStudents';
import StudentDetails from './pages/System/Students/Student-details/StudentDetails';
import UpdateStudent from './pages/System/Students/Update-student/UpdateStudent';
import CreateStudent from './pages/System/Students/Create-student/CreateStudent';
import Filter from './pages/System/Filters/Filter';
import EnrolledStudents from "./pages/System/Filters/Enrolled-students/EnrolledStudents";
import GetByCourse from './pages/System/Filters/Enrolled-students/Get-by-course/GetByCourse';

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
            {/* All Courses */}
            <Route path="courses" element={<AllCourses />}>
              <Route path="details/:COURSEID" element={<CourseDetails />} />
              <Route index element={<TableData />} />
              <Route path="table-data" element={<TableData />} />
              <Route path="update/:COURSEID" element={<UpdateCourses />} />
              <Route path="add-course" element={<AddCourses />} />
            </Route>

            {/* Users */}
            <Route path="users" element={<Users />}>
              <Route index element={<TableDataUsers />} />
              <Route path="table-data-users" element={<TableDataUsers />} />
              <Route path="user-details/:USERID" element={<UserDetails />} />
              <Route path="update-user/:USERID" element={<UpdateUser />} />
              <Route path="create-user" element={<CreateUser />} />
            </Route>

            {/* Students */}
            <Route path="students" element={<Students />}>
              <Route index element ={<TableDataStudents />} />
              <Route path="table-data-students" element ={<TableDataStudents />} />
              <Route path="student-details/:STUDENTID" element ={<StudentDetails />} />
              <Route path="update-student/:STUDENTID" element ={<UpdateStudent />} />
              <Route path="create-student" element ={<CreateStudent />} />
            </Route>

            {/* Filter */}
            <Route path="filter" element={<Filter />}>
              <Route index element={<Navigate to={"./filter-courses"} />} />
              <Route path="filter-by-difficulty" element={<FilterDifficulty />}>
                <Route path=":level" element={<GetByLevel />} />
              </Route>
              <Route path="enrolled-students" element={<EnrolledStudents />}>
                <Route path=":name" element={<GetByCourse />} />
              </Route>
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
