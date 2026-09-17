export type RequestType =
  | 'bug-critico'
  | 'bug-funcional'
  | 'nueva-funcionalidad'
  | 'mejora'
  | 'mantenimiento'
  | 'incidente-infraestructura'

export type Severity = 'baja' | 'media' | 'alta' | 'critica'

export type Impact = 'bajo' | 'medio' | 'alto' | 'critico'

export type Urgency = 'puede-esperar' | 'normal' | 'urgente' | 'inmediata'

export type Dependencies = 'ninguna' | 'baja' | 'media' | 'alta'

export type PriorityLevel = 'baja' | 'media' | 'alta' | 'critica'

export interface IncidentInput {
  requestType: RequestType
  severity: Severity
  impact: Impact
  affectedUsers: number
  urgency: Urgency
  estimatedHours: number
  dependencies: Dependencies
  description: string
}

export interface FactorScore {
  key: 'impacto' | 'severidad' | 'usuarios' | 'urgencia' | 'dependencias' | 'tiempo'
  label: string
  value: number // 0-100, contribución normalizada del factor
  weight: number // peso relativo, en porcentaje
}

export interface AnalysisResult {
  score: number // 0-100
  priority: PriorityLevel
  recommendation: string
  explanation: string
  factors: FactorScore[]
  confidence: number // 0-100
}

export const EMPTY_INCIDENT: IncidentInput = {
  requestType: 'bug-funcional',
  severity: 'media',
  impact: 'medio',
  affectedUsers: 0,
  urgency: 'normal',
  estimatedHours: 8,
  dependencies: 'ninguna',
  description: '',
}
