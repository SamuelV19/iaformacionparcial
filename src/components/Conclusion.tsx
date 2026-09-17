const CAPACITIES = [
  'Procesar múltiples variables al mismo tiempo, algo que resulta lento y propenso a error hacerlo mentalmente bajo presión.',
  'Identificar patrones consistentes entre severidad, impacto y urgencia en lugar de decidir caso por caso desde cero.',
  'Reducir la carga cognitiva del equipo al convertir varios criterios en un solo número comparable.',
  'Priorizar situaciones de forma repetible, para que el mismo tipo de incidente reciba un trato similar cada vez.',
  'Proporcionar una explicación de por qué se llegó a una recomendación, no solo la recomendación en sí.',
]

export default function Conclusion() {
  return (
    <section id="conclusion" className="section" style={{ borderBottom: 'none' }}>
      <div className="container">
        <p className="section-label">Conclusión</p>
        <h2 className="section-heading">
          ¿Cómo puede la IA apoyar decisiones en ingeniería informática?
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }} className="conclusion-grid">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {CAPACITIES.map((text, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--brand)',
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <p style={{ fontSize: 15, color: 'var(--ink)' }}>{text}</p>
              </li>
            ))}
          </ul>

          <div
            style={{
              borderLeft: '2px solid var(--ink)',
              paddingLeft: 'var(--space-4)',
            }}
          >
            <p style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1.5 }}>
              Ningún score reemplaza el criterio de quien conoce el producto, al usuario y el
              contexto del negocio. Un sistema inteligente —real o simulado— ordena la
              información para que ese criterio se aplique mejor, no para que deje de aplicarse.
            </p>
            <p style={{ fontSize: 13, marginTop: 14 }}>
              La decisión final continúa siendo responsabilidad del profesional.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .conclusion-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
