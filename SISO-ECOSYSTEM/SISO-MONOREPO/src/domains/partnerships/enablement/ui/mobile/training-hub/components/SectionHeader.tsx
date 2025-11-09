interface SectionHeaderProps {
  label: string;
  description?: string;
  actionLabel?: string;
}

export function SectionHeader({ label, description, actionLabel = "View all" }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">{label}</p>
        {description ? <p className="text-sm text-siso-text-muted">{description}</p> : null}
      </div>
      <button type="button" className="text-xs font-medium text-siso-text-primary underline-offset-2 hover:underline">
        {actionLabel}
      </button>
    </div>
  );
}
