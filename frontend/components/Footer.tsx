import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer site-footer--minimal">
      <div className="footer-bottom-container">
        <div className="footer-left-group">
          <div className="footer-brand-minimal">
            <span className="brand-mark-minimal">P</span>
            <span className="brand-name-minimal">Product Description Ai</span>
          </div>
          <p className="footer-copyright-minimal">
            © {new Date().getFullYear()} Product Description Ai. All rights reserved.
          </p>
        </div>

        <div className="footer-details-minimal">
          <span className="footer-detail-item">Support: rawatsurinder927@gmail.com</span>
          <span className="footer-detail-item">Phone: +91 9528161779</span>
          <span className="footer-detail-item">Hours: Mon – Fri, 9:00 AM – 5:00 PM</span>
        </div>

        <div className="footer-bottom-links-minimal">
          <Link to="/" className="footer-bottom-link-minimal">Home</Link>
          <Link to="/about" className="footer-bottom-link-minimal">About</Link>
          <a href="#" className="footer-bottom-link-minimal">Privacy Policy</a>
          <a href="#" className="footer-bottom-link-minimal">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
