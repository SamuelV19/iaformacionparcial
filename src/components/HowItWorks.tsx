const STEPS = [
  {
    number: '01',
    title: 'Ingresar información',
    text: 'Describes el bug, incidente o solicitud: severidad, impacto, usuarios afectados y urgencia.',
  },
  {
    number: '02',
    title: 'Analizar variables',
    text: 'El motor traduce cada variable cualitativa en un valor numérico comparable entre sí.',
  },
  {
    number: '03',
    title: 'Calcular prioridad',
    text: 'Un score ponderado de 0 a 100 combina todas las variables según su peso relativo.',
  },
  {
    number: '04',
    title: 'Generar recomendación',
    text: 'El sistema explica qué factores pesaron más y qué acción conviene tomar primero.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="container">
        <p className="section-label">Cómo funciona</p>
        <h2 className="section-heading">Cuatro pasos, siempre en el mismo orden.</h2>
        <p className="section-intro">
          El proceso es determinístico: los mismos datos siempre producen el mismo resultado.
        </p>

        <ol
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {STEPS.map((step, i) => (
            <li
              key={step.number}
              style={{
                padding: 'var(--space-4)',
                borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                background: 'var(--surface)',
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 600 }}
              >
                {step.number}
              </span>
              <h3 style={{ fontSize: 16, marginTop: 10, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ fontSize: 14 }}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
