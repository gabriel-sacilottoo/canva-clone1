interface ToolSidebarHeaderProps {
  title: string;
  description?: string;
}

export const ToolHeader = ({ title, description }: ToolSidebarHeaderProps) => {
  return (
    <div className="border-b border-gray-400 dark:border-zinc-700 space-y-1 h-[50px] mb-2">
      <p className="text-sm font-medium">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
