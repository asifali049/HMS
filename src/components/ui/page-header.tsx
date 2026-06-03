export default function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}