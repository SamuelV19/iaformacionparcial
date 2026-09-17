import type {
  IncidentInput,
  AnalysisResult,
  FactorScore,
  PriorityLevel,
  Severity,
  Impact,
  Urgency,
  Dependencies,
  RequestType,
} from '../types/decision'

/**
 * Pesos de cada factor en el score final. Suman 100.
 * Estos valores son ajustables y están documentados en el README.
 */
export const WEIGHTS = {
  impacto: 0.25,
  severidad: 0.25,
  usuarios: 0.2,
  urgencia: 0.15,
  dependencias: 0.1,
  tiempo: 0.05,
} as const

const SEVERITY_SCORE: Record<Severity, number> = {
  baja: 25,
  media: 55,
  alta: 80,
  critica: 100,
}

const IMPACT_SCORE: Record<Impact, number> = {
  bajo: 20,
  medio: 50,
  alto: 80,
  critico: 100,
}

const URGENCY_SCORE: Record<Urgency, number> = {
  'puede-esperar': 15,
  normal: 45,
  urgente: 75,
  inmediata: 100,
}

// Más dependencias implica mayor riesgo/complejidad de coordinación,
// lo que eleva la necesidad de atención temprana.
const DEPENDENCIES_SCORE: Record<Dependencies, number> = {
  ninguna: 10,
  baja: 40,
  media: 70,
  alta: 100,
}

const REQUEST_TYPE_LABEL: Record<RequestType, string> = {
  'bug-critico': 'bug crítico',
  'bug-funcional': 'bug funcional',
  'nueva-funcionalidad': 'nueva funcionalidad',
  mejora: 'mejora',
  mantenimiento: 'mantenimiento',
  'incidente-infraestructura': 'incidente de infraestructura',
}

/**
 * Convierte el número de usuarios afectados en un valor 0-100.
 * Se usa una escala por umbrales (no lineal) porque el salto de
 * "afecta a 5 personas" a "afecta a 500" no es proporcional en
 * impacto real percibido por el negocio.
 */
function scoreAffectedUsers(users: number): number {
  const n = Math.max(0, users)
  if (n === 0) return 5
  if (n <= 10) return 20
  if (n <= 50) return 40
  if (n <= 200) return 60
  if (n <= 1000) return 80
  return 100
}

/**
 * Convierte el tiempo estimado de solución (horas) en un score 0-100.
 * Las tareas rápidas de resolver puntúan más alto: representan
 * "quick wins" que conviene atender primero cuando compiten con
 * tareas de esfuerzo similar en las otras variables.
 */
function scoreEstimatedTime(hours: number): number {
  const h = Math.max(0, hours)
  if (h <= 2) return 100
  if (h <= 8) return 70
  if (h <= 24) return 40
  if (h <= 80) return 20
  return 10
}

function scoreToPriority(score: number): PriorityLevel {
  if (score <= 30) return 'baja'
  if (score <= 55) return 'media'
  if (score <= 75) return 'alta'
  return 'critica'
}

function buildFactors(input: IncidentInput): FactorScore[] {
  return [
    {
      key: 'impacto',
      label: 'Impacto',
      value: IMPACT_SCORE[input.impact],
      weight: WEIGHTS.impacto * 100,
    },
    {
      key: 'severidad',
      label: 'Severidad',
      value: SEVERITY_SCORE[input.severity],
      weight: WEIGHTS.severidad * 100,
    },
    {
      key: 'usuarios',
      label: 'Usuarios afectados',
      value: scoreAffectedUsers(input.affectedUsers),
      weight: WEIGHTS.usuarios * 100,
    },
    {
      key: 'urgencia',
      label: 'Urgencia',
      value: URGENCY_SCORE[input.urgency],
      weight: WEIGHTS.urgencia * 100,
    },
    {
      key: 'dependencias',
      label: 'Dependencias',
      value: DEPENDENCIES_SCORE[input.dependencies],
      weight: WEIGHTS.dependencias * 100,
    },
    {
      key: 'tiempo',
      label: 'Tiempo estimado',
      value: scoreEstimatedTime(input.estimatedHours),
      weight: WEIGHTS.tiempo * 100,
    },
  ]
}

