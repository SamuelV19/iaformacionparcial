import type { FactorScore } from '../types/decision'

interface Props {
  factors: FactorScore[]
}

export default function FactorChart({ factors }: Props) {
  const sorted = [...factors].sort((a, b) => b.value - a.value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {sorted.map((factor) => (
        <div key={factor.key}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--ink)' }}>
              {factor.label}{' '}
              <span style={{ color: 'var(--ink-faint)' }}>· peso {factor.weight}%</span>
            </span>
            <span className="mono" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {factor.value}%
            </span>
          </div>
          <div
            role="img"
            aria-label={`${factor.label}: ${factor.value} de 100`}
            style={{
              height: 8,
              background: 'var(--border)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${factor.value}%`,
                background: 'var(--ink)',
                borderRadius: 4,
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
