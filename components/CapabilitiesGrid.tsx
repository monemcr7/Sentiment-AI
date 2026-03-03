import SectionLabel from './SectionLabel';

interface Capability {
  icon: string;
  title: string;
  description: string;
}

interface CapabilitiesGridProps {
  label?: string;
  title: string;
  capabilities: Capability[];
}

export default function CapabilitiesGrid({ label = 'Capabilities', title, capabilities }: CapabilitiesGridProps) {
  return (
    <section className="capabilities-section">
      <div className="section-container">
        <SectionLabel text={label} />
        <h2 className="section-title">{title}</h2>
        <div className="capabilities-grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="capability-card">
              <div className="capability-card-icon" dangerouslySetInnerHTML={{ __html: cap.icon }} />
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
