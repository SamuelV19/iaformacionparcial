const ITEMS = [
  'Esta herramienta es una simulación académica: no hay un modelo de machine learning entrenado ni una API de IA externa detrás del cálculo.',
  'Los resultados dependen por completo de la calidad de la información que ingresa la persona; datos incompletos producen recomendaciones menos confiables.',
  'Un sistema real de priorización necesitaría datos históricos de incidentes anteriores para calibrar sus pesos, no valores fijos definidos de antemano.',
  'Un modelo de IA real debería validarse con métricas de desempeño y revisarse periódicamente para evitar sesgos.',
  'La inteligencia artificial, real o simulada, está pensada para apoyar el criterio profesional del equipo, no para sustituirlo.',
]

export default function Limitations() {
  return (
    <section id="limitaciones" className="section">
      <div className="container">
        <p className="section-label">Limitaciones</p>
        <h2 className="section-heading">Lo que esta simulación no es.</h2>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '68ch' }}>
          {ITEMS.map((text, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 0',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span
                className="mono"
                style={{ color: 'var(--ink-faint)', fontSize: 13, flexShrink: 0, paddingTop: 2 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ fontSize: 15, color: 'var(--ink)' }}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
