interface SectionLabelProps {
  text: string;
  center?: boolean;
}

export default function SectionLabel({ text, center }: SectionLabelProps) {
  return (
    <div className={`section-label${center ? ' center' : ''}`}>
      <span className="label-slash">/</span>
      <span className="label-text">{text}</span>
    </div>
  );
}