function computeScore(factors: FactorScore[]): number {
  const raw = factors.reduce((sum, f) => sum + f.value * (f.weight / 100), 0)
  return Math.round(Math.min(100, Math.max(0, raw)))
}

function buildRecommendation(
  input: IncidentInput,
  score: number,
  priority: PriorityLevel,
  topFactor: FactorScore,
): string {
  const typeLabel = REQUEST_TYPE_LABEL[input.requestType]

  if (priority === 'critica') {
    return `Con un score de ${score}/100, se recomienda atender este ${typeLabel} de manera inmediata. El factor más determinante fue ${topFactor.label.toLowerCase()} (${topFactor.value}/100), y con ${input.affectedUsers} usuario(s) afectado(s) el costo de esperar supera el costo de interrumpir el trabajo en curso del equipo.`
  }

  if (priority === 'alta') {
    return `Con un score de ${score}/100, se recomienda programar este ${typeLabel} dentro del ciclo de trabajo actual, idealmente en las próximas horas. ${topFactor.label} fue el factor con mayor peso (${topFactor.value}/100); no es una emergencia inmediata, pero postergarlo más allá de este sprint incrementa el riesgo.`
  }

  if (priority === 'media') {
    return `Con un score de ${score}/100, este ${typeLabel} puede incorporarse a la planificación normal del equipo. Ningún factor individual alcanzó un nivel crítico (el más alto fue ${topFactor.label.toLowerCase()} con ${topFactor.value}/100), por lo que compite en igualdad de condiciones con el resto del backlog.`
  }

  return `Con un score de ${score}/100, este ${typeLabel} puede quedar en el backlog sin urgencia. Los usuarios afectados y el impacto reportado son limitados, así que conviene revisarlo cuando no haya tareas de mayor prioridad pendientes.`
}

function buildExplanation(input: IncidentInput, factors: FactorScore[], score: number): string {
  const sorted = [...factors].sort((a, b) => b.value * b.weight - a.value * a.weight)
  const [first, second] = sorted

  const usersPhrase =
    input.affectedUsers > 0
      ? `afecta a ${input.affectedUsers} usuario(s)`
      : 'todavía no reporta usuarios afectados'

  return `El score de ${score}/100 se explica principalmente por ${first.label.toLowerCase()} (${first.value}/100) y ${second.label.toLowerCase()} (${second.value}/100). La solicitud ${usersPhrase} y su urgencia fue clasificada como "${input.urgency.replace('-', ' ')}". Estos valores se calculan de forma determinística a partir de los datos ingresados: si cambian los datos, cambia el resultado.`
}

function computeConfidence(input: IncidentInput): number {
  let confidence = 95
  if (input.description.trim().length < 20) confidence -= 12
  if (input.affectedUsers === 0) confidence -= 6
  if (input.dependencies === 'alta') confidence -= 5
  return Math.min(98, Math.max(55, confidence))
}

/**
 * Punto de entrada del motor de análisis. Puramente funcional:
 * misma entrada -> misma salida, sin aleatoriedad ni llamadas externas.
 */
export function analyzeIncident(input: IncidentInput): AnalysisResult {
  const factors = buildFactors(input)
  const score = computeScore(factors)
  const priority = scoreToPriority(score)
  const topFactor = [...factors].sort((a, b) => b.value - a.value)[0]

  return {
    score,
    priority,
    recommendation: buildRecommendation(input, score, priority, topFactor),
    explanation: buildExplanation(input, factors, score),
    factors,
    confidence: computeConfidence(input),
  }
}

export interface ValidationErrors {
  affectedUsers?: string
  estimatedHours?: string
  description?: string
}

export function validateIncident(input: IncidentInput): ValidationErrors {
  const errors: ValidationErrors = {}

  if (Number.isNaN(input.affectedUsers) || input.affectedUsers < 0) {
    errors.affectedUsers = 'Ingresa un número de usuarios válido (0 o más).'
  }

  if (Number.isNaN(input.estimatedHours) || input.estimatedHours <= 0) {
    errors.estimatedHours = 'Ingresa una estimación de tiempo mayor a 0.'
  }

  if (input.description.trim().length < 10) {
    errors.description = 'Describe brevemente la situación (mínimo 10 caracteres).'
  }

  return errors
}
