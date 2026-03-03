import SectionLabel from './SectionLabel';

interface ProductHeroProps {
  label?: string;
  title: string;
  description: string;
  backgroundImageUrl?: string;
  children?: React.ReactNode;
}

export default function ProductHero({ label, title, description, backgroundImageUrl, children }: ProductHeroProps) {
  return (
    <section className="product-hero">
      <div className="product-hero-bg">
        <img src={backgroundImageUrl || '/assets/hero-bg.png'} alt="" className="product-hero-bg-img" />
      </div>
      <div className="product-hero-content">
        {children}
        {label && <SectionLabel text={label} center />}
        <h1 className="product-hero-title">{title}</h1>
        <p className="product-hero-description">{description}</p>
      </div>
    </section>
  );
}
