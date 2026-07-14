export function BrandMark() {
  return <span className="brand-mark" aria-hidden>V</span>;
}

export default function BrandLogo({ className = '' }) {
  return (
    <span className={className}>
      <BrandMark />
      Vethra
    </span>
  );
}
