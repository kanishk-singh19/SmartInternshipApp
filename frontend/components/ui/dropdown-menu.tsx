import * as React from "react";

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  // when using asChild, the child handles rendering; return child directly
  if (asChild) return <>{children}</>;

  // default wrapper when not using asChild
  return <button type="button" className="inline-flex items-center">{children}</button>;
}

export function DropdownMenuContent({ children, className, align }: { children: React.ReactNode; className?: string; align?: 'start'|'center'|'end' }) {
  const alignClass = align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 transform -translate-x-1/2' : 'left-0'
  return (
    <div className={`absolute ${alignClass} mt-2 w-56 rounded-md bg-card shadow-lg ${className ?? ""}`}>
      <div className="p-2">{children}</div>
    </div>
  );
}

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-muted-foreground px-2 py-1">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <div className="border-t my-1 border-border" />;
}

export function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2 hover:bg-muted rounded-md flex items-center gap-2">{children}</div>;
}
