import type { AnalysisResult as AnalysisResultType, PriorityLevel } from '../types/decision'
import FactorChart from './FactorChart'

interface Props {
  result: AnalysisResultType
}

const PRIORITY_META: Record<
  PriorityLevel,
  { label: string; color: string; bg: string }
> = {
  baja: { label: 'PRIORIDAD BAJA', color: 'var(--p-low)', bg: 'var(--p-low-bg)' },
  media: { label: 'PRIORIDAD MEDIA', color: 'var(--p-medium)', bg: 'var(--p-medium-bg)' },
  alta: { label: 'PRIORIDAD ALTA', color: 'var(--p-high)', bg: 'var(--p-high-bg)' },
  critica: { label: 'PRIORIDAD CRÍTICA', color: 'var(--p-critical)', bg: 'var(--p-critical-bg)' },
}

export default function AnalysisResult({ result }: Props) {
  const meta = PRIORITY_META[result.priority]

  return (
    <div
      id="resultado"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 'var(--space-4) var(--space-4) 0',
        }}
      >
        <div>
          <span
            className="mono"
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.03em',
              color: meta.color,
              background: meta.bg,
              padding: '4px 10px',
              borderRadius: 4,
            }}
          >
            {meta.label}
          </span>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="mono" style={{ fontSize: 44, fontWeight: 600, color: 'var(--ink)' }}>
              {result.score}
            </span>
            <span style={{ fontSize: 15, color: 'var(--ink-faint)' }}>/ 100</span>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--ink-faint)' }}>
          Confianza del análisis
          <div className="mono" style={{ fontSize: 20, color: 'var(--ink)', fontWeight: 600 }}>
            {result.confidence}%
          </div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 15, marginBottom: 8 }}>Recomendación</h3>
        <p style={{ fontSize: 15, color: 'var(--ink)', maxWidth: '70ch' }}>
          {result.recommendation}
        </p>
      </div>

      <div
        style={{
          padding: 'var(--space-4)',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-5)',
        }}
        className="result-grid"
      >
        <div>
          <h3 style={{ fontSize: 15, marginBottom: 14 }}>Factores determinantes</h3>
          <FactorChart factors={result.factors} />
        </div>
        <div>
          <h3 style={{ fontSize: 15, marginBottom: 8 }}>Explicación</h3>
          <p style={{ fontSize: 14 }}>{result.explanation}</p>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .result-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
