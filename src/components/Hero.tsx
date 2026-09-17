import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

const DEMO_SCORE = 87

/**
 * Medidor circular que "carga" hasta el score de demostración al montar
 * el componente. Es el único momento de animación no disparado por el
 * usuario en toda la página: representa, literalmente, el concepto
 * central del producto (datos crudos -> puntuación) antes de que el
 * usuario lea una sola palabra.
 */
function ScoreGauge() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(DEMO_SCORE), 300)
    return () => clearTimeout(timeout)
  }, [])

  const radius = 84
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg
      viewBox="0 0 220 220"
      width="220"
      height="220"
      role="img"
      aria-label={`Ejemplo de score calculado: ${DEMO_SCORE} sobre 100`}
    >
      <circle cx="110" cy="110" r={radius} fill="none" stroke="var(--border)" strokeWidth="14" />
      <circle
        cx="110"
        cy="110"
        r={radius}
        fill="none"
        stroke="var(--p-critical)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 110 110)"
        style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
      <text
        x="110"
        y="104"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="40"
        fontWeight="600"
        fill="var(--ink)"
      >
        {progress}
      </text>
      <text
        x="110"
        y="130"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--ink-faint)"
      >
        SCORE / 100
      </text>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="top"
      className="section"
      style={{ paddingTop: 'var(--space-6)', borderBottom: '1px solid var(--border)' }}
    >
      <div
        className="container hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 'var(--space-6)',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="section-label">DevDecision AI · Simulación académica</p>
          <h1 style={{ fontSize: 'clamp(34px, 5.5vw, 56px)', maxWidth: '16ch' }}>
            Decisiones más inteligentes para equipos de software.
          </h1>
          <p style={{ fontSize: 18, marginTop: 'var(--space-3)', maxWidth: '48ch' }}>
            Simula cómo la inteligencia artificial puede analizar múltiples variables y ayudarte a
            priorizar incidentes y tareas de desarrollo.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('#simulador')}>
              Probar análisis
              <ArrowUpRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('#como-funciona')}>
              ¿Cómo funciona?
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5)',
          }}
        >
          <ScoreGauge />
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
