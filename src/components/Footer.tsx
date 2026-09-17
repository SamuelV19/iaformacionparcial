export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ padding: 'var(--space-5) 0' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: 13,
          color: 'var(--ink-faint)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--ink)' }}>
          DevDecision AI
        </span>
        <span>Simulación académica — Ingeniería Informática</span>
        <span>{year}</span>
      </div>
    </footer>
  )
}
