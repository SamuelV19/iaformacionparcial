import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorks from './components/HowItWorks'
import DecisionForm from './components/DecisionForm'
import AnalysisResult from './components/AnalysisResult'
import Limitations from './components/Limitations'
import Conclusion from './components/Conclusion'
import Footer from './components/Footer'
import type { AnalysisResult as AnalysisResultType } from './types/decision'

export default function App() {
  const [result, setResult] = useState<AnalysisResultType | null>(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />

        <section id="simulador" className="section">
          <div className="container">
            <p className="section-label">Simulador</p>
            <h2 className="section-heading">Prueba el motor de decisión.</h2>
            <p className="section-intro">
              Esta simulación demuestra cómo un sistema inteligente puede procesar múltiples
              variables y generar recomendaciones para apoyar la toma de decisiones. La decisión
              final continúa siendo responsabilidad del profesional.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <DecisionForm onResult={setResult} />
              {result && <AnalysisResult result={result} />}
            </div>
          </div>
        </section>

        <Limitations />
        <Conclusion />
      </main>
      <Footer />
    </>
  )
}
