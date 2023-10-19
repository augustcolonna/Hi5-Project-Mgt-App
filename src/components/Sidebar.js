import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Avatar from './Avatar';
import '../styles/sidebar.css';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey there {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dash icon" />{' '}
                <span>Dashbord</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
