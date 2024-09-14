import './FilterDifficulty.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';


const FilterDifficulty = () => {

  const [diffcultys, setDiffcultys] = useState([]);
  const getAllDifficulties = async () => {
    await axios.get("http://localhost:3001/diff").then((response) => setDiffcultys(response.data));
  }

  useEffect(() => {
    getAllDifficulties();
  }, [])



  return (
    <div className='difficult-dashboard'>
      <div className="row">
        <div className='col-md-4'>
          <div className="nav-wrap">
            <nav className="main-nav" role="navigation">
              <ul className="unstyled list-hover-slide">
                {diffcultys.map((item) => (
                  <li key={item.id}><Link to={`${item.level}`}>{item.level}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className='col-md-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default FilterDifficulty;