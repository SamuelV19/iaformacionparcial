import { useState, type FormEvent, type CSSProperties, type ReactNode } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import type { IncidentInput } from '../types/decision'
import { EMPTY_INCIDENT } from '../types/decision'
import { analyzeIncident, validateIncident, type ValidationErrors } from '../utils/decisionEngine'
import { CRITICAL_EXAMPLE, LOW_PRIORITY_EXAMPLE } from '../data/examples'
import type { AnalysisResult } from '../types/decision'

interface Props {
  onResult: (result: AnalysisResult) => void
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--surface)',
  color: 'var(--ink)',
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" style={{ color: 'var(--p-critical)', fontSize: 12, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function DecisionForm({ onResult }: Props) {
  const [data, setData] = useState<IncidentInput>(EMPTY_INCIDENT)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [loading, setLoading] = useState(false)

  function update<K extends keyof IncidentInput>(key: K, value: IncidentInput[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function loadExample(example: IncidentInput) {
    setData(example)
    setErrors({})
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validation = validateIncident(data)
    setErrors(validation)

    if (Object.keys(validation).length > 0) return

    setLoading(true)

    // Animación de procesamiento breve y honesta: el cálculo real es
    // instantáneo, pero una pausa perceptible comunica que el sistema
    // está "razonando" sobre los datos, sin fingir una llamada externa.
    setTimeout(() => {
      const result = analyzeIncident(data)
      setLoading(false)
      onResult(result)
      document.querySelector('#resultado')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 900)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 'var(--space-4)' }}>
        <p style={{ fontSize: 14, margin: 0 }}>
          Completa los campos con los datos de un bug, incidente o solicitud real.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: 13, padding: '8px 14px' }}
            onClick={() => loadExample(CRITICAL_EXAMPLE)}
          >
            Cargar ejemplo crítico
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: 13, padding: '8px 14px' }}
            onClick={() => loadExample(LOW_PRIORITY_EXAMPLE)}
          >
            Cargar ejemplo de baja prioridad
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
        }}
      >
        <Field label="Tipo de solicitud" htmlFor="requestType">
          <select
            id="requestType"
            style={inputStyle}
            value={data.requestType}
            onChange={(e) => update('requestType', e.target.value as IncidentInput['requestType'])}
          >
            <option value="bug-critico">Bug crítico</option>
            <option value="bug-funcional">Bug funcional</option>
            <option value="nueva-funcionalidad">Nueva funcionalidad</option>
            <option value="mejora">Mejora</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="incidente-infraestructura">Incidente de infraestructura</option>
          </select>
        </Field>

        <Field label="Severidad" htmlFor="severity">
          <select
            id="severity"
            style={inputStyle}
            value={data.severity}
            onChange={(e) => update('severity', e.target.value as IncidentInput['severity'])}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </Field>

        <Field label="Impacto" htmlFor="impact">
          <select
            id="impact"
            style={inputStyle}
            value={data.impact}
            onChange={(e) => update('impact', e.target.value as IncidentInput['impact'])}
          >
            <option value="bajo">Bajo</option>
            <option value="medio">Medio</option>
            <option value="alto">Alto</option>
            <option value="critico">Crítico</option>
          </select>
        </Field>

        <Field label="Usuarios afectados" htmlFor="affectedUsers" error={errors.affectedUsers}>
          <input
            id="affectedUsers"
            type="number"
            min={0}
            style={inputStyle}
            value={data.affectedUsers}
            onChange={(e) => update('affectedUsers', Number(e.target.value))}
          />
        </Field>

        <Field label="Urgencia" htmlFor="urgency">
          <select
            id="urgency"
            style={inputStyle}
            value={data.urgency}
            onChange={(e) => update('urgency', e.target.value as IncidentInput['urgency'])}
          >
            <option value="puede-esperar">Puede esperar</option>
            <option value="normal">Normal</option>
            <option value="urgente">Urgente</option>
            <option value="inmediata">Inmediata</option>
          </select>
        </Field>

        <Field
          label="Tiempo estimado de solución (horas)"
          htmlFor="estimatedHours"
          error={errors.estimatedHours}
        >
          <input
            id="estimatedHours"
            type="number"
            min={0}
            step={0.5}
            style={inputStyle}
            value={data.estimatedHours}
            onChange={(e) => update('estimatedHours', Number(e.target.value))}
          />
        </Field>

        <Field label="Dependencias" htmlFor="dependencies">
          <select
            id="dependencies"
            style={inputStyle}
            value={data.dependencies}
            onChange={(e) => update('dependencies', e.target.value as IncidentInput['dependencies'])}
          >
            <option value="ninguna">Ninguna</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </Field>
      </div>

      <Field label="Descripción de la situación" htmlFor="description" error={errors.description}>
        <textarea
          id="description"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--font-body)' }}
          value={data.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Ej: Error en producción que impide realizar pagos a cientos de usuarios."
        />
      </Field>

      <div style={{ marginTop: 'var(--space-4)' }}>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={16} className="spin" />
              Analizando datos…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Ejecutar análisis
            </>
          )}
        </button>
      </div>

      <style>{`
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </form>
  )
}
