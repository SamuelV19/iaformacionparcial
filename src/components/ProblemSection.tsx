import { Clock, AlertTriangle, Users, Target } from 'lucide-react'

const CONSEQUENCES = [
  {
    icon: Clock,
    title: 'Retrasos en entregas',
    text: 'El tiempo del equipo se dedica a lo más ruidoso, no a lo más importante.',
  },
  {
    icon: AlertTriangle,
    title: 'Problemas en producción',
    text: 'Un incidente grave queda detrás de tareas menores por simple orden de llegada.',
  },
  {
    icon: Users,
    title: 'Usuarios afectados por más tiempo',
    text: 'Sin un criterio claro, quien más impacto sufre no siempre se atiende primero.',
  },
  {
    icon: Target,
    title: 'Prioridades poco consistentes',
    text: 'Cada persona del equipo prioriza distinto según su intuición del momento.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problema" className="section">
      <div className="container">
        <p className="section-label">El problema</p>
        <h2 className="section-heading">
          Todo llega al mismo tiempo. No todo tiene el mismo peso.
        </h2>
        <p className="section-intro">
          Los equipos de software reciben constantemente bugs, incidentes, solicitudes y nuevas
          funcionalidades. Cuando la prioridad se decide solo por intuición o por quién reclama
          más fuerte, aparecen consecuencias predecibles:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {CONSEQUENCES.map(({ icon: Icon, title, text }) => (
            <div key={title} style={{ borderTop: '2px solid var(--ink)', paddingTop: 16 }}>
              <Icon size={20} color="var(--brand)" strokeWidth={1.8} />
              <h3 style={{ fontSize: 16, marginTop: 12, marginBottom: 6 }}>{title}</h3>
              <p style={{ fontSize: 14 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
