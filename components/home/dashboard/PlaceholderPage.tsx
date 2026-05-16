interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
        <div className="mb-4 text-4xl">??</div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">This section is coming soon.</p>
      </div>
    </div>
  );
}
