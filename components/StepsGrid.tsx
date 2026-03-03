import SectionLabel from './SectionLabel';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface StepsGridProps {
  label?: string;
  title: string;
  steps: Step[];
}

export default function StepsGrid({ label = 'How It Works', title, steps }: StepsGridProps) {
  return (
    <section className="subproduct-steps">
      <div className="section-container">
        <SectionLabel text={label} />
        <h2 className="section-title">{title}</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-box">
              <div className="step-box-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
