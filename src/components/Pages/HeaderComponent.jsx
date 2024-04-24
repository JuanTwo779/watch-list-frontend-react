import { useState } from 'react'; 
import { useAuth } from '../Security/AuthContext';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function HeaderComponent() {
  const [navbarOpen, setNavbarOpen] = useState(false); 

  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const username = authContext.username;
  const welcomePath = '/welcome/' + username;

  function logout() {
    authContext.logout();
  }

  function toggleNavbar() {
    setNavbarOpen(!navbarOpen); 
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand ms-2 fs-4 fw-bold text-secondary" to={welcomePath}>
                Watch<span className="text-primary">ME</span>
              </Link>
              <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={'collapse navbar-collapse' + (navbarOpen ? ' show' : '')} id="navbarNavDropdown">
                <ul className="navbar-nav">
                  {isAuthenticated && (<li className="nav-item fs-6"><Link className="nav-link" to={welcomePath} onClick={toggleNavbar}>
                        Home
                      </Link></li>)}
                  {isAuthenticated && (
                    <li className="nav-item fs-6"><Link className="nav-link" to="/movies" onClick={toggleNavbar}>
                        Movies
                      </Link></li>)}
                  {isAuthenticated && (
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Award List Criteria</Tooltip>}>
                      <li className="nav-item fs-6"><Link className="nav-link" to="/award-info" onClick={toggleNavbar}>
                          Awards
                    </Link></li></OverlayTrigger>)}
                  {isAuthenticated && (
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Rating System</Tooltip>}>
                      <li className="nav-item fs-6"><Link className="nav-link" to="/rating-info" onClick={toggleNavbar}>
                          Ratings
                        </Link></li></OverlayTrigger>)}
                  {isAuthenticated && (
                    <li className="nav-item fs-6"><Link className="nav-link" to="/search" onClick={toggleNavbar}>
                        Search
                      </Link></li>)}
                </ul>
              </div>
              <div className={'collapse navbar-collapse justify-content-end' + (navbarOpen ? ' show' : '')} id="navbarNavDropdown">
                <ul className="navbar-nav">
                  {!isAuthenticated && (<li className="nav-item fs-6"><Link className="nav-link" to="/login" onClick={toggleNavbar}>
                        Login
                      </Link></li>)}
                  {isAuthenticated && (
                    <li className="nav-item fs-6"><Link className="nav-link" to="/logout" onClick={() => { logout(); toggleNavbar(); }}>
                        Logout
                      </Link></li>)}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
