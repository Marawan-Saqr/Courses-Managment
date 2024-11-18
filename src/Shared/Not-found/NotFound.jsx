import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div class="container">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link class="back-home" to={"/system"}>Go Back to Home</Link>
      </div>
    </div>
  );
};
export default NotFound;