import {Outlet} from 'react-router-dom';
import Topbar from './Topbar/Topbar';

const System = () => {
  return (
    <div className="system">
      <Topbar />
      <Outlet />
    </div>
  )
}
export default System;