interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="page-inner">
      <div className="placeholder-card">
        <div className="placeholder-icon">📋</div>
        <h2 className="placeholder-title">{title}</h2>
        <p className="placeholder-desc">This section is coming soon.</p>
      </div>
    </div>
  );
}
