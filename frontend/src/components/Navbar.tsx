import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/demo', label: 'Demo' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

function Navbar() {
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
        </nav>
      </div>
    </header>
  )
}

export default Navbar
