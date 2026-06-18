import { Link } from 'react-router-dom'

const steps = [
  { icon: '✏️', label: 'Add product notes' },
  { icon: '✨', label: 'AI writes description' },
  { icon: '🚀', label: 'Review & ship' },
]

function Footer() {
  return (
    <footer style={{
      fontFamily: 'Inter, system-ui, sans-serif',
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      padding: '1.5rem 1.5rem 0',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '2.5rem',
        alignItems: 'start',
        marginBottom: '1.5rem',
      }}>
        {/* Left — brand */}
        <div>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            textDecoration: 'none', marginBottom: '0.8rem',
          }}>
            <span style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: '#16a34a', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>P</span>
            <span>
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#111827', display: 'block' }}>
                Product Description Ai
              </span>
              <span style={{ fontSize: '12px', color: '#16a34a', display: 'block', marginTop: '3px' }}>
                Ek Barri Use kroge?
              </span>
            </span>
          </Link>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.8, margin: 0 }}>
            Turn short product notes into polished descriptions, then review and
            ship faster with a consistent workflow.
          </p>
        </div>

        {/* Centre — steps */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
          <div style={{ width: '1px', height: '28px', background: '#e5e7eb' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {steps.map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#6b7280' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '13px',
                }}>{icon}</div>
                {label}
              </div>
            ))}
          </div>
          <div style={{ width: '1px', height: '28px', background: '#e5e7eb' }} />
        </div>

        {/* Right — contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#9ca3af', margin: '0 0 4px',
          }}>Get in touch</p>
          <a href="mailto:rawatsurinder927@gmail.com" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none', color: '#374151', fontSize: '14px',
            padding: '8px 14px', borderRadius: '8px',
            background: '#f0fdf4', border: '1px solid #bbf7d0', width: '100%',
          }}>
             rawatsurinder927@gmail.com
          </a>
          <a href="tel:+919528161779" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            textDecoration: 'none', color: '#374151', fontSize: '14px',
            padding: '8px 14px', borderRadius: '8px',
            background: '#f0fdf4', border: '1px solid #bbf7d0', width: '100%',
          }}>
             +91 9528161779
          </a>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            color: '#374151', fontSize: '14px',
            padding: '8px 14px', borderRadius: '8px',
            background: '#f0fdf4', border: '1px solid #bbf7d0', width: '100%',
          }}>
             Mon – Fri, 9:00 AM – 5:00 PM
          </div>
        </div>
      </div>

      {/* Divider + copyright pill */}
      <div style={{ position: 'relative', height: '1px', background: '#e5e7eb' }}>
        <span style={{
          position: 'absolute', left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          background: '#fff', border: '1px solid #e5e7eb',
          borderRadius: '20px', padding: '4px 16px',
          fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap',
        }}>
          © 2026 Product Description Ai. All rights reserved.
        </span>
      </div>
      <div style={{ height: '1.2rem' }} />
    </footer>
  )
}

export default Footer
