import { NavLink, useNavigate } from 'react-router-dom'
import { clearStoredToken, isAuthenticated } from '../src/auth'
import { useTheme } from '../src/context/ThemeContext'

const publicNavItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const authenticated = isAuthenticated()

  const navItems = authenticated
    ? [...publicNavItems, { to: '/demo', label: 'Generate' }, { to: '/dashboard', label: 'Dashboard' }]
    : [...publicNavItems, { to: '/login', label: 'Login' }, { to: '/register', label: 'Register' }]

  const handleLogout = () => {
    clearStoredToken()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink to="/" className="brand" aria-label="Product Description Ai home">
          <span className="brand-mark">P</span>
          <span>
            <span className="brand-name">Product Description Ai</span>
            <span className="brand-tag">Fast product copy for modern stores</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}

          {authenticated ? (
            <button
              onClick={handleLogout}
              className="nav-link nav-link--button"
              type="button"
            >
              Logout
            </button>
          ) : null}

          <button
            onClick={toggleTheme}
            className="nav-link"
            aria-label="Toggle dark mode"
            style={{ cursor: 'pointer', fontSize: '1.1rem', background: 'none' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar