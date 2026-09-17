import type { IncidentInput } from '../types/decision'

export const CRITICAL_EXAMPLE: IncidentInput = {
  requestType: 'bug-critico',
  severity: 'critica',
  impact: 'critico',
  affectedUsers: 850,
  urgency: 'inmediata',
  estimatedHours: 3,
  dependencies: 'baja',
  description:
    'Error en producción que impide realizar pagos a cientos de usuarios. El checkout falla al confirmar la transacción.',
}

export const LOW_PRIORITY_EXAMPLE: IncidentInput = {
  requestType: 'mejora',
  severity: 'baja',
  impact: 'bajo',
  affectedUsers: 2,
  urgency: 'puede-esperar',
  estimatedHours: 40,
  dependencies: 'media',
  description:
    'Ajustar el espaciado entre botones en el panel de configuración para que sea más consistente con el resto de la interfaz.',
}
