import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const LINKS = [
  { href: '#problema', label: 'El problema' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#conclusion', label: 'Conclusión' },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(245, 246, 248, 0.92)',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 18,
            textDecoration: 'none',
            color: 'var(--ink)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: 'var(--brand)',
              display: 'inline-block',
            }}
          />
          DevDecision AI
        </a>

        <ul
          style={{
            display: 'none',
            listStyle: 'none',
            gap: 28,
            margin: 0,
            padding: 0,
          }}
          className="nav-links-desktop"
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: 'var(--ink-muted)',
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-primary nav-cta-desktop"
          onClick={() => scrollTo('#simulador')}
        >
          Probar análisis
          <ArrowUpRight size={16} />
        </button>

        <button
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="nav-toggle-mobile"
          style={{
            background: 'none',
            border: '1px solid var(--border-strong)',
            borderRadius: 6,
            width: 40,
            height: 40,
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div
          className="container nav-mobile-panel"
          style={{ paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                scrollTo(link.href)
                setOpen(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '8px 0',
                fontSize: 15,
                color: 'var(--ink)',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            className="btn btn-primary"
            style={{ justifyContent: 'center' }}
            onClick={() => {
              scrollTo('#simulador')
              setOpen(false)
            }}
          >
            Probar análisis
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .nav-links-desktop { display: flex !important; }
          .nav-cta-desktop { display: inline-flex !important; }
          .nav-toggle-mobile { display: none !important; }
          .nav-mobile-panel { display: none !important; }
        }
        @media (max-width: 859px) {
          .nav-cta-desktop { display: none !important; }
          .nav-toggle-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
