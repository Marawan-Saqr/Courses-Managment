import './FilterDifficulty.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate  } from 'react-router-dom';


const FilterDifficulty = () => {

  // Get All Difficulties
  const [diffcultys, setDiffcultys] = useState([]);
  const getAllDifficulties = async () => {
    await axios.get("http://localhost:3001/diff").then((response) => setDiffcultys(response.data));
  }

  useEffect(() => {
    getAllDifficulties();
  }, [])

  // Easy Courses Difficulty By Default
  const location = useLocation();
  if (location.pathname === '/system/filter/filter-by-difficulty') {
    return <Navigate to="easy" />;
  }

  return (
    <div className='difficult-dashboard'>
      <div className="container">
      <h4>SELECT COURSES DIFFICULTIES</h4>
      </div>
      <div className="row justify-content-between">
        <div className='col-md-4'>
          <div className="nav-wrap">
            <nav className="main-nav" role="navigation">
              <ul className="unstyled list-hover-slide">
                {diffcultys.map((item) => (
                  <li key={item.id}><Link style={{textTransform: 'uppercase', color: 'black'}} to={`${item.level}`}>{item.level} Courses</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className='col-md-12 mt-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default FilterDifficulty;