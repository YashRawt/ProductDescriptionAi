import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">
          ProductDescriptionAi
        </Link>
        <p className="navbar__tagline">Generate product descriptions in seconds</p>
      </div>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `navbar__link${isActive ? ' navbar__link--active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}