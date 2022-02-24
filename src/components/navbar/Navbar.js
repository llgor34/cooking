import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Searchbar from '../searchbar/Searchbar';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav>
        <NavLink to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </NavLink>
        <Searchbar />
        <NavLink to="/create">Create Recipe</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
